/* eslint-disable @typescript-eslint/no-unused-vars */
import authRoute from "@/server/routes/authRoute";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app.route("/", authRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
