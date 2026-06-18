# Connecteurs et scénarios avec n8n : relier vos outils du quotidien

## Qu’est-ce qu’un connecteur ?

Un **connecteur** est une passerelle qui permet à deux applications d’échanger des données automatiquement. Il se matérialise souvent par une clé API, un webhook ou une intégration native.

::: retenir L’idée centrale
Sans connecteur, vos outils ne parlent pas entre eux. Résultat : recopie manuelle, oublis, perte de temps. Un connecteur permet de créer des flux automatisés entre vos applications.
:::

### Pourquoi cela concerne une PME en Sarthe ?

- Une PME utilise Gmail, Google Sheets, Notion, Airtable, HubSpot, Shopify, Stripe, Slack, Calendly…
- Chaque outil a ses données. Les connecter évite les doubles saisies.
- n8n est un outil open source qui permet de créer ces connexions sans coder, ou presque.

::: card Exemple 1 : le restaurant du Mans
Un restaurant utilise Shopify pour les commandes en ligne, Google Sheets pour le suivi des ventes et Gmail pour les confirmations. Avec n8n, une nouvelle commande Shopify alimente automatiquement le tableur et envoie un email au client.
:::

## Les 3 briques d'un workflow n8n

| Brique | Rôle | Exemple |
|---|---|---|
| **Trigger** | Déclencheur qui lance le scénario | Nouvelle ligne Google Sheets, nouvel email |
| **Node** | Action réalisée par le workflow | Envoyer un email, créer une fiche |
| **Condition** | Logique de décision | Si montant > 5 000 €, alerter le commercial |

::: tip Conseil pratique
Avant d’ouvrir n8n, dessinez votre workflow sur papier. Un schéma simple avec des boîtes et des flèches aide à ne pas se perdre dans les nœuds.
:::

## Exemples par rôle

### Commerçant / E-commerce
- **Problème** : un client passe commande sur Shopify. Il faut l'ajouter au CRM, envoyer un SMS de confirmation et alimenter un tableau de bord.
- **Scénario n8n** : Shopify (trigger) → HubSpot (création contact) → Twilio (SMS) → Google Sheets (ligne de suivi).

### Responsable RH / Manager
- **Problème** : à chaque entretien annuel, il faut relancer les managers pour remplir un formulaire.
- **Scénario n8n** : Calendly (RDV planifié) → Notion (création fiche) → Slack (notification manager) → Gmail (rappel J-3).

### Comptable / Administratif
- **Problème** : récupérer les factures reçues par email et les stocker dans un dossier Drive avec une nomenclature.
- **Scénario n8n** : Gmail (nouveau message avec pièce jointe PDF) → Google Drive (upload) → Google Sheets (log).

### Chef de projet / Consultant
- **Problème** : synchroniser les tâches entre un formulaire Typeform et un tableau Airtable.
- **Scénario n8n** : Typeform (nouvelle réponse) → Airtable (nouvel enregistrement) → Slack (alerte équipe).

::: card Exemple 2 : le bureau d’études de La Flèche
Un bureau d’études connecte son formulaire de demande de devis à un Google Sheets, puis à un email de confirmation, puis à une alerte Slack si le budget dépasse 10 000 €. Le temps de traitement des demandes est divisé par deux.
:::

## Choisir entre hébergement gratuit et payant

| Option | Avantage | Inconvénient | Pour qui ? |
|---|---|---|---|
| n8n cloud (payant) | Simple, pas de serveur à gérer | Coût mensuel | PME sans compétence technique |
| n8n self-hosted (gratuit) | Gratuit, contrôle total | Nécessite un serveur ou un NAS | PME avec un peu de technique |

::: attention Point de vigilance
Un connecteur mal configuré peut créer des boucles infinies (par exemple, envoyer 100 emails en 1 minute). Testez toujours avec des données fictives et surveillez les logs.
:::

## Sécurité des connecteurs

- Utilisez des comptes dédiés (pas votre compte personnel).
- Limitez les permissions au strict nécessaire.
- Stockez les clés API dans un gestionnaire de mots de passe.
- Documentez chaque workflow (voir le micro-cours « Documenter son workflow automatique »).

## Plan d’action cette semaine

1. **Lister vos 5 outils principaux** et les données qu’ils contiennent.
2. **Identifier une doublure** : quelle information est recopiée d’un outil à l’autre ?
3. **Dessiner un workflow** simple avec 1 trigger, 2 actions et 1 condition.
4. **Tester n8n** en version cloud ou auto-hébergée.
5. **Créer un premier scénario** avec des données fictives.

::: retenir En résumé
n8n relie vos outils du quotidien pour éliminer les recopies manuelles. Le succès vient d’un bon cadrage, d’une maîtrise des permissions et de tests rigoureux.
:::