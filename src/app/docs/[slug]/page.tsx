"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { AppChrome } from "@/components/SiteChrome";
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
    <AppChrome>
      <DocViewer slug={slug} />
    </AppChrome>
  );
}
