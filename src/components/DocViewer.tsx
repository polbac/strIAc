"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { DOC_NAV, docPath } from "@/lib/docs";

type Props = {
  slug: string;
};

function resolveDocHref(href: string) {
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("/")) {
    return href;
  }

  const clean = href.replace(/^\.\//, "");
  if (clean.endsWith(".md") && !clean.includes("/")) {
    const slug = clean.replace(/\.md$/, "");
    return slug === "index" ? "/docs" : `/docs/${slug}`;
  }

  return href;
}

export function DocViewer({ slug }: Props) {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const meta = DOC_NAV.find((d) => d.slug === slug);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(docPath(slug))
      .then(async (res) => {
        if (!res.ok) throw new Error(`No se pudo cargar ${slug}.md (${res.status})`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          setMarkdown(text);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const idx = DOC_NAV.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? DOC_NAV[idx - 1] : null;
  const next = idx >= 0 && idx < DOC_NAV.length - 1 ? DOC_NAV[idx + 1] : null;

  return (
    <article className="doc-viewer">
      <p className="doc-kicker">{meta?.blurb ?? "documentación"}</p>

      <div className={`doc-body ${loading ? "is-loading" : "is-ready"}`}>
        {loading && <p className="doc-status">cargando…</p>}
        {error && <p className="doc-status is-error">{error}</p>}
        {!loading && !error && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                const resolved = resolveDocHref(href || "#");
                const external = resolved.startsWith("http");
                if (external) {
                  return (
                    <a href={resolved} target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  );
                }
                return <Link href={resolved}>{children}</Link>;
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        )}
      </div>

      <footer className="doc-pager">
        {prev ? (
          <Link
            href={prev.slug === "index" ? "/docs" : `/docs/${prev.slug}`}
            className="doc-pager-link"
          >
            <span>anterior</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.slug === "index" ? "/docs" : `/docs/${next.slug}`}
            className="doc-pager-link is-next"
          >
            <span>siguiente</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </footer>
    </article>
  );
}
