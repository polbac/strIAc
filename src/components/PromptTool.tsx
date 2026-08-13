"use client";

import { useMemo } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";

export function PromptTool() {
  const transport = useMemo(
    () => new AssistantChatTransport({ api: "/api/prompt" }),
    [],
  );
  const runtime = useChatRuntime({ transport });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="prompt-tool">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}
