# Documenter son workflow automatique

## Pourquoi documenter est une compétence d'automatisation

Automatiser sans documenter, c'est construire une machine dont personne ne connaît le mode d'emploi. Si la personne qui a créé le workflow part en congés, quitte l'entreprise ou tombe malade, la PME se retrouve vulnérable.

Une bonne documentation permet de :

- comprendre rapidement ce que fait le workflow ;
- dépanner sans panique ;
- transférer la responsabilité à un collègue ;
- améliorer progressivement l'automatisation.

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

### 7. Propriétaire et date de dernière révision
Indiquez le responsable du workflow et quand la fiche a été mise à jour. Prévoyez une révision tous les 6 mois.

## Exemples concrets par rôle

**Dirigeant(e)**
- Documentation d'un workflow de reporting hebdomadaire : qui reçoit le mail, quelles données sont incluses, qui peut modifier la liste de diffusion.

**Commercial(e)**
- Fiche de la relance automatique des devis : règles de fréquence, maximum de relances, texte des emails, conditions d'arrêt.

**Comptable / Gestionnaire**
- Documentation de l'export des factures fournisseurs : formats acceptés, dossier de destination, règles de nommage, procédure en cas d'erreur.

**Responsable production / Atelier**
- Fiche de l'alerte stock bas : seuils déclencheurs, liste des produits concernés, destinataires des alertes, fournisseurs à contacter.

## Outils adaptés à une PME

| Besoin | Gratuit / abordable | Payant / plus structuré |
|---|---|---|
| Documentation simple | Google Docs, Notion, Obsidian | Confluence, Slite |
| Partage interne | Notion, Google Drive, SharePoint |  |
| Schémas visuels | Draw.io, Excalidraw | Miro, Lucidchart |
| Suivi des versions | Historique Google Docs / Notion | Git + Markdown |

## Modèle de fiche workflow à copier

```
Nom du workflow : [Nom explicite]

Objectif métier :
[Phrase simple qui explique l'intérêt]

Déclencheur :
[Quand le workflow se lance]

Étapes :
1. [...]
2. [...]
3. [...]

Données utilisées :
- Donnée 1 (sensible : oui / non)
- Donnée 2 (sensible : oui / non)

Outils connectés :
- Outil 1 : [rôle dans le workflow]
- Outil 2 : [rôle dans le workflow]

Accès et sécurité :
- Compte utilisé : [...]
- Où sont stockés les identifiants : [...]
- Liste des personnes habilitées : [...]

Propriétaire : [Nom / rôle]
Dernière révision : [Date]
Prochaine révision : [Date]
```

## Prompt IA sécurisé pour rédiger une fiche workflow

> Rôle : rédacteur de documentation interne pour PME.
> Contexte : je dois documenter un workflow qui [décrivez brièvement le scénario].
> Consignes :
> - Rédige une fiche complète avec les 7 éléments essentiels.
> - Utilise un ton professionnel mais simple, accessible à un non-technicien.
> - Ne me demande pas d'identifiants, tokens, mots de passe ou données clients nominatives.
> - Propose un schéma textuel des étapes du workflow.
> - Suggère 3 questions qu'un nouveau collaborateur pourrait se poser, avec leurs réponses.

## Accompagnement Alliance Digitale

Alliance Digitale propose aux PME sarthoises un modèle de documentation de workflows adapté à leurs équipes. Nous aidons à créer la première fiche, formons vos collaborateurs, et intégrons cette documentation dans votre outil de gestion quotidien (Notion, Google Drive, SharePoint).

## À retenir

1. Documenter n'est pas une option : c'est l'assurance-vie de vos automatisations.
2. Une bonne fiche répond aux questions d'un nouveau venu en 5 minutes.
3. Revoyez la documentation à chaque modification significative du workflow.