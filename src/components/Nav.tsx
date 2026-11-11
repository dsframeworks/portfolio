import { useEffect, useState, type MouseEvent } from 'react';
import { pad } from '../lib/utils';

const LINKS = [
  { label: 'Bio', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Breakdowns', href: '#breakdowns' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile menu and close it with Escape.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    document.getElementById('page')?.toggleAttribute('inert', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Never leave the menu open when the layout switches to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const goFromMenu = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', href);
    });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled && !open ? 'border-charcoal bg-black' : 'border-transparent'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8 lg:px-12">
          <nav aria-label="Primary" className="hidden w-full items-center justify-between md:flex">
            <ul className="flex gap-10">
              {LINKS.slice(0, 2).map((link) => (
                <li key={link.href} className="flex">
                  <a href={link.href} className="nav-link meta">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="nav-link meta">
              Contact
            </a>
          </nav>

          <a
            href="#top"
            aria-label="Dhruv Sharma, back to top"
            className="text-sm font-extrabold tracking-[-0.02em] text-white md:hidden"
          >
            DS.
          </a>
          <button
            type="button"
            className="-mr-3 flex h-12 w-12 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-500 ease-cine ${
                  open ? 'translate-y-[5.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-500 ease-cine ${
                  open ? '-translate-y-[5.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-black px-5 pb-8 pt-28 transition-[opacity,visibility] duration-500 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="border-t border-charcoal">
            {LINKS.map((link, i) => (
              <li key={link.href} className="overflow-hidden border-b border-charcoal">
                <a
                  href={link.href}
                  onClick={(e) => goFromMenu(e, link.href)}
                  className={`flex items-baseline justify-between py-5 text-[15vw] font-extrabold uppercase leading-none tracking-[-0.045em] text-white transition-transform duration-700 ease-cine ${
                    open ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
                >
                  <span>{link.label}</span>
                  <span className="meta text-grey" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-end justify-between">
          <p className="meta text-grey">
            Filmmaker
            <br />
            Aspiring Film Director
          </p>
          <p className="meta text-grey">Indore, India</p>
        </div>
      </div>
    </>
  );
}
