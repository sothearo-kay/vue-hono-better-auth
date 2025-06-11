import { logger } from "hono/logger";
import createApp from "@/lib/create-app";
import auth from "@/routes/auth";

const app = createApp();

app.use("*", logger());

const routes = [auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
