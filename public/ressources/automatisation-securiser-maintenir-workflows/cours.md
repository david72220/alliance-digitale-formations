# Sécuriser et maintenir ses workflows automatiques

## Pourquoi la sécurité compte autant que l'automatisation

Automatiser, c'est confier à un outil la répétition de tâches sensibles : envoi d'emails, mise à jour de bases de données, génération de factures, accès à des documents. Si le workflow est mal protégé ou mal maintenu, il peut :

- envoyer des données à la mauvaise personne ;
- tomber en panne silencieusement pendant des semaines ;
- devenir une porte d'entrée pour une attaque.

::: retenir L’idée centrale
Un workflow automatique doit être traité comme un outil critique : comptes dédiés, permissions limitées, surveillance régulière et documentation à jour.
:::

### Pourquoi cela concerne une PME en Sarthe ?

- Les PME sont de plus en plus ciblées par les cyberattaques car elles sont souvent moins protégées.
- Un workflow mal configuré peut exposer des données clients, des factures ou des données salariales.
- Un workflow en panne sans alerte peut perturber la relation client sans que personne ne s’en aperçoive.

::: card Exemple 1 : la PME de conseil du Mans
Un workflow envoie chaque vendredi soir un email récapitulatif avec le chiffre d’affaires de la semaine et un lien vers un tableau de bord Notion. L’email part depuis le compte Gmail personnel du fondateur. C’est une faille : si le fondateur part, le workflow tombe en panne.
:::

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
- Documentez chaque scénario (voir le micro-cours « Documenter son workflow automatique »).

::: tip Conseil pratique
Créez un email dédié aux automatisations, par exemple `automation@votreentreprise.fr`. Ainsi, les envois ne dépendent pas d’un seul individu et sont traçables.
:::

## Exemple de règle de diffusion sécurisée

> Les emails récapitulatifs hebdomadaires ne peuvent être envoyés qu'aux personnes identifiées dans la liste de diffusion validée par le dirigeant. Toute demande d'ajout doit faire l'objet d'une validation écrite. Les données chiffrées sensibles (CA détaillé, marges, données clients nominatives) ne sont pas incluses dans le corps de l'email.

::: card Exemple 2 : le commerce en ligne de Sablé-sur-Sarthe
Un site e-commerce envoie automatiquement des notifications Slack à chaque commande. Le webhook Slack était stocké dans un fichier texte partagé. Après un audit, le webhook est déplacé dans un gestionnaire de mots de passe et les accès sont limités.
:::

## Fréquence de maintenance recommandée

| Type de contrôle | Fréquence | Action |
|---|---|---|
| Logs d’envoi | Mensuelle | Vérifier le nombre d’envois et les erreurs |
| Liste des destinataires | Trimestrielle | Réviser les accès et retirer les inactifs |
| Permissions API | Trimestrielle | Vérifier que les droits sont au minimum nécessaire |
| Test avec données fictives | Semestrielle | Valider le comportement en cas d’anomalie |
| Documentation | À chaque modification | Mettre à jour la fiche workflow |

::: attention Point de vigilance
Une baisse inattendue du nombre d’envois peut indiquer une panne silencieuse. Surveillez les logs chaque semaine, pas seulement en cas de problème.
:::

## Plan d’action cette semaine

1. **Identifier les workflows critiques** de votre entreprise.
2. **Vérifier que chaque workflow utilise un compte dédié**, pas un compte personnel.
3. **Activer la 2FA** sur tous les outils connectés.
4. **Déplacer les tokens et mots de passe** dans un gestionnaire de mots de passe.
5. **Créer une alerte** en cas d’échec d’un workflow critique.
6. **Planifier une révision** tous les 3 mois.

::: retenir En résumé
La sécurité d’un workflow, ce sont des comptes dédiés, des droits limités, des logs surveillés et une maintenance régulière. Un workflow bien sécurisé est un workflow fiable dans la durée.
:::