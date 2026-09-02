"use client";

import { useState } from "react";
import { slugifyStoryName } from "@/lib/story";
import {
  StoryExportButton,
  StoryFitText,
  StoryFrameChrome,
  StoryPreview,
  StoryZoomField,
  useStoryExport,
  useStoryLogo,
} from "@/components/story-shared";

export function StoryTextTemplate() {
  const [text, setText] = useState("");
  const [previewScale, setPreviewScale] = useState(0.32);
  const [textMaxFontSize, setTextMaxFontSize] = useState(64);
  const [textYOffset, setTextYOffset] = useState(0);
  const logoSrc = useStoryLogo();

  const fileName = `strlac-story-${slugifyStoryName(text.split("\n")[0] ?? "") || "texto"}.png`;
  const { frameRef, exporting, exportError, exportPng } = useStoryExport(fileName);
  const textMinFontSize = Math.min(
    28,
    Math.max(12, Math.round(textMaxFontSize * 0.45)),
  );

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

        <label className="story-field">
          <span>Tamaño texto ({textMaxFontSize}px)</span>
          <input
            type="range"
            min={22}
            max={120}
            step={1}
            value={textMaxFontSize}
            onChange={(e) => setTextMaxFontSize(Number(e.target.value))}
          />
        </label>

        <label className="story-field">
          <span>Posición vertical ({textYOffset}px)</span>
          <input
            type="range"
            min={-720}
            max={720}
            step={10}
            value={textYOffset}
            onChange={(e) => setTextYOffset(Number(e.target.value))}
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
          <div
            className="story-text-slot"
            style={{ transform: `translateY(${textYOffset}px)` }}
          >
            <StoryFitText
              className={`story-text-body${text ? "" : " is-placeholder"}`}
              maxFontSize={textMaxFontSize}
              minFontSize={textMinFontSize}
              mode="box"
            >
              {text || "tu texto"}
            </StoryFitText>
          </div>
        </StoryFrameChrome>
      </StoryPreview>
    </div>
  );
}
