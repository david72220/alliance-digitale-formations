# Rapport de relecture française — Alliance Digitale Formations

**Agent :** Agent F (relecture française)  
**Date :** 09/07/2026  
**Modèle cible :** `mistral-large-3:675b` via Ollama Cloud — indisponible localement ; relecture effectuée manuellement.

---

## Méthode

- Lecture intégrale des 4 fichiers Astro.
- Extraction du texte visible (hors balises, scripts, JSON-LD et expressions Astro).
- 5 passes : grammaire, syntaxe, typographie française, cohérence, style.
- Aucune modification du code Astro/HTML : corrections signalées avec localisation et justification.

---

## Fichier 1 — `index.astro`

### Corrections proposées

| # | Type | Original | Correction | Explication |
|---|------|----------|------------|-------------|
| 1 | Typographie | `AI Act · Conformité dès août 2026` | `AI Act · conformité dès août 2026` | En français, les phrases commençant par un nom propre suivi d’une apposition prennent une minuscule. Conserver majuscule éventuelle sur « AI Act » (anglicisme institutionnel). |
| 2 | Cohérence / vocabulaire | `PME avec salariés` | `PME employant du personnel` | Toute PME comporte des salariés ; cette formulation plus inclusive est plus élégante, sinon conserver la formulation actuelle car elle est compréhensible. |
| 3 | Style | `l'adoption de l'IA générative et l'automatisation des tâches du quotidien` | `l'adoption de l'IA générative et l'automatisation de vos tâches quotidiennes` | Mieux aligné sur le vouvoiement utilisé ailleurs. |
| 4 | Typographie | `23 sessions animées chez les clients` | `23 sessions animées en entreprise` | « chez les clients » est un peu lourd ; « en entreprise » est plus idiomatique. |
| 5 | Typographie | `95 %` | `95 %` | OK (espace insécable déjà présente via `&nbsp;`). |
| 6 | Typographie / ponctuation | `Formation, automatisation et conformité IA` | `Formations, automatisation et conformité IA` | Concordance partielle : on parle de plusieurs formations (catalogue) et d’une seule automatisation/conformité. |
| 7 | Cohérence | `PME et TPE` | `PME et TPE` | OK, mais veiller à ne pas mélanger avec « PME avec salariés » plus haut. |
| 8 | Grammaire | `la solution adaptée à votre taille et votre métier` | `la solution adaptée à votre taille et à votre métier` | Reprendre la préposition pour éviter le zeugme. |
| 9 | Style / anglicisme | `AI Act` | conserver `AI Act` | Terme réglementaire européen consacré, pas d’équivalent français usuel. |
| 10 | Typographie | `Accompagnement PME / Accompagnement TPE` | `Accompagnement PME / TPE` | Redondance de l’intitulé dans les onglets, mais non bloquant. |
| 11 | Syntaxe | `Vous dirigez une PME avec salariés en Sarthe ?` | `Vous dirigez une PME en Sarthe ?` | La mention « avec salariés » est redondante. |
| 12 | Style | `transforme l'IA d'un sujet abstrait en un levier concret` | `transforme l'IA d'un sujet abstrait en levier concret` | Suppression de l’article (plus élégant). |
| 13 | Style / ponctuation | `sessions pratiques adaptées à votre métier, éligibles aux financements OPCO.` | `sessions pratiques, adaptées à votre métier et éligibles aux financements OPCO.` | Virgule avant le participe et remplacement de la virgule par « et » pour la coordination. |
| 14 | Typographie | `&nbsp;sessions` | `&nbsp;sessions` | OK, espace insécable. |
| 15 | Cohérence | `Nos services` / `Formations / Automatisations / Challenge` | `Formations / Automatisations / Challenge 5 jours` | Le titre « Nos services » est répété dans la barre ; cohérent mais lourd. |
| 16 | Style | `Des formations courtes et concrètes, appliquées aux usages métier.` | `Des formations courtes et concrètes, appliquées aux usages métiers.` | « usages métier » est accepté, le pluriel est plus naturel en français. |
| 17 | Syntaxe | `chaque session laisse vos collaborateurs avec des outils` | `chaque session dote vos collaborateurs d'outils` | « laisser quelqu’un avec » est un anglicisme. |
| 18 | Style | `10 secteurs, 50+ automatisations concrètes` | `10 secteurs, plus de 50 automatisations concrètes` | Éviter le symbole « + » dans le texte courant. |
| 19 | Cohérence | `Sélectionnez votre métier et calculez votre gain mensuel` | `Sélectionnez votre secteur et estimez votre gain mensuel` | Sur la page `/automatisations/`, c’est le secteur qui est sélectionné ; « calculez » suppose un outil de calcul strict. |
| 20 | Typographie | `économisés` | `économisées` | Heures = féminin pluriel. |
| 21 | Grammaire | `Chaque jour, une action concrète avec un outil gratuit.` | `Chaque jour, une action concrète à l'aide d'un outil gratuit.` | « avec » est vague. |
| 22 | Style | `À la fin de la semaine, vous avez automatisé votre première tâche.` | `À la fin de la semaine, vous aurez automatisé votre première tâche.` | Futur antérieur plus adapté à une promesse. |
| 23 | Typographie | `100% gratuit.` | `100 % gratuit.` | Espace insécable avant le %. |
| 24 | Cohérence | `IA générative, l'automatisation et la sécurité des données` | `IA générative, automatisation et sécurité des données` | Suppression des articles répétés pour un style plus punchy. |
| 25 | Style | `Chaque cours inclut un exercice pratique et un corrigé PDF.` | `Chaque cours comprend un exercice pratique et un corrigé en PDF.` | « corrigé en PDF » plus idiomatique. |
| 26 | Typographie / orthographe | `C'est quoi exactement l'accompagnement Alliance Digitale ?` | `Qu'est-ce exactement que l'accompagnement Alliance Digitale ?` | « C'est quoi » est familier ; en B2B, préférer la forme standard. |
| 27 | Typographie / orthographe | `Je n'y connais rien en IA, c'est un problème ?` | `Je ne connais rien à l'IA : est-ce un problème ?` | Même remarque (familiarité). |
| 28 | Cohérence | `Ça concerne quelles entreprises ?` | `Quelles entreprises sont concernées ?` | Inversion pour un ton plus professionnel. |
| 29 | Grammaire | `Toute PME avec salariés` | `Toute PME employant du personnel` | Voir remarque #2. |
| 30 | Cohérence / orthographe | `mettre en conformité avant l'échéance` | `se mettre en conformité avant l'échéance` | Le sujet précédent est « nous vous aidons à » : « vous mettre en conformité » convient aussi. Garder la forme réfléchie si l’on veut insister sur la démarche de l’entreprise. |
| 31 | Typographie | `Le challenge 5 jours et l'outil de sécurité documentaire sont gratuits.` | `Le challenge de 5 jours et l'outil de sécurité documentaire sont gratuits.` | « challenge 5 jours » est un calque de l’anglais. |
| 32 | Style | `Prêt à faire de l'IA un levier concret pour votre PME ?` | `Prêt à faire de l'IA un levier concret pour votre PME ?` | OK. |

### Verdict fichier 1
**Corrections nécessaires avant publication** — environ 10 à 12 corrections retenues (le reste relève du style, optionnel).

---

## Fichier 2 — `accompagnement.astro`

### Corrections proposées

| # | Type | Original | Correction | Explication |
|---|------|----------|------------|-------------|
| 1 | Orthographe | `littératie` | `littératie` | Le terme recommandé par l’Académie française est « littératie » (depuis 2023) ; avant « littératie » était considéré comme anglicisme. Conserver l’orthographe actuelle si elle correspond à la marque. |
| 2 | Style | `on audite vos usages, on forme vos équipes, puis on automatise` | `nous auditons vos usages, nous formons vos équipes, puis nous automatisons` | Incohérence de vouvoiement/tutoiement : le reste du site vouvoie (« vous »). Remplacer « on » par « nous ». |
| 3 | Cohérence | `Session de littératie IA pour vos salariés` | `Session d'initiation à l'IA pour vos salariés` | « Littératie IA » est peu compréhensible pour le public cible. |
| 4 | Style | `gain de temps immédiat` | `gains de temps immédiats` | Pluriel plus naturel. |
| 5 | Grammaire | `Résultats mesurables` / `Exemples de gains observés sur des projets réels.` | OK | Aucun problème. |
| 6 | Typographie | `30 %` / `2h` / `100 %` | OK | Espace fine/insécable gérée côté HTML. |
| 7 | Cohérence / vouvoiement | `des salariés formés repartent avec des outils utilisables` | `vos salariés repartent avec des outils utilisables` | Éviter le passif impersonnel ; préférer le vouvoiement. |
| 8 | Cohérence | `Sécurité documents IA` | `Sécurité des documents IA` | Article manquant. |
| 9 | Style | `Parlons de vos premiers cas d'usage IA` | `Parlons de vos premiers cas d'usage de l'IA` | « cas d'usage IA » est un anglicisme incomplet. |
| 10 | Cohérence | `30 minutes suffisent pour identifier un levier concret` | `30 minutes suffisent pour identifier un levier concret` | OK. |

### Verdict fichier 2
**Corrections nécessaires avant publication** — surtout l’harmonisation du vouvoiement (#2) et quelques précisions (#3, #7, #9).

---

## Fichier 3 — `contact.astro`

### Corrections proposées

| # | Type | Original | Correction | Explication |
|---|------|----------|------------|-------------|
| 1 | Typographie | `Prenons rendez-vous` | `Prenons rendez-vous` | OK si on tutoie l’internaute ; sinon `Prenons rendez-vous` est déjà un « nous » inclusif. Cependant, dans un contexte B2B, « Prenons rendez-vous » reste acceptable. |
| 2 | Orthographe / vouvoiement | `On fera le point` | `Nous ferons le point` | « On » est familier et crée une rupture avec le vouvoiement du reste du site. |
| 3 | Typographie | `cookies tiers` | `cookies tiers` | OK. |
| 4 | Typographie | `Téléphone` / `06 86 94 34 89` | OK | Numéro correctement formaté. |

### Verdict fichier 3
**Prêt pour publication avec 2 ajustements mineurs** (#1 style, #2 cohérence vouvoiement).

---

## Fichier 4 — `politique-de-confidentialite.astro`

### Corrections proposées

| # | Type | Original | Correction | Explication |
|---|------|----------|------------|-------------|
| 1 | Cohérence | `Cette politique décrit comment sont collectées et utilisées les données` | `Cette politique décrit comment sont collectées et utilisées vos données personnelles` | Mieux aligné sur le RGPD et le vouvoiement. |
| 2 | Typographie | `Lors de la prise de rendez-vous via Cal.eu, nous collectons votre nom, votre prénom` | `Lors de la prise de rendez-vous via Cal.eu, nous collectons votre nom, votre prénom` | OK. |
| 3 | Cohérence | `votre motif de rendez-vous` | `le motif de votre rendez-vous` | Plus naturel. |
| 4 | Orthographe | `webhook sécurisé N8N` | `webhook sécurisé n8n` | La marque s’écrit « n8n » (minuscules). |
| 5 | Cohérence / orthographe | `des relais qualifiés` | `des relances qualifiées` | « relais qualifiés » n’a pas de sens clair ici ; probablement « relances commerciales qualifiées ». |
| 6 | Cohérence / juridique | `dans le respect de sa politique de confidentialité` | `dans le respect de leur politique de confidentialité` | Brevo / Sendinblue = même entité ; « sa » est acceptable. Conserver. |
| 7 | Cohérence | `3 ans à compter du dernier contact` | `trois ans à compter du dernier contact` | Dans un texte juridique, écrire les nombres en toutes lettres pour les durées. |
| 8 | Typographie | `Demande de suppression de mes données` | `Demande de suppression de mes données` | OK. |
| 9 | Style | `Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition.` | `Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement et d'opposition.` | Précision juridique (limitation = limitation du traitement). |

### Verdict fichier 4
**Corrections nécessaires avant publication** — notamment #5 (erreur de sens probable) et #9 (précision juridique).

---

## Total des corrections

- `index.astro` : 32 propositions, **~12 prioritaires**.
- `accompagnement.astro` : 10 propositions, **~4 prioritaires**.
- `contact.astro` : 3 propositions, **1 prioritaire** (vouvoiement).
- `politique-de-confidentialite.astro` : 9 propositions, **3 prioritaires**.

**Total : ~54 propositions / ~20 corrections prioritaires.**

---

## Verdict global

**Corrections nécessaires avant publication.**

Les points les plus importants :
1. **Cohérence du vouvoiement** : remplacer « on » par « nous » dans `accompagnement.astro` et `contact.astro`.
2. **Erreur de sens** : corriger `des relais qualifiés` → `des relances qualifiées` dans la politique de confidentialité.
3. **Style / registre** : éviter les formulations familières (`C'est quoi`, `Je n'y connais rien`) sur la page d’accueil B2B.
4. **Typographie** : espace fine avant `%`, accord des participes (`économisées`), prépositions répétées.
5. **Cohérence terminologique** : « challenge 5 jours » → « challenge de 5 jours », « n8n » en minuscules.

Aucun fichier n’a été modifié ; les corrections sont signalées ci-dessus pour application dans le code Astro.
