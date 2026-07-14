# API Reference

Atlas exposes a RESTful API for unified access to space data. Below are all available endpoints, their usage, parameters, and example requests/responses.

---

## Search

| Method | Route           | Purpose                |
|--------|-----------------|------------------------|
| GET    | /search         | Unified entity search  |

### GET /search

**Purpose:**
Search for any entity (planet, mission, asteroid, image, etc.) across all providers.

**Parameters:**
- `q` (string, required): Search query.

**Example Request:**
```sh
curl "http://localhost:3000/search?q=mars"
```

**Example Response:**
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

**Possible Errors:**
- `400`: Missing query parameter `q`.

---

## Explore

| Method | Route           | Purpose                |
|--------|-----------------|------------------------|
| GET    | /explore/:query | Orchestrate multi-domain exploration |

### GET /explore/:query

**Purpose:**
Aggregate results from images, missions, and entities for a given query.

**Parameters:**
- `query` (string, required): Exploration topic.

**Example Request:**
```sh
curl "http://localhost:3000/explore/mars"
```

**Example Response:**
```json
{
  "query": "mars",
  "summary": "Exploration overview for 'mars'. Identified as a known entity (Mars). Associated with 2 recorded space missions.",
  "images": [/* ... */],
  "missions": [/* ... */],
  "entities": [/* ... */]
}
```

**Possible Errors:**
- `400`: Missing exploration query.

---

## Images

| Method | Route   | Purpose           |
|--------|---------|-------------------|
| GET    | /images | List/search images|

### GET /images

**Purpose:**
Retrieve images, optionally filtered by query.

**Query Parameters:**
- `q` (string, optional): Search term.

**Example Request:**
```sh
curl "http://localhost:3000/images?q=mars"
```

**Example Response:**
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

---

## Missions

| Method | Route      | Purpose                |
|--------|------------|------------------------|
| GET    | /missions  | List/search missions   |
| GET    | /missions/:id | Get mission details |

### GET /missions

**Purpose:**
List missions, optionally filtered by query, with pagination.

**Query Parameters:**
- `q` (string, optional): Search term.
- `limit` (integer, optional): Results per page (default: 20).
- `page` (integer, optional): Page number (default: 1).

**Example Request:**
```sh
curl "http://localhost:3000/missions?q=mars&limit=5&page=1"
```

**Example Response:**
```json
{
  "meta": { "page": 1, "limit": 5, "returned": 2 },
  "missions": [
    {
      "id": "mars-express",
      "name": "Mars Express",
      "description": "ESA Mars orbiter.",
      "agency": "ESA",
      "leadOrganization": "ESA",
      "target": "Mars",
      "status": "Active",
      "launchDate": "2003-06-02",
      "endDate": null,
      "website": "https://www.esa.int/Science_Exploration/Space_Science/Mars_Express",
      "principalInvestigators": ["Dr. John Doe"],
      "sources": ["NASA", "ESA"]
    }
  ]
}
```

### GET /missions/:id

**Purpose:**
Get details for a specific mission.

**Parameters:**
- `id` (string, required): Mission ID.

**Example Request:**
```sh
curl "http://localhost:3000/missions/mars-express"
```

**Example Response:**
```json
{
  "mission": {
    "id": "mars-express",
    "name": "Mars Express",
    "description": "ESA Mars orbiter.",
    "agency": "ESA",
    "leadOrganization": "ESA",
    "target": "Mars",
    "status": "Active",
    "launchDate": "2003-06-02",
    "endDate": null,
    "website": "https://www.esa.int/Science_Exploration/Space_Science/Mars_Express",
    "principalInvestigators": ["Dr. John Doe"],
    "sources": ["NASA", "ESA"]
  }
}
```

**Possible Errors:**
- `404`: Mission not found.

---

## Error Format

All errors are returned as JSON objects with an `error` field:
```json
{
  "error": "Description of the error."
}
```

---

For more endpoints and advanced usage, see the rest of the documentation.
