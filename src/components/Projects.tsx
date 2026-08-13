import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import { projects } from '../data/content';

export default function Projects() {
  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Projects</span>
          <h2 className="section__title">Things I've shipped</h2>
        </Reveal>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08} y={20}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
