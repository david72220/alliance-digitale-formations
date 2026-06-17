## Objectifs du cours

À l'issue de ce micro-cours, vous serez capable de :

- Identifier les connecteurs utiles dans votre pile logicielle.
- Construire un premier workflow dans n8n en mode no-code/low-code.
- Comprendre la différence entre déclencheurs (triggers), actions et conditions.
- Sécuriser les accès API et gérer les erreurs.
- Savoir quand opter pour un outil gratuit ou un plan payant.

## Pourquoi les connecteurs changent la donne

Une PME manipule des données dans Gmail, Google Sheets, Notion, Airtable, HubSpot, Shopify, Stripe, Slack, Calendly… Sans connecteur, ces outils ne parlent pas entre eux. Résultat : recopie manuelle, oublis, perte de temps.

Un connecteur est une passerelle qui permet à deux applications d'échanger des données automatiquement. Il se matérialise souvent par une clé API, un webhook ou une intégration native.

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

## Les 3 briques d'un workflow n8n

1. **Trigger (déclencheur)** : l'événement qui lance le scénario.
   - Exemples : nouvel email, nouvelle ligne Sheets, webhook, planification horaire.
2. **Action (nœud)** : l'opération réalisée sur une autre application.
   - Exemples : créer une fiche, envoyer un message, mettre à jour un statut.
3. **Condition / Logique** : filtre, boucle, branchement IF, fonction JavaScript.
   - Exemples : si le montant > 500 €, alerter le commercial ; sinon, traitement standard.

## Outils gratuits et payants

| Outil | Type | Avantage | Prix indicatif |
|---|---|---|---|
| **n8n Cloud** | Hébergé par n8n | Facile à démarrer, sauvegardes incluses | Gratuit (auto-hébergement) ou à partir de ~20 €/mois/cloud |
| **n8n Self-hosted** | Auto-hébergé | Gratuit, contrôle total des données | Gratuit (hors hébergement) |
| **Zapier** | SaaS | Très grand catalogue d'intégrations | Gratuit limité, puis ~20–70 €/mois |
| **Make (ex-Integromat)** | SaaS | Interface visuelle puissante | Gratuit limité, puis ~9–16 €/mois |
| **Google Apps Script** | Code léger | Gratuit pour écosystème Google | Gratuit |
| **Power Automate** | Microsoft | Intégration Office 365 / Dynamics | Gratuit limité, puis licences Microsoft |

> **Conseil Alliance Digitale** : commencez par n8n self-hosted si vous avez un profil technique interne ; choisissez n8n Cloud ou Zapier si vous voulez démarrer en 48 h sans serveur.

## Prompt IA sécurisé pour concevoir un scénario

Voici un prompt que vous pouvez envoyer à un assistant IA (Claude, ChatGPT, Gemini) sans exposer vos données confidentielles :

```
Tu es un expert en automatisation n8n pour une PME de [secteur].
Je veux automatiser ce processus métier : [description générique du processus, sans nom de client ni données personnelles].
Donne-moi un workflow en 3 à 5 nœuds avec :
1. Un déclencheur adapté.
2. Les actions principales.
3. Une condition de contrôle qualité.
4. Les permissions API minimales nécessaires.
5. Les risques de sécurité à anticiper.
N'utilise pas de données réelles dans ta réponse.
```

## Sécuriser les accès

- Stockez les clés API dans les **credentials** de n8n, jamais en dur dans le code.
- Utilisez des comptes de service dédiés (pas votre compte personnel).
- Limitez les permissions au strict nécessaire (principe du moindre privilège).
- Activez l'authentification sur votre instance n8n et changez le mot de passe par défaut.
- Testez d'abord en mode « Execute Once » avant d'activer une planification.

## Astuces opérationnelles

- Nommez chaque nœud explicitement : « Créer contact HubSpot » plutôt que « HubSpot 1 ».
- Documentez le but du workflow dans la description de l'onglet.
- Utilisez des variables d'environnement pour les URL et IDs sensibles.
- Programmez un réexamen mensuel : un workflow qui tourne sans surveillance peut devenir un risque.

## Pour aller plus loin

Alliance Digitale accompagne les PME de la Sarthe dans le choix des outils, la mise en place de workflows sécurisés et la formation des équipes. Vous pouvez réserver un atelier gratuit de 30 minutes pour auditer un processus clé.