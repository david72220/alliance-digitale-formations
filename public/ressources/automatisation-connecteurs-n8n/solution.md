## Solution indicative

### 1. Applications identifiées

- **Formulaire** : Typeform (ou Google Forms).
- **Stockage** : Google Sheets.
- **Email** : Gmail.
- **Alerte optionnelle** : Slack.

### 2. Workflow proposé

```
Typeform (nouvelle réponse)
    │
    ▼
Google Sheets (ajouter une ligne avec : nom, email, besoin, budget, date)
    │
    ▼
Condition IF : budget > 5 000 € ?
    │
    ├── OUI ──► Slack (notifier @commercial : gros lead à qualifier)
    │
    └── NON ──► Gmail (envoyer email de confirmation standard au demandeur)
```

### 3. Permissions API nécessaires

- **Typeform** : lecture des réponses du formulaire (`forms:responses:read`).
- **Google Sheets** : écriture sur une feuille spécifique (`spreadsheets` scope).
- **Gmail** : envoi d'email (`gmail.send` ou compte de service SMTP).
- **Slack** : envoi de message dans un canal (`chat:write:bot`).

### 4. Prompt IA sécurisé

```
Tu es expert n8n. Je veux automatiser la collecte de demandes de devis depuis un formulaire vers un tableau et un email de confirmation.
Le workflow doit inclure une alerte si le budget dépasse un seuil.
Donne-moi : 1) les nœuds conseillés, 2) les scopes API minimaux, 3) les bonnes pratiques de sécurité, 4) une méthode de test sans envoyer d'email réel.
Ne cite aucune donnée client ni identifiant réel.
```

### 5. Questions pour l'atelier Alliance Digitale

1. Quelle solution d'hébergement n8n recommandez-vous pour notre niveau technique interne ?
2. Comment sécuriser les accès API si plusieurs collaborateurs doivent intervenir sur le workflow ?
3. Quels indicateurs (KPI) suivre pour mesurer le gain de temps réel de cette automatisation ?

### Point de vigilance

Avant de passer en production, testez le scénario avec des données fictives (ex. : `jean.dupont@example.com`) et activez un log Google Sheets pour tracer chaque exécution.