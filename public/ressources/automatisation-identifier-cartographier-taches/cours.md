# Identifier et cartographier ses tâches répétitives

## Le vrai problème : on perd des heures sans s'en rendre compte

Dans une PME, chaque minute compte. Pourtant, des salariés passent encore des heures chaque semaine à copier-coller des données, envoyer des relances manuelles, exporter des tableurs ou vérifier des informations déjà saisies ailleurs.

Ces tâches ne créent pas de valeur. Elles épuisent les équipes et retardent les projets stratégiques.

Voici des situations fréquentes que nous rencontrons chez les clients Alliance Digitale :

| Rôle | Tâche répétitive | Temps perdu | Frustration |
|---|---|---|---|
| **Assistant(e)** | Saisie manuelle des factures dans la comptabilité | 4 h/semaine | Saisies inutiles et risque d'erreurs |
| **Commercial** | Relances clients par email et suivi dans un tableur | 3 h/semaine | Opportunités oubliées, image peu professionnelle |
| **Responsable RH** | Collecte et relance des documents pour les bulletins de paie | 2 h/semaine | Retards de paie, stress relationnel |
| **Dirigeant** | Export quotidien de KPI depuis plusieurs outils | 1,5 h/semaine | Manque de visibilité temps réel |

! **La bonne nouvelle** : 80 % de ces tâches peuvent être partiellement ou totalement automatisées avec des outils no-code accessibles.

---

## Ce que vous allez gagner avec ce cours

À la fin, vous saurez :
- Repérer les tâches répétitives dans votre quotidien.
- Évaluer leur potentiel d'automatisation en 3 minutes.
- Prioriser celles qui rapportent le plus de temps gagné.
- Préparer une première feuille de route d'automatisation.

---

## Méthode : les 4 critères de la tâche "automatisable"

Une tâche est un bon candidat à l'automatisation si elle cumule ces 4 critères :

1. **Répétitive** : elle se produit régulièrement (quotidienne, hebdomadaire, mensuelle).
2. **Règles claires** : elle suit une logique prévisible ("si X, alors Y").
3. **Source de données identifiable** : les informations sont déjà dans un outil numérique.
4. **Consommatrice de temps** : elle prend au moins 30 minutes par semaine.

Exemple de tâche idéale :
> "Chaque lundi, j'exporte mes prospects du CRM vers un fichier Excel, je filtre ceux qui n'ont pas répondu depuis 7 jours, puis j'envoie un email de relance manuellement."

Cette tâche est répétitive, régie par des règles, alimentée par un CRM et prend 1 à 2 heures par semaine.

---

## Exemples concrets par rôle

### Assistant(e) administratif(ve)
**Tâche** : recevoir des factures par email, les renommer et les enregistrer dans le drive.

**Solution** :
- Utiliser un workflow qui écoute la boîte email "factures@".
- Extraire automatiquement le fournisseur, la date et le montant.
- Renommer le fichier et l'enregistrer dans le bon dossier.

**Outils possibles** :
- Gratuit : n8n (auto-hébergé), Make (plan limité), Google Apps Script.
- Payant : Make Pro, Zapier, Microsoft Power Automate.

### Commercial
**Tâche** : relancer les prospects sans réponse depuis plus de 7 jours.

**Solution** :
- Déclencher automatiquement une séquence d'emails personnalisés.
- Créer une alerte si le prospect clique ou répond.
- Mettre à jour le statut dans le CRM sans intervention manuelle.

**Outils possibles** :
- Gratuit : n8n + Brevo/Mailgun, HubSpot CRM (version gratuite limitée).
- Payant : HubSpot Sales Hub, Pipedrive, Make.

### Responsable RH
**Tâche** : relancer les salariés pour les documents de paie manquants.

**Solution** :
- Lister automatiquement les salariés avec un document manquant.
- Envoyer un email personnalisé avec la liste.
- Créer une tâche de suivi si pas de réponse sous 48 h.

**Outils possibles** :
- Gratuit : Notion + n8n, Google Sheets + Apps Script.
- Payant : Factorial, Payfit (fonctionnalités intégrées), Make.

---

## Les 5 étapes pour cartographier ses tâches

### Étape 1 — Audit rapide de la semaine
Pendant 3 à 5 jours, notez chaque tâche qui :
- Vous fait dire "encore ?"
- Implique du copier-coller.
- Est réalisée à la même heure ou le même jour.

### Étape 2 — Classement par fréquence et temps
Utilisez cette matrice simple :

| Tâche | Fréquence | Temps/semaine | Répétitive | Source de données | Score |
|---|---|---|---|---|---|
| Saisie factures | Quotidien | 4 h | Oui | Email + Drive | **Prioritaire** |
| Relances clients | Hebdo | 3 h | Oui | CRM | **Prioritaire** |
| Rapport KPI | Hebdo | 1,5 h | Oui | 3 outils | À évaluer |
| Tri emails | Quotidien | 2 h | Partiel | Messagerie | À évaluer |

### Étape 3 — Vérifier la disponibilité des données
Une tâche ne peut pas être automatisée si ses données sont :
- uniquement sur papier ;
- dans la tête d'un seul salarié ;
- éparpillées dans des fichiers non structurés.

**Action** : centraliser d'abord les données dans un outil accessible (Notion, Airtable, CRM, tableur partagé).

### Étape 4 — Choisir la première victoire
Concentrez-vous sur la tâche qui :
- prend le plus de temps ;
- a le moins de risque si l'automatisation dysfonctionne ;
- est la plus simple à découper.

### Étape 5 — Rédiger une fiche processus
Pour la tâche choisie, décrivez :
- Le déclencheur (quand ça commence ?)
- Les étapes actuelles (qui fait quoi ?)
- Les données utilisées
- Les cas d'exception (quand ça ne marche pas ?)
- Le résultat attendu

---

## Prompts IA sécurisés pour vous aider

Utilisez ces prompts dans un outil IA local (Ollama) ou en supprimant toute donnée personnelle :

**Prompt 1 — Identifier les tâches répétitives**
```
Je suis [votre rôle] dans une PME de [secteur] avec [nombre] salariés.
Ma mission principale est : [décrire].
Listez 10 tâches répétitives que je fais probablement chaque semaine.
Pour chacune, indiquez : fréquence, temps estimé, outils utilisés, potentiel d'automatisation (facile / moyen / difficile).
Ne me demandez aucune donnée personnelle.
```

**Prompt 2 — Rédiger une fiche processus**
```
Voici une tâche que je veux automatiser : [description anonymisée].
Rédigez une fiche processus avec : déclencheur, étapes, données utilisées, cas d'exception, résultat attendu.
Ne mentionnez aucun nom, email, client ou salarié réel.
```

---

## Outils gratuits et payants pour démarrer

| Besoin | Gratuit | Payant |
|---|---|---|
| Orchestrer des workflows | n8n (auto-hébergé), Make (1 000 ops/mois) | Make, Zapier, Power Automate |
| Centraliser des données | Notion, Airtable (plan gratuit), Google Sheets | Airtable Pro, Notion Enterprise |
| Emails automatisés | Brevo (300 emails/jour), Mailgun (essai) | Brevo, Mailchimp, HubSpot |
| Stocker et partager des fichiers | Google Drive, Nextcloud | Dropbox Business, SharePoint |
| Connecter des API sans coder | n8n, Apps Script | Make, Zapier, Workato |

---

## Accompagnement Alliance Digitale

Vous avez identifié plusieurs tâches mais ne savez pas par laquelle commencer ? Notre accompagnement "Automatisation PME" vous aide à :
- cartographier vos processus en 2 heures ;
- choisir le premier workflow à déployer ;
- le construire avec vous et le documenter ;
- former un référent interne.

Réservez un appel découverte de 30 minutes : [https://cal.eu/alliance-digitale/decouverte-30-min](https://cal.eu/alliance-digitale/decouverte-30-min)
