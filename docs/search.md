# Search

Atlas provides a unified search endpoint that queries all supported providers and domains, returning normalized results.

## How Unified Search Works
- Accepts a search query (e.g., "mars").
- Executes the query across all providers that support search.
- Normalizes and merges results into a consistent schema.

## Normalized Response Example
```json
{
  "query": "mars",
  "entities": [
    {
      "id": "mars",
      "name": "Mars",
      "type": "planet",
      "identifiers": ["mars"],
      "sources": ["Le Système Solaire"],
      "originalResults": [/* ... */]
    }
  ]
}
```

## Notes
- All entities include provider attribution and raw source data for transparency.
- The schema is consistent regardless of provider.
- Search is ideal for building autocomplete, assistants, and discovery features.
