# 🚀 Atlas

> **The Developer Platform for Space Data.**
>
> Atlas is a domain-driven API that unifies official space data behind a single, consistent interface. Instead of integrating multiple provider-specific APIs, developers integrate Atlas once and build against a stable contract.

---

## Why Atlas?

Building applications with space data is harder than it should be.

Every provider exposes different:

- Authentication methods
- Response schemas
- Endpoint naming
- Documentation
- Pagination
- Filtering
- Error handling

A developer building a single application may need to integrate several providers independently just to answer one question.

Atlas solves this by providing one domain-driven API that abstracts provider complexity without replacing official data sources.

---

## The Problem

Imagine building a Mars exploration app.

Without Atlas:

```
Your Application

├── NASA API
├── JPL API
├── Le Système Solaire API
├── Different authentication
├── Different response models
├── Different documentation
└── Different SDKs
```

With Atlas:

```
Your Application
        │
        ▼
      Atlas
        │
 ┌──────┼────────┐
 ▼      ▼        ▼
NASA    JPL   Le Système Solaire
```

Integrate once.

Build forever.

---

# Philosophy

Atlas is **domain-driven**, not **provider-driven**.

Instead of exposing provider-specific APIs, Atlas organizes space data around concepts developers naturally understand.

Examples:

```
/planets

/images

/missions

/asteroids

/search

/explore
```

Instead of:

```
/planetary/apod

/mars-photos/api/v1

/rest/bodies
```

Developers shouldn't have to know which organization owns the data.

They should simply ask for what they need.

---

# Features

## Domain-driven API

Resources are organized around real-world space concepts instead of provider implementations.

---

## Provider Agnostic

Atlas hides provider-specific APIs behind one stable interface.

Adding or replacing providers does not require client applications to change.

---

## Official Data Sources

Atlas builds on authoritative space data from official providers instead of third-party aggregation services.

Current providers include:

- NASA
- JPL
- Le Système Solaire

Additional providers are planned.

---

## Unified Search

Search across supported providers through one endpoint.

---

## Explore

Retrieve connected information around a concept instead of manually querying multiple endpoints.

Example:

```
GET /explore/mars
```

returns related information such as:

- Images
- Missions
- Planet information

---

## Extensible Architecture

Adding a provider requires implementing the Provider interface and registering it with Atlas.

No routing changes required.

---

# Current API

## Planets

```
GET /planets

GET /planets/:id
```

---

## Images

```
GET /images

GET /images/:id
```

---

## Missions

```
GET /missions

GET /missions/:id
```

---

## Asteroids

```
GET /asteroids

GET /asteroids/:id
```

---

## Search

```
GET /search?q=mars
```

---

## Explore

```
GET /explore/:query
```

---

## Health

```
GET /health
```

---

# Architecture

```
                Request
                    │
                    ▼
                Express Route
                    │
                    ▼
               Controller Layer
                    │
                    ▼
               Query Engine
                    │
                    ▼
          Capability Registry
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
      NASA         JPL   Le Système Solaire
        │           │           │
        └───────────┼───────────┘
                    ▼
               Domain Resolver
                    │
                    ▼
             Normalized Response
```

---

# Design Principles

Atlas follows a few simple principles.

### Domain First

Endpoints represent concepts.

Not provider implementations.

---

### Stable Contracts

Client applications should not break when providers evolve.

Atlas adapts.

Clients remain unchanged.

---

### Official Sources

Atlas does not replace official APIs.

It standardizes them.

---

### Extensibility

Adding new providers should require minimal effort.

---

### Consistency

Every endpoint follows predictable request and response structures.

---

# Example

```bash
curl https://api.example.com/explore/mars
```

Response

```json
{
  "query": "mars",
  "data": {
    "planet": {},
    "missions": [],
    "images": []
  },
  "sources": [
    "NASA",
    "JPL"
  ]
}
```

---

# Tech Stack

- Node.js
- Express.js
- TypeScript

Architecture:

- Provider Registry
- Query Engine
- Resolver Layer
- Capability Registry
- Domain-driven API

---

# Roadmap

## v0.1

- [x] Images
- [x] Missions
- [x] Planets
- [x] Asteroids
- [x] Search
- [x] Explore
- [x] Multi-provider architecture

---

## v0.2

- [ ] OpenAPI Specification
- [ ] Interactive API Docs
- [ ] Provider metadata endpoint
- [ ] Response metadata
- [ ] Improved search
- [ ] Better filtering

---

## v0.3

- [ ] API Keys
- [ ] Rate Limiting
- [ ] Usage Dashboard
- [ ] SDKs
- [ ] Webhooks

---

## Future

- ESA
- Minor Planet Center
- Additional official providers
- AI-powered querying
- Intelligent provider orchestration
- Entity resolution
- Cross-provider linking

---

# Why Not Call NASA Directly?

You absolutely can.

Atlas exists to remove integration complexity.

Instead of learning multiple APIs, developers integrate once and receive:

- Consistent endpoints
- Stable response models
- Unified search
- Domain-driven resources
- Provider abstraction

Atlas is not a replacement for official providers.

It's a compatibility layer built on top of them.

---

# Contributing

Contributions are welcome.

Ideas, issues, feature requests, provider integrations, and documentation improvements are all appreciated.

---

# License

MIT License

---

# Links

Documentation

```
https://docs.atlas.dev
```

Landing Page

```
https://atlas.dev
```

API

```
https://api.atlas.dev
```

---

## Vision

Atlas aims to become the standard developer platform for official space data.

Instead of learning every space agency's API, developers should only need to learn one.

**Build on space data, not space APIs.** 🚀