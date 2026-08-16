const BARS = [0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.45];

export default function AmbientEqualizer() {
  return (
    <span className="ambient-eq" aria-hidden="true">
      {BARS.map((h, i) => (
        <span key={i} style={{ animationDelay: `${i * -0.35}s`, animationDuration: `${1.4 + h}s` }} />
      ))}
    </span>
  );
}
