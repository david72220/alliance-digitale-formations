# Sécuriser et maintenir ses workflows automatiques

## Pourquoi la sécurité compte autant que l'automatisation

Automatiser, c'est confier à un outil la répétition de tâches sensibles : envoi d'emails, mise à jour de bases de données, génération de factures, accès à des documents. Si le workflow est mal protégé ou mal maintenu, il peut :

- envoyer des données à la mauvaise personne ;
- tomber en panne silencieusement pendant des semaines ;
- devenir une porte d'entrée pour une attaque.

Ce micro-cours vous donne les bonnes pratiques pour automatiser sans prendre de risques inutiles.

## Les 5 piliers de la sécurité d'un workflow

### 1. Protéger les accès
- Utilisez des comptes dédiés (pas votre compte personnel).
- Activez l'authentification à deux facteurs (2FA) partout où c'est possible.
- Stockez les mots de passe et tokens dans un gestionnaire de mots de passe (Bitwarden, 1Password, Dashlane).
- Ne partagez jamais de token ou mot de passe dans un email, un chat ou un document non chiffré.

### 2. Limiter les permissions
- Donnez à chaque workflow uniquement les droits nécessaires.
- Si un outil lit seulement des données, ne lui donnez pas l'accès en écriture.
- Révoquez les accès des collaborateurs ou des anciens prestataires dès leur départ.

### 3. Journaliser et surveiller
- Vérifiez les logs au moins une fois par semaine.
- Créez une alerte en cas d'échec d'un workflow critique.
- Gardez un historique des modifications (qui a changé quoi et quand).

### 4. Gérer les erreurs et les cas limites
- Prévoyez un comportement en cas d'échec : nouvelle tentative, notification, fallback manuel.
- Testez avec des données fictives avant de connecter de vraies données.
- Identifiez les cas inattendus : valeur vide, fichier trop lourd, format incorrect.

### 5. Maintenir et réviser régulièrement
- Relisez vos workflows tous les 3 à 6 mois.
- Supprimez les automatisations devenues inutiles.
- Documentez chaque scénario : objectif, déclencheur, outils, propriétaire.

## Exemples concrets par rôle

**Dirigeant(e)**
- Un workflow envoie chaque lundi le chiffre d'affaires de la semaine par email. On limite le destinataire au dirigeant et à l'associé. Le mot de passe du compte email est stocké dans un gestionnaire sécurisé, jamais dans le code.

**Commercial(e)**
- Un scénario relance automatiquement les prospects. On ajoute une règle de plafond : maximum 3 relances, avec un délai minimum de 5 jours entre chaque, et une option de désinscription conforme au RGPD.

**Comptable / Gestionnaire**
- Un workflow récupère les factures fournisseurs. On le configure pour refuser les pièces-jointes exécutables (.exe, .zip suspects) et scanner automatiquement les fichiers PDF.

**Responsable production / Atelier**
- Un capteur envoie une alerte si une machine dépasse une température. On s'assure que l'alerte ne part pas vers un téléphone personnel, mais vers un canal professionnel monitoré.

## Outils adaptés à une PME

| Besoin | Gratuit / abordable | Payant / plus complet |
|---|---|---|
| Gestionnaire de mots de passe | Bitwarden, KeePass | 1Password, Dashlane |
| Surveillance des workflows | Logs natifs (Zapier, Make, n8n) | Better Uptime, UptimeRobot |
| Stockage sécurisé de tokens | .env local + gestionnaire de mots de passe | HashiCorp Vault, 1Password Secrets Automation |
| Audit et contrôle d'accès | Google Workspace Admin, Microsoft 365 Admin | JumpCloud, Okta |

## Prompt IA sécurisé pour auditer un workflow existant

> Rôle : consultant cybersécurité pour PME.
> Contexte : j'ai un workflow qui [décrivez le scénario : envoie des emails, met à jour Notion, génère des PDF, etc.]. Les outils utilisés sont [outil 1, outil 2].
> Consignes :
> - Identifie les 5 risques principaux de sécurité.
> - Pour chaque risque, propose une action concrète et priorisée.
> - Ne me demande jamais mes identifiants, tokens ou mots de passe.
> - Propose une checklist de maintenance mensuelle et trimestrielle.
> - Donne un exemple de phrase à ajouter dans la documentation du workflow pour le reste de l'équipe.

## Accompagnement Alliance Digitale

Alliance Digitale accompagne les PME de la Sarthe dans la sécurisation et la maintenance de leurs workflows. Nous réalisons un audit rapide de vos automatisations existantes, rédigeons la documentation et formons vos équipes aux bonnes pratiques.

## À retenir

1. Un workflow utile aujourd'hui peut devenir un risque demain s'il n'est pas maintenu.
2. Limitez toujours les permissions au strict nécessaire.
3. Documentez, surveillez et révisez vos scénarios régulièrement.