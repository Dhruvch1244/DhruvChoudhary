import type { ImgHTMLAttributes } from 'react';
import { imageSrc, imageSrcSet, type ProjectImage } from '../data/projectMedia';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt' | 'width' | 'height'> & {
  img: ProjectImage;
  /** CSS `sizes` hint so the browser picks the 800w or 1600w file. */
  sizes?: string;
  eager?: boolean;
};

/** A project screenshot: responsive WebP (800w/1600w), intrinsic size set so
 * layout doesn't jump, lazy unless marked eager (above-the-fold covers). */
export default function ProjectImg({ img, sizes = '(max-width: 860px) 100vw, 900px', eager, ...rest }: Props) {
  return (
    <img
      src={imageSrc(img)}
      srcSet={imageSrcSet(img)}
      sizes={sizes}
      alt={img.alt}
      width={img.w}
      height={img.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...rest}
    />
  );
}
