import type { ContentState } from '../lib/useContent';
import ContentGate from './ContentGate';
import Reveal from './Reveal';
import Section from './Section';

const COLS = 'grid grid-cols-[4.5rem_1fr] gap-x-4 md:grid-cols-[8rem_1.6fr_1fr_1fr] md:gap-x-8';

function Cell({ value }: { value: string | number | null }) {
  if (value) return <>{value}</>;
  return (
    <span className="text-grey">
      <span aria-hidden="true">—</span>
      <span className="sr-only">To be added</span>
    </span>
  );
}

export default function Filmography({ state }: { state: ContentState }) {
  return (
    <Section id="filmography" index="03" label="Index" title="Filmography">
      <ContentGate state={state} rows={3}>
        {({ projects }) => {
          // Titled works only, newest first; undated entries sit at the end.
          const films = projects
            .filter((p) => p.kind === 'film')
            .sort((a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity) || a.sort_order - b.sort_order);

          if (films.length === 0) {
            return <p className="text-grey">Filmography entries will be added here.</p>;
          }

          return (
            <div role="table" aria-label="Filmography" className="border-b border-charcoal">
              <div role="rowgroup">
                <div role="row" className={`${COLS} meta hidden border-t border-charcoal py-4 text-grey md:grid`}>
                  <span role="columnheader">Year</span>
                  <span role="columnheader">Project</span>
                  <span role="columnheader">Format</span>
                  <span role="columnheader">Role</span>
                </div>
              </div>
              <div role="rowgroup">
                {films.map((film, i) => (
                  <Reveal key={film.id} delay={Math.min(i, 5) * 50}>
                    <div
                      role="row"
                      className={`${COLS} items-baseline gap-y-1.5 border-t border-charcoal py-6 md:py-7`}
                    >
                      <span role="cell" className="meta row-span-3 pt-1.5 text-silver md:row-span-1 md:pt-0">
                        <Cell value={film.year} />
                      </span>
                      <span
                        role="cell"
                        className="text-2xl font-bold uppercase leading-none tracking-[-0.03em] text-white md:text-4xl"
                      >
                        {film.title}
                      </span>
                      <span role="cell" className="col-start-2 text-sm text-silver md:col-start-auto md:text-base">
                        <span className="meta mr-3 text-grey md:hidden">Format</span>
                        <Cell value={film.format} />
                      </span>
                      <span role="cell" className="col-start-2 text-sm text-silver md:col-start-auto md:text-base">
                        <span className="meta mr-3 text-grey md:hidden">Role</span>
                        <Cell value={film.role} />
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        }}
      </ContentGate>
    </Section>
  );
}
