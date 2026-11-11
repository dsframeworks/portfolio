import { useState } from 'react';
import type { ContentState } from '../lib/useContent';
import type { GalleryItem } from '../lib/types';
import { asset, pad } from '../lib/utils';
import ContentGate from './ContentGate';
import Lightbox from './Lightbox';
import Reveal from './Reveal';
import Section from './Section';

const RATIO = /^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/;

function Caption({ item, number }: { item: GalleryItem; number: number }) {
  return (
    <span className="meta mt-3 flex justify-between gap-4">
      <span className="text-silver">{item.caption}</span>
      <span className="hidden text-grey sm:inline" aria-hidden="true">
        {pad(number)}
      </span>
    </span>
  );
}

function Tiles({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const photos = items.filter((item) => item.image_url);
  const lightboxItems = photos.map((item) => ({ url: asset(item.image_url as string), caption: item.caption }));

  if (items.length === 0) {
    return <p className="text-grey">Photographs will be added here.</p>;
  }

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-5 lg:columns-3 lg:gap-6">
        {items.map((item, i) => {
          const ratio = item.aspect && RATIO.test(item.aspect) ? item.aspect : undefined;
          return (
            <li key={item.id} className="mb-6 break-inside-avoid sm:mb-8 lg:mb-10">
              <Reveal variant="image" delay={(i % 3) * 80}>
                {item.image_url ? (
                  <button
                    type="button"
                    className="group block w-full text-left"
                    aria-label={`Open photograph: ${item.caption}`}
                    onClick={() => setActive(photos.indexOf(item))}
                  >
                    <span className="block overflow-hidden bg-black" style={{ aspectRatio: ratio }}>
                      <img
                        src={asset(item.image_url)}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        className={`mono w-full transition-transform duration-1000 ease-cine group-hover:scale-[1.03] ${
                          ratio ? 'h-full object-cover' : 'h-auto'
                        }`}
                      />
                    </span>
                    <Caption item={item} number={i + 1} />
                  </button>
                ) : (
                  <div>
                    <div
                      className="relative border border-charcoal"
                      style={{ aspectRatio: ratio ?? '4 / 5' }}
                      role="img"
                      aria-label={`${item.caption}. Photograph to be added.`}
                    >
                      <span aria-hidden="true" className="absolute -left-px -top-px h-3 w-3 border-l border-t border-silver" />
                      <span aria-hidden="true" className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-silver" />
                      <span className="meta absolute inset-0 flex items-center justify-center px-3 text-center text-grey">
                        Photograph to be added
                      </span>
                    </div>
                    <Caption item={item} number={i + 1} />
                  </div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>

      {active !== null && lightboxItems[active] && (
        <Lightbox items={lightboxItems} index={active} onIndex={setActive} onClose={() => setActive(null)} />
      )}
    </>
  );
}

export default function Gallery({ state }: { state: ContentState }) {
  return (
    <Section id="behind-the-frame" index="05" label="Behind the Scenes" title="Behind the Frame">
      <ContentGate state={state} rows={4}>
        {({ gallery }) => <Tiles items={gallery} />}
      </ContentGate>
    </Section>
  );
}
