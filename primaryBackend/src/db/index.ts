import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import pg from "pg";

let _prismaClient: any = null;

export const prismaClient = new Proxy(
  {},
  {
    get(_target: any, prop: string | symbol) {
      if (!_prismaClient) {
        const pool = new pg.Pool({
          connectionString: process.env.DATABASE_URL,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
        });
        const adapter = new PrismaPg(pool);
        _prismaClient = new PrismaClient({ adapter });
      }
      return Reflect.get(_prismaClient, prop);
    },
  }
) as any;
