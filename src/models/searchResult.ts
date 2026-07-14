// src/models/searchResult.ts
export interface SearchResult {
  type: string; // e.g., 'image', 'asteroid', etc.
  id: string;
  title: string;
  thumbnailUrl?: string;
  url?: string;
  source: string;
}