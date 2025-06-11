import { Hono } from "hono";

export function createRouter() {
  return new Hono();
}

export default function createApp() {
  const app = createRouter();

  return app;
}
