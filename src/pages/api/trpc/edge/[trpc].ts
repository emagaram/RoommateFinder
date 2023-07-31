import { appRouter } from "~/server/api/root";
import {
  FetchCreateContextFn,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

export const config = {
  runtime: "edge",
  region: "pdx1",
};

const fetchCtx: FetchCreateContextFn<any> = () => ({});

export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc/edge",
    router: appRouter,
    req,
    createContext: fetchCtx,
  });
}
