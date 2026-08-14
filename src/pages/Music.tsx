import PageHeader from '../components/PageHeader';
import { Arrow } from '../components/Marks';
import Reveal from '../components/Reveal';
import SpotifyNowPlaying from '../components/SpotifyNowPlaying';
import { profile } from '../data/content';
import { getTopArtists, getPlaylists, type Artist, type Playlist } from '../lib/spotify';
import { useSpotifyCache } from '../lib/useSpotifyCache';

const CACHE_KEY = 'spotify-music-cache-v1';

export default function Music() {
  const artists = useSpotifyCache<Artist[]>(`${CACHE_KEY}-artists`, getTopArtists);
  const playlists = useSpotifyCache<Playlist[]>(`${CACHE_KEY}-playlists`, getPlaylists);

  const showArtists = !artists.failed && artists.data && artists.data.length > 0;
  const showPlaylists = !playlists.failed && playlists.data && playlists.data.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="04 — Music"
        title={
          <>
            What I'm <span className="gradient-text">listening to</span>
          </>
        }
        underline
      >
        <a href={profile.spotify} target="_blank" rel="noreferrer" className="btn-outline">
          Follow on Spotify <Arrow className="text-link__arrow" />
        </a>
      </PageHeader>

      <Reveal className="music__now">
        <p className="eyebrow">Right now</p>
        <SpotifyNowPlaying large />
      </Reveal>

      {showArtists && (
        <section className="music__section">
          <Reveal>
            <h2 className="section-title">Top artists</h2>
          </Reveal>
          <div className="artists__grid">
            {artists.data!.map((artist, i) => (
              <Reveal key={artist.name} delay={Math.min(i * 0.05, 0.3)} y={16} className="artist-card">
                <a href={artist.url ?? undefined} target="_blank" rel="noreferrer">
                  {artist.image && <img src={artist.image} alt="" className="artist-card__img" />}
                  <span className="artist-card__name">{artist.name}</span>
                  {artist.genres.length > 0 && <span className="artist-card__genres">{artist.genres.slice(0, 2).join(', ')}</span>}
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {showPlaylists && (
        <section className="music__section">
          <Reveal>
            <h2 className="section-title">Playlists</h2>
          </Reveal>
          <div className="playlists__grid">
            {playlists.data!.map((playlist, i) => (
              <Reveal key={playlist.name} delay={Math.min(i * 0.05, 0.3)} y={16} className="playlist-card">
                <a href={playlist.url ?? undefined} target="_blank" rel="noreferrer">
                  {playlist.image && <img src={playlist.image} alt="" className="playlist-card__img" />}
                  <span className="playlist-card__name">{playlist.name}</span>
                  <span className="playlist-card__count">{playlist.trackCount} tracks</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {!showArtists && !showPlaylists && (
        <Reveal className="music__fallback">
          <p>
            Can't load live listening data right now —{' '}
            <a href={profile.spotify} target="_blank" rel="noreferrer" className="text-link">
              follow me on Spotify instead
            </a>
            .
          </p>
        </Reveal>
      )}
    </>
  );
}
