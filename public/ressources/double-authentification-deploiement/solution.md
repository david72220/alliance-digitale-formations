# Solution de l’exercice — Déploiement 2FA

## Exemple de plan

| Outil | 2FA natif | Méthode choisie | Priorité |
|---|---|---|---|
| Email (Google Workspace) | Oui | Microsoft Authenticator | 1 |
| CRM | Oui | Application TOTP | 1 |
| Drive | Oui | Application TOTP | 1 |
| Logiciel de paie | Oui | SMS / application | 2 |
| Réseaux sociaux pro | Oui | Application TOTP | 2 |

## Mini-guide salarié

1. Installez Microsoft Authenticator ou Google Authenticator.
2. Connectez-vous à l’outil avec votre mot de passe habituel.
3. Allez dans Paramètres → Sécurité → Double authentification.
4. Scannez le QR code avec l’application.
5. Saisissez le code à 6 chiffres affiché.

## Points de vigilance

- Prévoyez des codes de secours imprimés pour chaque compte critique.
- Ne forcez pas tous les outils le premier jour : déployez par vagues.
- Accompagnez les salariés peu à l’aise avec le numérique.
- Faites un audit mensuel des comptes sans 2FA.
