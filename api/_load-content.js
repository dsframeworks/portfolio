// Shared content loader. Used by the /api/content serverless route and by
// scripts/sync-content.mjs (which writes the static snapshot for GitHub Pages).

const TABLES = [
  ['about', 'about_blocks'],
  ['projects', 'projects'],
  ['skills', 'skills'],
  ['gallery', 'gallery'],
  ['experience', 'experience'],
  ['tools', 'tools'],
];

export async function loadContent(supabase) {
  const [settingsRes, ...listRes] = await Promise.all([
    supabase.from('site_settings').select('*'),
    ...TABLES.map(([, table]) =>
      supabase.from(table).select('*').order('sort_order', { ascending: true }).order('id', { ascending: true })
    ),
  ]);

  if (settingsRes.error) throw settingsRes.error;
  const settings = {};
  for (const row of settingsRes.data ?? []) settings[row.key] = row.value;

  const content = { settings };
  listRes.forEach((res, i) => {
    if (res.error) throw res.error;
    content[TABLES[i][0]] = res.data ?? [];
  });
  return content;
}
