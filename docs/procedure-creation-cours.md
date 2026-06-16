# Procédure de création et d’import d’une ressource / micro-cours

Ce document décrit le workflow complet pour créer un micro-cours, le rendre disponible sur le site et l’enregistrer dans la base Notion **Ressources Alliance Digitale**.

## Stack et architecture

- **Framework** : Astro 6 en sortie statique (`output: 'static'`).
- **CMS** : Notion pour les métadonnées (titre, slug, module, publié, liens des fichiers).
- **Contenu** : fichiers Markdown et PDF stockés dans le dépôt, servis en statique.
- **Hébergement** : Vercel.
- **Import** : scripts Node.js locaux utilisant `@notionhq/client`.

## Structure d’une ressource

Une ressource est un micro-cours de 3 à 5 pages avec :

- **Cours** (`cours.md`) : contenu pédagogique complet affiché sur le site.
- **Exercice** (`exercice.md`) : exercice affiché en bas de la page.
- **Solution** (`solution.md` → `solution.pdf`) : corrigé téléchargeable en PDF.

Les trois fichiers sont référencés dans Notion via la colonne `ressource`, `Exercice` et `Solution exercice` de type **fichier**.

## Variables d’environnement

Créer un fichier `.env` à la racine du projet (`/Users/davidollivier/Documents/Antigravity/Site Alliance-digitale/staging/.env`) :

```bash
NOTION_TOKEN=***
NOTION_RESOURCES_DB_ID=37f96280-38de-814b-be57-ff8dd53fa940
NOTION_FORMATIONS_DB_ID=37d96280-38de-80e8-803b-e069bdbc0aa2
NOTION_CASE_STUDIES_DB_ID=37f96280-38de-814d-9534-da549cbb76e9
SITE_URL=https://alliance-digitale-formations.vercel.app
CAL_URL=https://cal.eu/alliance-digitale/decouverte-30-min
```

Le fichier `.env` est ignoré par Git. Ne jamais le commiter ni partager son contenu.

## Base Notion "Ressources Alliance Digitale"

Les colonnes doivent être nommées exactement comme suit :

| Propriété | Type | Description |
|-----------|------|-------------|
| Titre | title | Titre du cours |
| Slug | rich_text | Identifiant URL (ex: `rgpd-pme-10-points-controle`) |
| Description | rich_text | Résumé SEO / accroche |
| Module | select | Classification du cours (ex: `Sécurité des données`) |
| Publié | checkbox | Affiche la ressource sur le site |
| ressource | files | Lien externe vers `cours.md` |
| Exercice | files | Lien externe vers `exercice.md` |
| Solution exercice | files | Lien externe vers `solution.pdf` |

## Modèle de données JSON source

Chaque cours est créé à partir d’un fichier JSON dans `data/ressources/{slug}.json` :

```json
{
  "title": "RGPD en PME : les 10 points de contrôle essentiels",
  "slug": "rgpd-pme-10-points-controle",
  "module": "Sécurité des données",
  "description": "Un micro-cours opérationnel pour vérifier rapidement que votre PME respecte les principales obligations du RGPD.",
  "published": true,
  "content": "# Introduction\n\nTexte du cours en **Markdown**...",
  "exercice": "# Exercice\n\n## Consigne\n\n...",
  "solution": "# Solution\n\n..."
}
```

- `module` : valeur d’un select Notion existant.
- `content` : Markdown du cours complet.
- `exercice` : Markdown de l’exercice.
- `solution` : Markdown du corrigé (sera converti en PDF).
- Si `exercice` ou `solution` sont absents, un contenu par défaut est généré.

## Workflow de création d’un cours

### 1. Créer le fichier JSON source

Créer `data/ressources/{slug}.json` avec le modèle ci-dessus.

### 2. Importer la ressource dans Notion et générer les fichiers

Depuis le dossier du projet :

```bash
cd "/Users/davidollivier/Documents/Antigravity/Site Alliance-digitale/staging"
npm run import:resource -- data/ressources/{slug}.json
```

Ce script effectue automatiquement :
1. Lecture du JSON source.
2. Création du dossier `public/ressources/{slug}/`.
3. Génération des fichiers :
   - `cours.md`
   - `exercice.md`
   - `solution.md`
   - `solution.pdf`
   - `data.json` (pour le build Astro)
4. Création d’une page dans la base Notion **Ressources Alliance Digitale** avec les liens publics des fichiers.

### 3. Importer plusieurs ressources d’un coup

Lorsque plusieurs fichiers JSON sont présents dans `data/ressources/` :

```bash
npm run import:all
```

Ce script exécute `import:resource` pour chaque fichier JSON du dossier.

### 4. Mettre à jour le catalogue global (optionnel)

Le fichier `public/ressources/resources.json` est le catalogue statique utilisé par Astro. L’import individuel crée `data.json` par cours. Pour un site avec ressources locales uniquement, Astro fusionne automatiquement les fichiers `data.json` et les entrées Notion.

Pour régénérer `resources.json` manuellement, utiliser un script ou mettre à jour le JSON à partir des `data.json` générés.

### 5. Tester en local

```bash
npm run dev
```

Ouvrir :
- http://localhost:4321/ressources/ pour le catalogue
- http://localhost:4321/ressources/{slug}/ pour la page du cours

### 6. Build et déploiement

```bash
npm run build
npm run preview   # optionnel
```

Pousser sur GitHub et déployer sur Vercel :

```bash
git add .
git commit -m "feat: ajoute le cours {slug}"
git push origin main
npx vercel --prod --force
```

## Commandes de diagnostic

### Vérifier les colonnes d’une base Notion

```bash
npm run notion:diagnose -- 37f96280-38de-814b-be57-ff8dd53fa940
```

Affiche les noms et types exacts des propriétés de la base Notion.

### Générer un PDF à partir d’un Markdown

```bash
npm run build:pdf -- public/ressources/{slug}/solution.md
```

## SEO / SEO IA des pages de ressources

Chaque page générée contient :
- Un `<title>` unique et une meta description.
- Un canonical URL.
- Des données structurées Schema.org (`LearningResource` + `BreadcrumbList`).
- Un seul `<h1>` et une hiérarchie de titres claire.
- Du contenu Markdown intégré dans le HTML statique (crawlable sans JavaScript).
- Un fil d’ariane.
- Des liens internes vers les autres pages du site.

## Bonnes pratiques

- **Ne jamais** commiter le fichier `.env`.
- **Ne jamais** partager le `NOTION_TOKEN` dans le chat ou par email.
- Utiliser des slugs courts, sans accent, sans espace, sans majuscule : `rgpd-pme-10-points-controle`.
- Vérifier que l’intégration Notion a bien accès à la base cible.
- Cocher `Publié` dans Notion pour qu’une ressource apparaisse sur le site.
- Relire le contenu généré avant déploiement.

## Dépannage

| Erreur | Cause probable | Solution |
|--------|---------------|----------|
| `API token is invalid` | Token incorrect ou expiré | Regénérer le token dans Notion, mettre à jour `.env` |
| `Ressource is not a property that exists` | Nom de colonne incorrect | Vérifier avec `npm run notion:diagnose` et adapter le script |
| `dotenv-cli: command not found` | `node_modules/.bin` non résolu | Les scripts utilisent `npx dotenv-cli` |
| `sh: dotenv-cli: command not found` | `dotenv-cli` non installé | `npm install -D dotenv-cli` |
| Page 404 sur `/ressources/{slug}/` | Slug invalide ou ressource non publiée | Vérifier le slug, la case `Publié`, et relancer le build |

## Fichiers importants

| Fichier | Rôle |
|---------|------|
| `data/ressources/{slug}.json` | Source JSON du cours |
| `public/ressources/{slug}/cours.md` | Cours au format Markdown |
| `public/ressources/{slug}/exercice.md` | Exercice au format Markdown |
| `public/ressources/{slug}/solution.md` | Solution au format Markdown |
| `public/ressources/{slug}/solution.pdf` | Solution téléchargeable |
| `public/ressources/{slug}/data.json` | Données pré-rendues pour Astro |
| `scripts/import_resource.mjs` | Import d’une ressource dans Notion |
| `scripts/import_all_resources.mjs` | Import de toutes les ressources |
| `scripts/diagnose_notion.mjs` | Diagnostic des colonnes Notion |
| `scripts/build_pdf.mjs` | Conversion Markdown → PDF |
| `src/pages/ressources/[slug].astro` | Template de la page cours |
| `src/pages/ressources/index.astro` | Catalogue des ressources |
| `src/lib/notion.ts` | Client Notion et mapping des propriétés |
| `.env` | Variables sensibles (non versionné) |
| `.env.example` | Exemple de variables d’environnement |

## Prochaines étapes

1. Valider le format du premier cours RGPD importé dans Notion.
2. Générer les 29 autres micro-cours selon les modules définis.
3. Lancer `npm run import:all` pour peupler Notion.
4. Optimiser le sitemap automatique et le maillage interne.
5. Connecter le repo GitHub à Vercel pour le déploiement continu.
