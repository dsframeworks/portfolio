import type { ContentState } from '../lib/useContent';
import ContentGate from './ContentGate';
import Reveal from './Reveal';
import Section from './Section';

export default function About({ state }: { state: ContentState }) {
  return (
    <Section id="about" index="01" label="Bio" title="About Me">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="max-w-[16ch] text-balance text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl lg:sticky lg:top-28 lg:text-5xl">
            I tell stories through the language of cinema.
          </p>
        </Reveal>

        <div className="lg:col-span-7">
          <ContentGate state={state} rows={5}>
            {({ about }) => (
              <div className="border-t border-charcoal">
                {about.map((block, i) => (
                  <Reveal
                    key={block.id}
                    delay={Math.min(i, 3) * 60}
                    className="grid gap-3 border-b border-charcoal py-7 sm:grid-cols-[11rem_1fr] sm:gap-8 md:py-9"
                  >
                    <h3 className="meta pt-1.5 text-grey">{block.label}</h3>
                    <p
                      className={
                        i === 0
                          ? 'text-xl leading-relaxed text-white md:text-2xl md:leading-relaxed'
                          : 'text-base leading-relaxed text-silver md:text-lg md:leading-relaxed'
                      }
                    >
                      {block.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            )}
          </ContentGate>
        </div>
      </div>
    </Section>
  );
}
