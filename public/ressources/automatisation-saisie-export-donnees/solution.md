# Corrigé de l’exercice — Saisie et export de données

## 1. Cartographie de la saisie actuelle

| Source | Format | Erreurs fréquentes |
|---|---|---|
| Emails avec photos de tickets | JPG/PNG | Date manquante, montant illisible |
| Fichiers Excel individuels | XLSX | Montants sans TVA, catégorie absente |
| Messages WhatsApp | Texte | Informations incomplètes, pas de justificatif |

## 2. Formulaire unique (exemple Tally / Google Forms / Typeform)

| Champ | Type | Obligatoire ? | Objectif |
|---|---|---|---|
| Date de la dépense | Date | Oui | Saisie chronologique |
| Montant TTC | Nombre | Oui | Calcul correct |
| Catégorie | Liste | Oui | Regroupement comptable |
| Justificatif | Fichier | Oui | Preuve de la dépense |
| Email du collaborateur | Email | Oui | Identification |

## 3. Workflow proposé

```
Formulaire de saisie
        │
        ▼
Google Sheets ou Airtable (stockage centralisé)
        │
        ▼
Validation automatique : date cohérente, montant > 0, catégorie renseignée
        │
        ├── OK ──► Ligne validée
        └── KO ──► File de rejet + notification collaborateur
        │
        ▼
Export CSV mensuel (nommé : notes-de-frais_YYYY-MM.csv)
        │
        ▼
Email au comptable avec lien Drive sécurisé
```

## 4. Règles de validation

| Règle | Pourquoi ? |
|---|---|
| La date doit être dans le mois en cours ou le mois précédent | Évite les notes de frais trop anciennes ou futures |
| Le montant TTC doit être numérique et strictement positif | Évite les erreurs de saisie |
| Le champ catégorie doit appartenir à la liste prédéfinie | Facilite le regroupement comptable |

## 5. Outil choisi

**n8n self-hosted + Google Forms + Google Sheets** pour la gratuité et la flexibilité. Alternative plus simple sans serveur : **Tally + Make + Google Sheets**. Si l'équipe est déjà sur Microsoft 365 : **Microsoft Forms + Power Automate + Excel Online**.

## 6. Prompt IA sécurisé

> Tu es développeur n8n. J'ai un formulaire de notes de frais qui alimente un Google Sheets. Avant l'export mensuel, je veux nettoyer les données et détecter les anomalies. Donne-moi un workflow n8n avec : 1) lecture des nouvelles lignes du Google Sheets, 2) transformation des montants au format nombre avec 2 décimales, 3) normalisation des catégories selon une liste prédéfinie, 4) détection des doublons par date + montant + collaborateur, 5) envoi d’une alerte email si une ligne est rejetée. Ne cite aucune donnée client ni identifiant réel.

## Grille d’évaluation du livrable

| Critère | 1 point | 2 points | 3 points |
|---|---|---|---|
| Cartographie | Sources mal identifiées | Sources identifiées sans erreurs | Sources, formats et erreurs clairement listés |
| Formulaire | Champs inadaptés | Champs pertinents mais mal justifiés | 5 champs obligatoires pertinents et justifiés |
| Workflow | Étapes confuses | Étapes claires mais sans validation | Étapes claires avec validation et gestion des rejets |
| Règles de validation | Moins de 3 règles | 3 règles mais peu justifiées | 3 règles pertinentes avec explication |
| Choix d’outil | Outil inadapté | Outil adapté mais sans justification | Outil adapté avec alternatives et justification |
| Prompt IA | Prompt vague | Prompt correct mais avec données réelles | Prompt clair, sans données réelles, avec étapes précises |