# Spécifications techniques — Workflow "Publier une ressource Notion vers GitHub"

Ce document décrit précisément ce que le workflow n8n doit lire dans Notion, comment il doit le transformer et quelles actions il doit déclencher.

## 1. Base Notion source

### Nom de la base
**Ressources Alliance Digitale**

### ID de la base
```
37f96280-38de-814b-be57-ff8dd53fa940
```

### Intégration / Credential N8N
- Utiliser le credential Notion déjà configuré dans l’instance n8n (`https://n8n.srv1179315.hstgr.cloud`).
- Ce credential a accès à toutes les bases de l’espace Notion.

---

## 2. Événement déclencheur

### Source
Automation Notion dans la base **Ressources Alliance Digitale**.

### Condition
Quand la propriété **Publié** passe à `true` (checked).

### Action Notion
Envoyer un webhook `POST` vers :
```
https://n8n.srv1179315.hstgr.cloud/webhook/alliance-notion-publish
```

### Headers obligatoires
```
Content-Type: application/json
X-Alliance-Secret: <secret_configuré_dans_n8n>
```

### Payload attendu du webhook
```json
{
  "pageId": "38196280-38de-81de-b04c-d36610e50cbd",
  "data": {
    "id": "38196280-38de-81de-b04c-d36610e50cbd",
    "properties": {
      "Titre": { ... },
      "Slug": { ... },
      "Publié": { ... }
    }
  }
}
```

> Le workflow doit accepter `pageId`, `data.id`, ou `id` comme identifiant de page.

---

## 3. Propriétés Notion à lire

Le workflow doit lire les propriétés suivantes de la page Notion :

| Propriété Notion | Type Notion | Nom technique | Obligatoire | Usage |
|---|---|---|---|---|
| **Titre** | title | `Titre` | Oui | Titre du cours |
| **Slug** | rich_text | `Slug` | Oui | Identifiant URL (`rgpd-pme-10-points-controle`) |
| **Description** | rich_text | `Description` | Non | Résumé SEO / accroche |
| **Module** | select | `Module` | Non | Classification (ex: `Sécurité des données`) |
| **Publié** | checkbox | `Publié` | Oui | Condition de publication |
| **ressource** | files | `ressource` | Oui | Fichier contenant le cours (`.md`) |
| **Exercice** | files | `Exercice` | Non | Fichier contenant l’exercice (`.md`) |
| **Solution exercice** | files | `Solution exercice` | Non | Fichier contenant la solution (`.pdf`) |

### Format des valeurs extraites

#### `Titre`
- Type : `title`
- Extraction : `properties.Titre.title[].plain_text` concaténés
- Résultat : `"RGPD en PME : les 10 points de contrôle essentiels"`

#### `Slug`
- Type : `rich_text`
- Extraction : `properties.Slug.rich_text[].plain_text` concaténés
- Résultat : `"rgpd-pme-10-points-controle"`
- Validation : pas d’espace, pas de majuscule, pas de caractères spéciaux

#### `Description`
- Type : `rich_text`
- Extraction : `properties.Description.rich_text[].plain_text` concaténés

#### `Module`
- Type : `select`
- Extraction : `properties.Module.select.name`
- Résultat : `"Sécurité des données"`

#### `Publié`
- Type : `checkbox`
- Extraction : `properties.Publié.checkbox`
- Résultat : `true` ou `false`

#### Fichiers (`ressource`, `Exercice`, `Solution exercice`)
- Type : `files`
- Extraction : premier fichier de la liste
- URL : `properties.X.files[0].external.url` ou `properties.X.files[0].file.url`
- Résultat : URL publique ou signée du fichier

---

## 4. Logique du workflow n8n

### Étape 1 — Réception du webhook
- Méthode : `POST`
- Path : `/alliance-notion-publish`
- Vérifier le header `X-Alliance-Secret`
- Extraire l’ID de la page Notion (`pageId`)

### Étape 2 — Récupération de la page Notion
- Utiliser le nœud natif Notion **Get Page**
- ID de la page : `pageId`
- Credential Notion : celui existant

### Étape 3 — Extraction et formatage des données
- Extraire toutes les propriétés listées dans la section 3
- Normaliser le slug (minuscules, espaces remplacés par `-`)
- Vérifier que le slug n’est pas vide

### Étape 4 — Vérification de la case Publié
- Condition : `Publié === true`
- Si **non publié** : arrêter le workflow avec statut `ignored`
- Si **publié** : continuer vers l’appel GitHub

### Étape 5 — Appel GitHub Actions
- Méthode : `POST`
- URL : ```https://api.github.com/repos/david72220/alliance-digitale-formations/actions/workflows/notion-publish.yml/dispatches```
- Headers :
  - `Accept: application/vnd.github+json`
  - `Authorization: Bearer <TOKEN_GITHUB_EN_DUR>`
  - `X-GitHub-Api-Version: 2022-11-28`
- Body JSON :
```json
{
  "ref": "main",
  "inputs": {
    "page_id": "38196280-38de-81de-b04c-d36610e50cbd",
    "slug": "rgpd-pme-10-points-controle"
  }
}
```

### Étape 6 — Réponse au webhook Notion
- Si tout est OK : renvoyer `HTTP 200` avec :
```json
{ "status": "ok", "message": "Publication déclenchée sur GitHub" }
```
- Si non publié : renvoyer `HTTP 200` avec :
```json
{ "status": "ignored", "message": "La ressource n'est pas publiée." }
```
- Si erreur : renvoyer `HTTP 400/500` avec le message d’erreur

---

## 5. Données transmises à GitHub Actions

GitHub Actions reçoit deux paramètres :

| Paramètre | Type | Description |
|---|---|---|
| `page_id` | string | ID complet de la page Notion (format avec tirets ou sans) |
| `slug` | string | Slug de la ressource, utilisé pour créer le dossier `public/ressources/{slug}/` |

---

## 6. Actions réalisées par GitHub Actions

### 6.1 Checkout du dépôt
- Utiliser `actions/checkout@v4`
- Branche : `main`

### 6.2 Setup Node.js
- Version : `22`
- Cache npm activé

### 6.3 Installation des dépendances
```bash
npm ci
```

### 6.4 Téléchargement des fichiers Notion
Script exécuté : `scripts/download_resource.mjs`

Variables d’environnement pour le script :
```bash
NOTION_TOKEN=<depuis_secrets_github>
NOTION_RESOURCES_DB_ID=<depuis_variables_github>
PAGE_ID=<input_github>
SLUG=<input_github>
```

Le script doit :
1. Récupérer la page Notion (`PAGE_ID`).
2. Vérifier que `Publié === true`.
3. Créer le dossier `public/ressources/{SLUG}/`.
4. Télécharger :
   - `ressource` → `public/ressources/{SLUG}/cours.md`
   - `Exercice` → `public/ressources/{SLUG}/exercice.md`
   - `Solution exercice` → `public/ressources/{SLUG}/solution.pdf`
5. Convertir `cours.md` et `exercice.md` en HTML avec `marked`.
6. Générer `public/ressources/{SLUG}/data.json` contenant :
```json
{
  "title": "...",
  "slug": "...",
  "module": "...",
  "description": "...",
  "contentHtml": "<html du cours>",
  "exerciseHtml": "<html de l'exercice>",
  "solutionUrl": "/ressources/{slug}/solution.pdf",
  "published": true
}
```
7. Mettre à jour `public/ressources/resources.json` avec les métadonnées de la ressource.

### 6.5 Commit et push
```bash
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git add public/ressources/ public/ressources/resources.json
git commit -m "feat: publication auto de la ressource {slug} depuis Notion"
git push origin main
```

### 6.6 Déploiement Vercel
```bash
npx vercel --prod --token $VERCEL_TOKEN --yes
```

---

## 7. Gestion des erreurs

### Erreurs possibles dans n8n

| Erreur | Cause | Action |
|---|---|---|
| `Clé secrète invalide` | Header `X-Alliance-Secret` incorrect | Rejeter la requête |
| `pageId manquant` | Payload incomplet | Rejeter avec message clair |
| Page Notion introuvable | Mauvais ID ou credential sans accès | Logger et répondre erreur |
| `Slug vide ou invalide` | Propriété manquante ou mal formatée | Ne pas déclencher GitHub |
| `La ressource n'est pas publiée` | Case `Publié` non cochée | Répondre `ignored` |
| Échec appel GitHub | Token invalide ou réseau | Logger et répondre erreur |

### Erreurs possibles dans GitHub Actions

| Erreur | Cause | Action |
|---|---|---|
| `NOTION_TOKEN` manquant | Secret GitHub non configuré | Échec du workflow |
| Page non publiée | Race condition | Arrêter sans commit |
| Fichier Notion inaccessible | URL expirée ou permission | Échec du workflow |
| Commit sans modification | Fichiers inchangés | Ignorer silencieusement |
| Déploiement Vercel échoué | Token ou projet invalide | Échec du workflow |

---

## 8. Exemple de payload complet Notion → n8n

### Webhook envoyé par Notion
```json
{
  "pageId": "38196280-38de-81de-b04c-d36610e50cbd",
  "data": {
    "object": "page",
    "id": "38196280-38de-81de-b04c-d36610e50cbd",
    "properties": {
      "Titre": {
        "title": [{ "plain_text": "RGPD en PME : les 10 points de contrôle essentiels" }]
      },
      "Slug": {
        "rich_text": [{ "plain_text": "rgpd-pme-10-points-controle" }]
      },
      "Description": {
        "rich_text": [{ "plain_text": "Un micro-cours concret..." }]
      },
      "Module": {
        "select": { "name": "Sécurité des données" }
      },
      "Publié": {
        "checkbox": true
      },
      "ressource": {
        "files": [
          {
            "type": "external",
            "name": "cours.md",
            "external": { "url": "https://example.com/cours.md" }
          }
        ]
      },
      "Exercice": {
        "files": [
          {
            "type": "external",
            "name": "exercice.md",
            "external": { "url": "https://example.com/exercice.md" }
          }
        ]
      },
      "Solution exercice": {
        "files": [
          {
            "type": "external",
            "name": "solution.pdf",
            "external": { "url": "https://example.com/solution.pdf" }
          }
        ]
      }
    }
  }
}
```

### Payload reformaté par n8n vers GitHub Actions
```json
{
  "pageId": "38196280-38de-81de-b04c-d36610e50cbd",
  "slug": "rgpd-pme-10-points-controle",
  "title": "RGPD en PME : les 10 points de contrôle essentiels",
  "module": "Sécurité des données",
  "description": "Un micro-cours concret...",
  "published": true,
  "resourceUrl": "https://example.com/cours.md",
  "exerciceUrl": "https://example.com/exercice.md",
  "solutionUrl": "https://example.com/solution.pdf"
}
```

### Appel GitHub Actions
```json
{
  "ref": "main",
  "inputs": {
    "page_id": "38196280-38de-81de-b04c-d36610e50cbd",
    "slug": "rgpd-pme-10-points-controle"
  }
}
```

---

## 9. Fichiers impactés

| Fichier | Modifié par | Description |
|---|---|---|
| `public/ressources/{slug}/cours.md` | GitHub Actions | Cours au format Markdown |
| `public/ressources/{slug}/exercice.md` | GitHub Actions | Exercice au format Markdown |
| `public/ressources/{slug}/solution.pdf` | GitHub Actions | Solution téléchargeable |
| `public/ressources/{slug}/data.json` | GitHub Actions | HTML préparsé pour Astro |
| `public/ressources/resources.json` | GitHub Actions | Catalogue des ressources |

---

## 10. Points de vigilance

1. **Le slug doit être unique** dans la base Notion. Un doublon écraserait les fichiers existants.
2. **Les URLs de fichiers Notion peuvent être temporaires** (signées). Le téléchargement doit être fait immédiatement.
3. **Le credential Notion dans n8n doit avoir le droit de lire les pages** de la base Ressources.
4. **Le token GitHub doit avoir les droits** `repo` et `workflow` pour déclencher un workflow dispatch.
5. **L’automation Notion ne doit pas boucler** : vérifier que le trigger ne se déclenche pas à la suite d’une modification faite par le workflow.

---

## 11. Liens et ressources

- Base Notion : `https://app.notion.so/37f96280-38de-814b-be57-ff8dd53fa940`
- Workflow n8n JSON : `n8n/workflows/alliance-notion-publish.json`
- Workflow GitHub Actions : `.github/workflows/notion-publish.yml`
- Script de téléchargement : `scripts/download_resource.mjs`
- Documentation générale : `docs/automation-notion-github.md`
