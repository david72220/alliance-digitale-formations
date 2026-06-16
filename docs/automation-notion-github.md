# Automatisation Notion → GitHub → Vercel

Ce document décrit le workflow qui publie automatiquement une ressource (micro-cours) sur le site dès que la case **Publié** est cochée dans la base Notion **Ressources Alliance Digitale**.

## Vue d’ensemble

```
Notion (case Publié cochée)
    ↓
Automation Notion → webhook n8n
    ↓
n8n récupère la page Notion et déclenche GitHub Actions
    ↓
GitHub Actions télécharge les fichiers, génère data.json, commit, push
    ↓
GitHub Actions déclenche le déploiement Vercel
    ↓
Site mis à jour en production
```

## 1. Prérequis

### Dans Notion
- La base **Ressources Alliance Digitale** doit contenir une case **Publié** de type checkbox.
- Une automation Notion doit être créée : « Quand Publié devient coché → envoyer un webhook ».

### Dans n8n
- Instance accessible : `https://n8n.srv1179315.hstgr.cloud`.
- Variables d’environnement configurées :
  - `NOTION_TOKEN`
  - `GITHUB_TOKEN`
  - `GITHUB_OWNER` (optionnel, défaut `david72220`)
  - `GITHUB_REPO` (optionnel, défaut `alliance-digitale-formations`)
  - `ALLIANCE_WEBHOOK_SECRET` (clé secrète pour sécuriser le webhook)

### Dans GitHub
- Secrets dans `Settings > Secrets and variables > Actions` :
  - `NOTION_TOKEN`
  - `GITHUB_TOKEN` (ou un PAT avec droit `repo` et `workflow`)
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
- Variables dans `Settings > Secrets and variables > Actions > Variables` :
  - `NOTION_RESOURCES_DB_ID`

## 2. Fichiers créés dans le projet

| Fichier | Rôle |
|---|---|
| `n8n/workflows/alliance-notion-publish.json` | Workflow n8n (webhook + appel GitHub Actions) |
| `.github/workflows/notion-publish.yml` | Workflow GitHub Actions |
| `scripts/download_resource.mjs` | Télécharge les fichiers Notion et génère `data.json` + `resources.json` |
| `docs/automation-notion-github.md` | Cette documentation |

## 3. Importer le workflow dans n8n

### Option A — Import JSON
1. Se connecter à l’instance n8n : `https://n8n.srv1179315.hstgr.cloud`.
2. Aller dans **Workflows > Import from File**.
3. Sélectionner `n8n/workflows/alliance-notion-publish.json`.
4. Sauvegarder et activer le workflow.

### Option B — Créer manuellement
1. Créer un nouveau workflow.
2. Ajouter un nœud **Webhook** configuré en `POST` avec le path `alliance-notion-publish`.
3. Ajouter un nœud **Code** pour vérifier la clé secrète et extraire `pageId`.
4. Ajouter un nœud **Code** pour appeler l’API Notion et récupérer la page.
5. Ajouter un nœud **Code** pour formater le payload (slug, vérifier `Publié`).
6. Ajouter un nœud **Code** pour déclencher GitHub Actions via l’API REST.
7. Connecter les nœuds et activer.

## 4. URL du webhook

Une fois le workflow activé, l’URL du webhook sera :```
https://n8n.srv1179315.hstgr.cloud/webhook/alliance-notion-publish
```

Cette URL doit être configurée dans l’automation Notion.

## 5. Sécuriser le webhook

Le workflow n8n vérifie l’en-tête `X-Alliance-Secret`. La valeur doit correspondre à la variable d’environnement `ALLIANCE_WEBHOOK_SECRET`.

Dans l’automation Notion :
- URL : `https://n8n.srv1179315.hstgr.cloud/webhook/alliance-notion-publish`
- Headers : `X-Alliance-Secret: <votre_secret>`

## 6. Créer l’automation Notion

1. Ouvrir la base **Ressources Alliance Digitale** dans Notion.
2. Cliquer sur ⋮ (en haut à droite) → **Automations**.
3. Créer une nouvelle automation :
   - **Trigger** : `When a page is edited` → filtre `Publié` devient `Checked`.
   - **Action** : `Send a webhook`.
   - URL : voir §5.
   - Payload : par défaut, Notion envoie les données de la page. S’assurer que `pageId` est transmis.

## 7. Tester le workflow

### Tester le webhook n8n manuellement
```bash
curl -X POST https://n8n.srv1179315.hstgr.cloud/webhook/alliance-notion-publish \
  -H "Content-Type: application/json" \
  -H "X-Alliance-Secret: <votre_secret>" \
  -d '{"pageId": "38196280-38de-81de-b04c-d36610e50cbd", "slug": "rgpd-pme-10-points-controle"}'
```

### Tester GitHub Actions manuellement
```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <GITHUB_TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/david72220/alliance-digitale-formations/actions/workflows/notion-publish.yml/dispatches \
  -d '{"ref":"main","inputs":{"page_id":"38196280-38de-81de-b04c-d36610e50cbd","slug":"rgpd-pme-10-points-controle"}}'
```

## 8. Cas d’usage complet

1. Un rédacteur crée une ressource dans Notion.
2. Il upload les fichiers `ressource`, `Exercice`, `Solution exercice`.
3. Il remplit titre, slug, description, module.
4. Il coche **Publié**.
5. Notion appelle le webhook n8n.
6. n8n vérifie le secret, récupère la page, contrôle `Publié`, puis déclenche GitHub Actions.
7. GitHub Actions télécharge les fichiers, génère `data.json`, met à jour `resources.json`, commit, push et déploie sur Vercel.

## 9. Dépannage

| Problème | Cause probable | Solution |
|---|---|---|
| Webhook n8n non déclenché | Automation Notion mal configurée | Vérifier le trigger et l’URL |
| `Clé secrète invalide` | Header `X-Alliance-Secret` incorrect | Vérifier la variable `ALLIANCE_WEBHOOK_SECRET` |
| `La ressource n'est pas publiée` | Case `Publié` non cochée ou non synchronisée | Attendre 30s et re-cocher |
| GitHub Actions ne se lance pas | `GITHUB_TOKEN` invalide ou droits insuffisants | Vérifier le PAT et les droits `repo` + `workflow` |
| Téléchargement des fichiers échoue | URLs des fichiers Notion expirées ou privées | Vérifier que l’intégration a accès à la base |
| Déploiement Vercel échoue | `VERCEL_TOKEN` ou IDs incorrects | Vérifier dans le dashboard Vercel |

## 10. Améliorations futures

- Ajouter une notification Telegram/Slack en cas de succès ou d’échec.
- Prévisualiser le rendu du cours avant publication (branche `staging`).
- Gérer la suppression / dépublication d’une ressource.
- Synchroniser automatiquement la base **Formations** avec le même principe.

## 11. Liens utiles

- Instance n8n : `https://n8n.srv1179315.hstgr.cloud`
- Dépot GitHub : `https://github.com/david72220/alliance-digitale-formations`
- Projet Vercel : `https://vercel.com/david72220s-projects/alliance-digitale-formations`
