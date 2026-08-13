# Automatización

Mapa de unidades a automatizar. El skill de Cursor y futuros scripts deben basarse en [`docs/`](index.md), el proceso de [`workflows.md`](workflows.md), el networking de [`networking.md`](networking.md) y [`brand/tokens.yaml`](../brand/tokens.yaml).

## Alineado al proceso de release

| Fase | Qué automatizar más adelante |
|------|------------------------------|
| Input (contacto) | Ficha de candidato / CRM liviano |
| Construcción conjunta | `intake.yaml` compartido sello↔artista |
| Output digital | copy Bandcamp, prompts de cover, metadatos |
| Output web expandida | scaffold de micrositio |
| Output físico | checklist de producción + ficha del objeto |
| Evento (opcional) | capsule de difusión |
| Cierre | sync a `docs/catalogo.md` |
| Mantenimiento | stories 2× semana vía `/tools/story`; newsletter (contenido TBD) |
| Radio | servidor propio (Navidrome candidato); loop + invocaciones |

## Unidades previstas

| Unidad | Input | Output | Prioridad sugerida |
|--------|-------|--------|--------------------|
| `contacto → ficha` | origen + refs | ficha de candidato | media |
| `intake → markdown` | checklist de intake | copy Bandcamp ES/EN | alta |
| `intake → image prompts` | intake + visual + tokens | prompts por formato | alta |
| `intake → web stub` | alcance web expandida | scaffold micrositio | alta |
| `intake → físico checklist` | objeto + tirada | lista de producción | media |
| `release → social pack` | copy + cover (+ evento?) | captions + recortes | media |
| `story → png` | release + cover | story 1080×1920 lista | alta |
| `newsletter → draft` | secciones definidas + intake | HTML/markdown del mail | baja (bloquear hasta definir contenido) |
| `radio → loop playlist` | catálogo / selección | playlist Navidrome (o equiv.) | media |
| `radio → invocación stub` | brief artista + ventana | checklist + página al aire | baja |
| `catalog sync` | Bandcamp / carpeta local | `docs/catalogo.md` + `src/lib/catalog.ts` | media |

## Reglas

1. **Docs primero.** Cualquier automatización lee esta documentación; no hardcodear voz ni visual en scripts.
2. **Sin secretos en el repo.** Tokens de Bandcamp, APIs, passwords → variables de entorno / secret store.
3. **No inventar datos.** Fechas, IDs, precios y créditos vienen del intake o de fuentes verificadas.
4. **Tres salidas por defecto.** El pipeline asume digital + web expandida + físico; el evento es flag opcional.

## Próximos pasos posibles

1. Definir `brand/tokens.yaml` (colores, tipografías, logo)
2. Crear `releases/YYYY-slug/intake.yaml` con el intake unificado de workflows
3. Empezar por `intake → markdown` o `intake → web stub`
4. Generar salidas en `out/` por cada capa

## Estructura objetivo (orientativa)

```text
releases/
  YYYY-slug/
    intake.yaml          # contacto + construcción + flags de outputs
    audio/
    assets/
    web/                 # web expandida
    physical/            # refs del objeto
    event/               # si hay evento
    out/
      bandcamp.es.md
      bandcamp.en.md
      prompts/
      social/
```
