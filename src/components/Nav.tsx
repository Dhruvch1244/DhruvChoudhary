import { NavLink } from 'react-router-dom';
import { profile } from '../data/content';

const LINKS = [
  { to: '/', label: 'Index', num: '01' },
  { to: '/projects', label: 'Projects', num: '02' },
  { to: '/experience', label: 'Experience', num: '03' },
  { to: '/contact', label: 'Contact', num: '04' },
];

export default function Nav() {
  return (
    <header className="nav">
      <NavLink to="/" className="nav__brand">
        {profile.name}
      </NavLink>

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
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
    </header>
  );
}
