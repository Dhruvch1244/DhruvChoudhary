import { Link } from 'react-router-dom';
import type { Project } from '../data/content';
import { ArrowUpRightIcon, GitHubIcon, PlayIcon } from './Icons';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card--${project.accent} glass-card`}>
      <div className="project-card__glow" />
      <div className="project-card__body">
        <h3>{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__desc">{project.description}</p>
        <div className="pill-row">
          {project.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="project-card__links">
        {project.internalRoute && (
          <Link to={project.internalRoute} className="btn btn-primary btn-small">
            <PlayIcon /> Play
          </Link>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-small">
            <GitHubIcon /> Code
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-ghost btn-small">
            Live <ArrowUpRightIcon size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
