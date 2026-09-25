"use client";
import { useEffect } from "react";

/** Sets html[data-scrolled] once the page is scrolled, for the compact glass header. */
export default function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.toggleAttribute("data-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
