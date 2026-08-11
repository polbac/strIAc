"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/SiteChrome";
import { DOC_NAV } from "@/lib/docs";

export default function HomePage() {
  return (
    <div className="page-shell home-shell">
      <div className="atmosphere" aria-hidden />
      <SiteHeader />

      <main className="home-hero">
        <p className="home-place">Buenos Aires · net label</p>
        <h1 className="home-brand">strlac</h1>
        <p className="home-tagline">
          colectivo tecno-biológico de músicas mutantes, arte sonoro y otras
          aventuras sónicas.
        </p>
        <div className="home-cta">
          <Link href="/docs" className="btn-primary">
            abrir manual
          </Link>
          <a
            className="btn-ghost"
            href="https://strlacrecords.bandcamp.com/"
            target="_blank"
            rel="noreferrer"
          >
            escuchar
          </a>
        </div>
      </main>

      <section className="home-map" aria-label="Secciones del manual">
        {DOC_NAV.filter((d) => d.slug !== "index").map((item, i) => (
          <Link
            key={item.slug}
            href={`/docs/${item.slug}`}
            className="home-map-item"
            style={{ animationDelay: `${0.08 * i}s` }}
          >
            <span className="home-map-index">0{i + 1}</span>
            <span className="home-map-title">{item.title}</span>
            <span className="home-map-blurb">{item.blurb}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
