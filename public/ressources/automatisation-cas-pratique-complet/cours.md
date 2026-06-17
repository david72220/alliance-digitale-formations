# Cas pratique complet : automatiser une PME en 5 étapes concrètes

Vous avez parcouru les fondamentaux de l'automatisation. Il est temps de tout assembler. Ce cas pratique vous emmène dans une PME fictive de la Sarthe — « Maison Dubois Serrurerie » — pour construire un plan d'automatisation réaliste, mesurable et financièrement maîtrisé. Vous pourrez reprendre la démarche telle quelle pour votre entreprise.

> **Accompagnement Alliance Digitale** — Ce cas est inspiré de missions réelles. Besoin d'un diagnostic personnalisé ou d'un atelier avec votre équipe ? [Contactez-nous](mailto:contact@alliancedigitale.fr) pour un premier rendez-vous gratuit.

---

## 1. Contexte de l'entreprise

**Maison Dubois Serrurerie** est une PME familiale basée près du Mans :

- **Activité** : serrurerie, métallerie, dépannage d'urgence 24h/24.
- **Effectif** : 12 personnes (3 administratifs, 4 poseurs, 2 commerciaux, 1 responsable d'atelier, 2 dirigeants).
- **Outils actuels** : téléphones, Gmail, Excel, devis papier, facturation manuelle, planning au tableau blanc.
- **Frictions** : doubles saisies, oublis de relances, planning qui part en vrille, devis non suivis, factures envoyées avec retard.

Objectif du dirigeant : **gagner 8 à 12 heures par semaine** d'administratif et améliorer la réactivité commerciale sans embaucher immédiatement.

---

## 2. Diagnostic rapide : carte des flux

Avant d'automatiser, il faut cartographier. Nous utilisons la méthode **ETE** :

1. **Entrée** — d'où vient l'information ?
2. **Traitement** — qui fait quoi ?
3. **Exit** — où doit arriver le résultat ?

### Tableau des flux prioritaires

| Flux | Entrée | Traitement actuel | Exit | Gains attendus | Priorité |
|------|--------|-------------------|------|----------------|----------|
| Demande de devis | Appel, mail, formulaire site | Secrétaire note → transmet au commercial | Devis papier ou Word | -50 % de temps de saisie | Haute |
| Relances devis | Devis envoyé | Commercial essaie de se souvenir | Appel ou mail sporadique | +20 % de conversion | Haute |
| Planification interventions | Appel client | Responsable écrit sur tableau blanc | Feuille de route papier | Moins d'oublis, meilleur taux de remplissage | Haute |
| Facturation | Bon de travail signé | Secrétaire recopie dans Excel → facture Word | Mail + relance manuelle | -40 % de délai de paiement | Moyenne |
| Avis clients | Intervention terminée | Personne ne demande d'avis | Aucun | Réputation en ligne améliorée | Moyenne |
| Stock pièces | Inventaire hebdomadaire | Responsable compte à la main | Commande fournisseur manuelle | Moins de ruptures | Basse |

> **Conseil Alliance Digitale** : ne cherchez pas à tout automatiser d'un coup. Choisissez 2 ou 3 flux à fort impact pour créer rapidement des victoires.

---

## 3. Exemples par rôle : ce que l'automatisation change au quotidien

### 3.1 Le dirigeant : visibilité sans micro-management

**Avant** : le patron appelle chaque soir pour savoir où en sont les chantiers.

**Après** : un tableau de bord automatique lui envoie chaque matin à 8h :

- Chiffre du jour précédent.
- Devis en attente de réponse depuis plus de 48 h.
- Interventions du jour et poseurs affectés.
- Factures impayées à relancer.

**Outil clé** : un CRM ou un ERP léger (voir stack plus bas).

### 3.2 Le commercial : plus de vente, moins de saisie

**Avant** : après un appel, il recopie les informations dans un Word, créé un devis, l'imprime, le scanne, l'envoie… puis oublie de relancer.

**Après** :

1. L'appel ou le formulaire site crée automatiquement une fiche prospect dans le CRM.
2. Le commercial complète le devis depuis son téléphone.
3. Le devis part par email automatiquement.
4. Une relance est programmée après 2 jours sans réponse.
5. Si le client accepte, le devis devient commande, puis facture, sans ressaisie.

### 3.3 L'administration : fin des doubles saisies

**Avant** : la secrétaire recopie les bons d'intervention dans Excel, puis dans Word pour facturer, puis vérifie le RIB, puis relance au téléphone.

**Après** :

- Intervention validée → facture générée automatiquement.
- Paiement reçu → case « payé » cochée automatiquement via relevé bancaire.
- Échéance dépassée → relance email automatique après 7, 15 et 30 jours.

### 3.4 Le responsable d'atelier : planning fluide

**Avant** : le planning change toutes les heures, les poseurs ne savent plus où aller.

**Après** :

- Commande validée → création automatique d'un rendez-vous dans un calendrier partagé.
- Le poseur reçoit une notification avec adresse, contact, matériel.
- L'intervention terminée → déclenchement de la facturation.

---

## 4. Stack outils : gratuit, abordable et premium

### Niveau 1 — Gratuit ou très peu coûteux (idéal pour tester)

| Besoin | Outil | Prix indicatif | Cas d'usage |
|--------|-------|----------------|-------------|
| Formulaire de contact | Google Forms / Tally | Gratuit | Collecter les demandes de devis |
| Tableur collaboratif | Google Sheets | Gratuit | Base prospects, suivi devis |
| Email automatisé | Gmail + scripts ou Mailmeteor | Gratuit à 10 €/mois | Relances devis, newsletters |
| Tâches / planning | Notion ou Trello | Gratuit | Suivi des chantiers |
| IA générative | ChatGPT, Mistral, Claude | Gratuit avec limites | Rédiger des emails, structurer des processus |
| Connexions simples | Zapier (plan gratuit) ou Make | Gratuit à 100 tâches/mois | Relier formulaire → tableur → email |

### Niveau 2 — Abordable (quand les flux se stabilisent)

| Besoin | Outil | Prix indicatif | Cas d'usage |
|--------|-------|----------------|-------------|
| CRM simple | HubSpot CRM (gratuit), Pipedrive | 0 à 24 €/utilisateur/mois | Suivi commercial |
| Comptabilité | Pennylane, QuickBooks, Sage | 10 à 40 €/mois | Facturation, relances, règlement |
| Planning | PlanningPME, Shifterbase | 5 à 15 €/utilisateur/mois | Gestion des interventions |
| Signature électronique | Docaposte, Yousign | À l'usage | Validation de devis |
| Automatisation avancée | Make ou Zapier (plan payant) | 9 à 50 €/mois | Flux multi-étapes |

### Niveau 3 — Premium (intégration complète)

| Besoin | Outil | Prix indicatif | Cas d'usage |
|--------|-------|----------------|-------------|
| ERP métier | Odoo, E-DEAL, Efficy | Sur devis | CRM + compta + planning + stock |
| Téléphonie intégrée | Ringover, Aircall | 20 à 50 €/utilisateur/mois | Appels enregistrés, liés au CRM |
| BI / tableaux de bord | Power BI, Looker Studio | Variable | Reporting automatique |

> **Accompagnement Alliance Digitale** : nous aidons les PME sarthoises à choisir leur stack sans sur-équipement. Un bon outil est celui que votre équipe adopte réellement.

---

## 5. Prompts IA sécurisés pour construire vos automatisations

L'IA est un excellent assistant pour structurer vos processus, mais **ne jamais y coller de données clients, bancaires ou sensibles**. Utilisez des exemples fictifs ou anonymisés.

### Prompt 1 — Diagnostiquer un flux à automatiser

```text
Tu es un consultant en automatisation pour une PME de [secteur] en France.
Voici un flux métier à optimiser : [décrivez l'étape 1], [étape 2], [étape 3].
Identifie les 3 principaux points de friction et propose 2 solutions concrètes pour chacun.
Utilise un tableau avec : friction, solution, outil gratuit ou abordable, gain de temps estimé.
Ne demande aucune donnée personnelle.
```

### Prompt 2 — Rédiger un scénario de relance automatique

```text
Rédige une séquence de 3 emails de relance commerciale pour une PME qui a envoyé un devis.
Ton professionnel, chaleureux, pas agressif.
Email 1 : rappel bienveillant au bout de 2 jours.
Email 2 : proposition d'aide au bout de 7 jours.
Email 3 : dernière relance au bout de 14 jours avec un CTA clair.
Chaque email doit faire entre 80 et 120 mots.
```

### Prompt 3 — Anonymiser un process avant de le partager

```text
Voici la description d'un processus interne : [collez votre process].
Anonymise-le pour que je puisse le partager à un consultant externe :
- remplace les noms de clients par CLIENT_A, CLIENT_B…
- remplace les noms de fournisseurs par FOURNISSEUR_X…
- remplace les montants exacts par des fourchettes (ex. 5 000 € à 10 000 €).
- supprime les adresses email et téléphone réels.
```

> **Règle d'or** : quand vous testez des prompts, créez un espace de brouillon. Ne connectez jamais l'IA à vos systèmes de production sans validation interne et, si possible, sans l'accompagnement d'un prestataire.

---

## 6. Plan de déploiement en 5 étapes

### Étape 1 — Choisir la première bataille (semaine 1)

Sélectionnez le flux qui cumule :

- un volume récurrent,
- une erreur humaine fréquente,
- une frustration forte chez les équipes,
- un ROI rapide (moins de 3 mois).

Dans notre cas : **la demande de devis → relance → conversion**.

### Étape 2 — Dessiner le flux cible (semaine 1-2)

Utilisez un schéma simple :

```
Entrée : Formulaire site ou appel
  ↓
Action : Création fiche prospect (CRM ou tableur)
  ↓
Action : Attribution automatique au commercial du secteur
  ↓
Action : Devis généré et envoyé
  ↓
Condition : Si pas de réponse sous 48h → relance email
  ↓
Condition : Si accepté → commande → planning → facture
```

### Étape 3 — Protéger les données (semaine 2)

- Lister les données traitées (nom, adresse, téléphone, historique client).
- Choisir un outil hébergé en Europe avec DSG/SCC.
- Créer des accès utilisateurs limités (pas tout le monde admin).
- Documenter où sont stockées les données et qui y a accès.

### Étape 4 — Piler, tester, ajuster (semaine 3-4)

- Lancez l'automatisation sur 5 à 10 cas réels.
- Comparez avant/après (temps, erreurs, satisfaction).
- Recueillez le retour des équipes.
- Corrigez les bugs avant d'industrialiser.

### Étape 5 — Documenter et dupliquer (mois 2-3)

- Rédigez une procédure interne simple.
- Formez un « référent automatisation » en interne.
- Répétez la méthode sur le flux suivant (facturation, puis stock, puis avis clients).

---

## 7. Mesurer le succès : 3 indicateurs simples

| Indicateur | Avant | Objectif 3 mois | Comment le mesurer |
|------------|-------|-----------------|--------------------|
| Temps de traitement d'une demande de devis | 2 h | 30 min | Chronométrage sur 10 demandes |
| Taux de conversion devis → commande | 25 % | 35 % | Suivi dans le CRM |
| Délai moyen de paiement | 45 jours | 32 jours | Tableau de bord comptable |

---

## 8. Ce qu'il faut retenir

- L'automatisation ne remplace pas l'humain : elle libère du temps sur les tâches répétitives.
- Commencez petit, mesurez, puis déployez.
- La sécurité des données et l'adhésion des équipes sont aussi importantes que l'outil choisi.
- Un accompagnement structuré — comme celui proposé par Alliance Digitale — accélère le diagnostic et réduit les risques d'échec.

> **Votre prochaine étape** : passez à l'exercice ci-dessous pour construire votre propre plan d'automatisation. Alliance Digitale peut ensuite relire votre plan lors d'un rendez-vous gratuit.
