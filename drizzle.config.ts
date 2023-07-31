import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
  driver: "mysql2",
  // out: "./drizzle/",
} satisfies Config;
