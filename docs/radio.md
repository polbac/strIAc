# Radio strlac

**Estado:** idea en diseño · servidor propio a montar.

Metodología de **radio**: señal continua del sello, con base en playlist en loop e **invocaciones** a artistas que entran a transmitir otras experiencias o a sumar material a la playlist.

## Intención

No es solo un player de catálogo. Es un canal vivo:

1. **Base en loop** — playlists del archivo / catálogo que suenan en rotación.
2. **Invocaciones** — un artista es convocado (o se suma) y altera la señal: transmite una experiencia distinta, o aporta tracks / piezas a la playlist.

Encaja con el modelo strlac (construcción conjunta, capas, mutación): la radio es otra salida / canal junto a digital, web expandida, físico y evento.

## Modos de la señal

| Modo | Qué pasa |
|------|----------|
| **Loop** | Playlist(s) en rotación continua (catálogo, selecciones curatoriales, mixes del sello) |
| **Invocación** | Intervención de artista: set en vivo, sesión, landscape, lectura, ruido, o aporte a la cola/playlist |
| **Híbrido** | Vuelve al loop cuando termina la invocación; lo sumado puede quedar en el archivo de la radio |

```text
[ loop catálogo ] ──invocación──► [ experiencia / aporte artista ] ──► [ loop (+ lo nuevo) ]
```

## Stack previsto (borrador)

Dirección actual: **servidor propio**, explorando **[Navidrome](https://www.navidrome.org/)** como núcleo de biblioteca / streaming / playlists. El montaje doméstico de ese núcleo se diseña en el [taller Sistemas de Escucha Mutante](taller-escucha-mutante.md).

| Capa | Rol | Notas |
|------|-----|--------|
| Biblioteca + playlists | Navidrome (candidato) | Catálogo propio, playlists en loop, clients Subsonic-compatible |
| Señal / broadcast en vivo | *TBD* | Las invocaciones en vivo suelen pedir capa tipo Icecast / Liquidsoap / AzuraCast además (o en lugar) del player de biblioteca |
| Player web | *TBD* | Embebido en strlac.xyz o micrositio `radio.strlac.xyz` |
| Ops invocaciones | *TBD* | Cómo se agenda, quién “abre el aire”, cómo se archiva |

Navidrome cubre bien **archivo + playlists + escucha**. Para **tomar el aire** (invocación en vivo) hay que cerrar si se combina con un stack de radio broadcast o se hace por otro protocolo (stream del artista, DJ takeover, etc.).

## Flujo de una invocación (borrador)

```text
1. Curaduría elige / acepta artista (misma lógica de contacto que un release)
2. Se acuerda: ¿transmitir experiencia en vivo? ¿solo sumar a playlist? ¿ambas?
3. Ventana de invocación (fecha / duración / brief)
4. Al aire o en cola
5. Post: lo aportado entra (o no) al loop permanente
6. Difusión: stories / newsletter / web apuntan a la radio
```

Checklist:

```text
Invocación radio
- [ ] Artista / alias:
- [ ] Tipo: [ ] live / experiencia  [ ] aporte a playlist  [ ] ambos
- [ ] Brief (qué muta la señal):
- [ ] Fecha / ventana:
- [ ] Tech check (audio, link, permisos):
- [ ] ¿Queda en el loop permanente? sí / no / editar antes
- [ ] Links de difusión (web, IG, newsletter):
```

## Relación con otros canales

| Canal | Cómo se cruza |
|-------|----------------|
| Catálogo / Bandcamp | Fuente del loop; link de vuelta al release |
| Web expandida | Player o sala de la invocación |
| Stories 2× semana | Pueden apuntar a “ahora en la radio” o a un track del loop |
| Newsletter | Bloque “al aire” / próxima invocación (*cuando exista*) |
| Evento (release) | Una invocación puede ser el evento, o complementarlo |
| [Taller](taller-escucha-mutante.md) | Enseña a montar el nodo Navidrome+Tailscale en casa |

## Decisiones pendientes

```text
Radio — TBD
- [ ] Nombre de la señal (¿strlac radio / otro?)
- [ ] Confirmar Navidrome vs AzuraCast / Liquidsoap+Icecast / híbrido
- [ ] Hosting del servidor (dónde, backup, dominio)
- [ ] Derechos / masters: qué audio puede ir al loop
- [ ] Reglas de invocación (open call, solo roster, mix)
- [ ] Player público (URL, diseño, chat o no)
- [ ] Archivo: ¿se graban las invocaciones?
- [ ] Cadencia de invocaciones (ad hoc / mensual / …)
```

## Próximos pasos técnicos sugeridos

1. Decidir: **solo biblioteca+playlists** primero (Navidrome) vs **radio broadcast** desde el día 1.
2. Montar servidor + importar catálogo permitido.
3. Armar 1–2 playlists loop piloto.
4. Hacer **una invocación de prueba** con un artista del roster.
5. Documentar el runbook en este archivo (sacar TBD).
6. Conectar difusión (stories / web / newsletter).
