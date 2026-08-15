export type DocNavItem = {
  slug: string;
  title: string;
  blurb: string;
};

export const DOC_NAV: DocNavItem[] = [
  {
    slug: "index",
    title: "Índice",
    blurb: "Mapa de la documentación",
  },
  {
    slug: "identidad",
    title: "Identidad",
    blurb: "Qué es strlac, naming, principios",
  },
  {
    slug: "voz",
    title: "Voz y copy",
    blurb: "Tono, ejemplos, plantillas",
  },
  {
    slug: "visual",
    title: "Identidad visual",
    blurb: "Gráficos, formatos, prompts",
  },
  {
    slug: "catalogo",
    title: "Catálogo",
    blurb: "Releases y patrones",
  },
  {
    slug: "workflows",
    title: "Workflows",
    blurb: "Contacto → construcción → outputs",
  },
  {
    slug: "mantenimiento",
    title: "Mantenimiento",
    blurb: "Stories, newsletter y tareas recurrentes",
  },
  {
    slug: "radio",
    title: "Radio",
    blurb: "Loop + invocaciones · servidor propio",
  },
  {
    slug: "taller-escucha-mutante",
    title: "Taller",
    blurb: "Sistemas de Escucha Mutante · nodo doméstico",
  },
  {
    slug: "automatizacion",
    title: "Automatización",
    blurb: "Unidades a automatizar",
  },
  {
    slug: "networking",
    title: "Networking",
    blurb: "Sellos, colectivos y nodos afines",
  },
];

export function docPath(slug: string) {
  return `/docs/${slug}.md`;
}
