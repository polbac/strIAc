# Mantenimiento

Tareas recurrentes del sello (no son un release nuevo).

## Stories de catálogo (Instagram) — 2× por semana

**Objetivo:** tracción hacia el catálogo y la web.

| Campo | Valor |
|-------|--------|
| Frecuencia | **2 veces por semana** |
| Canal | Instagram Stories |
| Contenido | Discos del [catálogo](catalogo.md) |
| Destino del link | [strlac.xyz](https://strlac.xyz/) (sticker de link / menciones según el canal) |
| Template | App → [`/tools/story`](/tools/story) |

### Flujo

```text
1. Elegir un release del catálogo (rotar; no repetir el mismo seguido)
2. Abrir /tools/story → cargar cover + título/artista
3. Exportar PNG 1080×1920
4. Subir a Instagram Stories
5. Agregar sticker de link → https://strlac.xyz/
6. Publicar
```

### Checklist por story

```text
Story catálogo
- [ ] Release elegido (rotar catálogo)
- [ ] Cover legible en vertical
- [ ] Template exportado (PNG)
- [ ] Sticker link → strlac.xyz
- [ ] Publicado
- [ ] Anotar fecha / release (opcional, para no repetir)
```

### Reglas de contenido

1. **Un disco por story** (o secuencia corta del mismo release: cover → detalle → link).
2. Usar el **template** — misma familia visual, fácil de reconocer como strlac.
3. El link apunta a la **web** (`strlac.xyz`), no solo a Bandcamp (Bandcamp puede ir en el copy o en highlights).
4. Copy mínimo en la pieza: artista + título + marca. El resto va en el sticker/texto de IG si hace falta.
5. Respetar grafías del release (`Latigx`, `POLBAC`, etc.).

### Caption / texto sugerido (sticker o mensaje)

Variantes cortas:

- `del catálogo · strlac.xyz`
- `[ARTISTA] — [TÍTULO] · escucha en strlac.xyz`
- `archivo mutante · strlac.xyz`

### Template visual

Especificación fija (ver herramienta):

| Elemento | Notas |
|----------|--------|
| Formato | 1080 × 1920 (9:16) |
| Fondo | negro |
| Acento | naranja sello `#ff8f00` |
| Marca | logo strlac (arriba) |
| Centro | cover del disco |
| Bajo cover | artista + título |
| Pie | `strlac.xyz` + línea “del catálogo” |

Herramienta: **`/tools/story`**

---

## Newsletter — en definición

**Estado:** idea aprobada · **contenido a definir**.

| Campo | Valor |
|-------|--------|
| Canal | Email (newsletter) |
| Objetivo | Mantener audiencia cerca del catálogo, releases y aventuras del sello |
| Frecuencia | *TBD* |
| Nombre / subject line | *TBD* |
| Plataforma | *TBD* (strlac.xyz ya tiene captura de mail en contacto — reutilizar si sirve) |
| Idioma | ES por defecto; EN si se define audiencia internacional |
| Voz | Seguir [voz.md](voz.md) |

### Qué hay que definir

```text
Newsletter — decisiones pendientes
- [ ] Frecuencia (semanal / quincenal / por release / irregular)
- [ ] Secciones fijas del mail (ver borrador abajo)
- [ ] Nombre del boletín + tono del subject
- [ ] Plataforma de envío + lista (quién administra)
- [ ] CTA principal por envío (web / Bandcamp / evento / open call)
- [ ] Relación con stories: ¿mismo disco, otro ángulo, o independiente?
```

### Borrador de estructura (placeholder)

Usar como punto de partida hasta cerrar el contenido real:

```text
1. Apertura corta (1–3 líneas, voz strlac)
2. Spotlight de catálogo o release nuevo
3. Bloque variable — *TBD* (web expandida / físico / evento / behind the scenes)
4. Link principal → strlac.xyz (u otra URL del envío)
5. Pie: qué es strlac (tagline) + unsubscribe
```

### Cuando esté definido

1. Completar esta sección (sacar “TBD”).
2. Agregar template de armado en `/tools/newsletter` (o similar).
3. Sumar unidad en [automatizacion.md](automatizacion.md): `newsletter → draft`.
4. Primera prueba con lista chica antes de cadence fija.

---

## Radio — ver doc dedicada

Señal propia (metodología radio): playlists en loop + invocaciones de artistas.

Detalle, stack (Navidrome, etc.) y TBD → **[radio.md](radio.md)**.

---

## Alianzas — ver doc dedicada

Sellos, colectivos y plataformas afines → **[networking.md](networking.md)**.
