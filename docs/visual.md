# Identidad visual

Guía para covers, posts, micrositios, scores y cualquier gráfico del sello o de un release.

Tokens vivos (WIP): [`../brand/tokens.yaml`](../brand/tokens.yaml)  
Hasta que estén definidos, **no inventar** paleta ni tipografías: preguntar o basarse en referencias del release.

## Principios

1. **Una composición**, no un dashboard de marketing.
2. **Nombre del release o del sello** como señal fuerte — no esconderlo en un eyebrow.
3. **Ancla real:** textura, score, captura de proceso, foto de objeto (polaroid, cable, pantalla), paisaje — no solo gradient abstracto.
4. **Atmósfera tecno-biológica:** materia viva + sistema (membrana, red, ruido, organismo, interfaz). No sci-fi púrpura genérico.
5. **Tipografía con carácter.** Evitar Inter, Roboto, Arial o system como display.
6. **Sin clutter:** no pills, badges flotantes, stat strips ni stickers promo sobre el arte.

## Anti-looks

Prohibidos salvo pedido explícito:

- Gradiente púrpura → índigo sobre blanco
- Cream (#F4F1EA) + serif display + terracotta
- Glow neon / glassmorphism genérico
- Cards con sombra multi-capa en el hero
- Collage “AI album cover” sin relación al proceso del release

## Formatos

| Uso | Ratio | Notas |
|-----|-------|--------|
| Cover Bandcamp | 1:1 | Título legible a thumbnail (~100px) |
| Story / IG | 9:16 | Una idea, poco texto |
| Banner / OG | ~3:1 o full-bleed | strlac.xyz / micrositio |
| Partitura gráfica | libre | Puede ser el arte principal |
| Objeto físico | foto / doc | Polaroids, merch limitado |

## Idioma en piezas

- Español por defecto en piezas locales
- Si el release es bilingüe: un idioma por pieza, o ES dominante / EN secundario
- Evitar paredes de texto dual

## Prompt-frame (generación de gráficos)

```text
Artwork for strlac records release “[TÍTULO]” by [ARTISTA].
Context: [1 frase del concepto / capas: web, live, score, polaroid…].
Visual direction: techno-biological, mutant, material — [textura/objeto concreto].
Composition: single full-bleed plane; brand/release title as hero-level signal.
Typography: expressive, non-default; integrate title into the image.
Avoid: purple gradients, neon glow, generic AI surreal faces, floating badges, cream-terracotta editorial cliché.
Mood: [preciso / abrasivo / territorial / clínico / nocturno…].
Output: [cover 1:1 | story 9:16 | banner | score graphic].
```

## Mini-flujo de generación

1. Leer intake del release + esta guía + `brand/tokens.yaml`
2. Elegir formato
3. Definir ancla material (qué se ve que no sea abstracto vacío)
4. Armar prompt con el frame de arriba
5. Generar y revisar legibilidad del título a tamaño thumbnail
6. Si el look falla: quitar glow/púrpura/cards; reforzar materia + tipografía

## Relación sello / artista

No sobreescribir la identidad visual de un artista con la del sello sin pedirlo. El sello aporta marco; el release puede traer su propio sistema gráfico.
