import { useState } from 'react';
import { useContent } from './lib/useContent';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Filmography from './components/Filmography';
import Practice from './components/Practice';
import Breakdowns from './components/Breakdowns';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDialog from './components/ProjectDialog';

export default function App() {
  const state = useContent();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const projects = state.data?.projects ?? [];
  const activeIndex = activeSlug ? projects.findIndex((p) => p.slug === activeSlug) : -1;

  return (
    <>
      <a href="#about" className="skip-link meta">
        Skip to content
      </a>
      <Nav />
      <div id="page">
        <main>
          <Hero state={state} />
          <About state={state} />
          <Works state={state} onOpen={setActiveSlug} />
          <Filmography state={state} />
          <Practice state={state} />
          <Breakdowns state={state} />
          <Experience state={state} />
          <Contact state={state} />
        </main>
        <Footer />
      </div>

      {activeIndex >= 0 && (
        <ProjectDialog
          key={projects[activeIndex].slug}
          project={projects[activeIndex]}
          index={activeIndex}
          onClose={() => setActiveSlug(null)}
        />
      )}
    </>
  );
}
