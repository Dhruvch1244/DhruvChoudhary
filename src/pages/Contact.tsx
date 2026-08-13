import PageHeader from '../components/PageHeader';
import { Arrow } from '../components/Marks';
import { profile } from '../data/content';

export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="04 — Contact" title="Let's talk" underline />

      <p className="contact__intro">
        Open to interesting problems -- backend systems, real-time apps, or anything that needs
        building properly. Easiest way to reach me:
      </p>

      <a href={`mailto:${profile.email}`} className="contact__email">
        {profile.email}
        <Arrow className="contact__arrow" />
      </a>

      <ul className="contact__list">
        <li>
          <a href={profile.github} target="_blank" rel="noreferrer">
            {profile.githubHandle}
          </a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            {profile.linkedinHandle}
          </a>
        </li>
        <li>{profile.location}</li>
      </ul>
    </>
  );
}
