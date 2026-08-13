import Reveal from './Reveal';
import { profile } from '../data/content';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal className="contact__inner">
          <span className="eyebrow">Get in touch</span>
          <h2 className="section__title">
            Building something?
            <br />
            <span className="gradient-text">Let's talk.</span>
          </h2>
          <p className="contact__body">
            Open to interesting problems — backend systems, real-time apps, or anything that needs
            something built properly.
          </p>
          <div className="hero__actions contact__actions">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <MailIcon /> {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <GitHubIcon /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
