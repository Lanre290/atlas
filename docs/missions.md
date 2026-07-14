# Missions

Atlas provides detailed mission data from multiple providers, normalized into a consistent schema.

## Mission Fields

| Field                  | Type       | Description                                  |
|------------------------|------------|----------------------------------------------|
| id                     | string     | Unique mission ID                            |
| name                   | string     | Mission name                                 |
| description            | string     | Description (if available)                   |
| agency                 | string     | Responsible agency (if available)            |
| leadOrganization       | string     | Lead organization (if available)             |
| target                 | string     | Target body (e.g., Mars, Jupiter)            |
| status                 | string     | Mission status (e.g., Active, Completed)     |
| launchDate             | string     | Launch date (ISO 8601, if available)         |
| endDate                | string     | End date (ISO 8601, if available)            |
| website                | string     | Official mission website (if available)      |
| principalInvestigators | string[]   | List of principal investigators              |
| sources                | string[]   | Providers contributing this mission          |

## Example
```json
{
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

> **Note:** Not all fields are available for every mission or provider.
