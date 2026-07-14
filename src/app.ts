// src/app.ts
import express from 'express';
import { createPlanetRoutes } from './api/routes/planetRoutes';
import { PlanetController } from './api/controllers/planetController';
import { createImageRoutes } from './api/routes/imageRoutes';
import { ImageController } from './api/controllers/imageController';
import { ImageResolver } from './engine/resolvers/imageResolver';
import { createAsteroidRoutes } from './api/routes/asteroidRoutes';
import { AsteroidController } from './api/controllers/asteroidController';
import { AsteroidResolver } from './engine/resolvers/asteroidResolver';
import { JplProvider } from './providers/jpl/provider';
import { createSearchRoutes } from './api/routes/searchRoutes';
import { SearchController } from './api/controllers/searchController';
import { SearchResolver } from './engine/resolvers/searchResolver';
import { QueryEngine } from './engine/query-engine/queryEngine';
import { CapabilityRegistry } from './engine/registry/capabilityRegistry';
import { PlanetResolver } from './engine/resolvers/planetResolver';
import { NasaProvider } from './providers/nasa/provider';
import { EntityResolver } from './engine/resolvers/entityResolver';
import { MissionController } from './api/controllers/missionController';
import { createMissionRoutes } from './api/routes/missionRoutes';
import { MissionResolver } from './engine/resolvers/missionResolver';
import { SolarSystemProvider } from './providers/solarSystem/provider';
import { createExploreRoutes } from './api/routes/exploreRoutes';
import { ExploreController } from './api/controllers/exploreController';



import dotenv from 'dotenv';

dotenv.config();

const app = express();

const registry = new CapabilityRegistry();
const nasaProvider = new NasaProvider();
const jplProvider = new JplProvider();
const solarSystemProvider = new SolarSystemProvider();

registry.register(nasaProvider);
registry.register(jplProvider);
registry.register(solarSystemProvider);
const queryEngine = new QueryEngine(registry);


const planetResolver = new PlanetResolver();
const planetController = new PlanetController(queryEngine, planetResolver);
app.use('/planets', createPlanetRoutes(planetController));


const imageResolver = new ImageResolver();
const imageController = new ImageController(queryEngine, imageResolver);
app.use('/images', createImageRoutes(imageController));


const asteroidResolver = new AsteroidResolver();
const asteroidController = new AsteroidController(queryEngine, asteroidResolver);
app.use('/asteroids', createAsteroidRoutes(asteroidController));


const entityResolver = new EntityResolver();
const searchController = new SearchController(queryEngine, entityResolver);
app.use('/search', createSearchRoutes(searchController));

const missionResolver = new MissionResolver();
const missionController = new MissionController(queryEngine, missionResolver);
app.use('/missions', createMissionRoutes(missionController));

const exploreController = new ExploreController(
  queryEngine,
  imageResolver,
  missionResolver,
  entityResolver
);

app.use('/explore', createExploreRoutes(exploreController));


app.get('/health', (req, res) => res.json({ status: 'ok' }));

export default app;
