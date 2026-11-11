import { useState } from 'react';
import type { ContentState } from '../lib/useContent';
import type { Settings } from '../lib/types';
import { asset } from '../lib/utils';

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-4 w-4 border-white ${className}`} />;
}

/** Shown until a portrait cutout is set in settings.portrait_url. */
function PortraitFrame() {
  return (
    <div
      role="img"
      aria-label="Portrait frame. Photograph to be added."
      className="portrait-in absolute inset-0 flex justify-end pb-6 pt-4 wide:pb-36 wide:pl-[30%] wide:pr-8 wide:pt-[15svh] lg:pr-12"
    >
      <div className="relative h-full w-[58%] border border-charcoal wide:w-full">
        <Corner className="-left-px -top-px border-l border-t" />
        <Corner className="-right-px -top-px border-r border-t" />
        <Corner className="-bottom-px -left-px border-b border-l" />
        <Corner className="-bottom-px -right-px border-b border-r" />
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-charcoal" />
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-6 w-px -translate-y-1/2 bg-charcoal" />
        <span className="meta absolute left-3 top-3 text-silver">Portrait</span>
        <span className="meta absolute bottom-3 left-3 right-3 text-grey">Photograph to be added</span>
      </div>
    </div>
  );
}

function Socials({ settings, className }: { settings: Settings; className: string }) {
  const links = [
    { label: 'Instagram', href: settings.instagram_url || null },
    { label: 'YouTube', href: settings.youtube_url || null },
    { label: 'Email', href: settings.email ? `mailto:${settings.email}` : null },
  ];
  return (
    <ul className={className} aria-label="Social links">
      {links.map((link) => (
        <li key={link.label}>
          {link.href ? (
            <a
              href={link.href}
              className="nav-link meta"
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ) : (
            <span className="meta text-grey" title="Link to be added">
              {link.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Hero({ state }: { state: ContentState }) {
  const [failed, setFailed] = useState(false);
  const settings = state.data?.settings;
  const portrait = settings?.portrait_url && !failed ? settings.portrait_url : null;
  // Once loading has settled, fall back to the frame if there is no usable portrait.
  const showFrame = !portrait && !state.loading;

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-[max(100svh,600px)] flex-col overflow-hidden px-5 sm:px-8 lg:px-12"
    >
      {/* Portrait — right side on desktop, layered behind the name on mobile */}
      <div className="relative mt-16 min-h-[30svh] flex-1 wide:absolute wide:inset-y-0 wide:right-0 wide:mt-0 wide:min-h-0 wide:w-[50vw]">
        {portrait && (
          <div className="portrait-in portrait-mask absolute -inset-x-5 -bottom-36 top-0 sm:-inset-x-8 wide:inset-x-0 wide:bottom-0 wide:top-[5svh]">
            <img
              src={asset(portrait)}
              alt="Portrait of Dhruv Sharma"
              fetchPriority="high"
              decoding="async"
              onError={() => setFailed(true)}
              className="portrait-img h-full w-full object-contain object-bottom"
            />
          </div>
        )}
        {showFrame && <PortraitFrame />}
      </div>

      {/* Typography */}
      <div className="relative z-10 pb-6 before:absolute before:-inset-x-5 before:-top-24 before:bottom-0 before:-z-10 before:bg-linear-to-t before:from-black before:via-black/70 before:to-transparent wide:mt-auto wide:pb-10 wide:pt-28 wide:before:hidden">
        <p className="meta hero-fade text-silver" style={{ animationDelay: '520ms' }}>
          Filmmaker <span className="mx-1 text-grey">/</span> Aspiring Film Director
        </p>

        <h1 className="hero-name mt-4 uppercase text-white wide:mt-6">
          <span className="hero-line">
            <span>Dhruv</span>
          </span>
          <span className="hero-line">
            <span style={{ animationDelay: '130ms' }}>Sharma.</span>
          </span>
        </h1>

        <p
          className="hero-fade mt-5 max-w-[24ch] text-lg leading-snug text-silver wide:mt-8 wide:text-2xl"
          style={{ animationDelay: '680ms' }}
        >
          “Stories begin long before the camera rolls.”
        </p>

        {settings && <Socials settings={settings} className="hero-fade mt-6 flex gap-6 wide:hidden" />}

        <div
          className="hero-fade mt-7 flex items-center justify-between gap-6 wide:mt-14 wide:max-w-[52vw]"
          style={{ animationDelay: '820ms' }}
        >
          <p className="meta flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            Indore, India
            <span className="text-grey">22.7196° N, 75.8577° E</span>
          </p>
          <a href="#about" className="nav-link meta hidden wide:inline-block">
            Scroll <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {settings && (
        <Socials
          settings={settings}
          className="hero-fade absolute bottom-10 right-8 z-20 hidden flex-col items-end gap-2.5 wide:flex lg:right-12"
        />
      )}
    </section>
  );
}
