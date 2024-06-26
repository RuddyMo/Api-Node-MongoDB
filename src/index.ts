import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { DbConnect } from "./db";

import flipper from "./routes/flipperRoutes";
import brand from "./routes/brandsRoutes";

const app = new Hono();
await DbConnect();

const port = 3000;
console.log(`Server is running on port ${port}`);

app.route("/api", flipper);
app.route("/api", brand);

app.use("*", (c) => {
  return c.json({ msg: "404 oups" });
});

serve({
  fetch: app.fetch,
  port,
});