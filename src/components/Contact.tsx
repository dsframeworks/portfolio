import type { ContentState } from '../lib/useContent';
import { asset, isExternal } from '../lib/utils';
import ContentGate from './ContentGate';
import Reveal from './Reveal';

interface Channel {
  label: string;
  value: string | null;
  href: string | null;
}

function ChannelRow({ channel }: { channel: Channel }) {
  const body = (
    <>
      <span className="meta w-24 shrink-0 text-grey">{channel.label}</span>
      <span
        className={`min-w-0 flex-1 break-words text-xl font-bold leading-tight tracking-[-0.03em] md:text-3xl ${
          channel.href ? 'text-white' : 'text-grey'
        }`}
      >
        {channel.href ? channel.value : 'To be added'}
      </span>
      {channel.href && (
        <span
          aria-hidden="true"
          className="text-xl text-silver transition-transform duration-500 ease-cine group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
        >
          ↗
        </span>
      )}
    </>
  );

  return (
    <li className="border-t border-charcoal">
      {channel.href ? (
        <a
          href={channel.href}
          className="group flex items-baseline gap-4 py-6 md:py-7"
          {...(isExternal(channel.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {body}
        </a>
      ) : (
        <div className="flex items-baseline gap-4 py-6 md:py-7">{body}</div>
      )}
    </li>
  );
}

export default function Contact({ state }: { state: ContentState }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-charcoal px-5 pb-20 pt-20 sm:px-8 md:pt-28 lg:px-12 lg:pb-28 lg:pt-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="meta text-grey">
            <span className="text-silver">07</span>
            <span className="mx-3 inline-block h-px w-8 bg-charcoal align-middle" aria-hidden="true" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-8 max-w-[12ch] text-[clamp(2.75rem,10.5vw,11rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white"
          >
            Let’s create something meaningful.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-silver md:text-xl md:leading-relaxed">
              Open to independent film projects, creative collaborations and opportunities within the direction
              department.
            </p>
            <ContentGate state={state} rows={1}>
              {({ settings }) =>
                settings.resume_url ? (
                  <a href={asset(settings.resume_url)} download className="btn-solid mt-9">
                    Download Resume <span aria-hidden="true">↓</span>
                  </a>
                ) : (
                  <p className="meta mt-9 inline-block border border-charcoal px-6 py-4 text-grey">
                    Resume to be added
                  </p>
                )
              }
            </ContentGate>
          </Reveal>

          <div className="lg:col-span-7">
            <ContentGate state={state} rows={3}>
              {({ settings }) => {
                const channels: Channel[] = [
                  {
                    label: 'Email',
                    value: settings.email ?? null,
                    href: settings.email ? `mailto:${settings.email}` : null,
                  },
                  {
                    label: 'Instagram',
                    value: settings.instagram_handle || 'Instagram',
                    href: settings.instagram_url || null,
                  },
                  {
                    label: 'YouTube',
                    value: settings.youtube_label || 'YouTube',
                    href: settings.youtube_url || null,
                  },
                ];
                return (
                  <ul className="border-b border-charcoal">
                    {channels.map((channel) => (
                      <ChannelRow key={channel.label} channel={channel} />
                    ))}
                  </ul>
                );
              }}
            </ContentGate>
          </div>
        </div>
      </div>
    </section>
  );
}
