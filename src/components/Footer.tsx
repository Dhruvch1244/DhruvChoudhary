import { PlusMark } from './Marks';
import AmbientEqualizer from './AmbientEqualizer';

export default function Footer() {
  return (
    <footer className="footer">
      <PlusMark className="footer__mark" />
      <span>© {new Date().getFullYear()} Dhruv Choudhary — built by hand, not a template</span>
      <AmbientEqualizer />
    </footer>
  );
}
