import type { ContentState } from '../lib/useContent';
import type { Project } from '../lib/types';
import { pad } from '../lib/utils';
import ContentGate from './ContentGate';
import Poster from './Poster';
import Reveal from './Reveal';
import Section from './Section';

function Fact({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div>
      <dt className="meta text-grey">{label}</dt>
      <dd className={`mt-1.5 text-sm ${value ? 'text-white' : 'text-grey'}`}>
        {value ?? (
          <>
            <span aria-hidden="true">—</span>
            <span className="sr-only">To be added</span>
          </>
        )}
      </dd>
    </div>
  );
}

function ViewButton({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project.slug)}
      aria-label={`View project: ${project.title}`}
      className="view-link meta after:absolute after:inset-0"
    >
      View Project
      <span aria-hidden="true" className="transition-transform duration-500 ease-cine group-hover:translate-x-1.5">
        →
      </span>
    </button>
  );
}

function FeatureCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (slug: string) => void }) {
  return (
    <article className="group relative grid gap-8 lg:grid-cols-12 lg:gap-14">
      <Reveal variant="image" className="lg:col-span-8">
        <Poster project={project} index={index} />
      </Reveal>
      <Reveal delay={120} className="flex flex-col lg:col-span-4">
        <p className="meta text-grey">
          {pad(index + 1)}
          {project.format ? ` — ${project.format}` : ''}
        </p>
        <h3 className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
          {project.title}
        </h3>

        {project.kind === 'film' && (
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-charcoal py-6">
            <Fact label="Year" value={project.year} />
            <Fact label="Format" value={project.format} />
            <Fact label="Genre" value={project.genre} />
            <Fact label="Role" value={project.role} />
          </dl>
        )}

        <p className={`mt-6 leading-relaxed ${project.synopsis ? 'text-silver' : 'text-grey'}`}>
          {project.synopsis ?? 'Synopsis to be added.'}
        </p>

        <div className="mt-8 lg:mt-auto lg:pt-8">
          <ViewButton project={project} onOpen={onOpen} />
        </div>
      </Reveal>
    </article>
  );
}

function Card({ project, index, onOpen }: { project: Project; index: number; onOpen: (slug: string) => void }) {
  const facts = [project.format, project.genre, project.year].filter(Boolean).join(' — ');
  return (
    <article className="group relative">
      <Reveal variant="image">
        <Poster project={project} index={index} />
      </Reveal>
      <Reveal delay={100}>
        <p className="meta mt-5 text-grey">
          {pad(index + 1)}
          {facts ? ` — ${facts}` : ''}
        </p>
        <h3 className="mt-3 text-2xl font-bold uppercase leading-none tracking-[-0.03em] text-white sm:text-3xl">
          {project.title}
        </h3>
        {project.kind === 'film' && project.role && <p className="mt-3 text-sm text-silver">{project.role}</p>}
        <p className="mt-3 max-w-md text-sm leading-relaxed text-grey">
          {project.synopsis ?? 'Synopsis to be added.'}
        </p>
        <div className="mt-6">
          <ViewButton project={project} onOpen={onOpen} />
        </div>
      </Reveal>
    </article>
  );
}

export default function Works({ state, onOpen }: { state: ContentState; onOpen: (slug: string) => void }) {
  return (
    <Section id="work" index="02" label="Work" title="Selected Works">
      <ContentGate state={state} rows={4}>
        {({ projects }) => {
          if (projects.length === 0) {
            return <p className="text-grey">Projects will be added here.</p>;
          }
          const [feature, ...rest] = projects;
          return (
            <div className="space-y-16 lg:space-y-24">
              <FeatureCard project={feature} index={0} onOpen={onOpen} />
              {rest.length > 0 && (
                <div className="grid gap-x-8 gap-y-16 border-t border-charcoal pt-16 md:grid-cols-2 lg:gap-x-14 lg:pt-24">
                  {rest.map((project, i) => (
                    <Card key={project.id} project={project} index={i + 1} onOpen={onOpen} />
                  ))}
                </div>
              )}
            </div>
          );
        }}
      </ContentGate>
    </Section>
  );
}
