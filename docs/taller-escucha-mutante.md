# Sistemas de Escucha Mutante: Servidores de música domésticos

Un taller de strlac records para disputar el territorio de la escucha. En un encuentro de cuatro horas se instala un servidor propio, se aloja el archivo y se lo reproduce desde el celular — sin pasar por plataformas de suscripción.

El streaming nos convirtió en inquilinos de nuestra propia música: el catálogo muta, desaparece, se alquila. Acá el objeto es el **nodo doméstico**: un archivo que habita hardware propio y viaja por una red que controlás. Salís con Navidrome corriendo y Tailscale enrutando el acceso; el disco suena en el teléfono, en la calle, desde tu máquina.

Traé una computadora pequeña, una MicroSD y un puñado de discos bien taggeados. Nosotros ponemos el plano, la red del encuentro y la discusión sobre por qué esto importa para las músicas mutantes.

## El encuentro

| | |
|--|--|
| Formato | 1 encuentro · 4 horas |
| Servidor | [Navidrome](https://www.navidrome.org/) |
| Acceso remoto | [Tailscale](https://tailscale.com/) (sin abrir puertos del router) |
| Hardware | Raspberry Pi 3 / 4 / 5 (u otro Linux pequeño) |
| Instalación | Docker + Docker Compose |
| Clientes | API Subsonic → apps en el celular + interfaz web |

## Navidrome y Tailscale

Navidrome es ultraliviano y corre en máquinas modestas. Habla **Subsonic**, un estándar abierto: no hay una sola app. En Android, Symfonium o Amuse; en iOS, Substreamer o Play:Sub; en la laptop, la propia interfaz web. Lee tags ID3/FLAC con rigor de archivista.

Tailscale arma una red privada en minutos. El celular llega al servidor de casa desde datos móviles, sin exponer el nodo a internet público.

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

- Configurar el servicio: volúmenes de música y puertos.
- Levantar el servidor.
- Interfaz web: cuenta de administrador, primer escaneo del archivo de prueba.
- Tailscale en el nodo y en los teléfonos.

### Bloque 4 — Escucha expandida y cierre (30 min)

- App móvil apuntando a la red privada del nodo.
- Prueba: Wi-Fi off, datos móviles on, el archivo suena desde hardware propio.
- Cierre: mantenimiento del nodo, compartir música entre amigues, el código como herramienta de resistencia cultural.

## Qué traer

Para que el encuentro no se trabe en cables:

| Ítem | Detalle |
|------|---------|
| Hardware | Raspberry Pi 3, 4 o 5 + fuente + MicroSD (mín. 16 GB, ideal A1/A2) |
| Laptop | Cliente SSH (Terminal en macOS/Linux; PowerShell o PuTTY en Windows) |
| Materia sónica | Pendrive o carpeta con un puñado de discos en MP3/FLAC bien taggeados |
| Red | Acceso a la red local del taller (ethernet o Wi-Fi) |

Opcional pero útil: un teclado o pantalla de backup; cuenta Tailscale creada de antemano.

Un encuentro · strlac records
