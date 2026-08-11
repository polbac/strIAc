import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const src = join(root, "docs");
const dest = join(root, "public", "docs");

if (!existsSync(src)) {
  console.error("Missing docs/ directory");
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("Synced docs/ → public/docs/");
