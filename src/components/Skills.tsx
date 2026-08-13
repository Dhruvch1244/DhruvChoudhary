import Reveal from './Reveal';
import { skillGroups } from '../data/content';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Toolbox</span>
          <h2 className="section__title">What I build with</h2>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06} className="glass-card skills__card">
              <h3>{group.label}</h3>
              <div className="pill-row">
                {group.items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
