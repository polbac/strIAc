import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { loadStrlacSystemPrompt } from "@/lib/strlac-context";

const MAX_PROMPT = 4000;

export const maxDuration = 60;

function lastUserText(messages: UIMessage[]) {
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return "";
  return last.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Falta GEMINI_API_KEY en el entorno." },
      { status: 500 },
    );
  }

  let messages: UIMessage[] = [];
  try {
    const body = (await request.json()) as { messages?: UIMessage[] };
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const prompt = lastUserText(messages);
  if (!prompt) {
    return Response.json({ error: "Escribí un prompt." }, { status: 400 });
  }
  if (prompt.length > MAX_PROMPT) {
    return Response.json(
      { error: `El prompt supera ${MAX_PROMPT} caracteres.` },
      { status: 400 },
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  const system = await loadStrlacSystemPrompt();

  try {
    const result = streamText({
      model: google("gemini-3.5-flash"),
      system,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      onError: (err) =>
        err instanceof Error ? err.message : "No se pudo generar.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "No se pudo llamar a Gemini.";
    return Response.json({ error: message }, { status: 502 });
  }
}
