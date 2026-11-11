// Writes public/data/content.json from the database.
// The static snapshot is what the GitHub Pages build reads (no serverless API there).
// Usage: npm run sync-content

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { loadContent } from '../api/_load-content.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(root, '.env');

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing Supabase URL or key in the environment / .env file.');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const content = await loadContent(supabase);

const out = resolve(root, 'public/data/content.json');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(content, null, 2) + '\n');

const counts = Object.entries(content)
  .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.length : Object.keys(v).length}`)
  .join(', ');
console.log(`Wrote public/data/content.json (${counts})`);
