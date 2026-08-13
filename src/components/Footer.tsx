import { Asterisk } from './Marks';

export default function Footer() {
  return (
    <footer className="footer">
      <Asterisk className="footer__mark" />
      <span>© {new Date().getFullYear()} Dhruv Choudhary — built by hand, not a template</span>
    </footer>
  );
}
