/** Static stand-in for the Lyric Overlay's Vinyl preset: a record turning on
 * a deck. Deliberately not wired to live Spotify playback. */
export default function VinylDemo() {
  return (
    <div className="vinyl-demo">
      <div className="vinyl-demo__deck vinyl-demo__deck--spinning">
        <div className="vinyl-demo__record">
          <div className="vinyl-demo__label vinyl-demo__label--placeholder" />
          <span className="vinyl-demo__hole" />
        </div>
        <span className="vinyl-demo__tonearm" />
      </div>
      <p className="vinyl-demo__caption">
        Not wired to real audio in a browser -- but this is the Vinyl preset: cover art on a deck, turning one revolution
        every four beats once tempo locks, in the real app.
      </p>
    </div>
  );
}
