# Solution-type : plan d'automatisation pour Maison Dubois Serrurerie

Ce document est un exemple de livrable final. Il ne doit pas être recopié mot pour mot : adaptez-le à votre contexte, vos outils et vos contraintes.

---

## 1. Présentation de l'entreprise

**Entreprise** : Maison Dubois Serrurerie
**Activité** : serrurerie, métallerie, dépannage d'urgence 24h/24
**Effectif** : 12 personnes
**Outils actuels** : téléphones, Gmail, Excel, devis papier, planning tableau blanc
**Friction principale** : les demandes de devis sont mal suivies, ce qui fait perdre des commandes.
**Objectif chiffré** : réduire de 50 % le temps entre la première demande et l'envoi du devis, et augmenter de 10 points le taux de conversion devis → commande.

---

## 2. Flux prioritaire choisi

**Flux** : Demande de devis → qualification → envoi du devis → relance → conversion en commande.

**Pourquoi ce flux ?**

- Il représente environ 60 demandes par mois.
- Chaque demande nécessite aujourd'hui 20 à 40 minutes de saisie et de transfert.
- Les oublis de relance coûtent environ 3 à 5 commandes par mois.
- L'amélioration sera visible en moins d'un mois.

---

## 3. Flux cible automatisé

1. **Le client remplit un formulaire en ligne** (Tally ou formulaire intégré au site).
   - Outil : Tally (gratuit) ou formulaire WordPress.
   - Données collectées : nom, téléphone, adresse, type de besoin, urgence, photos.

2. **La demande crée automatiquement une fiche dans le CRM.**
   - Outil : HubSpot CRM (version gratuite) ou Google Sheets en phase de test.
   - Responsable : le commercial du secteur géographique.

3. **Le commercial reçoit une notification** (email + alerte mobile).
   - Outil : HubSpot notifications ou Zapier.

4. **Le commercial réalise le devis dans le CRM** ou dans un modèle connecté.
   - Outil : modèle de devis dans HubSpot ou Google Docs + e-signature Yousign.

5. **Le devis est envoyé automatiquement** par email dès qu'il est marqué « terminé ».
   - Outil : HubSpot sequences ou Make.

6. **Si le client ne répond pas sous 48 h**, une relance automatique est envoyée.
   - Email 1 (J+2) : rappel bienveillant.
   - Email 2 (J+7) : proposition d'aide et question ouverte.
   - Email 3 (J+14) : dernière relance avec CTA.

7. **Si le client accepte**, le devis devient commande, puis intervention planifiée.
   - Outil : calendrier partagé (Google Agenda) + logiciel de planning (PlanningPME ou Notion).

8. **L'intervention terminée déclenche la facturation.**
   - Outil : Pennylane ou comptabilité en ligne choisie par le cabinet.

---

## 4. Stack outils retenue

| Besoin | Outil retenu | Coût mensuel estimé | Justification |
|--------|--------------|---------------------|---------------|
| Formulaire de contact | Tally | Gratuit | Facile à intégrer, design soigné, export CSV/Notion/Sheets. |
| CRM | HubSpot CRM | Gratuit pour 1 utilisateur, puis ~20 €/user/mois | Référence du marché, formation accessible, intégrations nombreuses. |
| Relances | HubSpot sequences / Make | Gratuit à 9 €/mois | Scénario paramétrable, pas de code requis. |
| E-signature | Yousign | ~1 € à 3 €/signature | Conforme eIDAS, usage ponctuel. |
| Planning | Google Agenda + PlanningPME | Gratuit puis ~8 €/user/mois | Transition progressive, pas de choc culturel. |
| Comptabilité | Pennylane | ~25 €/mois | Facturation + relances + relevé bancaire automatisé. |

**Budget mensuel estimé (phase pilote)** : 0 € à 50 €/mois.
**Budget mensuel estimé (phase industrialisation)** : 100 € à 250 €/mois selon le nombre d'utilisateurs.

---

## 5. Risques et mesures de sécurité

| Risque | Impact | Mesure |
|--------|--------|--------|
| Relance automatique trop fréquente | Perte d'image client | Limiter à 3 relances sur 14 jours, avec option de désinscription. |
| Données clients stockées hors UE | Non-conformité RGPD | Privilégier HubSpot (données UE) et Tally (hébergement européen). |
| Accès CRM trop larges | Fuite de données commerciales | Créer des profils limités : admin, commercial, lecture seule. |
| Dépendance à un seul outil | Perte de données si changement | Exporter mensuellement les contacts au format CSV. |
| Équipe non formée | Automatisation mal utilisée | Prévoir 1 atelier de 2 heures et une fiche procédure. |

---

## 6. Indicateur de succès et mesure

**Indicateur principal** : temps entre la demande de devis et l'envoi du devis.

| Période | Objectif | Mode de mesure |
|---------|----------|----------------|
| Avant | 24 h en moyenne | Chronométrage manuel sur 10 demandes. |
| J+15 | 8 h en moyenne | Extraction des dates de création et d'envoi dans le CRM. |
| J+30 | 4 h en moyenne | Même méthode + satisfaction interne. |

**Indicateur secondaire** : taux de conversion devis → commande.

- Objectif : passer de 25 % à 35 % en 3 mois grâce aux relances automatiques.
- Mesure : suivi mensuel dans le CRM.

---

## 7. Plan d'action des 30 premiers jours

| Semaine | Action | Responsable | Livrable |
|---------|--------|-------------|----------|
| 1 | Créer le formulaire Tally et le connecter à Google Sheets / HubSpot | Dirigeant + commercial | Formulaire en ligne test |
| 1 | Modéliser le modèle de devis | Commercial | 1 modèle de devis |
| 2 | Configurer les relances automatiques | Dirigeant ou prestataire | 3 emails programmés |
| 2 | Former l'équipe (1h) | Dirigeant | Fiche procédure |
| 3 | Tester sur 10 demandes réelles | Commercial | Tableau de suivi |
| 4 | Ajuster et décider de l'industrialisation | Dirigeant | Compte-rendu |

---

## 8. Conclusion et prochaines étapes

Ce plan vise un premier gain rapide : moins de temps perdu, plus de commandes converties, une meilleure image auprès des clients. Une fois ce flux stabilisé, on pourra automatiser la facturation, les avis clients et le suivi de stock.

> **Accompagnement Alliance Digitale** : si vous souhaitez valider ce plan, le tester avec un accompagnant ou le présenter à votre équipe, nous proposons un diagnostic gratuit de 45 minutes. [Prendre rendez-vous](mailto:contact@alliancedigitale.fr).
