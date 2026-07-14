// src/models/image.ts
export interface Image {
  id: string;
  url: string;
  title?: string;
  description?: string;
  sources: string[];
}
