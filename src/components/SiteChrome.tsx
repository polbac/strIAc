"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_NAV } from "@/lib/docs";

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
          story
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
