# Automatiser la saisie et l'export de données : fini la copie manuelle

## Qu’est-ce que la saisie automatique ?

La saisie automatique, c’est le fait de faire circuler des informations d’un outil à l’autre sans avoir à les recopier. Elle concerne aussi bien la collecte de données (formulaire, email) que leur transformation et leur export vers un autre logiciel.

::: retenir L’idée centrale
Dans une PME, la saisie manuelle représente souvent 2 à 4 heures par semaine et par collaborateur. L’automatisation réduit les erreurs, libère du temps et améliore la réactivité.
:::

### Pourquoi cela concerne une PME en Sarthe ?

- Un artisan remplit des rapports d’intervention papier puis les recopie le soir.
- Un commerçant reçoit des commandes sur son site puis les saisit dans son logiciel comptable.
- Un consultant collecte des notes de frais par email, WhatsApp et photo.
- Toutes ces doubles saisies peuvent être éliminées ou réduites.

::: card Exemple 1 : le technicien en Sarthe
Un technicien en maintenance remplit un formulaire sur son téléphone à chaque intervention. Les données arrivent automatiquement dans un Google Sheets, puis génèrent un PDF envoyé au client. Fini la retranscription le soir au bureau.
:::

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
- **Scénario** : Emails avec pièce jointe → extraction des CSV/Excel → consolidation dans un Google Sheets unique → alerte si doublon.

::: tip Conseil pratique
Avant d’automatiser, commencez par centraliser. Un formulaire unique vaut mieux que trois canaux de collecte différents.
:::

## Les 4 étapes d’un flux de saisie automatisé

| Étape | Question | Exemple |
|---|---|---|
| 1. Collecte | D’où viennent les données ? | Formulaire, email, fichier CSV |
| 2. Stockage | Où les données sont-elles centralisées ? | Google Sheets, Airtable, Notion |
| 3. Validation | Quelles règles vérifient la qualité ? | Montant > 0, date cohérente, catégorie connue |
| 4. Export | Où les données doivent-elles aller ? | Logiciel comptable, CRM, outil de paie |

## Exemple de prompt IA pour nettoyer des données

> Tu es développeur n8n. J'ai un formulaire de notes de frais qui alimente un Google Sheets. Avant l'export mensuel, je veux nettoyer les données et détecter les anomalies. Donne-moi un workflow n8n avec : 1) lecture des nouvelles lignes, 2) transformation des montants au format nombre avec 2 décimales, 3) normalisation des catégories, 4) détection des doublons, 5) envoi d’une alerte si une ligne est rejetée. Ne cite aucune donnée client réelle.

::: card Exemple 2 : la PME de nettoyage du Mans
Une PME collecte les heures de travail via un formulaire. Chaque semaine, un script vérifie que les heures sont cohérentes et génère un export pour la paie. L’administratif gagne 2 heures par semaine.
:::

## Données sensibles et sécurité

- Ne jamais faire circuler des données clients, salariés ou financières sans contrôle d’accès.
- Limiter les permissions des outils interconnectés.
- Anonymiser les données de test.
- Documenter chaque flux (voir le micro-cours « Documenter son workflow automatique »).

::: attention Point de vigilance
Un flux mal configuré peut créer des doublons, supprimer des données ou envoyer des informations à la mauvaise personne. Testez toujours avec des données fictives avant de passer en production.
:::

## Plan d’action cette semaine

1. **Identifier la tâche de copie** la plus chronophage de votre activité.
2. **Lister les outils impliqués** (source, stockage, destination).
3. **Créer un formulaire unique** de collecte si les données arrivent par plusieurs canaux.
4. **Dessiner le flux** sur papier ou dans un outil de diagramme.
5. **Choisir un outil d’automatisation** adapté à votre niveau technique.
6. **Tester avec des données fictives** avant de connecter de vraies données.

::: retenir En résumé
Automatiser la saisie, c’est surtout éliminer les doubles recopies et les erreurs humaines. Un flux bien pensé commence par une collecte propre, une validation des données et un export fiable.
:::