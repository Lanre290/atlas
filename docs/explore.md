# Explore

Atlas Explore orchestrates multi-domain queries, aggregating results from images, missions, and entities for a given topic.

## How Explore Works

- Receives a query (e.g., "mars").
- Executes image, mission, and entity searches concurrently across all providers.
- Resolves and merges results into a unified response.
- Returns a summary, images, missions, and entities.

## Example

**Request:**
```sh
curl "http://localhost:3000/explore/mars"
```

**Response:**
```json
{
  "query": "mars",
  "summary": "Exploration overview for 'mars'. Identified as a known entity (Mars). Associated with 2 recorded space missions.",
  "images": [/* ... */],
  "missions": [/* ... */],
  "entities": [/* ... */]
}
```

## Notes
- Explore is deterministic and does not use AI/ML for summarization.
- All results are attributed to their source providers.
- Useful for dashboards, educational apps, and assistants.
