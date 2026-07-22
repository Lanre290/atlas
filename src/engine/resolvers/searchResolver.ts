import { SearchResult } from '../../models/searchResult';

export class SearchResolver {
  // Merges and deduplicates search results
  resolve(resultsArr: (SearchResult[] | null)[]): SearchResult[] {
    const all = resultsArr.flat().filter(Boolean) as SearchResult[];
    const seen = new Set();
    return all.filter(r => {
      const key = `${r.type}:${r.title}:${r.source}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}
