"use client";

import { SiteHeader } from "@/components/SiteChrome";
import { StoryTemplate } from "@/components/StoryTemplate";

export default function StoryToolPage() {
  return (
    <div className="page-shell docs-shell">
      <div className="atmosphere atmosphere-docs" aria-hidden />
      <SiteHeader />
      <StoryTemplate />
    </div>
  );
}
