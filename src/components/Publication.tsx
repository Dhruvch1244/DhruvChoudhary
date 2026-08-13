import Reveal from './Reveal';
import { publication } from '../data/content';

export default function Publication() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="glass-card publication">
          <span className="eyebrow">Research</span>
          <h3>{publication.title}</h3>
          <p className="publication__venue">{publication.venue}</p>
          <p>{publication.description}</p>
        </Reveal>
      </div>
    </section>
  );
}
