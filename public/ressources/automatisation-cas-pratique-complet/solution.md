# Solution-type : plan d'automatisation pour Maison Dubois Serrurerie

Ce document est un exemple de livrable final. Il ne doit pas être recopié mot pour mot : adaptez-le à votre contexte, vos outils et vos contraintes.

## 1. Présentation de l'entreprise

**Entreprise** : Maison Dubois Serrurerie
**Activité** : serrurerie, métallerie, dépannage d'urgence 24 h / 24
**Effectif** : 12 personnes
**Outils actuels** : téléphones, Gmail, Excel, devis papier, planning tableau blanc
**Friction principale** : les demandes de devis sont mal suivies, ce qui fait perdre des commandes
**Objectif chiffré** : réduire de 50 % le temps entre la première demande et l'envoi du devis, et augmenter de 10 points le taux de conversion devis → commande

## 2. Flux prioritaire choisi

**Flux** : Demande de devis → qualification → envoi du devis → relance → conversion en commande.

**Pourquoi ce flux ?**

- Il représente environ 60 demandes par mois.
- Chaque demande nécessite aujourd'hui 20 à 40 minutes de saisie et de transfert.
- Les oublis de relance coûtent environ 3 à 5 commandes par mois.
- L'amélioration sera visible en moins d'un mois.

## 3. Flux cible automatisé

1. **Le client remplit un formulaire en ligne** (Tally ou formulaire WordPress).
   - Outil : Tally (gratuit) ou formulaire WordPress.
   - Données collectées : nom, téléphone, adresse, type de besoin, urgence, photos.
2. **La demande crée automatiquement une fiche dans le CRM.**
   - Outil : HubSpot CRM (version gratuite) ou Google Sheets en phase de test.
   - Responsable : le commercial du secteur géographique.
3. **Le commercial reçoit une notification** (email + alerte mobile).
   - Outil : HubSpot notifications ou Zapier.
4. **Le commercial réalise le devis dans le CRM** ou dans un modèle connecté.
   - Outil : modèle de devis dans HubSpot ou Google Docs + e-signature Yousign.
5. **Le devis est envoyé automatiquement** par email dès validation.
6. **Si pas de réponse sous 48 h** → relance automatique.
7. **Si pas de réponse sous 7 jours** → alerte manager + relance personnalisée.

## 4. Stack d'outils

| Besoin | Outil retenu | Coût mensuel estimé |
|---|---|---|
| Formulaire | Tally | Gratuit |
| CRM | HubSpot CRM | Gratuit |
| Notifications | HubSpot natif | Gratuit |
| Relances | n8n ou Make | 0 à 10 € |
| Signature | Yousign | À partir de 10 € |

## 5. Indicateurs de succès

- Délai moyen demande → devis : objectif -50 %.
- Taux de conversion devis → commande : objectif +10 points.
- Heures gagnées par semaine sur la saisie et les relances.

## 6. Roadmap de déploiement

- **Semaines 1-2** : création du formulaire, connexion au CRM, tests internes.
- **Semaines 3-4** : 10 devis pilotes, ajustements, formation du commercial.
- **Semaines 5-6** : relances automatiques, signature électronique.
- **Semaines 7-8** : bilan, reporting, planification du flux suivant.

## Grille d’évaluation du livrable

| Critère | 1 point | 2 points | 3 points |
|---|---|---|---|
| Présentation entreprise | Informations manquantes | Informations présentes mais peu structurées | Présentation claire avec friction et objectif chiffré |
| Choix du flux | Flux mal défini ou peu répétitif | Flux pertinent mais justification courte | Flux répétitif, avec gain mesurable et délai court |
| Flux cible | Étapes confuses | Étapes claires mais outils flous | Étapes claires, outils précisés, responsables identifiés |
| Stack | Outils inadaptés | Outils adaptés mais coûts manquants | Outils adaptés avec coûts et alternatives notées |
| Indicateurs | Indicateurs flous | Indicateurs présents mais non mesurables | 3 indicateurs chiffrés et réalistes |
| Roadmap | Sans échéance | Échéances floues | Échéances claires sur 6 à 8 semaines |