"use client";

import { useState } from "react";
import { CATALOG } from "@/lib/catalog";
import { slugifyStoryName } from "@/lib/story";
import {
  StoryExportButton,
  StoryFrameChrome,
  StoryPreview,
  StoryZoomField,
  useStoryExport,
  useStoryLogo,
} from "@/components/story-shared";

export function StoryTemplate() {
  const [releaseId, setReleaseId] = useState(CATALOG[0]?.id ?? "");
  const selected = CATALOG.find((r) => r.id === releaseId) ?? CATALOG[0];

  const [artist, setArtist] = useState(selected?.artist ?? "");
  const [title, setTitle] = useState(selected?.title ?? "");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(0.32);

  const logoSrc = useStoryLogo();

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

  const fileName = `strlac-story-${slugifyStoryName(`${artist}-${title}`) || "catalogo"}.png`;
  const { frameRef, exporting, exportError, exportPng } = useStoryExport(fileName);

  return (
    <div className="story-tool">
      <aside className="story-controls">
        <p className="docs-nav-label">mantenimiento · 2× semana</p>
        <h1 className="story-tool-title">Story de Release</h1>
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

        <StoryZoomField value={previewScale} onChange={setPreviewScale} />
        <StoryExportButton
          exporting={exporting}
          onClick={exportPng}
          error={exportError}
        />

        <ol className="story-steps">
          <li>Descargar PNG</li>
          <li>Subir a Instagram Stories</li>
          <li>Sticker link → https://strlac.xyz/</li>
          <li>Publicar (rotar catálogo)</li>
        </ol>
      </aside>

      <StoryPreview previewScale={previewScale} frameRef={frameRef}>
        <StoryFrameChrome logoSrc={logoSrc} eyebrow="del catálogo">
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
        </StoryFrameChrome>
      </StoryPreview>
    </div>
  );
}
