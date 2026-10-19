export type ArticlePlatform =
  | 'substack'
  | 'instagram'
  | 'linkedin'
  | 'medium'
  | 'other';

export interface ArticleThumbnail {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string; // ISO date 'YYYY-MM-DD'
  platform: ArticlePlatform;
  url: string;
  thumbnail?: ArticleThumbnail;
  tags: string[];
}

// [TODO: owner to supply existing article links]
export const articlesData: Article[] = [];
