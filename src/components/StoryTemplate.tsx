"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { domToBlob } from "modern-screenshot";
import { CATALOG } from "@/lib/catalog";

const STORY_W = 1080;
const STORY_H = 1920;

async function waitForImages(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }),
    ),
  );
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function StoryTemplate() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [releaseId, setReleaseId] = useState(CATALOG[0]?.id ?? "");
  const selected = CATALOG.find((r) => r.id === releaseId) ?? CATALOG[0];

  const [artist, setArtist] = useState(selected?.artist ?? "");
  const [title, setTitle] = useState(selected?.title ?? "");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(0.32);

  useEffect(() => {
    let cancelled = false;
    fetch("/brand/logo.png")
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      )
      .then((dataUrl) => {
        if (!cancelled) setLogoDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setLogoDataUrl("/brand/logo.png");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onPickRelease = (id: string) => {
    setReleaseId(id);
    const r = CATALOG.find((x) => x.id === id);
    if (r) {
      setArtist(r.artist);
      setTitle(r.title);
    }
  };

  const onCoverFile = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCoverUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const fileName = useMemo(() => {
    const slug = `${artist}-${title}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    return `strlac-story-${slug || "catalogo"}.png`;
  }, [artist, title]);

  const exportPng = useCallback(async () => {
    const source = frameRef.current;
    if (!source) return;

    setExporting(true);
    setExportError(null);

    const mount = document.createElement("div");
    mount.setAttribute("data-story-export", "true");
    mount.style.cssText = [
      "position:fixed",
      "left:-10000px",
      "top:0",
      "width:1080px",
      "height:1920px",
      "overflow:hidden",
      "pointer-events:none",
      "z-index:-1",
    ].join(";");

    const clone = source.cloneNode(true) as HTMLElement;
    clone.classList.add("is-exporting");
    clone.style.transform = "none";
    clone.style.width = `${STORY_W}px`;
    clone.style.height = `${STORY_H}px`;
    mount.appendChild(clone);
    document.body.appendChild(mount);

    try {
      await waitForImages(clone);
      // Dejar que el layout asiente el clon a tamaño real
      await new Promise((r) => requestAnimationFrame(() => r(null)));

      const blob = await domToBlob(clone, {
        width: STORY_W,
        height: STORY_H,
        scale: 1,
        backgroundColor: "#000000",
        style: {
          transform: "none",
          width: `${STORY_W}px`,
          height: `${STORY_H}px`,
        },
      });

      if (!blob) {
        throw new Error("El export devolvió vacío");
      }

      downloadBlob(blob, fileName);
    } catch (err) {
      console.error(err);
      setExportError(
        err instanceof Error ? err.message : "No se pudo exportar el PNG",
      );
    } finally {
      mount.remove();
      setExporting(false);
    }
  }, [fileName]);

  const logoSrc = logoDataUrl ?? "/brand/logo.png";

  return (
    <div className="story-tool">
      <aside className="story-controls">
        <p className="docs-nav-label">mantenimiento · 2× semana</p>
        <h1 className="story-tool-title">Story catálogo</h1>
        <p className="story-tool-lead">
          Template 1080×1920 para Instagram. Exportá el PNG y agregá el sticker
          de link a <strong>strlac.xyz</strong>.
        </p>

        <label className="story-field">
          <span>Release</span>
          <select
            value={releaseId}
            onChange={(e) => onPickRelease(e.target.value)}
          >
            {CATALOG.map((r) => (
              <option key={r.id} value={r.id}>
                {r.artist} — {r.title}
              </option>
            ))}
          </select>
        </label>

        <label className="story-field">
          <span>Artista</span>
          <input value={artist} onChange={(e) => setArtist(e.target.value)} />
        </label>

        <label className="story-field">
          <span>Título</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label className="story-field">
          <span>Cover</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onCoverFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <label className="story-field">
          <span>Zoom preview</span>
          <input
            type="range"
            min={0.2}
            max={0.45}
            step={0.01}
            value={previewScale}
            onChange={(e) => setPreviewScale(Number(e.target.value))}
          />
        </label>

        <button
          type="button"
          className="btn-primary story-export"
          onClick={exportPng}
          disabled={exporting}
        >
          {exporting ? "exportando…" : "descargar PNG"}
        </button>

        {exportError && <p className="story-export-error">{exportError}</p>}

        <ol className="story-steps">
          <li>Descargar PNG</li>
          <li>Subir a Instagram Stories</li>
          <li>Sticker link → https://strlac.xyz/</li>
          <li>Publicar (rotar catálogo)</li>
        </ol>
      </aside>

      <div className="story-preview-wrap">
        <div
          className="story-preview-scale"
          style={{
            width: STORY_W * previewScale,
            height: STORY_H * previewScale,
          }}
        >
          <div
            className="story-preview-zoom"
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: "top left",
            }}
          >
            <div
              ref={frameRef}
              className="story-frame"
              style={{
                width: STORY_W,
                height: STORY_H,
              }}
            >
              <div className="story-frame-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoSrc}
                  alt=""
                  width={120}
                  height={116}
                  className="story-logo"
                  crossOrigin="anonymous"
                />
                <p className="story-eyebrow">del catálogo</p>
              </div>

              <div className="story-cover-slot">
                {coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverUrl} alt="" className="story-cover" />
                ) : (
                  <div className="story-cover-empty">cover</div>
                )}
              </div>

              <div className="story-meta">
                <p className="story-artist">{artist || "artista"}</p>
                <p className="story-release-title">{title || "título"}</p>
              </div>

              <div className="story-frame-foot">
                <p className="story-link">strlac.xyz</p>
                <p className="story-foot-note">músicas mutantes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
