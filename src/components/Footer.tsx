export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} Dhruv Choudhary</span>
        <span className="footer__made">Built with React, Three.js &amp; too much coffee</span>
      </div>
    </footer>
  );
}
