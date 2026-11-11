import type { ContentState } from '../lib/useContent';
import { pad } from '../lib/utils';
import ContentGate from './ContentGate';
import Reveal from './Reveal';
import Section from './Section';

export default function Practice({ state }: { state: ContentState }) {
  return (
    <Section id="practice" index="04" label="Craft" title="My Creative Practice">
      <ContentGate state={state} rows={5}>
        {({ skills }) => (
          <ol className="grid border-b border-charcoal md:grid-cols-2 md:gap-x-14">
            {skills.map((skill, i) => (
              <li key={skill.id}>
                <Reveal
                  delay={(i % 2) * 70}
                  className="flex items-baseline gap-5 border-t border-charcoal py-5 md:py-6"
                >
                  <span className="meta w-7 shrink-0 text-grey" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1 text-2xl font-bold leading-tight tracking-[-0.03em] text-white md:text-3xl">
                    {skill.name}
                  </span>
                  {skill.phase && <span className="meta hidden shrink-0 text-grey sm:block md:hidden lg:block">{skill.phase}</span>}
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </ContentGate>
    </Section>
  );
}
