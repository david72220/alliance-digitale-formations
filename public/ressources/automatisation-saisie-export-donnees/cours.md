## Objectifs du cours

À l'issue de ce micro-cours, vous serez capable de :

- Repérer les tâches de saisie répétitives et sources d'erreur.
- Automatiser le transfert de données entre formulaires, tableurs et applications.
- Nettoyer et transformer des données avant export.
- Choisir le bon outil selon le volume et la complexité.
- Sécuriser les exports sensibles (RGPD, accès restreints).

## Pourquoi automatiser la saisie ?

Dans une PME, la saisie manuelle représente souvent 2 à 4 heures par semaine et par collaborateur :

- Recopier des commandes dans un tableau.
- Reporter des heures, des notes de frais, des contacts.
- Fusionner plusieurs fichiers Excel avant un reporting.
- Mettre à jour un CRM à partir d'une liste de prospects.

L'automatisation réduit les erreurs, libère du temps et améliore la réactivité.

## Exemples par rôle

### Commerçant / E-commerce
- **Problème** : chaque commande Shopify doit être retranscrite dans Pennylane ou dans un fichier de suivi comptable.
- **Scénario** : Shopify (nouvelle commande) → Google Sheets (log de ventes) → Notion (fiche client) → export mensuel vers l'outil comptable.

### Artisan / BTP
- **Problème** : les techniciens remplissent des rapports d'intervention papier ou sur téléphone, puis l'admin les retranscrit.
- **Scénario** : Formulaire mobile (Google Forms / Tally) → Google Sheets → PDF généré automatiquement → Drive dossier client → notification manager.

### Responsable RH / Manager
- **Problème** : collecter les congés, les heures supplémentaires et les notes de frais sur plusieurs canaux.
- **Scénario** : Formulaire Typeform → Airtable (base centralisée) → validation manager → export CSV pour la paie.

### Comptable / Administratif
- **Problème** : à la fin du mois, il faut consolider 5 fichiers Excel de dépenses envoyés par email.
- **Scénario** : Emails avec pièce jointe → extraction des CSV/Excel → consolidation dans un Google Sheets unique → alerte si doublon ou montant anormal.

## Le flux type : saisie → nettoyage → stockage → export

```
Source (formulaire, email, fichier)
        │
        ▼
Nettoyage (suppression doublons, formats uniformes, validation)
        │
        ▼
Stockage centralisé (Google Sheets, Airtable, Notion, CRM)
        │
        ▼
Export / Synchronisation vers outil métier ou rapport
```

## Les règles de qualité des données

1. **Un seul point d'entrée** : évitez les doubles saisies.
2. **Validation en amont** : champs obligatoires, listes déroulantes, formats de date.
3. **Normalisation** : prénom/nom en capitales, emails en minuscules, téléphone au format international.
4. **Détection des doublons** : comparer email ou numéro de téléphone avant création.
5. **Traçabilité** : conserver la date de saisie, la source et l'auteur.

## Outils gratuits et payants

| Outil | Type | Idéal pour | Prix indicatif |
|---|---|---|---|
| **n8n** | No-code/low-code | Workflows complexes, multi-applications | Gratuit (self-hosted) |
| **Zapier** | SaaS no-code | Connexions rapides sans technique | Gratuit limité, puis payant |
| **Make (ex-Integromat)** | SaaS no-code | Transformations visuelles avancées | Gratuit limité, puis ~9 €/mois |
| **Google Apps Script** | Code léger | Écosystème Google uniquement | Gratuit |
| **Microsoft Power Automate** | Microsoft 365 | Entreprises équipées Microsoft | Inclus / licences |
| **Airtable Automations** | Base de données + automation | Consolidation et logique métier | Gratuit limité, puis ~20 €/utilisateur |
| **Notion + Make** | Base de données + connecteurs | Gestion de connaissances et suivi | Selon plan Make |

> **Conseil Alliance Digitale** : si 80 % de vos données sont dans Google Sheets et Gmail, commencez par **Google Apps Script** ou **n8n** gratuit. Si vous avez besoin de règles métier complexes (validation, multi-étapes, rapports), envisagez **Airtable** ou **n8n self-hosted**.

## Prompt IA sécurisé pour créer un workflow de saisie

```
Tu es expert en automatisation de données pour une PME de [secteur].
Je veux automatiser la saisie de [type de données : commandes, heures, dépenses, contacts] provenant de [source : formulaire, email, fichier].
Donne-moi :
1. L'architecture du workflow (trigger, transformations, stockage, export).
2. Les règles de validation et de nettoyage indispensables.
3. Une méthode de détection des doublons.
4. Les permissions minimales nécessaires.
5. Les risques RGPD à anticiper.
N'utilise pas de données réelles dans ta réponse.
```

## Exemple de nettoyage automatique

Avant export, un workflow peut :

- Supprimer les lignes vides.
- Convertir les virgules en points pour les montants.
- Uniformiser les formats de date (YYYY-MM-DD).
- Vérifier qu'un email contient « @ » et un domaine valide.
- Marquer les anomalies (montant > 1 000 €, champ manquant) pour contrôle humain.

## Sécuriser les exports

- **Limiter l'accès** : partagez les Google Sheets / Airtable uniquement avec les personnes concernées.
- **Anonymiser** : exportez les données personnelles uniquement si nécessaire.
- **Chiffrer** : utilisez des liens de partage sécurisés avec expiration pour les exports sensibles.
- **Journaliser** : gardez une trace des exports effectués (qui, quand, quoi).
- **RGPD** : effacez ou anonymisez les données des contacts inactifs après la durée légale.

## Astuces opérationnelles

- Commencez par cartographier les 3 tâches de saisie les plus chronophages.
- Automatisez d'abord un cas simple à 80 %, puis itérez.
- Prévoyez toujours une « file de rejet » pour les données non conformes.
- Testez avec un échantillon de 20 lignes avant généralisation.
- Documentez le workflow et nommez les champs de manière cohérente.

## Pour aller plus loin

Alliance Digitale aide les PME sarthoises à auditer leurs processus de saisie, à choisir l'outil adapté et à former les équipes. Un atelier de 2 heures suffit souvent pour identifier les 2 à 3 workflows les plus rentables.