"use client";
import { useEffect, useRef } from "react";

/**
 * Floating 3D soap bubbles (three.js / WebGL). Iridescent, glossy spheres
 * drift upward and move away from the mouse. Loaded only in the browser,
 * paused when off-screen or when the tab is hidden, and rendered as a single
 * still frame for visitors who prefer reduced motion.
 */
export default function Bubbles3D({ count = 14, className = "" }: { count?: number; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      // Start after the page-change wipe (~0.75 s) so the two never compete for the main thread.
      await new Promise((r) => setTimeout(r, 800));
      if (disposed) return;
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return; // no WebGL: the section simply shows without bubbles
      }
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;
      const n = small ? Math.ceil(count / 2) : count;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 14);

      // Soap-film shader: clear centre, bright rim (fresnel), shifting thin-film
      // rainbow colours and two specular glints.
      const geometry = new THREE.SphereGeometry(1, 48, 32);
      const vertexShader = `
        varying vec3 vN;
        varying vec3 vV;
        varying vec3 vW;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal);
          vV = normalize(-mv.xyz);
          vW = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * mv;
        }`;
      const fragmentShader = `
        uniform float uTime;
        uniform float uSeed;
        varying vec3 vN;
        varying vec3 vV;
        varying vec3 vW;
        void main() {
          vec3 n = normalize(vN);
          float facing = abs(dot(n, vV));
          float rim = pow(1.0 - facing, 2.4);
          float swirl = sin(uTime * 0.7 + vW.y * 2.3 + uSeed) * 0.5 + sin(uTime * 0.45 + vW.x * 1.7 - uSeed) * 0.5;
          vec3 film = 0.5 + 0.5 * cos(6.2832 * (vec3(0.0, 0.33, 0.67) + rim * 1.4 + swirl * 0.35 + uSeed * 0.1));
          vec3 col = mix(vec3(1.0), film, 0.85);
          vec3 l1 = normalize(vec3(-0.45, 0.65, 0.6));
          vec3 l2 = normalize(vec3(0.55, -0.35, 0.75));
          float s1 = pow(max(dot(reflect(-l1, n), vV), 0.0), 90.0);
          float s2 = pow(max(dot(reflect(-l2, n), vV), 0.0), 40.0) * 0.35;
          float alpha = clamp(0.05 + rim * 0.95 + (s1 + s2), 0.0, 1.0);
          gl_FragColor = vec4(col * (0.75 + rim * 0.5) + vec3(s1 + s2), alpha);
        }`;
      const materials: InstanceType<typeof THREE.ShaderMaterial>[] = [];
      const makeMaterial = (seed: number) => {
        const m = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: { uTime: { value: 0 }, uSeed: { value: seed } },
          transparent: true,
          depthWrite: false,
        });
        materials.push(m);
        return m;
      };

      // Visible area at z = 0, updated on resize.
      let halfW = 6;
      let halfH = 4;
      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        halfW = halfH * camera.aspect;
      };
      resize();

      type Bubble = { mesh: InstanceType<typeof THREE.Mesh>; base: number; speed: number; phase: number; vx: number; vy: number; home: number };
      const rand = (a: number, b: number) => a + Math.random() * (b - a);
      const bubbles: Bubble[] = Array.from({ length: n }, (_, i) => {
        const mesh = new THREE.Mesh(geometry, makeMaterial(rand(0, 6.28)));
        const base = rand(0.25, small ? 0.75 : 1.05);
        mesh.scale.setScalar(base);
        // Spread across the width, random heights; a few slightly in front/behind for depth.
        mesh.position.set(rand(-halfW, halfW), rand(-halfH, halfH), rand(-2.5, 1.5));
        scene.add(mesh);
        return { mesh, base, speed: rand(0.25, 0.6), phase: i * 1.7, vx: 0, vy: 0, home: mesh.position.x };
      });

      const pointer = new THREE.Vector2(9999, 9999);
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const clock = new THREE.Clock();
      let visible = true;
      let raf = 0;

      const step = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        for (const m of materials) m.uniforms.uTime.value = t;
        const px = pointer.x * halfW;
        const py = pointer.y * halfH;
        for (const b of bubbles) {
          const p = b.mesh.position;
          // Rise, sway, and "breathe" like a soap film.
          p.y += b.speed * dt;
          const sway = Math.sin(t * 0.6 + b.phase) * 0.35;
          // Push away from the pointer, then drift back.
          const dx = p.x - px;
          const dy = p.y - py;
          const d2 = dx * dx + dy * dy;
          const reach = 2.4 + b.base;
          if (d2 < reach * reach) {
            const f = (1 - Math.sqrt(d2) / reach) * 6;
            b.vx += (dx / (Math.sqrt(d2) + 0.001)) * f * dt;
            b.vy += (dy / (Math.sqrt(d2) + 0.001)) * f * dt;
          }
          b.vx += (b.home + sway - p.x) * 0.6 * dt;
          b.vx *= 0.94;
          b.vy *= 0.94;
          p.x += b.vx * dt * 2;
          p.y += b.vy * dt * 2;
          const s = b.base * (1 + Math.sin(t * 2.2 + b.phase) * 0.025);
          b.mesh.scale.set(s * 1.015, s, s);
          b.mesh.rotation.y = t * 0.2 + b.phase;
          if (p.y - b.base > halfH + 0.5) {
            p.y = -halfH - b.base - rand(0, 1.5);
            b.home = rand(-halfW, halfW);
            p.x = b.home;
          }
        }
        renderer.render(scene, camera);
      };
      const loop = () => {
        raf = 0;
        if (!visible || document.hidden) return;
        step();
        raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (!raf && visible && !document.hidden && !reduceMotion) {
          clock.getDelta();
          raf = requestAnimationFrame(loop);
        }
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        start();
      });
      io.observe(host);
      const onVisibility = () => start();
      document.addEventListener("visibilitychange", onVisibility);
      const ro = new ResizeObserver(() => {
        resize();
        if (reduceMotion) renderer.render(scene, camera);
      });
      ro.observe(host);

      if (reduceMotion) renderer.render(scene, camera);
      else start();
      requestAnimationFrame(() => host.classList.add("opacity-100"));

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVisibility);
        geometry.dispose();
        for (const m of materials) m.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [count]);

  return <div ref={hostRef} aria-hidden className={`pointer-events-none opacity-0 transition-opacity duration-1000 ${className}`} />;
}
