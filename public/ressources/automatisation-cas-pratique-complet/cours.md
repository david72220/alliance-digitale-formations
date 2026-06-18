# Cas pratique complet : automatiser une PME en 5 étapes concrètes

## Qu’est-ce qu’un plan d’automatisation ?

Un plan d’automatisation, c’est la feuille de route qui permet de passer du constat « on perd du temps » au déploiement concret d’un ou plusieurs flux automatiques. Ce micro-cours vous emmène dans une PME fictive de la Sarthe — « Maison Dubois Serrurerie » — pour construire ce plan pas à pas. Vous pourrez reprendre la démarche telle quelle pour votre entreprise.

::: retenir L’idée centrale
L’automatisation ne consiste pas à tout robotiser. Elle consiste à identifier les tâches répétitives, à prioriser celles qui rapportent le plus de temps gagné, et à déployer un premier flux mesurable en quelques semaines.
:::

### Contexte de l'entreprise

**Maison Dubois Serrurerie** est une PME familiale basée près du Mans :

- **Activité** : serrurerie, métallerie, dépannage d'urgence 24 h / 24.
- **Effectif** : 12 personnes (3 administratifs, 4 poseurs, 2 commerciaux, 1 responsable d'atelier, 2 dirigeants).
- **Outils actuels** : téléphones, Gmail, Excel, devis papier, facturation manuelle, planning au tableau blanc.
- **Frictions** : doubles saisies, oublis de relances, planning qui part en vrille, devis non suivis, factures envoyées avec retard.

Objectif du dirigeant : **gagner 8 à 12 heures par semaine** d'administratif et améliorer la réactivité commerciale sans embaucher immédiatement.

::: card Exemple 1 : la serrurerie familiale près du Mans
Maison Dubois reçoit 60 demandes de devis par mois. Chaque demande nécessite 20 à 40 minutes de saisie et de transfert. Les oublis de relance coûtent 3 à 5 commandes par mois.
:::

## Étape 1 : cartographier les flux avec la méthode ETE

Avant d'automatiser, il faut cartographier. Nous utilisons la méthode **ETE** :

1. **Entrée** — d'où vient l'information ?
2. **Traitement** — qui fait quoi ?
3. **Exit** — où doit arriver le résultat ?

### Tableau des flux prioritaires

| Flux | Entrée | Traitement actuel | Exit | Gains attendus | Priorité |
|---|---|---|---|---|---|
| Demande de devis | Appel, mail, formulaire | Secrétaire note → transmet au commercial | Devis papier ou Word | -50 % de temps de saisie | Haute |
| Relances de devis | Devis envoyé | Commercial vérifie manuellement | Relance au cas par cas | +10 points de conversion | Haute |
| Facturation | Interventions terminées | Secrétaire recopie sur facture papier | Envoi postal ou email | -30 % de temps facturation | Moyenne |
| Planning des poseurs | Appels, tableau blanc | Responsable d'atelier met à jour | Feuille partagée | Moins d'erreurs de planning | Moyenne |
| Suivi des impayés | Factures émises | Dirigeant relance au téléphone | Paiement parfois tardif | DSO réduit de 10 jours | Haute |

::: tip Conseil pratique
Commencez par les flux qui se répètent au moins 10 fois par mois et qui contiennent une saisie manuelle visible. C’est là que le gain est le plus rapide.
:::\n
## Étape 2 : choisir le premier flux à automatiser

::: retenir L’idée centrale
Le premier projet doit avoir un fort impact, une faible complexité et un résultat visible en moins d’un mois.
:::

Pour Maison Dubois, le flux prioritaire est :

**Demande de devis → qualification → envoi du devis → relance → conversion en commande.**

Pourquoi ce flux ?

- Il représente environ 60 demandes par mois.
- Chaque demande nécessite aujourd'hui 20 à 40 minutes de saisie et de transfert.
- Les oublis de relance coûtent environ 3 à 5 commandes par mois.
- L'amélioration sera visible en moins d'un mois.

## Étape 3 : décrire le flux cible automatisé

1. **Le client remplit un formulaire en ligne** (Tally ou formulaire intégré au site).
   - Données collectées : nom, téléphone, adresse, type de besoin, urgence, photos.
2. **La demande crée automatiquement une fiche dans le CRM** (HubSpot CRM gratuit ou Google Sheets en phase de test).
3. **Le commercial reçoit une notification** (email + alerte mobile).
4. **Le commercial réalise le devis dans le CRM** ou dans un modèle connecté.
5. **Le devis est envoyé automatiquement** par email dès validation.
6. **Si pas de réponse sous 48 h** → relance automatique.
7. **Si pas de réponse sous 7 jours** → deuxième relance + alerte manager.

::: card Exemple 2 : le flux cible en image
Client sur le site → Formulaire → CRM → Notification commercial → Devis → Email automatique → Relances → Signature électronique.
:::

## Étape 4 : choisir sa stack d'outils

| Besoin | Outil retenu | Coût mensuel estimé |
|---|---|---|
| Formulaire | Tally ou formulaire WordPress | Gratuit |
| CRM | HubSpot CRM | Gratuit |
| Notifications | HubSpot natif ou Zapier | 0 à 20 € |
| Relances | n8n ou Make | 0 à 10 € |
| Signature | Yousign ou HubSpot | À partir de 10 € |

::: attention Point de vigilance
En phase de test, privilégiez les solutions gratuites. Validez le processus avec de vraies données avant d’investir dans un outil payant.
:::

## Étape 5 : mesurer et itérer

### Indicateurs à suivre

- Délai moyen entre demande et envoi du devis.
- Taux de conversion devis → commande.
- Temps gagné par le commercial et le secrétariat.
- Nombre de relances envoyées et taux de réponse.

### Roadmap 3 mois

- **Mois 1** : formulaire + CRM + notification + 10 devis test.
- **Mois 2** : relances automatiques + signature électronique.
- **Mois 3** : intégration facturation + reporting mensuel.

::: retenir En résumé
Automatiser une PME, c’est d’abord comprendre ses flux, choisir un premier projet rapide, puis mesurer. Maison Dubois montre qu’une PME de 12 salariés peut gagner des heures chaque semaine avec des outils accessibles.
:::

---

> **Accompagnement Alliance Digitale** — Ce cas est inspiré de missions réelles. Besoin d'un diagnostic personnalisé ou d'un atelier avec votre équipe ? [Contactez-nous](mailto:contact@alliancedigitale.fr) pour un premier rendez-vous gratuit.