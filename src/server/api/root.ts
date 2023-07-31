import { edgeRouter } from "~/server/api/routers/edge";
import { createTRPCRouter } from "~/server/api/trpc";
import { lambdaRouter } from "./routers/lambda";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  edge: edgeRouter,
  lambda: lambdaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
