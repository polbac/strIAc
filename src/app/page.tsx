"use client";

import { SiteHeader } from "@/components/SiteChrome";
import { PromptTool } from "@/components/PromptTool";

export default function HomePage() {
  return (
    <div className="page-shell home-shell">
      <div className="atmosphere" aria-hidden />
      <SiteHeader />
      <main className="prompt-home">
        <PromptTool />
      </main>
    </div>
  );
}
