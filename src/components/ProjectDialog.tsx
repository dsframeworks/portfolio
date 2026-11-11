import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { MediaItem, Project } from '../lib/types';
import { asset, pad } from '../lib/utils';
import Lightbox from './Lightbox';
import Poster from './Poster';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-charcoal py-8 md:py-10 lg:grid-cols-12 lg:gap-8">
      <h3 className="meta pt-1 text-grey lg:col-span-3">{label}</h3>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

const Pending = ({ children = 'To be added.' }: { children?: ReactNode }) => (
  <p className="text-grey">{children}</p>
);

function Thumbs({ items, onOpen }: { items: MediaItem[]; onOpen: (index: number) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {items.map((item, i) => (
        <li key={item.url}>
          <button
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open image ${i + 1}${item.caption ? `: ${item.caption}` : ''}`}
            className="group block aspect-[3/2] w-full overflow-hidden bg-black"
          >
            <img
              src={item.url}
              alt={item.caption ?? ''}
              loading="lazy"
              decoding="async"
              className="mono h-full w-full object-cover transition-transform duration-700 ease-cine group-hover:scale-[1.04]"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

interface ProjectDialogProps {
  project: Project;
  index: number;
  onClose: () => void;
}

export default function ProjectDialog({ project, index, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const isFilm = project.kind === 'film';
  const resolve = (items: MediaItem[] | null) => (items ?? []).map((m) => ({ ...m, url: asset(m.url) }));
  const stills = resolve(project.stills);
  const credits = project.credits ?? [];
  const links = [
    { label: 'Watch film', href: project.watch_url },
    { label: 'Watch trailer', href: project.trailer_url },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  const facts: [string, string | number | null][] = [
    ['Year', project.year],
    ['Format', project.format],
    ['Genre', project.genre],
    ['Role', project.role],
  ];

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="project-title"
      onClose={(e) => {
        if (e.target === e.currentTarget && !ref.current?.open) onClose();
      }}
    >
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-charcoal bg-black px-5 sm:px-8 lg:px-12">
        <p className="meta text-grey">
          <span className="text-silver">Project {pad(index + 1)}</span>
          {project.format ? ` — ${project.format}` : ''}
        </p>
        <button type="button" className="nav-link meta -mr-2 px-2 py-3" onClick={() => ref.current?.close()}>
          Close <span aria-hidden="true">✕</span>
        </button>
      </div>

      <article className="mx-auto max-w-[1600px] px-5 pb-24 pt-12 sm:px-8 md:pt-20 lg:px-12">
        <h2
          id="project-title"
          className="text-balance text-[clamp(2.75rem,10vw,9.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white"
        >
          {project.title}
        </h2>

        {isFilm && (
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-charcoal pt-8 md:mt-14 md:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="meta text-grey">{label}</dt>
                <dd className={`mt-2 text-base md:text-lg ${value ? 'text-white' : 'text-grey'}`}>
                  {value ?? (
                    <>
                      <span aria-hidden="true">—</span>
                      <span className="sr-only">To be added</span>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-10 md:mt-14">
          <Poster project={project} index={index} />
        </div>

        <div className="mt-12 md:mt-20">
          <Row label="Synopsis">
            {project.synopsis ? (
              <p className="max-w-3xl text-xl leading-relaxed text-white md:text-2xl md:leading-relaxed">
                {project.synopsis}
              </p>
            ) : (
              <Pending />
            )}
          </Row>

          {(isFilm || credits.length > 0) && (
            <Row label="Credits">
              {credits.length > 0 ? (
                <dl className="max-w-3xl border-t border-charcoal">
                  {credits.map((credit) => (
                    <div
                      key={`${credit.role}-${credit.name}`}
                      className="flex items-baseline justify-between gap-6 border-b border-charcoal py-3.5"
                    >
                      <dt className="meta text-grey">{credit.role}</dt>
                      <dd className="text-right text-white">{credit.name}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <Pending />
              )}
            </Row>
          )}

          <Row label="Film Stills">
            {stills.length > 0 ? (
              <Thumbs items={stills} onOpen={(i) => setLightbox({ items: stills, index: i })} />
            ) : (
              <Pending />
            )}
          </Row>

          {(isFilm || links.length > 0) && (
            <Row label="Watch">
              {links.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {links.map((link, i) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={i === 0 ? 'btn-solid' : 'btn-outline'}
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              ) : (
                <Pending>Trailer and watch link to be added.</Pending>
              )}
            </Row>
          )}
        </div>

        <div className="border-t border-charcoal pt-8">
          <button type="button" className="view-link meta" onClick={() => ref.current?.close()}>
            <span aria-hidden="true">←</span> Back to selected works
          </button>
        </div>
      </article>

      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onIndex={(i) => setLightbox({ ...lightbox, index: i })}
          onClose={() => setLightbox(null)}
        />
      )}
    </dialog>
  );
}
