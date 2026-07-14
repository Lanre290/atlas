# Quickstart

Get started with Atlas in minutes.

## Installation

Clone the repository:
```sh
git clone https://github.com/your-org/atlas.git
cd atlas
```

Install dependencies:
```sh
npm install
```

## Running Locally

Start the development server:
```sh
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:
```
PORT=3000
NASA_API_KEY=your-nasa-key
JPL_API_KEY=your-jpl-key
SOLARSYSTEM_API_KEY=your-solarsystem-key
```

## Starting the Server

```sh
npm start
```

## First API Request

**cURL**
```sh
curl "http://localhost:3000/search?q=mars"
```

**JavaScript**
```js
const res = await fetch('http://localhost:3000/search?q=mars');
const data = await res.json();
```

**TypeScript**
```ts
import fetch from 'node-fetch';
const res = await fetch('http://localhost:3000/search?q=mars');
const data = await res.json();
```

## Example Response
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
