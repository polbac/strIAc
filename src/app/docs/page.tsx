"use client";

import { AppChrome } from "@/components/SiteChrome";
import { DocViewer } from "@/components/DocViewer";

export default function DocsIndexPage() {
  return (
    <AppChrome>
      <DocViewer slug="index" />
    </AppChrome>
  );
}
