# La double authentification : déploiement pas à pas

## Pourquoi la double authentification (2FA) est incontournable

Le 2FA bloque **plus de 99 %** des attaques par mot de passe compromis. Même si un salarié se fait voler son mot de passe, l’attaquant ne peut pas se connecter sans le second facteur.

---

## Les 3 types de facteurs

1. **Ce que vous savez** : mot de passe, code PIN.
2. **Ce que vous avez** : téléphone, clé de sécurité, application d’authentification.
3. **Ce que vous êtes** : empreinte digitale, reconnaissance faciale.

Le 2FA combine deux facteurs différents. L’association la plus courante en PME : **mot de passe + application d’authentification**.

---

## Déploiement en 5 étapes

### 1. Identifier les outils critiques
Email, CRM, paie, comptabilité, drive, réseaux sociaux professionnels.

### 2. Vérifier la compatibilité
La plupart des outils modernes proposent du 2FA natif.

### 3. Choisir la méthode
Applications TOTP (Google Authenticator, Microsoft Authenticator, Authy) ou clés physiques YubiKey.

### 4. Déployer progressivement
Commencez par les dirigeants et les accès sensibles, puis généralisez.

### 5. Former et accompagner
Expliquez le pourquoi, montrez comment scanner le QR code, prévoyez une procédure en cas de perte de téléphone.

---

## Outils recommandés

- **Applications** : Microsoft Authenticator, Google Authenticator, Authy, Proton Pass
- **Clés physiques** : YubiKey
- **Gestion centralisée** : Azure AD, Google Workspace, JumpCloud

---

## Automatisation possible

- Forçage du 2FA à la connexion.
- Audit des comptes non protégés.
- Alertes en cas de connexion sans 2FA.

---

## Point d’action cette semaine

Activez le 2FA sur les 3 outils les plus sensifs de votre PME et formez les 2 premiers utilisateurs.
