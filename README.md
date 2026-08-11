# strlac

Documentación web y base operativa de **strlac records** — colectivo tecno-biológico de músicas mutantes, arte sonoro y otras aventuras sónicas (Buenos Aires).

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

`predev` / `prebuild` sincronizan `docs/` → `public/docs/` para que el cliente las cargue.

## Estructura

| Ruta | Uso |
|------|-----|
| `docs/` | Fuente de verdad (markdown) |
| `brand/tokens.yaml` | Tokens visuales (WIP) |
| `src/app/` | App Next.js (UI client) |
| `.cursor/skills/strlac/` | Skill del agente → apunta a `docs/` |

## Enlaces

- Web del sello: [strlac.xyz](https://strlac.xyz/)
- Bandcamp: [strlacrecords.bandcamp.com](https://strlacrecords.bandcamp.com/)
