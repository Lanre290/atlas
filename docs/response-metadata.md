# Response Metadata

Atlas responses include metadata for transparency and traceability.

## Provider Attribution
- Every entity, image, or mission includes a `sources` field listing contributing providers.

## Execution Metadata
- Some endpoints (e.g., missions list) include a `meta` object with pagination info:

```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "returned": 5
  },
  "missions": [/* ... */]
}
```

## Source Tracking
- The `originalResults` field (for entities) contains raw provider payloads for debugging and auditing.

> **Note:** Use metadata to display attribution, debug issues, or implement advanced features like provenance tracking.
