# Alliance Digitale Formations — CLAUDE.md

## Vue d'ensemble du projet

Site statique Astro 6 déployé sur Vercel pour présenter les formations et les micro-cours d'Alliance Digitale.
Public cible : PME et auto-entrepreneurs de la Sarthe, débutants en IA et automatisation.

- Dépôt : `https://github.com/david72220/alliance-digitale-formations`
- Stack : Astro 6.4, Tailwind CSS v4 standalone via PostCSS, Node 22.
- Hébergement : Vercel (URL prod : `https://alliance-digitale-formations.vercel.app`).
- Domaine cible : `alliance-digitale.fr` (cutover à faire — voir `docs/CUTOVER.md`).
- Données : Notion (bases Formations, Études de cas, Ressources).

## Structure du projet

```
├── src/
│   ├── components/        → Header (avec burger mobile), Footer, FormationCard, etc.
│   ├── layouts/           → Layout principal SEO + JSON-LD SSR
│   ├── lib/               → Notion client, markdown, utils
│   ├── pages/             → Pages Astro (index, formations/, ressources/, etc.)
│   └── styles/            → global.css avec design system
├── data/ressources/       → Micro-cours JSON source (30 modules)
├── public/
│   ├── robots.txt         → Allow + sitemap reference
│   ├── og-image.png       → 1200×630 branded
│   ├── images/formations/ → Photo par formation Notion (UUID.jpg/webp)
│   └── ressources/        → cours.md, exercice.md, solution.md, cover.jpg/webp par slug
├── scripts/               → Génération visuels Pexels, upload Notion, optimisation images
├── docs/                  → Procédure cutover DNS, charte graphique
└── .env.example           → Variables d'environnement
```

## Charte graphique

| Élément | Valeur |
|---|---|
| Bleu Alliance | `#3B97D3` |
| Rouge Alliance | `#9E2114` |
| Fond sombre | `#070d18` / `#0B1120` |
| Typographie titres | Playfair Display / Space Grotesk |
| Typographie corps | Inter |

Fonts en **self-host** via `@fontsource` (pas de Google Fonts CDN).

## Scripts disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Serveur de développement local |
| `npm run build` | Build statique Astro |
| `npm run import:all` | Importe/met à jour tous les modules dans Notion |
| `npm run setup:notion` | Crée les bases Notion manquantes |
| `npx dotenv-cli -- node scripts/optimize_images.mjs` | Re-compresse images public/ |
| `npx dotenv-cli -- node scripts/generate_og_image.mjs` | Régénère OG image |
| `python3 scripts/gen_visuals_pexels.py` | Régénère 30 covers ressources (Pexels + overlay) |
| `python3 scripts/upload_formation_photos.py --generate` | Génère photos nues 1200×630 pour chaque formation Notion |
| `python3 scripts/upload_formation_photos.py --patch` | PATCH propriété photo Notion avec URL Vercel |

## SEO

- `sitemap-index.xml` + `sitemap-0.xml` auto-générés via `@astrojs/sitemap` (45 URLs).
- `robots.txt` autorise tous les crawlers, référence le sitemap.
- Canonical pointe vers `alliance-digitale.fr` (configurable dans `astro.config.mjs` `site:`).
- JSON-LD SSR sur toutes les pages : `Organization` + `WebSite` + `Course` (pages formation).
- OG image 1200×630 + Twitter card.
- Self-host fonts (zéro 3rd-party DNS sur les pages).
- PSI mobile : Performance 99 / Accessibilité 95 / Best Practices 100 / SEO 100.

## Notion — colonnes critiques

### Base "Formations"

| Propriété | Type | Remarque |
|---|---|---|
| Nom | title | |
| Slug | rich_text | |
| Active | checkbox | filtre frontend |
| photo | files | external URL Vercel (UUID.jpg) |
| Prix de la formation | **rich_text** | texte libre type "1 500 € HT / participant (groupe 4-8) — intra: 3 000 € HT" |
| durée (H), Public, Méthodes pédagogiques, etc. | rich_text | |

### Base "Ressources"

| Propriété | Type | Remarque |
|---|---|---|
| Titre | title | |
| Slug | rich_text | |
| Module | select | classification frontend |
| Publié | checkbox | |
| ressource | files | r minuscule — lien externe vers cours.md |
| Exercice, Solution exercice | files | |

## Visuels

- **30 ressources** : Pexels photo + overlay sombre + pill module + titre burned-in + AD circle (`gen_visuals_pexels.py`).
- **10 formations Notion** : Pexels photo nue 1200×630, uploadée via PATCH external URL (`upload_formation_photos.py`).
- Cache local `.pexels-cache/` + mapping `.formation-photos.json` (les deux gitignorés).
- Crédits photographes : `public/ressources/photo-credits.json` + section dans `mentions-legales.astro`.

## Variables d'environnement

Copier `.env.example` en `.env` et renseigner :

- `NOTION_TOKEN` — token d'intégration Notion
- `NOTION_FORMATIONS_DB_ID` — base BdD des formations
- `NOTION_CASE_STUDIES_DB_ID` — base Études de cas
- `NOTION_RESOURCES_DB_ID` — base Ressources
- `CAL_URL` — lien Cal pour les prises de RDV
- `PEXELS_API_KEY` — clé Pexels pour génération visuels (free, https://www.pexels.com/api/)

⚠️ **Pas d'espace après `=`** dans `.env`. Bash interprète la valeur comme commande sinon (leak dans output erreur).

## Déploiement

Git GitHub → Vercel **pas connecté** actuellement. Procédure manuelle :

```bash
git push origin main
npx vercel@latest --prod --yes
URL=$(npx vercel@latest ls --prod | grep -oE 'https://alliance-digitale-formations-[a-z0-9]+-david72220s-projects\.vercel\.app' | head -1)
npx vercel@latest alias set "$URL" alliance-digitale-formations.vercel.app
```

À fixer : Vercel → Settings → Git → Connect `david72220/alliance-digitale-formations` branch `main`.

## Points de vigilance

- Ne jamais commiter le `.env` réel.
- Les appels API Notion doivent être tolérants aux erreurs (fallback `[]`).
- Le site doit builder même si Notion est temporairement inaccessible.
- macOS Finder duplique parfois les files pendant l'écriture des scripts (`* 2.jpg`). Cleanup : `find public \( -name "* 2.*" -o -name "* 3.*" \) -delete`.
- Pexels API requiert `User-Agent` custom (sinon Cloudflare 403).

## Sessions documentées

L'historique détaillé des sessions (modifications, gotchas, commits) se trouve dans le CLAUDE.md du dossier parent (`/Users/davidollivier/Documents/Antigravity/Site Alliance-digitale/CLAUDE.md`, non versionné).

Dernière session : **18 juin 2026** — Audit SEO complet (robots/sitemap/JSON-LD/canonical), self-host fonts, optimisation images PNG→WebP (-93%), 33 visuels Pexels, prix formations rich_text, OPCO universel, burger mobile, procédure cutover DNS.

**19 juin 2026** — DNS Hostinger câblé. Domaine canonique = `www.alliance-digitale.fr` (apex 308 → www). Audit crawl complet 45 URLs : fix multi-H1 sur ressources (template + markdown), fix `//ressources/` dans JSON-LD BreadcrumbList (utiliser `new URL()` pattern), normalisation 29 `solutionUrl` PDF (hardcodé vercel.app → relatif), re-PATCH 10 photos Notion vers www, contraste WCAG AA (Tailwind `text-white/40→/65`), footer h3→h2 (heading order), Contact iframe Cal.eu click-to-load (perf 78→100, BP 57→100), formation détail meta description fallback. **Résultat : 6/8 pages 100/100/100/100 PSI mobile, 45/45 URLs crawlées OK.** Commits : `5b19ca8`, `c1af134`, `0310211`, `34b52c5`.
