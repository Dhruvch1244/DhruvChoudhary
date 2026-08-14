import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../data/content';
import { caseStudies } from '../data/caseStudies';

type Item = { label: string; hint: string; to: string };

const CASE_STUDY_SLUGS = new Set(caseStudies.map((c) => c.slug));

const PAGES: Item[] = [
  { label: 'Index', hint: 'Home', to: '/' },
  { label: 'Projects', hint: 'All projects', to: '/projects' },
  { label: 'Experience', hint: 'Work history', to: '/experience' },
  { label: 'Contact', hint: 'Get in touch', to: '/contact' },
  { label: 'Kaabo', hint: 'Card game', to: '/kaabo' },
];

const PROJECT_ITEMS: Item[] = projects
  .filter((p) => p.slug !== 'kaabo')
  .map((p) => ({
    label: p.name,
    hint: CASE_STUDY_SLUGS.has(p.slug) ? 'Case study' : 'Project',
    to: CASE_STUDY_SLUGS.has(p.slug) ? `/projects/${p.slug}` : p.github ?? '/projects',
  }));

const ITEMS: Item[] = [...PAGES, ...PROJECT_ITEMS];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  function go(item: Item) {
    setOpen(false);
    if (item.to.startsWith('http')) window.open(item.to, '_blank', 'noreferrer');
    else navigate(item.to);
  }

  function onInputKeyDown(e: ReactKeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      e.preventDefault();
      go(results[selected]);
    }
  }

  return (
    <>
      <button type="button" className="command-palette-hint" onClick={() => setOpen(true)} aria-label="Open command palette">
        <span>⌘</span>K
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="command-palette__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="command-palette"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                className="command-palette__input"
                type="text"
                placeholder="Jump to a page or project..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                aria-label="Search pages and projects"
              />
              <div className="command-palette__list" role="listbox">
                {results.length === 0 && <p className="command-palette__empty">Nothing matches "{query}".</p>}
                {results.map((item, i) => (
                  <button
                    key={item.to + item.label}
                    type="button"
                    className={`command-palette__item ${i === selected ? 'selected' : ''}`}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => go(item)}
                    role="option"
                    aria-selected={i === selected}
                  >
                    <span>{item.label}</span>
                    <span className="command-palette__item-hint">{item.hint}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
