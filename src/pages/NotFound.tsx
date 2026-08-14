import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Arrow } from '../components/Marks';

export default function NotFound() {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}>
      <p className="eyebrow">404</p>
      <h1 className="page-header__title gradient-text">Not found</h1>
      <p className="hero__tagline" style={{ marginTop: 20 }}>
        Whatever you were looking for isn't here. Wrong link, or something moved.
      </p>
      <div className="hero__actions">
        <Link to="/" className="btn-outline">
          Back to index <Arrow className="text-link__arrow" />
        </Link>
        <Link to="/projects" className="text-link hero__contact-link">
          See projects
        </Link>
      </div>
    </motion.div>
  );
}
