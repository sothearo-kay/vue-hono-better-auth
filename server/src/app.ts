import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import createApp from "@/lib/create-app";
import auth from "@/routes/auth";

const app = createApp();

app.use("*", logger());

const routes = [auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

// Serve static files (JS, CSS, assets) - this handles existing files
app.use("*", serveStatic({ root: "../client/dist" }));

// SPA fallback - only triggers if no static file found
app.get("*", serveStatic({ path: "index.html", root: "../client/dist" }));

export type AppType = (typeof routes)[number];

export default app;
