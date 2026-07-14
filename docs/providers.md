# Providers

Atlas uses a provider abstraction to unify data from multiple sources behind a consistent interface.

## Provider Abstraction
- Each provider implements a standard interface for supported domains (e.g., images, missions, planets).
- Atlas handles provider-specific quirks, authentication, and data mapping internally.
- Developers interact with a single, normalized API.

## Supported Providers

### NASA
- Domains: Images, Missions, Asteroids
- Data from NASA Open APIs

### JPL
- Domains: Asteroids
- Data from JPL Small-Body Database

### Le Système Solaire
- Domains: Planets
- Data from Le Système Solaire API

## Consistent Interface
Atlas hides provider-specific APIs, schemas, and authentication, exposing a unified developer experience.

> **Tip:** You can add new providers by implementing the Provider interface and registering it in the Capability Registry.
