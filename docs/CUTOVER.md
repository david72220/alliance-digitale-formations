# Cutover alliance-digitale.fr — procédure

## 1. Vercel — reconnecter Git (auto-deploy)

État actuel : Git déconnecté, chaque déploiement nécessite `npx vercel --prod` + `vercel alias set`. À corriger en premier pour fluidifier le reste.

1. https://vercel.com/team_G7ea32rCQBeWyfLa3PfBn7b8/alliance-digitale-formations/settings/git
2. **Connect Git Repository** → GitHub
3. Sélectionner `david72220/alliance-digitale-formations`
4. Production Branch : `main`
5. Vérifier : un push sur main déclenche un build dans Deployments tab

Workaround si reconnexion impossible — créer un Deploy Hook :
- Settings → Git → Deploy Hooks → Create Hook (name: `main-hook`, branch: `main`)
- Récupérer URL
- Trigger après push : `curl -X POST <URL>`

## 2. DNS — câbler alliance-digitale.fr sur Vercel

1. Vercel : Project → **Settings → Domains** → Add `alliance-digitale.fr` puis `www.alliance-digitale.fr`
2. Choisir apex `alliance-digitale.fr` comme canonique, redirect `www` → apex
3. Vercel affiche les valeurs DNS à configurer :
   - Apex (`alliance-digitale.fr`) : `A` record `76.76.21.21`
   - WWW : `CNAME` vers `cname.vercel-dns.com`
4. Aller chez le registrar du domaine (OVH/Gandi/Cloudflare/...) → DNS zone
5. Avant de modifier : noter les enregistrements actuels (sauvegarde)
6. Ajouter/modifier les enregistrements selon les valeurs Vercel
7. TTL : passer à 300s avant la bascule pour propagation rapide, remettre à 3600s après
8. Attendre propagation (5-30 min, vérifier via `dig alliance-digitale.fr +short`)
9. Vercel détecte → émet certificat Let's Encrypt automatique
10. Test : `curl -sI https://alliance-digitale.fr/` → `HTTP/2 200`, `server: Vercel`

## 3. Redirections 301 ancien → nouveau

Si l'ancien site `alliance-digitale.fr` a des URLs indexées sur Google, mapper vers les nouvelles pour conserver le link equity.

Inventaire URLs indexées :
```bash
# Sitemap ancien (si existe)
curl -s https://alliance-digitale.fr/sitemap.xml | grep -oE '<loc>[^<]+</loc>'

# Sinon GSC Property ancien site → "Pages" → exporter
# Sinon Screaming Frog crawl
```

Créer mapping dans `staging/vercel.json` :
```json
{
  "redirects": [
    { "source": "/services", "destination": "/accompagnement/", "permanent": true },
    { "source": "/formations-ia", "destination": "/formations/", "permanent": true },
    { "source": "/blog/:slug*", "destination": "/ressources/:slug*", "permanent": true }
  ]
}
```

Règle : jamais de 404 massif. URLs sans équivalent direct → rediriger vers la page la plus proche thématiquement, sinon home.

## 4. Google Search Console — après cutover DNS

1. https://search.google.com/search-console
2. **Add Property** → URL prefix → `https://alliance-digitale.fr/`
3. Vérification : DNS TXT (recommandé) ou méta tag dans Layout.astro
4. **Sitemaps** → Ajouter : `sitemap-index.xml`
5. Si ancien site dans la même propriété :
   - Settings → **Change of Address** → indiquer nouvelle propriété
6. **URL Inspection** : tester quelques URLs clés (`/`, `/formations/`, `/accompagnement/`)
7. **Coverage** : surveiller pendant 14j post-cutover (erreurs 404, exclusions)

## 5. Bing Webmaster + IndexNow (bonus)

1. https://www.bing.com/webmasters → ajouter `alliance-digitale.fr`
2. Importer depuis GSC en 1 clic
3. Soumettre sitemap
4. Activer IndexNow : générer clé, ajouter `/{key}.txt` dans `public/`

## 6. Vérifs post-cutover

```bash
# DNS
dig alliance-digitale.fr +short
dig www.alliance-digitale.fr +short

# HTTPS + redirect www → apex
curl -sI https://alliance-digitale.fr/
curl -sI https://www.alliance-digitale.fr/  # devrait 301 vers apex

# SEO
curl -s https://alliance-digitale.fr/robots.txt
curl -s https://alliance-digitale.fr/sitemap-index.xml | head -3
curl -s https://alliance-digitale.fr/ | grep -oE 'rel="canonical" href="[^"]+"'
curl -s https://alliance-digitale.fr/ | grep -oE 'application/ld\+json' | wc -l

# Lighthouse / PageSpeed
# https://pagespeed.web.dev/analysis?url=https://alliance-digitale.fr/

# Rich Results test
# https://search.google.com/test/rich-results?url=https://alliance-digitale.fr/
```

## 7. Rollback rapide

Si DNS cutover casse quelque chose :
- Registrar → restaurer enregistrements précédents (les valeurs notées étape 2.5)
- TTL court (300s) = propagation < 5 min
- Vercel reste en ligne sur `alliance-digitale-formations.vercel.app` quoi qu'il arrive
