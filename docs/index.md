# Atlas Developer Documentation

Welcome to Atlas — the unified space data platform for developers.

## What is Atlas?
Atlas is an open-source API platform that aggregates and normalizes data from leading space science providers, including NASA, JPL, and Le Système Solaire. It offers a single, consistent interface for searching, exploring, and visualizing space data.

## The Problem Atlas Solves
Space data is fragmented across many APIs, each with its own schema, quirks, and limitations. Atlas unifies these sources, providing normalized models, robust search, and multi-provider orchestration.

## Why Use Atlas?
- **Unified API:** Query multiple providers with a single request.
- **Normalized Data:** Consistent models for images, missions, planets, asteroids, and more.
- **Multi-provider Execution:** Get richer, more complete results.
- **Production-ready:** Built for reliability and extensibility.

## Core Philosophy
- **Consistency:** One schema, many sources.
- **Transparency:** Provider attribution and source tracking.
- **Extensibility:** Add new providers and domains easily.

## Supported Providers
| Provider                | Domains Supported           |
|-------------------------|----------------------------|
| NASA                    | Images, Missions, Asteroids|
| JPL                     | Asteroids                  |
| Le Système Solaire      | Planets                    |

## Supported Domains
- Images
- Missions
- Planets
- Asteroids
- Search
- Explore

## Quick Example Request

**cURL**
```sh
curl "https://api.atlas.dev/search?q=mars"
```

**JavaScript**
```js
const res = await fetch('https://api.atlas.dev/search?q=mars');
const data = await res.json();
```

**TypeScript**
```ts
import fetch from 'node-fetch';
const res = await fetch('https://api.atlas.dev/search?q=mars');
const data = await res.json();
```

---

Continue reading for Quickstart, API Reference, and more.
