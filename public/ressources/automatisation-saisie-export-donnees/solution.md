## Solution indicative

### 1. Cartographie de la saisie actuelle

- **Sources** : emails avec photos de tickets, fichiers Excel individuels, messages WhatsApp.
- **Formats** : images JPG/PNG, PDF, XLSX.
- **Erreurs fréquentes** : date manquante, montant sans TVA, absence de catégorie, doublons.

### 2. Formulaire unique (exemple Tally / Google Forms / Typeform)

Champs obligatoires :
1. Date de la dépense (date).
2. Montant TTC (nombre).
3. Catégorie (liste : repas, transport, hébergement, fournitures, autres).
4. Justificatif (fichier image/PDF).
5. Email du collaborateur (email).

### 3. Workflow proposé

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

### 4. Règles de validation

1. La date doit être dans le mois en cours ou le mois précédent (pas de date future).
2. Le montant TTC doit être numérique et strictement positif.
3. Le champ catégorie doit appartenir à la liste prédéfinie.

### 5. Outil choisi

**n8n self-hosted + Google Forms + Google Sheets** pour la gratuité et la flexibilité. Alternative plus simple sans serveur : **Tally + Make + Google Sheets**. Si l'équipe est déjà sur Microsoft 365 : **Microsoft Forms + Power Automate + Excel Online**.

### 6. Prompt IA sécurisé

```
Tu es développeur n8n. J'ai un formulaire de notes de frais qui alimente un Google Sheets.
Avant l'export mensuel, je veux nettoyer les données et détecter les anomalies.
Donne-moi un workflow n8n avec :
1. Lecture des nouvelles lignes du Google Sheets.
2. Transformation des montants au format nombre avec 2 décimales.
3. Normalisation des dates au format ISO.
4. Détection des doublons par email + date + montant.
5. Envoi des lignes non conformes dans un onglet « À contrôler ».
N'utilise aucune donnée réelle. Utilise des placeholders génériques.
```

### Point de vigilance

Avant production, testez le formulaire avec 5 notes de frais fictives, vérifiez l'export CSV dans votre logiciel comptable et assurez-vous que seuls le manager et le comptable ont accès au Google Sheets final.