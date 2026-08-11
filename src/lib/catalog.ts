export type CatalogRelease = {
  id: string;
  title: string;
  artist: string;
  bandcamp?: string;
  web?: string;
};

/** Mirror de docs/catalogo.md — actualizar juntos. */
export const CATALOG: CatalogRelease[] = [
  { id: "calato-8", title: "Calato + 8 Compositorxs", artist: "Calato" },
  { id: "litoralennials", title: "Litoralennials", artist: "Latigx" },
  { id: "trifasica", title: "Trifasica", artist: "Javier Areal Vélez" },
  {
    id: "vol-i",
    title: "Strlac Vol I",
    artist: "various artists",
    web: "https://vol1.strlac.xyz/",
  },
  { id: "intermonte", title: "Intermonte", artist: "Cecilia Castro" },
  {
    id: "inframundo",
    title: "INFRAMUNDO",
    artist: "POLBAC",
    web: "https://github.com/polbac/inframundo",
  },
  { id: "indio-cruz", title: "Soy el indio/Soy la cruz", artist: "Latigx" },
  { id: "asno", title: "EL ASNO DE ORO", artist: "NIXON" },
  { id: "lamuertnatural", title: "LAMUERTENATURAL", artist: "FKT" },
];
