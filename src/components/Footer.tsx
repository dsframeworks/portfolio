export default function Footer() {
  return (
    <footer className="border-t border-charcoal px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-extrabold uppercase tracking-[-0.03em] text-white">Dhruv Sharma.</p>
          <p className="meta mt-2 text-grey">Filmmaker | Aspiring Film Director</p>
        </div>
        <p className="meta text-grey">Indore, Madhya Pradesh, India</p>
        <div className="flex items-center gap-8">
          <p className="meta text-grey">© {new Date().getFullYear()}</p>
          <a href="#top" className="nav-link meta">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
