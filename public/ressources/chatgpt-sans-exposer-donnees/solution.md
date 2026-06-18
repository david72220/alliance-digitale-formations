# Corrigé de l’exercice — Anonymisation IA

## Exemple de charte d’usage

### Données interdites dans les outils d’IA publics

1. Données bancaires et financières détaillées.
2. Données médicales ou d’assurance.
3. Données des salariés (RIB, adresse, contrat).
4. Données clients identifiables sans accord.
5. Informations juridiques sensibles en cours.

### Règles d’anonymisation

1. Remplacer les noms par [Personne A], les entreprises par [Entreprise X].
2. Masquer les montants, dates précises et localisations si elles permettent d’identifier quelqu’un.
3. Utiliser des modèles locaux ou privés pour tout document classé confidentiel.

## Exemple de tableau d’anonymisation

| Élément | Donnée originale | Donnée anonymisée |
|---|---|---|
| Nom de personne | Jean Dupont | [Personne A] |
| Nom d’entreprise | Dupont SARL | [Entreprise X] |
| Adresse | 12 rue de la Paix, 72000 Le Mans | [Adresse], [Ville] |
| Email | jean.dupont@example.com | [Email A] |
| Téléphone | 06 12 34 56 78 | [Téléphone] |
| Montant | 45 000 € | [Montant] |
| Date précise | 15 mars 2024 | [Date] |

## Points de vigilance

- L’anonymisation n’est pas une fin en soi : pensez aussi à la réversibilité.
- Même un texte anonymisé peut révéler des informations par croisement.
- Formez les équipes régulièrement, car les usages évoluent vite.

## Grille d’évaluation du livrable

| Critère | 1 point | 2 points | 3 points |
|---|---|---|---|
| Anonymisation | Données sensibles toujours présentes | Données partiellement anonymisées | Tous les éléments sensibles anonymisés |
| Charte | Incomplète ou peu claire | 5 interdictions + 3 règles mais mal rédigées | Charte claire, applicable et compréhensible |
| Pertinence des règles | Règles hors sujet | Règles pertinentes mais génériques | Règles adaptées au contexte de l’entreprise |
| Régularité | Charte ponctuelle | Charte rédigée mais sans plan de formation | Charte avec plan de diffusion et de rappel |