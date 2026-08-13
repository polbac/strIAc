"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DOC_NAV } from "@/lib/docs";
import { GENERATOR_NAV } from "@/lib/generators";

function docsHref(slug: string) {
  return slug === "index" ? "/docs" : `/docs/${slug}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const inDocs = pathname.startsWith("/docs");

  return (
    <header className="site-header">
      <Link href="/" className="brand-mark" aria-label="strlac">
        <Image
          src="/brand/logo-black.png"
          alt="strlac"
          width={40}
          height={38}
          priority
        />
      </Link>
      <nav className="site-nav" aria-label="Principal">
        <Link href="/docs" className={inDocs ? "is-active" : undefined}>
          docs
        </Link>
        <Link
          href="/tools/story"
          className={pathname.startsWith("/tools") ? "is-active" : undefined}
        >
          generador
        </Link>
        <a href="https://strlacrecords.bandcamp.com/" target="_blank" rel="noreferrer">
          bandcamp
        </a>
        <a href="https://strlac.xyz/" target="_blank" rel="noreferrer">
          strlac.xyz
        </a>
      </nav>
    </header>
  );
}

export function DocsNav() {
  const pathname = usePathname();
  const inGenerator = pathname.startsWith("/tools");

  if (inGenerator) {
    return (
      <nav className="docs-nav" aria-label="Generador">
        <p className="docs-nav-label">Generador</p>
        <ul>
          {GENERATOR_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} className={active ? "is-active" : undefined}>
                  <span className="docs-nav-title">{item.title}</span>
                  <span className="docs-nav-blurb">{item.blurb}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="docs-nav" aria-label="Documentación">
      <p className="docs-nav-label">manual</p>
      <ul>
        {DOC_NAV.map((item) => {
          const href = docsHref(item.slug);
          const active =
            item.slug === "index"
              ? pathname === "/docs" || pathname === "/docs/"
              : pathname === `/docs/${item.slug}`;

          return (
            <li key={item.slug}>
              <Link href={href} className={active ? "is-active" : undefined}>
                <span className="docs-nav-title">{item.title}</span>
                <span className="docs-nav-blurb">{item.blurb}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell docs-shell">
      <div className="atmosphere atmosphere-docs" aria-hidden />
      <SiteHeader />
      <div className="docs-layout">
        <DocsNav />
        {children}
      </div>
    </div>
  );
}
