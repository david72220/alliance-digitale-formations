# Utiliser ChatGPT sans exposer ses données

## Pourquoi ce sujet est critique pour une PME ?

Lorsque vous utilisez ChatGPT, Claude ou Copilot, vous envoyez du texte sur des serveurs extérieurs. Si ce texte contient des données personnelles, financières ou commerciales sensibles, votre entreprise prend un risque.

::: retenir L’idée centrale
Utiliser l’IA en entreprise demande de protéger les données dès la saisie. L’anonymisation, les comptes dédiés et les modèles locaux sont les trois piliers d’un usage responsable.
:::

### Une faute très courante

Un salarié copie un email client dans ChatGPT pour en faire un résumé. L’email contient des coordonnées personnelles, un historique de commandes et un contexte financier. Même sans mauvaise intention, cette action expose l’entreprise.

::: card Exemple concret
Dans une PME de conseil du Mans, un assistant utilise ChatGPT pour reformuler un compte rendu client. Le texte original mentionne le nom du dirigeant client, le montant d’un projet en cours et une difficulté financière. Après formation, l’entreprise met en place une charte d’usage et un modèle d’anonymisation standard.
:::

## Les 5 règles pour utiliser l’IA sans exposer vos données

### 1. Anonymiser avant d’envoyer

Remplacez les éléments sensibles par des placeholders génériques.

| Donnée réelle | Donnée anonymisée |
|---|---|
| Jean Dupont | [Personne A] |
| Dupont SARL | [Entreprise X] |
| 12 rue de la Paix, 72000 Le Mans | [Adresse], [Ville] |
| 06 12 34 56 78 | [Téléphone] |
| 45 000 € | [Montant] |
| 15 mars 2024 | [Date] |

::: tip Astuce pratique
Créez un document interne avec les placeholders à utiliser. Toute l’équipe anonymise de la même façon. Cela évite les oublis et accélère le travail.
:::

### 2. Ne jamais copier-coller certaines données

Même anonymisé, certains types de documents ne doivent jamais transiter dans un outil d’IA public :

- Données bancaires et financières détaillées.
- Données médicales ou d’assurance.
- Données des salariés (RIB, contrat, adresse).
- Données clients identifiables sans accord.
- Informations juridiques sensibles en cours.

### 3. Utiliser des comptes professionnels

ChatGPT propose des formules Entreprise qui permettent de désactiver l’utilisation des conversations pour améliorer le modèle. Pour une PME, c’est une protection essentielle.

### 4. Privilégier les modèles locaux pour les données sensibles

Pour les documents confidentiels, utilisez des solutions hébergées localement comme Ollama ou des solutions privées certifiées en France. Ainsi, les données ne quittent jamais votre environnement.

### 5. Documenter une politique interne

Dites clairement aux salariés ce qui est autorisé ou interdit. Une charte d’usage écrite, même courte, est plus efficace qu’un rappel oral.

::: attention Attention aux fausses certitudes
Même un texte anonymisé peut révéler des informations par recoupement. Si le contexte est très précis, utilisez un modèle local ou ne transmettez pas le document.
:::

## Comment former rapidement vos équipes

1. Organisez une réunion de 30 minutes sur les risques concrets.
2. Distribuez un modèle d’anonymisation.
3. Faites un exercice pratique avec un email interne.
4. Créez un canal de questions pour les cas ambigus.
5. Refaites un point tous les 6 mois.

## Plan d’action sur une semaine

- **Jour 1** : identifier les outils d’IA actuellement utilisés dans l’entreprise.
- **Jour 2** : lister les 5 types de données interdits dans les outils publics.
- **Jour 3** : créer un modèle d’anonymisation standard.
- **Jour 4** : rédiger une charte d’usage interne.
- **Jour 5** : présenter la charte à l’équipe.
- **Jour 6** : tester l’anonymisation sur 3 documents réels.
- **Jour 7** : identifier si un modèle local est pertinent pour votre activité.
