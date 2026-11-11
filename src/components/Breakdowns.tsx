import type { ContentState } from '../lib/useContent';
import type { VideoBreakdown } from '../lib/types';
import { pad } from '../lib/utils';
import ContentGate from './ContentGate';
import Reveal from './Reveal';
import Section from './Section';

function VideoCard({ item, index }: { item: VideoBreakdown; index: number }) {
  const thumbnail =
    item.thumbnail_url || `https://i.ytimg.com/vi/${item.youtube_id}/hqdefault.jpg`;
  const url = `https://www.youtube.com/watch?v=${item.youtube_id}`;

  return (
    <Reveal delay={(index % 3) * 80}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={`Watch breakdown: ${item.title}`}
      >
        <div className="relative aspect-video w-full overflow-hidden border border-charcoal bg-black">
          <img
            src={thumbnail}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale contrast-110 brightness-95 transition-all duration-700 ease-cine group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:brightness-105"
          />

          {/* Centered Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-black/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <svg
                className="ml-0.5 h-5 w-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>

          {/* Video Badge */}
          <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
            YouTube ↗
          </span>
        </div>

        <div className="mt-3.5">
          <div className="meta flex items-center justify-between gap-3 text-grey">
            <span>{pad(index + 1)} — {item.topic ?? 'Breakdown'}</span>
          </div>
          <h3 className="mt-1.5 text-base font-medium leading-snug text-white transition-colors duration-300 group-hover:text-silver">
            {item.title}
          </h3>
        </div>
      </a>
    </Reveal>
  );
}

export default function Breakdowns({ state }: { state: ContentState }) {
  const channelUrl = state.data?.settings.youtube_url || 'https://youtube.com/@fusiononyoutube';

  return (
    <Section
      id="breakdowns"
      index="05"
      label="Studies"
      title="Filmmaking Breakdowns I Did"
    >
      <ContentGate state={state} rows={3}>
        {({ breakdowns }) => {
          const list = breakdowns ?? [];
          return (
            <div>
              {list.length === 0 ? (
                <p className="text-grey">Breakdowns will be added here.</p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {list.map((item, i) => (
                    <VideoCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              )}

              <Reveal delay={150} className="mt-12 flex justify-end border-t border-charcoal pt-8">
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-silver hover:text-white"
                >
                  <span>Explore all breakdowns on @fusiononyoutube</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            </div>
          );
        }}
      </ContentGate>
    </Section>
  );
}
