/**
 * Splits a heading into words that rise and turn into place in 3D, one after
 * another. Words stay in the DOM as plain text, so screen readers and search
 * engines read the heading normally.
 */
export default function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(/(\s+)/);
  let i = 0;
  return (
    <span className="split-words">
      {words.map((w, k) =>
        /^\s+$/.test(w) ? (
          w
        ) : (
          <span key={k} className="split-word" style={{ animationDelay: `${delay + i++ * 70}ms` }}>
            {w}
          </span>
        ),
      )}
    </span>
  );
}
