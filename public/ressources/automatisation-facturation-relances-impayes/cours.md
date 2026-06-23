# Automatiser sa facturation et ses relances impayées

## Pourquoi automatiser la relance client ?

Les impayés et les retards de paiement sont l’un des problèmes les plus courants des PME. Une relance régulière et structurée améliore significativement le taux d’encaissement. L’automatisation permet de :

- Envoyer des relances à des moments optimaux.
- Personnaliser le message sans écrire chaque email manuellement.
- Suivre les clients à relancer sans oublis.
- Libérer du temps pour des tâches à plus forte valeur ajoutée.

::: retenir L’idée centrale
La plupart des retards de paiement ne viennent pas de mauvaise volonté, mais d’un oubli. Une relance automatique, factuelle et bien tempérée, rappelle l’échéance sans froisser la relation.
:::

### Pourquoi cela concerne une PME en Sarthe ?

- Une PME locale vit avec un BFR (besoin en fonds de roulement) souvent limité. Un retard de paiement peut impacter la trésorerie du mois.
- Le dirigeant ou le commercial gère lui-même les relances, parfois avec appréhension.
- Une relance automatique libère du temps et du stress.

::: card Exemple 1 : l’agencement de cuisines près du Mans
Une entreprise d’agencement envoie 15 factures par mois. Jusqu’ici, le dirigeant relançait au cas par cas, par téléphone, avec beaucoup d’appréhension. Après avoir automatisé 3 relances emails, son DSO diminue de 12 jours en deux mois.
:::

## Les outils courants

| Outil | Fonction | PME adaptée |
|---|---|---|
| Pennylane, Quickbooks, Sage | Facturation et suivi des paiements | PME |
| Stripe | Paiement en ligne et relances automatisées | Auto-entrepreneur / TPE |
| Holded, Zervant | Facturation + relances | TPE / PME |
| n8n / Make | Scénarios de relance personnalisés | PME avec besoins spécifiques |

::: tip Conseil pratique
Avant d’automatiser, vérifiez que vos factures sont bien numérotées, datées et que les échéances sont claires. Une relance automatique ne corrige pas une facture mal faite.
:::

## Scénario type de relance automatique

| Étape | Délai | Canal | Ton | Objectif |
|---|---|---|---|---|
| Rappel amical | J+1 après échéance | Email | Courtois | Rappeler l’échéance passée |
| Relance ferme | J+7 | Email + copie facture | Professionnel | Faciliter le paiement |
| Relance téléphonique | J+15 | Téléphone + email | Ferme | Comprendre et proposer une solution |
| Mise en demeure douce | J+30 | Lettre recommandée | Formel | Protéger l’entreprise |

## Règles de rédaction d’une relance efficace

1. Restez factuel et professionnel.
2. Mentionnez le numéro de facture, le montant et la date d’échéance.
3. Proposez une solution de paiement simple (lien de paiement, échelonnement).
4. Adaptez le ton au client : un bon client mérite une relance plus douce.
5. Automatisez la personnalisation avec les variables : nom, montant, délai, historique.

::: attention Point de vigilance
La Loi Sapin 2 impose de respecter certaines règles dans les relances. Restez factuel, ne mentez pas, ne harcelez pas. Limitez le nombre de relances et proposez toujours un moyen de régler facilement.
:::

## Exemple de relance J+7

> *Bonjour [Prénom],*
> 
> *Nous nous permettons de vous rappeler que la facture n°[numéro] d’un montant de [montant] €, arrivée à échéance le [date], n’a pas encore été réglée.*
> 
> *Vous pouvez la régler directement en cliquant ici : [lien de paiement].*
> 
> *En cas de question, merci de nous contacter.*
> 
> *Cordialement,*

::: card Exemple 2 : l’auto-entrepreneur de La Flèche
Un consultant en gestion utilise Stripe pour ses factures. Une relance automatique est envoyée 3 jours avant l’échéance, puis 5 jours après. Le taux de paiement à temps passe de 60 % à 85 % en trois mois.
:::

## Plan d’action cette semaine

1. **Lister vos 5 plus gros clients ou types de clients**.
2. **Définir 3 moments de relance** après échéance (J+1, J+7, J+15 par exemple).
3. **Rédiger le message de chaque relance** avec un ton adapté.
4. **Indiquer l’outil** qui enverra la relance (logiciel de comptabilité, n8n, email manuel).
5. **Prévoir une action** si le client ne paie pas au bout de 30 jours.
6. **Mesurer** le DSO (délai moyen de paiement) avant et après.

::: retenir En résumé
Automatiser les relances, c’est surtout automatiser la régularité et la personnalisation. Le ton reste humain. Le lien de paiement facilite l’encaissement. Et le DSO devient un indicateur à suivre chaque mois.
:::