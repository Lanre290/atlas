# Examples

Explore real-world use cases for Atlas.

---

## Build a Mars Explorer

Create an interactive dashboard showing Mars images, missions, and facts.

**Example:**
```js
const res = await fetch('https://api.atlas.dev/explore/mars');
const data = await res.json();
console.log(data.images, data.missions, data.entities);
```

---

## Build an Educational App

Integrate Atlas search and explore endpoints to teach about planets and missions.

**Example:**
```js
const res = await fetch('https://api.atlas.dev/search?q=jupiter');
const data = await res.json();
console.log(data.entities);
```

---

## Build an AI Assistant

Use Atlas as a knowledge source for answering space-related questions.

**Example:**
```js
async function answer(query) {
  const res = await fetch(`https://api.atlas.dev/search?q=${encodeURIComponent(query)}`);
  return (await res.json()).entities;
}
```

---

## Build a Space Dashboard

Aggregate images, missions, and stats for any planet or asteroid.

**Example:**
```js
const res = await fetch('https://api.atlas.dev/explore/asteroid');
const data = await res.json();
console.log(data.images, data.missions);
```

> **Tip:** Use the `explore` endpoint for multi-domain aggregation.
