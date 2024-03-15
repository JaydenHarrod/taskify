import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
