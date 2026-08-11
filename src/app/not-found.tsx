"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="atmosphere" aria-hidden />
      <SiteHeader />
      <main className="home-hero">
        <p className="home-place">404</p>
        <h1 className="home-brand" style={{ fontSize: "clamp(3rem, 12vw, 6rem)" }}>
          fuera de catálogo
        </h1>
        <p className="home-tagline">Esa ruta no existe en el manual strlac.</p>
        <div className="home-cta">
          <Link href="/docs" className="btn-primary">
            volver al manual
          </Link>
        </div>
      </main>
    </div>
  );
}
