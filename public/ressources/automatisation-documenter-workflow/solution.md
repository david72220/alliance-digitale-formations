# Corrigé de l’exercice — Documentation d’un workflow

## 5 questions urgentes

1. Quel est le déclencheur exact du workflow ? (nouvelle commande, modification de statut, vérification périodique ?)
2. Quel outil envoie le SMS ? (Twilio, Webhook, service tiers, téléphone personnel ?)
3. Qui reçoit actuellement le SMS ? Le numéro est-il encore à jour ?
4. Quelles données sont utilisées ? Le montant est-il le seul critère ?
5. Où sont stockés l'accès et le code du workflow ? Qui en a la propriété ?

## Fiche workflow partielle à compléter

| Élément | Détail |
|---|---|
| Nom du workflow | Alerte SMS commandes stratégiques > 5 000 € |
| Objectif métier | Notifier rapidement le responsable des commandes importantes |
| Déclencheur | À vérifier : probablement création ou validation d'une commande dans [outil] |
| Étapes | 1. Détecter commande > 5 000 € 2. Vérifier numéro responsable 3. Envoyer SMS via [service] |
| Données utilisées | Montant commande, numéro téléphone responsable, référence commande |
| Outils connectés | [Outil de commandes], [Service SMS] |
| Accès et sécurité | Compte à identifier, stockage des identifiants à vérifier |
| Propriétaire | À désigner |
| Dernière révision | [Date actuelle] |
| Prochaine révision | Dans 3 mois |

## 3 actions dans les 48 h

1. Identifier le compte et le service utilisés pour l'envoi SMS ; vérifier s'il s'agit d'un compte personnel ou professionnel.
2. Vérifier que l'alerte fonctionne encore en créant une commande test fictive de 5 000 €, ou en consultant les logs.
3. Désigner un nouveau propriétaire du workflow et commencer la documentation sur le modèle Alliance Digitale.

## Message de vérification

*Bonjour [Prénom],*

*Nous révisons actuellement le workflow qui vous envoie un SMS lorsqu'une commande dépasse 5 000 €. Pouvez-vous me confirmer que vous avez bien reçu une alerte lors de la dernière commande stratégique ?*

*Cordialement,*

## Règles de nommage et de classement

- Nom du fichier : `YYYY-MM-DD_nom-du-workflow_v1.md`
- Structure du nom : `[Objectif]_[Outil principal]_[Fréquence]`
- Stockage : dossier partagé `/Workflows/` avec sous-dossiers par module (Commercial, Finance, RH, etc.)

## Grille d’évaluation du livrable

| Critère | 1 point | 2 points | 3 points |
|---|---|---|---|
| Questions urgentes | Moins de 5 questions | 5 questions mais peu priorisées | 5 questions ciblées sur fonctionnement, données, accès |
| Fiche remplie | Champs principalement vides | Champs partiellement remplis | Fiche structurée avec éléments connus et éléments à vérifier |
| Actions 48 h | Actions floues ou non urgentes | Actions pertinentes mais mal détaillées | 3 actions concrètes, datées, avec responsable |
| Message de vérification | Message incompréhensible | Message correct mais impersonnel | Message clair, avec objectif et demande précise |
| Règles de nommage | Aucune règle | Règle partielle | Règles claires de nommage et de classement |