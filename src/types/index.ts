export interface Book {
  id: string;
  title: string;
  author: string;
  content: string;
  coverUrl: string;
  lastReadPosition: number;
  addedAt: number;
}

export interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  theme: 'light' | 'dark';
  fontFamily: string;
}