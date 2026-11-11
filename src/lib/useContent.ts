import { useCallback, useEffect, useState } from 'react';
import type { SiteContent } from './types';

// On GitHub Pages there is no serverless API, so the build reads the static
// snapshot directly (VITE_STATIC_CONTENT=true is set in the Pages workflow).
const STATIC_ONLY = import.meta.env.VITE_STATIC_CONTENT === 'true';
const BASE = import.meta.env.BASE_URL;

async function getJson(path: string): Promise<SiteContent> {
  const res = await fetch(BASE + path, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('json')) throw new Error('Unexpected response from server');
  const raw = await res.json();
  return {
    settings: raw.settings ?? {},
    about: raw.about ?? [],
    projects: raw.projects ?? [],
    skills: raw.skills ?? [],
    gallery: raw.gallery ?? [],
    breakdowns: raw.breakdowns ?? [],
    experience: raw.experience ?? [],
    tools: raw.tools ?? [],
  };
}

async function loadContent(): Promise<SiteContent> {
  if (!STATIC_ONLY) {
    try {
      return await getJson('api/content');
    } catch (err) {
      console.warn('Live content unavailable, using the static snapshot.', err);
    }
  }
  return getJson('data/content.json');
}

export interface ContentState {
  data: SiteContent | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useContent(): ContentState {
  const [data, setData] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loadContent()
      .then((content) => {
        if (!cancelled) setData(content);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { data, loading, error, retry };
}
