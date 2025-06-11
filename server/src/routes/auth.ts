import { createRouter } from "@/lib/create-app";
import { auth } from "@/lib/auth";

const router = createRouter();

router.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default router;
