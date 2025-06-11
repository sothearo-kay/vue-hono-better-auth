import { Hono } from "hono";
import type { AuthType } from "./auth";

export function createRouter() {
  return new Hono<{ Variables: AuthType }>({
    strict: false,
  });
}

export default function createApp() {
  const app = createRouter();

  return app;
}
