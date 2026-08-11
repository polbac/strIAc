"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { SiteHeader, DocsNav } from "@/components/SiteChrome";
import { DocViewer } from "@/components/DocViewer";
import { DOC_NAV } from "@/lib/docs";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function DocsSlugPage({ params }: Props) {
  const { slug } = use(params);
  const exists = DOC_NAV.some((d) => d.slug === slug && d.slug !== "index");

  if (!exists) {
    notFound();
  }

  return (
    <div className="page-shell docs-shell">
      <div className="atmosphere atmosphere-docs" aria-hidden />
      <SiteHeader />
      <div className="docs-layout">
        <DocsNav />
        <DocViewer slug={slug} />
      </div>
    </div>
  );
}
