import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/content';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const LINKS = [
  { label: 'About', hash: '#about' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Contact', hash: '#contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setOpen(false)}>
          DC<span className="navbar__logo-dot">.</span>
        </Link>

        <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {LINKS.map((link) =>
            onHome ? (
              <a key={link.hash} href={link.hash} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ) : (
              <Link key={link.hash} to={`/${link.hash}`} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ),
          )}
          <div className="navbar__socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon />
            </a>
          </div>
        </nav>

        <button
          className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
