# Documenter son workflow automatique

## Pourquoi documenter est une compétence d'automatisation

Automatiser sans documenter, c'est construire une machine dont personne ne connaît le mode d'emploi. Si la personne qui a créé le workflow part en congés, quitte l'entreprise ou tombe malade, la PME se retrouve vulnérable.

Une bonne documentation permet de :

- comprendre rapidement ce que fait le workflow ;
- dépanner sans panique ;
- transférer la responsabilité à un collègue ;
- améliorer progressivement l'automatisation.

::: retenir L’idée centrale
Un workflow documenté appartient à l'entreprise. Un workflow non documenté appartient à la personne qui l'a créée.
:::

### Pourquoi cela concerne une PME en Sarthe ?

- Dans une PME, une seule personne concentre souvent les compétences techniques.
- Les congés, les départs ou les absences maladies sont des risques réels.
- Un workflow mal compris peut générer des erreurs coûteuses : mauvais envoi de données, relances oubliées, factures en retard.

::: card Exemple 1 : le cabinet comptable du Mans
Un collaborateur a créé un workflow Google Apps Script qui envoie des alertes SMS. Il part à la retraite. Personne ne sait comment il fonctionne. Le cabinet perd 3 semaines à le redécouvrir.
:::

## Les 7 éléments d'une fiche workflow utile

### 1. Nom explicite
Évitez les titres vagues comme « Scénario n°3 ». Privilégiez :
- Relance devis non signés après 48 h
- Alerte stock bas matières premières
- Export hebdomadaire des factures fournisseurs

### 2. Objectif métier
Pourquoi ce workflow existe-t-il ? Quel problème résout-il ?

Exemple : _Réduire le délai moyen de signature des devis en relançant automatiquement les prospects dans les 48 heures._

### 3. Déclencheur
Quel événement lance le scénario ?

- Date/heure récurrente (tous les lundis à 9 h).
- Événement dans un outil (nouvelle ligne dans Google Sheets, statut modifié dans Notion).
- Action externe (réception d'un email, soumission d'un formulaire).

### 4. Étapes principales
Décrivez chaque étape en langage humain, sans jargon technique inutile :

1. Vérifier les devis avec le statut « Envoyé » depuis plus de 48 h.
2. Récupérer l'email du prospect.
3. Envoyer un email de relance personnalisé.
4. Mettre à jour le statut du devis en « Relancé ».
5. Notifier le commercial en cas d'erreur d'envoi.

### 5. Données utilisées
Listez les données entrantes et sorties, et précisez si elles sont sensibles.

Exemple : email prospect, référence devis, montant — données à protéger.

### 6. Outils et accès
Quels outils sont connectés ? Qui possède les accès ? Où sont stockés les mots de passe et tokens ?

### 7. Propriétaire et date de révision
Indiquez le responsable du workflow et la fréquence de mise à jour.

::: tip Conseil pratique
Conservez toutes les fiches workflow dans un même endroit : Notion, Confluence, Google Drive ou un dossier partagé. Utilisez un modèle unique pour que toutes les fiches aient la même structure.
:::

## Exemple de fiche workflow complète

| Élément | Détail |
|---|---|
| Nom | Relance devis non signés après 48 h |
| Objectif | Réduire le délai de signature des devis |
| Déclencheur | Tous les jours à 9 h |
| Étapes | Vérifier les devis envoyés depuis +48 h → envoyer un email de relance → mettre à jour le statut |
| Données | Email prospect, référence devis, montant |
| Outils | HubSpot, Gmail, n8n |
| Accès | Compte automation@monentreprise.fr, stocké dans le gestionnaire de mots de passe |
| Propriétaire | Prénom NOM |
| Révision | Mensuelle |

::: card Exemple 2 : la PME de conseil de La Flèche
Une consultante documente ses 4 workflows dans Notion. Lors de son congé maternité, une collègue reprend chaque scénario en 30 minutes grâce aux fiches. Aucun incident de production.
:::

## Plan d’action cette semaine

1. **Lister les workflows existants** dans votre entreprise.
2. **Créer un modèle de fiche** avec les 7 éléments.
3. **Remplir une fiche** pour le workflow le plus critique.
4. **Désigner un propriétaire** et une fréquence de révision.
5. **Stocker les fiches** dans un endroit accessible à toute l’équipe.

::: retenir En résumé
Documenter un workflow, ce n’est pas une corvée. C’est l’assurance que l’automatisation continuera de fonctionner, même en l’absence de son créateur.
:::