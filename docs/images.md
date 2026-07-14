# Images

Atlas aggregates images from multiple providers, normalizing metadata and supporting flexible filtering.

## Supported Filters
- `q` (string): Search term (e.g., planet, mission, keyword).

## Returned Fields
| Field       | Type     | Description                       |
|------------ |----------|-----------------------------------|
| id          | string   | Unique image ID                   |
| url         | string   | Direct image URL                  |
| title       | string   | Image title (if available)        |
| description | string   | Description (if available)        |
| sources     | string[] | Providers contributing this image |

## Image URLs
- All URLs are direct links to provider-hosted images.
- Use in `<img>` tags, dashboards, or apps.

## Example
```json
{
  "images": [
    {
      "id": "nasa-123",
      "url": "https://images.nasa.gov/mars.jpg",
      "title": "Mars Surface",
      "description": "A view of Mars.",
      "sources": ["NASA"]
    }
  ]
}
```

> **Tip:** Use the `q` filter to find images by mission, planet, or keyword.
