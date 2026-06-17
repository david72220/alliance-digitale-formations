## Solution indicative

### 1. Outil choisi

**n8n + Gmail + Google Sheets** en phase de test (coût nul), puis éventuellement **Brevo** ou **HubSpot** si le volume dépasse 200 relances/mois.

### 2. Étapes de la séquence

| Étape | Déclencheur | Délai | Canal | Ton |
|---|---|---|---|---|
| 1 | Devis envoyé dans Airtable/CRM | J+0 | Email | Confirmation + récap |
| 2 | Statut toujours « Envoyé » | J+3 | Email | Aide + questions |
| 3 | Statut toujours « Envoyé » | J+7 | Email | Délai de validité |

### 3. Exemples d'emails

**Email 1 — Confirmation (J0)**
- **Objet** : Votre devis [REF] est prêt — voici le récapitulatif
- **Corps** : Bonjour, merci pour votre demande. Vous trouverez ci-joint votre devis [REF]. N'hésitez pas à me contacter pour ajuster un point. [CTA : Voir le devis]

**Email 2 — Aide (J+3)**
- **Objet** : Une question sur le devis [REF] ?
- **Corps** : Bonjour, je me permets de revenir vers vous au sujet du devis [REF]. Existe-t-il un point à préciser ? Je suis disponible pour échanger 10 minutes. [CTA : Prendre un RDV]

**Email 3 — Délai (J+7)**
- **Objet** : Votre devis [REF] expire bientôt
- **Corps** : Bonjour, votre devis [REF] reste valide jusqu'au [date]. Pour sécuriser votre créneau, vous pouvez le signer en ligne. [CTA : Signer le devis]

### 4. Conditions d'arrêt

1. Le client clique sur « Signer le devis » ou le statut passe à « Signé ».
2. Le client répond à l'un des emails (détection de réponse dans Gmail).

### 5. Indicateurs de succès

- **Taux de conversion** : % de devis signés après la séquence.
- **Temps moyen de signature** : nombre de jours entre envoi et signature.

### 6. Prompt IA sécurisé

```
Relis et améliore 3 emails de relance de devis pour une PME B2B.
Contraintes : ton chaleureux, un seul CTA par email, 80-120 mots, objet accrocheur, opt-out visible.
Ne mentionne aucune donnée réelle : remplace les références par [REF], les noms par [Prénom] et les montants par [MONTANT].
```

### Point de vigilance

Avant d'activer la séquence, testez-la sur votre propre adresse email et celle d'un collègue pendant 1 semaine. Vérifiez que l'opt-out fonctionne et que les conditions d'arrêt s'exécutent correctement.