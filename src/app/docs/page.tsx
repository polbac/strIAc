"use client";

import { SiteHeader, DocsNav } from "@/components/SiteChrome";
import { DocViewer } from "@/components/DocViewer";

export default function DocsIndexPage() {
  return (
    <div className="page-shell docs-shell">
      <div className="atmosphere atmosphere-docs" aria-hidden />
      <SiteHeader />
      <div className="docs-layout">
        <DocsNav />
        <DocViewer slug="index" />
      </div>
    </div>
  );
}
