import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { imageSrc, isPortrait, type ProjectImage } from '../data/projectMedia';
import ProjectImg from './ProjectImg';
import Reveal from './Reveal';

/**
 * Screenshot gallery: landscape shots in a two-column grid (the first one
 * spans both columns), phone shots side by side in their own row. Any image
 * opens a fullscreen lightbox -- arrows / swipe / Esc. The lightbox is
 * portalled to <body> so no transformed or backdrop-filtered ancestor can
 * trap it (see WorldSwitcher for the iOS Safari story).
 */
export default function Gallery({ images, lead = true }: { images: ProjectImage[]; lead?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const wide = images.filter((i) => !isPortrait(i));
  const tall = images.filter((i) => isPortrait(i));
  const indexOf = (img: ProjectImage) => images.indexOf(img);
  // A full-width lead image only when it leaves an even number for the pairs
  // below, so the grid never ends on a lonely half-width image.
  const withLead = lead && wide.length % 2 === 1;

  return (
    <>
      {wide.length > 0 && (
        <div className={`gallery ${withLead ? 'gallery--lead' : ''}`}>
          {wide.map((img, i) => (
            <Reveal key={img.name} delay={Math.min(i * 0.06, 0.24)} y={18} className="gallery__item">
              <button type="button" className="gallery__btn" onClick={() => setOpen(indexOf(img))} aria-label={`Enlarge: ${img.alt}`}>
                <ProjectImg img={img} sizes={i === 0 && withLead ? '(max-width: 860px) 100vw, 900px' : '(max-width: 860px) 100vw, 450px'} />
              </button>
              <p className="gallery__caption">{img.caption}</p>
            </Reveal>
          ))}
        </div>
      )}
      {tall.length > 0 && (
        <div className="gallery gallery--phones">
          {tall.map((img, i) => (
            <Reveal key={img.name} delay={Math.min(i * 0.06, 0.24)} y={18} className="gallery__item">
              <button type="button" className="gallery__btn" onClick={() => setOpen(indexOf(img))} aria-label={`Enlarge: ${img.alt}`}>
                <ProjectImg img={img} sizes="(max-width: 860px) 50vw, 280px" />
              </button>
              <p className="gallery__caption">{img.caption}</p>
            </Reveal>
          ))}
        </div>
      )}
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}

function Lightbox({
  images,
  index,
  onChange,
}: {
  images: ProjectImage[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const touchX = useRef<number | null>(null);
  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onChange(null);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [index, onChange, step]);

  const img = index === null ? null : images[index];

  return createPortal(
    <AnimatePresence>
      {img && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => onChange(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <motion.figure
            key={img.name}
            className="lightbox__figure"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={imageSrc(img, 1600)} alt={img.alt} className={isPortrait(img) ? 'lightbox__img lightbox__img--tall' : 'lightbox__img'} />
            <figcaption className="lightbox__caption">
              <span className="lightbox__count">
                {index! + 1} / {images.length}
              </span>
              {img.caption}
            </figcaption>
          </motion.figure>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                ›
              </button>
            </>
          )}
          <button type="button" className="lightbox__close" aria-label="Close" onClick={() => onChange(null)}>
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
