import type { ReactNode } from 'react';
import type { ContentState } from '../lib/useContent';
import type { SiteContent } from '../lib/types';

interface ContentGateProps {
  state: ContentState;
  rows?: number;
  children: (content: SiteContent) => ReactNode;
}

/** Shows a skeleton while content loads, an error with retry if it fails, otherwise the section body. */
export default function ContentGate({ state, rows = 3, children }: ContentGateProps) {
  if (state.data) return <>{children(state.data)}</>;

  if (state.loading) {
    return (
      <div role="status" className="space-y-5">
        <span className="sr-only">Loading content…</span>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="skeleton h-7" style={{ width: `${88 - i * 17}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div role="alert" className="border border-charcoal p-6 sm:p-8">
      <p className="font-bold text-white">This section couldn’t be loaded.</p>
      <p className="mt-2 text-sm text-grey">{state.error ?? 'Please try again.'}</p>
      <button type="button" onClick={state.retry} className="btn-outline mt-6">
        Try again
      </button>
    </div>
  );
}
