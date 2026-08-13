import Reveal from './Reveal';
import { education, profile } from '../data/content';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about__grid">
        <Reveal>
          <span className="eyebrow">About</span>
          <h2 className="section__title">
            Enterprise-grade systems.
            <br />
            Side projects with a pulse.
          </h2>
          <p className="about__body">{profile.resumeSummary}</p>
        </Reveal>

        <Reveal delay={0.15} className="glass-card about__card">
          <dl className="about__facts">
            <div>
              <dt>Currently</dt>
              <dd>Executive Graduate Trainee, Fidelity Investments</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {education.degree}
                <br />
                <span className="about__facts-sub">
                  {education.school} · {education.period}
                </span>
              </dd>
            </div>
            <div>
              <dt>Also published</dt>
              <dd>First-author research on SSRN — LSTM/PPO-driven investing</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
