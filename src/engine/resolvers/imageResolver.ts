// src/engine/resolvers/imageResolver.ts
import { Image } from '../../models/image';

export class ImageResolver {
  // Merges and deduplicates images from multiple providers
  resolve(imagesArr: (Image[] | null)[]): Image[] {
    const all = imagesArr.flat().filter(Boolean) as Image[];
    const seen = new Set();
    return all.filter(img => {
      if (seen.has(img.id)) return false;
      seen.add(img.id);
      return true;
    });
  }
}
