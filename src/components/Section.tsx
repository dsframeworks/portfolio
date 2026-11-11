import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, index, label, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-charcoal px-5 py-20 sm:px-8 md:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-12 grid gap-5 md:mb-16 lg:mb-24 lg:grid-cols-12 lg:items-end lg:gap-8">
          <p className="meta text-grey lg:col-span-3">
            <span className="text-silver">{index}</span>
            <span className="mx-3 inline-block h-px w-8 bg-charcoal align-middle" aria-hidden="true" />
            {label}
          </p>
          <h2
            id={`${id}-title`}
            className="text-balance text-[clamp(2.5rem,7.6vw,7.25rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em] text-white lg:col-span-9"
          >
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
