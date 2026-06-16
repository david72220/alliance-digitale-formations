# RGPD en PME : les 10 points de contrôle essentiels

## Le vrai problème : une amende peut partir d’un simple fichier Excel

Vous pensez que le RGPD ne concerne que les grandes entreprises ? En réalité, **une PME est aujourd’hui sanctionnée presque autant qu’un grand groupe** — et souvent pour des failles très simples.

Voici trois situations courantes dans les PME que nous rencontrons en accompagnement :

- **La responsable RH** conserve les CV des candidats dans un fichier Excel sur son bureau. Les anciens candidats n’ont jamais été informés de l’usage fait de leurs données.
- **Le commercial** exporte la base clients depuis le CRM pour l’envoyer à un prestataire marketing, sans base légale claire.
- **Le dirigeant** apprend qu’un salarié a envoyé par erreur une fiche de paie à la mauvaise adresse email. Aucune procédure de signalement n’existe.

Dans chaque cas, les conséquences sont réelles :

| Rôle | Situation | Risque concret |
|---|---|---|
| **Dirigeant** | Absence de registre des traitements | Amende jusqu’à 4 % du CA mondial + responsabilité pénale en cas de négligence aggravée |
| **RH** | Conservation illimitée des dossiers salariés | Plainte, contrôle de l’inspection du travail, difficultés en cas de litige |
| **Commercial** | Prospection sans base légale | Réclamations, taux de plainte élevé, blocage des envois d’emails |
| **Assistant(e)** | Fichiers partagés sans droits restrictifs | Fuite de données, violation de confidentialité |

! **La bonne nouvelle** : la plupart des risques RGPD se résolvent avec quelques outils simples, une procédure claire et une heure de mise en ordre par mois. Vous n’avez pas besoin d’être juriste. Vous avez besoin d’une méthode.

---

## Ce que vous allez gagner avec ce cours

À la fin de ce micro-cours, vous saurez :

- Identifier les **10 points de contrôle** qui comptent vraiment dans une PME.
- Appliquer des **solutions concrètes**, adaptées à votre rôle.
- Utiliser des **prompts IA sécurisés** pour accélérer la documentation sans exposer vos données.
- Choisir des **outils gratuits et payants** pour industrialiser la conformité.
- Savoir quand faire appel à un **accompagnement extérieur** pour aller plus vite.

---

## Les 10 points de contrôle essentiels

### 1. Faire un inventaire rapide de vos outils et données

**Le problème** : la plupart des PME ne savent pas exactement où vivent leurs données personnelles. Résultat : impossible de protéger ce qu’on ne voit pas.

**Solution concrète** :
1. Listez vos outils principaux : CRM, logiciel de paie, messagerie, stockage cloud, tableurs, formulaires web.
2. Pour chaque outil, notez : quelles données personnelles, qui y a accès, pendant combien de temps.
3. Classez par niveau de risque : élevé (données sensibles), moyen (coordonnées clients), faible.

**Exemple pour une PME de 8 salariés** :

| Outil | Données | Accès | Risque | Action immédiate |
|---|---|---|---|---|
| CRM | Clients, prospects, historique | Commercial + dirigeant | Moyen | Vérifier la base légale de chaque contact |
| Logiciel de paie | RIB, salaires, contrats | Comptable externe + RH | Élevé | Vérifier les droits d’accès et la durée de conservation |
| Drive partagé | Devis, factures, CV | Tous les salariés | Élevé | Restreindre les droits par dossier |
| Formulaire de contact site web | Nom, email, téléphone | Commercial | Faible | Ajouter une case d’information RGPD |

**Outils recommandés** :
- **Gratuit** : un simple tableur (Excel, Google Sheets, Notion) + l’outil de cartographie fourni par la CNIL.
- **Payant** : solution RGPD intégrée type **Dastra**, **Siwawi** ou **LegalPlace**.

**Prompt IA sécurisé** (à utiliser **localement** avec Ollama ou Llama, ou après anonymisation des données) :
```
Tu es un consultant RGPD pour une PME. Voici la liste anonymisée de nos outils de traitement de données : [coller la liste sans nom ni email].
Pour chaque outil, identifie le risque RGPD principal et propose une action prioritaire.
Ne demande aucune donnée personnelle identifiable.
```

---

### 2. Vérifier la base légale de chaque traitement

**Le problème** : beaucoup de PME demandent systématiquement un consentement. Or, le consentement n’est pas toujours la bonne base légale. Parfois, c’est même une **mauvaise idée** : il est révocable, doit être documenté, et complique la prospection.

**Les 6 bases légales du RGPD** :

| Base légale | Quand l’utiliser ? | Exemple concret |
|---|---|---|
| **Contrat** | Données nécessaires à un contrat | Gestion clientèle, commandes, livraisons |
| **Obligation légale** | Loi impose la conservation | Fiches de paie, dossiers comptables |
| **Intérêt vital** | Risque pour la vie | Urgence médicale d’un salarié |
| **Mission d’intérêt public** | Rare en PME | - |
| **Intérêt légitime** | Intérêt commercial proportionné | Prospection B2B vers des clients professionnels existants |
| **Consentement** | Choix libre et éclairé | Newsletter, cookies, études marketing |

**Solution concrète** :
- Pour chaque fichier ou outil, choisissez la base légale la plus adaptée.
- Notez-la dans votre registre.
- Si vous hésitez, partez du principe : « Ai-je vraiment besoin de ce consentement, ou une autre base légale suffit ? »

**Exemple administratif** :
Une PME conserve les coordonnées de ses fournisseurs. Pas besoin de consentement : le contrat et l’intérêt légitime suffisent.

---

### 3. Informer clairement les personnes concernées

**Le problème** : une page « Mentions légales » floue ou absente expose à des réclamations.

**Solution concrète** :
- Créez une **politique de confidentialité** accessible depuis votre site et vos formulaires.
- Mentionnez : qui traite les données, pourquoi, combien de temps, quels droits.
- Ajoutez une case d’information avant tout formulaire de contact.

**Outils recommandés** :
- **Gratuit** : générateur CNIL, modèles en ligne.
- **Payant** : **LegalPlace**, **Rocket Lawyer** ou accompagnement juridique.

**Automatisation possible** :
- Insérer automatiquement une clause RGPD dans les devis et contrats générés depuis votre CRM ou ERP.

---

### 4. Gérer les droits d’accès et la minimisation

**Le problème** : dans une PME, tout le monde a souvent accès à tout. Un salarié peut voir les fiches de paie, les emails du dirigeant ou la base clients.

**Solution concrète** :
- Appliquez le principe du **besoin d’en savoir** (need-to-know).
- Restreignez les accès au logiciel de paie à la comptabilité et à la RH.
- Créez des espaces cloud distincts : « Administratif », « Commercial », « RH ».
- Supprimez les accès des anciens salariés le jour du départ.

**Exemple dirigeant** :
Un ancien commercial part avec toujours l’accès au CRM. Revue des accès : 3 anciens collaborateurs y figurent encore. Correction immédiate.

**Automatisation possible** :
- Script mensuel qui liste les comptes inactifs depuis 60 jours.
- Alertes automatiques lors d’un départ de salarié.

---

### 5. Définir des durées de conservation réalistes

**Le problème** : conserver indéfiniment les CV, les devis ou les anciens emails crée un risque inutile.

**Solution concrète** :
- Fixez une durée de conservation par type de donnée.
- Exemples :
  - **CV de candidat non retenu** : 1 an maximum après le recrutement.
  - **Devis non signés** : 1 an puis anonymisation.
  - **Fiches de paie** : 5 ans après la fin du contrat (obligation légale).
  - **Données clients inactifs** : 3 ans après le dernier contact, puis suppression.

**Automatisation possible** :
- Règle automatique dans votre outil de stockage : archiver les dossiers inactifs après X années.
- Tâche planifiée tous les 6 mois pour purger les anciennes données.

---

### 6. Sécuriser les données et les échanges

**Le problème** : les violations de données les plus fréquentes en PME viennent d’emails mal adressés, de mots de passe faibles et de fichiers stockés sans protection.

**Solutions concrètes** :
- Activez la **double authentification** sur tous les comptes critiques (email, CRM, drive, logiciel de paie).
- Chiffrez les documents sensibles avant de les envoyer (PDF protégé par mot de passe, outil de transfert sécurisé).
- Utilisez un gestionnaire de mots de passe d’équipe.
- Ne stockez jamais les RIB ou les pièces sensibles dans des emails non chiffrés.

**Exemple RH** :
Un CV avec photo, adresse et numéro de sécurité sociale est envoyé par email à un manager. Solution : utiliser un portail de recrutement sécurisé ou un lien de téléchargement temporaire.

**Outils recommandés** :
- **Gratuit** : Proton Drive, Bitwarden, 2FA native (Google Workspace, Microsoft 365).
- **Payant** : Dashlane Business, 1Password, Tresorit, Boxcryptor.

---

### 7. Prévoir la réponse aux demandes des personnes

**Le problème** : un client ou un ancien salarié demande la suppression de ses données. Sans procédure, vous perdez du temps et vous exposez votre entreprise.

**Solution concrète** :
- Créez une **procédure type** : recevoir la demande, identifier les données, vérifier les exceptions légales, confirmer l’action.
- Désignez une personne référente (souvent le dirigeant ou l’assistant(e)).
- Répondez dans un **délai d’un mois**.

**Prompt IA sécurisé** pour rédiger une réponse type :
```
Tu es un responsable RGPD d'une PME. Un ancien client demande la suppression de ses données personnelles.
Rédige une réponse professionnelle, en français, qui :
1. Accuse réception de la demande.
2. Indique que nous traitons la demande dans le délai d’un mois.
3. Mentionne les éventuelles obligations légales de conservation (factures, comptabilité).
4. Donne un contact pour toute question.
Ne mentionne aucune donnée personnelle dans la réponse.
```

---

### 8. Tenir un registre des activités de traitement

**Le problème** : en cas de contrôle, la CNIL demande un registre. S’il n’existe pas, l’amende est quasi automatique.

**Solution concrète** :
- Créez un document simple : tableur ou base Notion.
- Chaque ligne = un traitement avec : nom, finalité, base légale, données concernées, destinataires, durée, mesures de sécurité.
- Maintenez-le à jour à chaque nouvel outil ou projet.

**Automatisation possible** :
- Utiliser Notion ou Airtable comme registre collaboratif.
- Relier le registre aux fiches de procédure via des liens.

**Outils recommandés** :
- **Gratuit** : modèle Excel de la CNIL, Notion, Airtable.
- **Payant** : **Dastra**, **Siwawi** (registre + cartographie + e-learning).

---

### 9. Préparer la gestion des violations de données

**Le problème** : une fuite ou une perte de données doit être traitée rapidement. Le délai de signalement à la CNIL est de **72 heures** lorsqu’il y a un risque pour les droits des personnes.

**Solution concrète** :
- Créez une **fiche réflexe** papier ou numérique.
- Définissez : qui alerter, quelles informations collecter, comment évaluer le risque, quand notifier.
- Simulez un incident une fois par an.

**Exemple concret** :
Un assistant envoie par erreur un tableau de salaires à une liste de diffusion interne. La fiche réflexe déclenche immédiatement : récupération des emails, information des personnes concernées, évaluation du risque, éventuel signalement.

---

### 10. Anticiper l’utilisation de l’IA et de l’automatisation

**Le problème** : utiliser ChatGPT, Claude ou d’autres IA avec des données personnelles expose votre entreprise à des fuites si vous ne maîtrisez pas où vont les données.

**Règles d’or** :
- **Ne jamais** coller dans un outil IA en ligne : nom, email, téléphone, RIB, fiche de paie, données de santé, données clients sensibles.
- Utiliser des modèles **locaux** (Ollama, Llama, Mistral en local) ou des solutions certifiées RGPD.
- Anonymiser systématiquement les données avant de les utiliser dans un prompt.
- Documenter les cas d’usage IA de l’entreprise dans le registre des traitements.

**Prompt IA sécurisé** pour anonymiser un texte :
```
Anonymise le texte suivant en remplaçant les noms, prénoms, emails, numéros de téléphone, adresses et identifiants par des placeholders type [PERSONNE], [EMAIL], [TÉLÉPHONE], [ADRESSE].
Ne modifie pas le sens du document.
Texte : [coller le texte]
```

**Outils recommandés** :
- **Gratuit** : Ollama (modèles locaux), PrivateGPT, Proton AI.
- **Payant** : solutions hébergées en France (OVHcloud AI, Scaleway Generative AI, Mistral AI en mode entreprise).

---

## Quand faire appel à un accompagnement ?

Ce cours vous donne une méthode. Mais dans certains cas, **un accompagnement accélère considérablement la conformité** et évite les erreurs coûteuses :

- Vous devez préparer un **audit RGPD** avant un appel d’offres ou une levée de fonds.
- Vous voulez **industrialiser** la conformité avec des outils et des automatisations.
- Vous avez subi une **violation de données** ou une plainte.
- Vous voulez former vos équipes avec un **atelier pratique** adapté à votre secteur.

L’accompagnement Alliance Digitale combine :
- Un **diagnostic rapide** de vos points de contrôle.
- La mise en place de **modèles et outils** adaptés à votre PME.
- Des **prompts IA sécurisés** et des automatisations simples.
- Un **registre des traitements** prêt à l’emploi.

Vous pouvez réserver un premier échange de 30 minutes pour identifier vos priorités.

---

## Récapitulatif actionnable

| # | Point de contrôle | Action rapide cette semaine |
|---|---|---|
| 1 | Inventaire | Lister les 5 outils principaux contenant des données personnelles. |
| 2 | Base légale | Choisir la base légale pour chacun. |
| 3 | Information | Ajouter ou mettre à jour la politique de confidentialité du site. |
| 4 | Droits d’accès | Restreindre les accès au logiciel de paie et au dossier RH. |
| 5 | Conservation | Définir 3 durées de conservation maximum. |
| 6 | Sécurité | Activer la 2FA sur les comptes critiques. |
| 7 | Demandes | Créer une procédure type de réponse aux demandes. |
| 8 | Registre | Créer un registre des traitements dans Notion ou Excel. |
| 9 | Violations | Rédiger une fiche réflexe incident. |
| 10 | IA | Interdire temporairement les données personnelles dans les IA en ligne. |

---

## Outils et ressources recommandés

### Gratuits
- **CNIL** : modèles de registre, générateur de politique de confidentialité.
- **Notion / Airtable** : registre collaboratif.
- **Ollama** : modèles d’IA locaux.
- **Bitwarden** : gestionnaire de mots de passe (version gratuite).
- **Proton Drive / Proton Mail** : stockage et email chiffrés.

### Payants
- **Dastra / Siwawi** : plateforme RGPD complète.
- **Dashlane / 1Password** : gestion de mots de passe d’équipe.
- **Tresorit / Boxcryptor** : stockage cloud chiffré.
- **LegalPlace / Rocket Lawyer** : documents juridiques.

---

## L’exercice pratique vous attend en bas de page

Pour ancrer ces points, appliquez immédiatement la méthode à **3 outils de votre entreprise**. Le corrigé est disponible en PDF.
