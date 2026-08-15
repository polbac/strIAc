# Sistemas de Escucha Mutante: Servidores de música domésticos

**Subtítulo (uso interno / convocatoria):** taller de auto-hosting y archivos musicales autónomos.

**Estado:** primera versión · diseño de un encuentro de 4 horas.

Un taller de strlac records para disputar el territorio de la escucha: instalar un servidor propio, alojar el archivo y reproducirlo desde el celular sin pasar por plataformas de suscripción.

La Raspberry Pi aparece como hardware de trabajo, no como marca del encuentro. El objeto del taller es el **nodo doméstico**: un archivo que habita hardware propio, accesible en la red de quien lo monta.

Cruza con la [radio](radio.md): Navidrome es el mismo núcleo que venimos fichando para el loop del sello. Acá se enseña a montarlo en casa.

## Decisiones de esta versión

| Campo | Valor |
|-------|--------|
| Formato | 1 encuentro · 4 horas |
| Servidor | [Navidrome](https://www.navidrome.org/) |
| Acceso remoto | [Tailscale](https://tailscale.com/) (sin abrir puertos del router) |
| Hardware de referencia | Raspberry Pi 3 / 4 / 5 (u otro Linux pequeño) |
| Instalación | Docker + Docker Compose sobre Raspberry Pi OS Lite |
| Clientes | API Subsonic → apps en el celular + interfaz web |

## Por qué Navidrome

Ultraliviano (Go). Corre en una Pi 3 o Zero 2 W sin transpirar. Habla **Subsonic**, estándar abierto: no hay una sola app. Lee tags ID3/FLAC con rigor de archivista.

### Alternativas (no para estas 4 horas)

| Stack | Qué es | Por qué no ahora |
|-------|--------|------------------|
| **Funkwhale** | ActivityPub para música (el Mastodon del archivo sonoro) | Federación hermosa; instalación y recursos demasiado pesados para iniciación |
| **Jellyfin** | Media center (video + audio) | Cañón para cine; para música pura, Navidrome es más quirúrgico |

Funkwhale puede ser un segundo encuentro (federación entre nodos). Jellyfin, si alguien ya piensa en video.

### El hack de red: Tailscale

Abrir puertos en el router de cada participante (o del espacio) suele trabar el taller. Tailscale arma una red privada en minutos: el celular llega al Navidrome de casa desde datos móviles, sin exponer el servidor a internet público.

```text
[ archivo local ] ──► [ Navidrome en el nodo ] ──► [ Tailscale ] ──► [ app en el celular ]
```

## Cronograma (4 horas)

```text
[ Bloque 1: Teoría ] ──► [ Bloque 2: Setup ] ──► [ Bloque 3: Navidrome ] ──► [ Bloque 4: Escucha ]
       (1h)                    (1h)                    (1h 30m)                     (30m)
```

### Bloque 1 — Arqueología e infraestructura (1 h)

- La pérdida del archivo físico y digital: cómo el streaming de suscripción nos convirtió en inquilinos de nuestra propia música. Volatilidad del catálogo.
- Filosofía del auto-hosting: qué significa tener un nodo propio.
- Ecosistema: servidor (Navidrome) + cliente (celular / web) + red (Tailscale).
- Despliegue de materiales en la mesa.

### Bloque 2 — Preparación del territorio: SSH y Docker (1 h)

- Flasheo de Raspberry Pi OS Lite (sin escritorio) con Raspberry Pi Imager.
- Acceso headless: SSH desde la laptop.
- El contenedor como membrana: Docker y Docker Compose, lo mínimo para instalar sin ensuciar el sistema.

### Bloque 3 — Invocación de Navidrome (1 h 30)

- Escribir el `docker-compose.yml`: volúmenes de música y puertos, línea por línea.
- `docker compose up -d`.
- Interfaz web: cuenta de administrador, primer escaneo del archivo de prueba.
- Tailscale en el nodo y en los teléfonos.

### Bloque 4 — Escucha expandida y cierre (30 min)

- App móvil apuntando a la IP Tailscale del nodo.
- Prueba: Wi-Fi off, datos móviles on, el archivo suena desde hardware propio.
- Cierre: mantenimiento del nodo, compartir música entre amigues (federación analógica), el código como herramienta de resistencia cultural.

## Intake — qué pedimos a quienes vienen

Para que el encuentro no se trabe en cables:

| Ítem | Detalle |
|------|---------|
| Hardware | Raspberry Pi 3, 4 o 5 + fuente + MicroSD (mín. 16 GB, ideal A1/A2) |
| Laptop | Cliente SSH (Terminal en macOS/Linux; PowerShell o PuTTY en Windows) |
| Materia sónica | Pendrive o carpeta con un puñado de discos en MP3/FLAC bien taggeados |
| Red | Acceso a la red local del taller (ethernet o Wi-Fi) |

Opcional pero útil: un teclado/pantalla de backup por si el headless falla; cuenta Tailscale creada de antemano.

## Plano de servicio (borrador para el bloque 3)

Esqueleto para explicar en vivo. Ajustar rutas y versión en la guía de comandos cuando se arme.

```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    ports:
      - "4533:4533"
    restart: unless-stopped
    environment:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - ./data:/data
      - ./music:/music:ro
```

Clientes de referencia (Subsonic):

- Android: Symfonium, Amuse
- iOS: Substreamer, Play:Sub
- Web: la propia UI de Navidrome

## Convocatoria (tono, aún no publicada)

Borrador para flyer / post. No inventar fecha, lugar ni cupo hasta tenerlos.

> **Sistemas de Escucha Mutante: Servidores de música domésticos**
>
> Taller de auto-hosting y archivos musicales autónomos.
>
> Cuatro horas para salir con un nodo propio: Navidrome en hardware hogareño, acceso seguro por Tailscale, y la biblioteca sonando en el teléfono — sin alquilar la escucha a una plataforma.
>
> Traé tu máquina pequeña, una MicroSD, y un puñado de discos bien taggeados. Nosotros ponemos el plano, la red del encuentro, y la discusión sobre por qué esto importa para las músicas mutantes.
>
> Un encuentro · strlac records

## Pendiente

```text
Taller — TBD
- [ ] Fecha, lugar, cupo, valor / gratuidad
- [ ] Convocatoria publicada (este tono + visual)
- [ ] Guía de comandos para participantes (PDF / markdown imprimible)
- [ ] Kit de música de prueba por si alguien llega sin tags
- [ ] Cuenta Tailscale del taller (o invitación al tailnet)
- [ ] ¿Segundo encuentro Funkwhale / federación entre nodos?
- [ ] Cruce con Radio strlac: ¿el taller alimenta el loop del sello?
```

## Relación con otros docs

| Doc | Cruce |
|-----|--------|
| [Radio](radio.md) | Mismo núcleo (Navidrome); el taller enseña el nodo doméstico |
| [Identidad](identidad.md) | Soberanía de archivo como práctica del colectivo, no como producto |
| [Networking](networking.md) | Posibles espacios / nodos para dictar o co-convocar |
