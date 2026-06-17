## Objectifs du cours

À l'issue de ce micro-cours, vous serez capable de :

- Identifier les moments clés où une relance automatique apporte de la valeur.
- Rédiger des messages de relance respectueux et conformes (RGPD, Loi Sapin 2).
- Construire un scénario multi-canal (email + SMS) avec délai et condition.
- Choisir entre outils no-code, CRM natif ou scripts maison.
- Mesurer l'efficacité de vos relances sans spammer vos contacts.

## Quand automatiser une relance ?

La relance automatique fonctionne quand elle est :

- **Contextuelle** : elle reprend l'objet exact du dernier échange.
- **Tempérée** : elle respecte un délai et un nombre maximum de messages.
- **Désinscriptible** : le contact peut dire stop facilement.
- **Humaine** : le ton reste chaleureux, jamais robotique.

Les cas typiques : devis non signé après 7 jours, facture impayée à J-5 avant échéance, panier abandonné sous 24 h, rendez-vous non confirmé.

## Exemples par rôle

### Commerçant / E-commerce
- **Problème** : 60 % des paniers sont abandonnés.
- **Scénario** : Shopify (panier abandonné) → Attente 2 h → Email 1 « Vous avez oublié quelque chose » avec lien panier. Si aucun retour après 24 h → Email 2 avec code promo 10 %.

### Artisan / BTP
- **Problème** : les devis signés mettent des semaines à revenir.
- **Scénario** : HubSpot / Airtable (devis envoyé) → J+3 email de rappel → J+7 email « Dernière question avant validation ? » → J+14 SMS court.

### Prestataire de services
- **Problème** : les rendez-vous sont oubliés ou annulés à la dernière minute.
- **Scénario** : Calendly (RDV planifié) → J-1 email de confirmation + SMS J-2h → Si statut « non confirmé » → Relance email.

### Comptable / Administratif
- **Problème** : relancer les factures impayées prend du temps et crée de la tension.
- **Scénario** : Stripe / Pennylane (facture émise) → J-5 email rappel échéance → J+3 email relance amiable → J+15 email relance ferme + alerte interne.

## Les 5 règles d'une relance efficace

1. **Un seul objectif par message** : signer, payer, confirmer, répondre.
2. **Un objet clair** : pas de piège-clic, le destinataire doit comprendre le sujet.
3. **Un CTA visible** : bouton unique vers l'action attendue.
4. **Un ton progressif** : amical → neutre → ferme.
5. **Une sortie de route** : si le client répond, arrêter immédiatement le scénario.

## Exemple de séquence de relance devis

| Étape | Déclencheur | Canal | Ton | Durée |
|---|---|---|---|---|
| 1 | Devis envoyé | Email | Merci + récapitulatif | J0 |
| 2 | Aucune réponse | Email | Questions ? On avance ensemble | J+3 |
| 3 | Toujours rien | Email | Délai de validité | J+7 |
| 4 | Dernier essai | SMS | Message court + lien devis | J+10 |

## Outils gratuits et payants

| Outil | Type | Idéal pour | Prix indicatif |
|---|---|---|---|
| **n8n + Gmail** | No-code/low-code | PME avec peu de volume | Gratuit (self-hosted) |
| **Brevo (ex-Sendinblue)** | Email/SMS marketing | Séquences d'email + SMS | Gratuit jusqu'à 300 emails/jour |
| **Mailchimp** | Email marketing | Paniers abandonnés, newsletters | Gratuit limité, puis ~13 €/mois |
| **HubSpot Marketing** | CRM + automation | Relances B2B personnalisées | Gratuit limité, puis ~18 €/mois |
| **Twilio** | SMS programmatique | Relances SMS fiables | Payant à l'usage |
| **Aircall / Ringover** | Téléphonie + SMS | Relances vocales intégrées | À partir de ~20 €/utilisateur/mois |

> **Conseil Alliance Digitale** : si vous débutez, testez Brevo + n8n gratuit pour emails et SMS ; migrez vers HubSpot ou un CRM complet quand vos volumes dépassent 200 contacts actifs par mois.

## Prompt IA sécurisé pour rédiger une séquence de relance

```
Tu es un copywriter B2B pour une PME de [secteur].
Je veux une séquence de 3 emails de relance pour [type de document : devis / facture / RDV / panier abandonné].
Public cible : [description générique du client, sans données personnelles].
Contraintes :
- Ton professionnel et chaleureux, jamais agressif.
- Chaque email a un seul appel à l'action.
- Respect de la Loi Sapin 2 et du RGPD (opt-out visible).
- Longueur maximale : 120 mots par email.
- Propose un objet accrocheur pour chaque message.
N'inclus aucun nom, entreprise, montant ou date réelle.
```

## Respecter la réglementation

- **Consentement** : ne relancez que des contacts qui ont accepté d'être contactés (opt-in).
- **Opt-out** : chaque email doit contenir un lien de désinscription ou un moyen simple de refuser.
- **RGPD** : conservez une preuve de l'opt-in et de l'envoi.
- **Loi Sapin 2** : pour les factures publiques, respectez les délais légaux avant relance formelle.
- **SMS** : incluez systématiquement « STOP au 36XXX » selon l'opérateur utilisé.

## Mesurer sans spammer

- **Taux d'ouverture** : ciblez > 40 % en B2B.
- **Taux de clic** : ciblez > 5 %.
- **Taux de conversion** : devis signé, facture payée, RDV confirmé.
- **Taux de désinscription** : si > 1 %, réduisez la fréquence.
- **Alertes** : si un contact se plaint, arrêtez immédiatement son parcours.

## Astuces opérationnelles

- Personnalisez l'objet avec la référence du devis, pas seulement « Relance ».
- Envoyez les emails en milieu de semaine, entre 9 h et 11 h.
- Testez A/B sur l'objet avant de lancer la séquence à grande échelle.
- Ajoutez une condition de sortie dès qu'un contact répond ou clique.
- Créez une file d'attente (« wait ») entre chaque étape, jamais tout le même jour.

## Pour aller plus loin

Alliance Digitale propose un atelier dédié à la conception de séquences de relance conformes et performantes. Vous repartez avec un scénario testé, des templates validés et un tableau de bord de suivi.