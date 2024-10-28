import { promises as fs } from "node:fs";
import * as path from "node:path";
import { FileMigrationProvider, type Kysely, Migrator } from "kysely";
import type { Database } from "./types";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = __dirname;

export const createMigrator = (db: Kysely<Database>) =>
  new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(BASE_DIR, "migrations"),
    }),
  });
