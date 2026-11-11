import { useEffect, useRef, type KeyboardEvent, type TouchEvent } from 'react';
import type { MediaItem } from '../lib/types';
import { pad } from '../lib/utils';

interface LightboxProps {
  items: MediaItem[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}

export default function Lightbox({ items, index, onIndex, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];
  const many = items.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const step = (delta: number) => onIndex((index + delta + items.length) % items.length);

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (!many) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null || !many) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  if (!item) return null;

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-label="Image viewer"
      onKeyDown={onKeyDown}
      onClose={(e) => {
        if (e.target === e.currentTarget && !ref.current?.open) onClose();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8 lg:px-12">
          <p className="meta text-silver" aria-live="polite">
            {pad(index + 1)} <span className="text-grey">/ {pad(items.length)}</span>
          </p>
          <button type="button" className="nav-link meta -mr-2 px-2 py-3" onClick={() => ref.current?.close()}>
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            if (e.target === e.currentTarget) ref.current?.close();
          }}
        >
          <div className="pointer-events-none absolute inset-x-5 inset-y-0 sm:inset-x-24">
            <img
              key={item.url}
              src={item.url}
              alt={item.caption ?? ''}
              className="mono lightbox-img h-full w-full object-contain"
            />
          </div>
          {many && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => step(-1)}
                className="absolute left-1 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-2xl text-silver transition-colors hover:text-white sm:left-6"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => step(1)}
                className="absolute right-1 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-2xl text-silver transition-colors hover:text-white sm:right-6"
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}
        </div>

        <p className="meta min-h-16 shrink-0 px-5 py-6 text-center text-silver">{item.caption ?? ''}</p>
      </div>
    </dialog>
  );
}
