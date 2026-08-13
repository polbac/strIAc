import { domToBlob } from "modern-screenshot";

export const STORY_W = 1080;
export const STORY_H = 1920;

export async function waitForImages(root: HTMLElement) {
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

export function downloadBlob(blob: Blob, fileName: string) {
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

export function slugifyStoryName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export async function exportStoryPng(source: HTMLElement, fileName: string) {
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
  } finally {
    mount.remove();
  }
}
