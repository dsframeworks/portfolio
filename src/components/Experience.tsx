import type { ReactNode } from 'react';
import type { ContentState } from '../lib/useContent';
import type { ExperienceItem } from '../lib/types';
import { pad } from '../lib/utils';
import ContentGate from './ContentGate';
import Reveal from './Reveal';
import Section from './Section';

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-5 border-t border-charcoal py-9 md:py-12 lg:grid-cols-12 lg:gap-8">
      <h3 className="meta pt-1.5 text-grey lg:col-span-3">{label}</h3>
      <div className="lg:col-span-9">{children}</div>
    </Reveal>
  );
}

function Entries({ items }: { items: ExperienceItem[] }) {
  if (items.length === 0) return <p className="text-grey">To be added.</p>;
  return (
    <ul className="space-y-8">
      {items.map((item) => {
        const sub = [item.organisation, item.period].filter(Boolean).join(' — ');
        return (
          <li key={item.id}>
            <p className="text-2xl font-bold leading-tight tracking-[-0.03em] text-white md:text-4xl">{item.title}</p>
            {sub && <p className="meta mt-3 text-silver">{sub}</p>}
            {item.description && (
              <p className="mt-4 max-w-2xl leading-relaxed text-silver md:text-lg md:leading-relaxed">
                {item.description}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Experience({ state }: { state: ContentState }) {
  return (
    <Section id="experience" index="06" label="Background" title="Experience & Tools">
      <ContentGate state={state} rows={4}>
        {({ experience, tools }) => (
          <div className="border-b border-charcoal">
            <Group label="Education">
              <Entries items={experience.filter((e) => e.kind === 'education')} />
            </Group>
            <Group label="Project Experience">
              <Entries items={experience.filter((e) => e.kind === 'project')} />
            </Group>
            <Group label="Software">
              {tools.length === 0 ? (
                <p className="text-grey">To be added.</p>
              ) : (
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
                  {tools.map((tool, i) => (
                    <li key={tool.id} className="border-l border-charcoal pl-5">
                      <span className="meta block text-grey" aria-hidden="true">
                        {pad(i + 1)}
                      </span>
                      <span className="mt-2 block text-xl font-bold leading-tight tracking-[-0.02em] text-white md:text-2xl">
                        {tool.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Group>
          </div>
        )}
      </ContentGate>
    </Section>
  );
}
