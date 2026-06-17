# Corrigé de l’exercice — Identifier et cartographier ses tâches répétitives

## Exemple complet pour un(e) assistant(e) administratif(ve)

| Tâche | Fréquence | Temps/semaine | Répétitive | Données identifiables | Score |
|---|---|---|---|---|---|
| Saisie des factures | Quotidien | 4 h | Oui | Email + Drive + logiciel de comptabilité | Facile |
| Relance fournisseurs | Hebdo | 1,5 h | Oui | Email + tableur | Facile |
| Mise à jour du planning | Hebdo | 1 h | Oui | Agenda partagé | Moyen |
| Préparation du reporting | Mensuel | 3 h | Oui | 3 tableurs | Moyen |
| Tri du courrier papier | Quotidien | 45 min | Non | Papier | Difficile |

**Tâche prioritaire** : Saisie des factures (4 h/semaine, données digitales, faible risque).

## Fiche processus exemple

### Déclencheur
Réception d'un email contenant une facture PDF dans la boîte "factures@entreprise.fr".

### Étapes actuelles
1. Ouvrir l'email.
2. Télécharger la pièce jointe PDF.
3. Renommer le fichier : "FACTURE_FOURNISSEUR_YYYY-MM.pdf".
4. L'enregistrer dans le dossier "Comptabilité/YYYY/Fournisseurs".
5. Saisir manuellement les informations dans le logiciel de comptabilité.

### Données utilisées
- Email (expéditeur, objet, pièce jointe)
- PDF de la facture
- Logiciel de comptabilité

### Cas d'exception
- Facture sans pièce jointe : relancer le fournisseur manuellement.
- Fournisseur inconnu : créer la fiche fournisseur avant saisie.
- Montant anormal : alerter le dirigeant.

### Résultat attendu
La facture est enregistrée, renommée et saisie dans la comptabilité dans les 24 h.

## Recommandation d'automatisation
- **Étape 1** : automatiser le renommage et l'enregistrement dans le drive.
- **Étape 2** : extraire automatiquement montant, date et fournisseur.
- **Étape 3** : créer une écriture brouillon dans le logiciel de comptabilité.

Outils suggérés : n8n (auto-hébergé) ou Make + Google Drive + logiciel comptable avec API.
