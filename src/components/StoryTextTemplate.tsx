"use client";

import { useState } from "react";
import { slugifyStoryName } from "@/lib/story";
import {
  StoryExportButton,
  StoryFrameChrome,
  StoryPreview,
  StoryZoomField,
  useStoryExport,
  useStoryLogo,
} from "@/components/story-shared";

export function StoryTextTemplate() {
  const [text, setText] = useState("");
  const [previewScale, setPreviewScale] = useState(0.32);
  const logoSrc = useStoryLogo();

  const fileName = `strlac-story-${slugifyStoryName(text.split("\n")[0] ?? "") || "texto"}.png`;
  const { frameRef, exporting, exportError, exportPng } = useStoryExport(fileName);

  return (
    <div className="story-tool">
      <aside className="story-controls">
        <h1 className="story-tool-title">Story de Texto</h1>
        <p className="story-tool-lead">
          Template 1080×1920. Escribí el texto, exportá el PNG y agregá el
          sticker de link a <strong>strlac.xyz</strong>.
        </p>

        <label className="story-field">
          <span>Texto</span>
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="una idea, poco texto"
          />
        </label>

        <StoryZoomField value={previewScale} onChange={setPreviewScale} />
        <StoryExportButton
          exporting={exporting}
          onClick={exportPng}
          error={exportError}
        />

        <ol className="story-steps">
          <li>Escribir el texto</li>
          <li>Descargar PNG</li>
          <li>Subir a Instagram Stories</li>
          <li>Sticker link → https://strlac.xyz/</li>
        </ol>
      </aside>

      <StoryPreview previewScale={previewScale} frameRef={frameRef}>
        <StoryFrameChrome logoSrc={logoSrc}>
          <div className="story-text-slot">
            <p className={`story-text-body${text ? "" : " is-placeholder"}`}>
              {text || "tu texto"}
            </p>
          </div>
        </StoryFrameChrome>
      </StoryPreview>
    </div>
  );
}
