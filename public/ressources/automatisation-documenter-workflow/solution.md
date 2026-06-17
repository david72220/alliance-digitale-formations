### 5 questions urgentes

1. Quel est le déclencheur exact du workflow ? (nouvelle commande, modification de statut, vérification périodique ?)
2. Quel outil envoie le SMS ? (Twilio, Webhook, service tiers, téléphone personnel ?)
3. Qui reçoit actuellement le SMS ? Le numéro est-il encore à jour ?
4. Quelles données sont utilisées ? Le montant est-il le seul critère ?
5. Où sont stockés l'accès et le code du workflow ? Qui en a la propriété ?

### Fiche workflow partielle à compléter

```
Nom du workflow : Alerte SMS commandes stratégiques > 5 000 €

Objectif métier :
Notifier rapidement le responsable des commandes importantes pour accélérer la validation ou la production.

Déclencheur :
À vérifier : probablement à la création ou validation d'une commande dans [outil à identifier].

Étapes :
1. Détecter une commande de plus de 5 000 €.
2. Vérifier le numéro du responsable.
3. Envoyer un SMS via [service à identifier].
4. [Éventuellement] enregistrer l'envoi dans un fichier de log.

Données utilisées :
- Montant de la commande (non sensible seul)
- Numéro de téléphone du responsant (donnée personnelle à protéger)
- Référence commande (non sensible)

Outils connectés :
- [Outil de commandes à identifier]
- [Service SMS à identifier]

Accès et sécurité :
- Compte utilisé : [à identifier]
- Stockage des identifiants : [à vérifier, probablement dans le script ou un fichier non sécurisé]
- Personnes habilitées : [à redéfinir]

Propriétaire : [à désigner]
Dernière révision : [date actuelle]
Prochaine révision : dans 3 mois
```

### 3 actions dans les 48 h

1. Identifier le compte et le service utilisés pour l'envoi SMS ; vérifier s'il s'agit d'un compte personnel ou professionnel.
2. Vérifier que l'alerte fonctionne encore en créant une commande test fictive de 5 000 €, ou en consultant les logs.
3. Désigner un nouveau propriétaire du workflow et commencer la documentation sur le modèle Alliance Digitale.

### Message de vérification

> Bonjour [Prénom],
>
> Nous réalisons un audit de nos alertes automatiques. Pouvez-vous me confirmer si vous recevez toujours un SMS lorsqu'une commande dépasse 5 000 € ? Si oui, à quelle fréquence environ ?
>
> Merci d'avance pour votre retour.

### Règle de nommage et classement

- **Nom du fichier/script** : `[module]-[action]-[cible]-[critère]`
  Exemple : `ventes-alerte-sms-responsable-commande-5000`
- **Dossier de documentation** : un espace dédié « Workflows automatisés » avec une sous-page par workflow.
- **Tag ou statut** : chaque fiche indique « Actif / À réviser / À décommissionner ».