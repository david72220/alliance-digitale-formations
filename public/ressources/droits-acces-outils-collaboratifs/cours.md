# Gérer les droits d’accès dans les outils collaboratifs

## Le principe de minimisation

Le RGPD impose le **principe de minimisation** : ne collecter et ne donner accès qu’aux données strictement nécessaires.

Dans les faits, beaucoup de drives d’entreprise sont ouverts à tout le monde. C’est un risque majeur.

---

## Méthode en 4 étapes

### 1. Faire l’inventaire des accès
Listez les outils partagés : drive, CRM, Notion, Airtable, gestion de paie, etc.

### 2. Définir les rôles
Créez des profils d’accès par fonction : dirigeant, RH, commercial, assistant, comptable.

### 3. Restreindre les permissions
Par défaut : aucun accès. Puis ouvrir au cas par cas.

### 4. Réviser régulièrement
Un contrôle trimestriel des accès évite les oublis (départ de salariés, changement de poste).

---

## Exemple de matrice des rôles

| Outil / Donnée | Dirigeant | RH | Commercial | Assistant | Comptable |
|---|---|---|---|---|---|
| Dossiers salariés | ✓ | ✓ | ✗ | ✗ | ✗ |
| Base clients | ✓ | ✗ | ✓ | ✗ | ✗ |
| Comptabilité | ✓ | ✗ | ✗ | ✗ | ✓ |
| Drive général | ✓ | ✓ | ✓ | ✓ | ✓ |
| Paramètres admin | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## Outils recommandés

- **Google Workspace** : groupes d’unités organisationnelles, accès conditionnels
- **Microsoft 365** : Azure AD, rôles IAM
- **Notion / Airtable** : permissions par base, par page, par champ

---

## Automatisation possible

- Script de révocation automatique à la sortie d’un salarié.
- Audit trimestriel des accès.
- Alerte si un fichier sensible est partagé publiquement.

---

## Point d’action cette semaine

Faites un audit rapide des accès à votre drive principal. Identifiez **3 dossiers** qui devraient être restreints.
