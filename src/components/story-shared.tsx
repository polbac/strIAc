"use client";

import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { exportStoryPng, STORY_H, STORY_W } from "@/lib/story";

export function useStoryLogo() {
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

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

  return logoDataUrl ?? "/brand/logo.png";
}

export function useStoryExport(fileName: string) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const exportPng = useCallback(async () => {
    const source = frameRef.current;
    if (!source) return;

    setExporting(true);
    setExportError(null);

    try {
      await exportStoryPng(source, fileName);
    } catch (err) {
      console.error(err);
      setExportError(
        err instanceof Error ? err.message : "No se pudo exportar el PNG",
      );
    } finally {
      setExporting(false);
    }
  }, [fileName]);

  return { frameRef, exporting, exportError, exportPng };
}

export function StoryPreview({
  previewScale,
  frameRef,
  children,
}: {
  previewScale: number;
  frameRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
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
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoryFrameChrome({
  logoSrc,
  eyebrow,
  children,
}: {
  logoSrc: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <>
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
        {eyebrow ? <p className="story-eyebrow">{eyebrow}</p> : null}
      </div>
      {children}
      <div className="story-frame-foot">
        <p className="story-link">strlac.xyz</p>
        <p className="story-foot-note">músicas mutantes</p>
      </div>
    </>
  );
}

function fitTextSize(
  el: HTMLElement,
  maxFontSize: number,
  minFontSize: number,
  mode: "width" | "box",
) {
  let size = maxFontSize;
  el.style.fontSize = `${size}px`;

  if (mode === "width") {
    const available = el.clientWidth;
    const needed = el.scrollWidth;
    if (needed > available && available > 0) {
      size = Math.max(minFontSize, (maxFontSize * available * 0.98) / needed);
      el.style.fontSize = `${size}px`;
    }
    return;
  }

  const parent = el.parentElement;
  const maxH = parent?.clientHeight ?? el.clientHeight;
  const maxW = parent?.clientWidth ?? el.clientWidth;
  while (
    size > minFontSize &&
    (el.scrollHeight > maxH || el.scrollWidth > maxW)
  ) {
    size -= 1;
    el.style.fontSize = `${size}px`;
  }
}

export function StoryFitText({
  children,
  className,
  maxFontSize,
  minFontSize,
  mode = "width",
}: {
  children: string;
  className?: string;
  maxFontSize: number;
  minFontSize: number;
  mode?: "width" | "box";
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const fit = () => {
      if (!cancelled) fitTextSize(el, maxFontSize, minFontSize, mode);
    };
    fit();
    void document.fonts?.ready.then(fit);
    return () => {
      cancelled = true;
    };
  }, [children, maxFontSize, minFontSize, mode]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}

export function StoryZoomField({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="story-field">
      <span>Zoom preview</span>
      <input
        type="range"
        min={0.2}
        max={0.45}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export function StoryExportButton({
  exporting,
  onClick,
  error,
}: {
  exporting: boolean;
  onClick: () => void;
  error: string | null;
}) {
  return (
    <>
      <button
        type="button"
        className="btn-primary story-export"
        onClick={onClick}
        disabled={exporting}
      >
        {exporting ? "exportando…" : "descargar PNG"}
      </button>
      {error ? <p className="story-export-error">{error}</p> : null}
    </>
  );
}
