# Demo UI

A React + Vite frontend project using TypeScript, MUI, Tailwind CSS, React Query, and Axios.

---

## Technologies Used

- React 19 + TypeScript
- Vite (build tool)
- MUI + Emotion (UI components & styling)
- Tailwind CSS (utility-first styling)
- Axios (HTTP client)
- React Query (data fetching & caching)
- UUID (unique IDs)
- Zod (runtime schema validation)

---

## Prerequisites

- Node.js v20.x or newer
- Docker
- Docker Compose

---

## Running the Frontend with Docker

### Start the development server

```bash
docker compose up
```

- Builds the container, installs dependencies, and starts the frontend dev server.

App is available at http://localhost:5173

---

## Stopping the Frontend

```bash
docker compose down
```

- Stops all running containers for the project
