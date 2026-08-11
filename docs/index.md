# Documentación strlac

Fuente de verdad del sello: identidad, voz, visual, catálogo y flujos de trabajo.

Usar estos docs para humanos y para agentes (el skill de Cursor los lee desde aquí).

## Índice

1. [Identidad](identidad.md) — qué es strlac, naming, principios operativos
2. [Voz y copy](voz.md) — tono, ejemplos, estructura de textos
3. [Identidad visual](visual.md) — gráficos, formatos, anti-looks, prompts
4. [Catálogo](catalogo.md) — releases, artistas, patrones curatoriales
5. [Workflows](workflows.md) — proceso de release: contacto → construcción → digital / web / físico (+ evento)
6. [Mantenimiento](mantenimiento.md) — tareas recurrentes (stories 2× semana, newsletter, etc.)
7. [Radio](radio.md) — señal propia: loop + invocaciones de artistas (Navidrome / TBD)
8. [Automatización](automatizacion.md) — mapa de automatizaciones previstas

## Recursos del repo

- Tokens de marca: [`../brand/tokens.yaml`](../brand/tokens.yaml)
- Skill Cursor: [`.cursor/skills/strlac/`](../.cursor/skills/strlac/SKILL.md)

## Sitios vivos

- https://strlac.xyz/
- https://strlacrecords.bandcamp.com/
- https://vol1.strlac.xyz/

## Cómo mantener

- Cambio en el proceso de release → [workflows.md](workflows.md)
- Tareas recurrentes → [mantenimiento.md](mantenimiento.md)
- Radio / streaming → [radio.md](radio.md)
- Un release nuevo → actualizar [catalogo.md](catalogo.md) y `src/lib/catalog.ts`
- Cambio de voz/visual → [voz.md](voz.md) / [visual.md](visual.md) + `brand/tokens.yaml`
- Nuevo flujo automatizado → [automatizacion.md](automatizacion.md)
