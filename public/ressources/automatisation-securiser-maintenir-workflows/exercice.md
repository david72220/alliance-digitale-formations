# Exercice pratique — Sécuriser un workflow existant

## Scénario

Votre PME vient de mettre en place un workflow qui envoie automatiquement un email récapitulatif chaque vendredi soir à 18 h. Cet email contient : le chiffre d'affaires de la semaine, le nombre de nouveaux clients, le top 3 des produits vendus et un lien vers un tableau de bord Notion. L'email est envoyé depuis le compte Gmail personnel du fondateur.

## Consignes

1. Listez 3 failles de sécurité ou de maintenance de ce workflow.
2. Proposez 3 actions correctives immédiates.
3. Rédigez une règle simple pour limiter les destinataires et les données diffusées.
4. Indiquez une fréquence de maintenance recommandée.
5. Identifiez une donnée à surveiller dans les logs chaque semaine.

## Tableau à compléter

| Failles identifiées | Risque | Action corrective |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

## Questions de réflexion

- Pourquoi faut-il éviter d’utiliser un compte personnel pour un workflow ?
- Quelle est la différence entre une permission en lecture seule et une permission en écriture ?
- Que se passe-t-il si un workflow critique tombe en panne sans envoyer d’alerte ?