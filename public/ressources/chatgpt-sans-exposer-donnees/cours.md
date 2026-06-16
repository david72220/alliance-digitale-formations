# Utiliser ChatGPT sans exposer ses données

## Le risque : l’IA apprend de vos prompts

Les données saisies dans les outils d’IA grand public peuvent être utilisées pour améliorer les modèles. En entreprise, cela signifie que des **données clients, salariés ou financières** peuvent être exposées.

---

## Les 5 règles de sécurité

### 1. Anonymiser avant d’envoyer
Remplacez les noms, emails, adresses, numéros de téléphone, SIRET par des placeholders.

### 2. Utiliser des modèles locaux ou privés
Pour les données sensibles, privilégiez des solutions auto-hébergées (Ollama, Proton AI, Azure OpenAI privé).

### 3. Ne jamais copier-coller de données bancaires, médicales ou juridiques
Même avec un prompt anonymisé, certaines informations sont trop sensibles.

### 4. Désactiver l’amélioration du modèle
ChatGPT Pro et Entreprise permettent de désactiver l’utilisation des conversations pour l’entraînement.

### 5. Documenter une politique interne
Dites clairement aux salariés ce qui est autorisé ou interdit.

---

## Exemple d’anonymisation

**Données originales :**

> La société Dupont SARL, 12 rue de la Paix 72000 Le Mans, client depuis 2019, a facturé 45 000 € à l’entreprise Martin.

**Version anonymisée :**

> Une PME du secteur [A], basée en [région], cliente depuis [X] ans, a facturé [montant] à une autre entreprise du secteur [B].

---

## Outils recommandés

- **Confidentiel** : Ollama, GPT4All, Azure OpenAI privé
- **Contrôlé** : ChatGPT Enterprise avec opt-out entraînement
- **Anonymisation** : regex maison, scripts Python, extension de navigateur

---

## Automatisation possible

- Script d’anonymisation automatique avant envoi à l’IA.
- Détection des données sensibles dans un prompt.
- Blocage si un prompt contient des motifs critiques.

---

## Point d’action cette semaine

Rédigez une **charte d’usage de l’IA** en entreprise : 5 données interdites et 3 règles d’anonymisation.
