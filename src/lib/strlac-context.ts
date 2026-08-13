import { readFile } from "node:fs/promises";
import path from "node:path";

const DOC_FILES = [
  "identidad.md",
  "voz.md",
  "visual.md",
  "catalogo.md",
  "workflows.md",
  "mantenimiento.md",
  "radio.md",
  "automatizacion.md",
  "networking.md",
] as const;

let cached: string | null = null;

async function readOptional(filePath: string) {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export async function loadStrlacSystemPrompt() {
  if (cached) return cached;

  const root = process.cwd();
  const skill = await readOptional(
    path.join(root, ".cursor/skills/strlac/SKILL.md"),
  );
  const docs = await Promise.all(
    DOC_FILES.map(async (name) => {
      const text = await readOptional(path.join(root, "docs", name));
      return text ? `# ${name}\n\n${text}` : null;
    }),
  );

  const parts = [
    `Sos el redactor interno de strlac records. Respondé en español, en la voz del sello.`,
    `Seguí el skill y los docs al pie de la letra. No inventes roster, fechas, IDs, precios ni tokens visuales. Si falta un dato, decilo y pedilo.`,
    skill ? `# Skill strlac\n\n${skill}` : null,
    ...docs,
  ].filter(Boolean);

  cached = parts.join("\n\n---\n\n");
  return cached;
}
