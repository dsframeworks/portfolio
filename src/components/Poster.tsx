import type { Project } from '../lib/types';
import { asset, pad } from '../lib/utils';

/**
 * Project artwork. Uses the poster / film still when one is set,
 * otherwise a typographic title card so no stand-in imagery is needed.
 */
export default function Poster({ project, index }: { project: Project; index: number }) {
  if (project.poster_url) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        <img
          src={asset(project.poster_url)}
          alt={`${project.title} — poster`}
          loading="lazy"
          decoding="async"
          className="mono h-full w-full object-cover transition-transform duration-1000 ease-cine group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // Size the title so its longest word always fits the card width.
  const longest = Math.max(...project.title.split(/\s+/).map((w) => w.length), 1);
  const size = Math.min(18, 86 / (longest * 0.7));

  return (
    <div className="@container w-full">
      <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border border-charcoal bg-black p-[5cqw] transition-colors duration-500 group-hover:border-white">
        <div className="meta flex justify-between gap-4 text-grey">
          <span>{pad(index + 1)}</span>
          <span>{project.format ?? ''}</span>
        </div>
        <p
          aria-hidden="true"
          className="font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white transition-transform duration-700 ease-cine group-hover:translate-x-[1.5cqw]"
          style={{ fontSize: `${size.toFixed(2)}cqw` }}
        >
          {project.title}
        </p>
        <div className="meta flex justify-between gap-4 text-grey">
          <span>Title card</span>
          <span>{project.year ?? ''}</span>
        </div>
      </div>
    </div>
  );
}
