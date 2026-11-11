export interface MediaItem {
  url: string;
  caption?: string | null;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  /** 'film' = a titled work, 'collection' = a group of works still to be itemised */
  kind: 'film' | 'collection';
  format: string | null;
  genre: string | null;
  year: number | null;
  role: string | null;
  responsibilities: string[] | null;
  synopsis: string | null;
  credits: Credit[] | null;
  poster_url: string | null;
  stills: MediaItem[] | null;
  bts: MediaItem[] | null;
  watch_url: string | null;
  trailer_url: string | null;
  sort_order: number;
}

export interface AboutBlock {
  id: number;
  label: string;
  body: string;
  sort_order: number;
}

export interface Skill {
  id: number;
  name: string;
  phase: string | null;
  sort_order: number;
}

export interface GalleryItem {
  id: number;
  caption: string;
  image_url: string | null;
  aspect: string | null;
  sort_order: number;
}

export interface VideoBreakdown {
  id: number;
  title: string;
  youtube_id: string;
  thumbnail_url?: string | null;
  topic?: string | null;
  sort_order: number;
}

export interface ExperienceItem {
  id: number;
  kind: 'education' | 'project';
  title: string;
  organisation: string | null;
  period: string | null;
  description: string | null;
  sort_order: number;
}

export interface Tool {
  id: number;
  name: string;
  sort_order: number;
}

export type Settings = Record<string, string | null | undefined>;

export interface SiteContent {
  settings: Settings;
  about: AboutBlock[];
  projects: Project[];
  skills: Skill[];
  gallery: GalleryItem[];
  breakdowns?: VideoBreakdown[];
  experience: ExperienceItem[];
  tools: Tool[];
}
