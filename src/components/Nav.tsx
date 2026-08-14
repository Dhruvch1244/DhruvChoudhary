import { NavLink } from 'react-router-dom';
import { profile } from '../data/content';
import ThemeToggle from './ThemeToggle';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const LINKS = [
  { to: '/', label: 'Index', num: '01' },
  { to: '/projects', label: 'Projects', num: '02' },
  { to: '/experience', label: 'Experience', num: '03' },
  { to: '/music', label: 'Music', num: '04' },
  { to: '/contact', label: 'Contact', num: '05' },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__top">
        <img src="/img/avatar-2.jpg" alt={profile.name} className="nav__avatar" />
        <NavLink to="/" className="nav__brand">
          {profile.name}
        </NavLink>
        <ThemeToggle />
      </div>

      <nav className="nav__links" aria-label="Primary">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
          >
            <span className="nav__num">{link.num}</span> {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav__social">
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          Résumé
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={profile.twitter} target="_blank" rel="noreferrer">
          X / Twitter
        </a>
        <a href={profile.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>

      <SpotifyNowPlaying />
    </header>
  );
}
