import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const updates = {
  '38396280-38de-8111-a5d9-fe1506cfbbdb': {
    titre: 'Sécurisation d\'un tableau de bord en ligne',
    probleme: 'Un tableau de bord interne accessible librement sur internet, sans mot de passe ni connexion sécurisée. Risque d\'intrusion à tout moment.',
    solution: 'Mise en place d\'une connexion sécurisée (HTTPS) avec mot de passe et certificat renouvelé automatiquement. Le tableau de bord n\'est plus directement exposé.',
    resultat: 'Outil 100 % sécurisé, certificat renouvelé sans intervention, aucun accès direct possible depuis l\'extérieur.',
    secteur: 'Sécurité informatique',
  },
  '38396280-38de-8113-be06-e3d834347442': {
    titre: 'Prospection LinkedIn automatisée pour une PME santé',
    probleme: 'Une équipe commerciale perdait des heures à chercher manuellement sur LinkedIn les professionnels de santé parlant de leurs besoins.',
    solution: 'Mise en place d\'un système qui repère automatiquement les bons profils, évalue leur intérêt, et alerte l\'équipe en temps réel sur Telegram pour les prospects les plus chauds.',
    resultat: 'Jusqu\'à 80 profils analysés par jour, alerte instantanée sur les meilleurs prospects, aucun risque de blocage du compte LinkedIn.',
    secteur: 'Santé / Bien-être',
  },
  '38396280-38de-812b-9309-c9cf76f509e8': {
    titre: 'Dictée vocale privée sur Mac',
    probleme: 'Besoin d\'un outil de dictée vocale rapide et privé sur Mac, sans envoyer la voix dans le cloud.',
    solution: 'Petite application Mac qui transforme la voix en texte directement sur l\'ordinateur, déclenchable par un raccourci clavier depuis n\'importe quelle application.',
    resultat: 'Dictée 100 % locale, aucun envoi de données sur internet, fonctionne dans toutes les apps Mac.',
    secteur: 'Productivité',
  },
  '38396280-38de-8131-89bf-eb5b31020905': {
    titre: 'Assistant de veille automatique pour un centre de formation',
    probleme: 'Un centre de formation devait suivre quotidiennement l\'actualité de son secteur (fibre optique, financements) sans y consacrer une personne à temps plein.',
    solution: 'Système qui surveille chaque jour les sources clés, résume les nouveautés importantes et propose des actions au dirigeant pour validation.',
    resultat: 'Une veille fiable tournant 24h/24, sans surcharge humaine, avec décisions toujours validées par le dirigeant.',
    secteur: 'Formation professionnelle',
  },
  '38396280-38de-8144-8494-e8c8e0e2b421': {
    titre: 'Import automatique des adhérents d\'un club auto',
    probleme: 'Saisie manuelle longue et risquée des nouveaux adhérents depuis le site d\'inscription vers la banque et le tableau de suivi.',
    solution: 'Connexion automatique entre la plateforme d\'adhésion et l\'outil bancaire. Détection des doublons, mise à jour quotidienne sans intervention.',
    resultat: '285 adhérents importés automatiquement dès le premier essai, plus aucune ressaisie manuelle.',
    secteur: 'Association / Club',
  },
  '38396280-38de-816a-9056-d2408ef931c4': {
    titre: 'Agenda unifié + briefing quotidien',
    probleme: '4 sources de rendez-vous séparées (Outlook, Gmail, agenda pro, tâches) rendaient impossible d\'avoir une vue claire de la semaine.',
    solution: 'Tous les agendas sont rassemblés dans un seul calendrier. Un briefing arrive chaque matin avec le programme du jour, et un point hebdomadaire signale les conflits.',
    resultat: 'Vue complète de l\'agenda, plus d\'oubli, briefings automatiques chaque jour et chaque semaine.',
    secteur: 'Productivité dirigeant',
  },
  '38396280-38de-816f-a58b-e5e484e3c5ca': {
    titre: 'Tableau de bord marketing pour une auto-entrepreneure',
    probleme: 'Une auto-entrepreneure avait besoin d\'un outil unique pour analyser ses contenus, suivre la concurrence et générer des idées de publications, sans s\'occuper de la technique.',
    solution: 'Un tableau de bord clé en main qui analyse, fait la veille et propose des idées de posts chaque semaine. Le coût d\'utilisation reste très faible.',
    resultat: 'Environ 0,10 €/semaine de coût, veille et idées de posts livrées automatiquement chaque semaine.',
    secteur: 'Coaching / Formation en ligne',
  },
  '38396280-38de-8195-a8ef-caf88b6e6ccb': {
    titre: 'Réparation de l\'annuaire d\'un club d\'adhérents',
    probleme: 'Après le changement de logiciel, la majorité des adhérents avaient disparu de l\'annuaire en ligne du club.',
    solution: 'Diagnostic rapide de la cause, correction ciblée du bug sans toucher aux données, et sécurisation de la clé d\'accès.',
    resultat: '100 % des adhérents de nouveau visibles le jour même, sans perte de données.',
    secteur: 'Association / Club',
  },
  '38396280-38de-81b4-abe3-d9a74021f7d3': {
    titre: 'Audit complet d\'une infrastructure d\'automatisations',
    probleme: 'Près de 100 automatisations cumulées au fil du temps, dont une grande partie en panne ou utilisant des outils obsolètes, sans qu\'on le sache.',
    solution: 'Audit complet, remise à niveau, et identification d\'une faille de sécurité critique à corriger en priorité.',
    resultat: '69 % des automatisations comportaient au moins une erreur ; une faille de sécurité critique a été identifiée et corrigée.',
    secteur: 'Audit / Automatisation',
  },
  '38396280-38de-81bd-97c8-c496f0820243': {
    titre: 'Indicateurs de satisfaction étudiants calculés automatiquement',
    probleme: 'Le calcul mensuel des taux de satisfaction, de réussite et d\'abandon prenait des heures et était source d\'erreurs.',
    solution: 'Mise en place d\'un calcul automatique chaque 1er du mois pour toutes les formations, sans intervention humaine.',
    resultat: 'Tableau de bord à jour le 1er de chaque mois, fini la consolidation manuelle.',
    secteur: 'Formation professionnelle',
  },
  '38396280-38de-81e7-8d8f-f4d28f68bf14': {
    titre: 'Sauvegarde automatique d\'un serveur d\'entreprise',
    probleme: 'Un serveur important hébergeant les outils de l\'entreprise n\'avait aucune sauvegarde. Risque de tout perdre en cas d\'incident.',
    solution: 'Sauvegardes chiffrées 2 fois par jour vers un espace cloud sécurisé, avec un script de restauration simple et une procédure de reprise documentée.',
    resultat: '37 Go d\'espace libéré, 2 sauvegardes par jour, restauration possible en quelques clics.',
    secteur: 'Sécurité informatique',
  },
  '38396280-38de-81ee-affd-c5fdd1c54808': {
    titre: 'Conseil des 6 — décisions challengées par 6 IA',
    probleme: 'Avant de lancer un projet, on aimerait avoir l\'avis croisé de plusieurs experts. Une seule IA donne une vision trop limitée.',
    solution: 'Plateforme qui interroge 6 IA différentes sur la même question, en deux tours d\'analyse, puis livre une synthèse unique et structurée.',
    resultat: '6 angles d\'analyse réunis en 3 à 4 minutes, rapport structuré prêt à exploiter.',
    secteur: 'Aide à la décision',
  },
  '38196280-38de-8125-86f4-d024e90025e1': {
    titre: 'Briefing quotidien et hebdomadaire sur Telegram',
    probleme: 'Chaque matin, perte de temps à consulter mails, agenda et tâches séparément. Aucune vue d\'ensemble de la semaine.',
    solution: 'Un message arrive chaque matin à 8h avec le programme du jour (agenda, mails importants, tâches). Un briefing hebdomadaire fait le point sur la semaine.',
    resultat: '30 min/jour économisées, toutes les priorités vues avant 9h.',
    secteur: 'Productivité dirigeant',
  },
  '38196280-38de-8137-9cf6-ccab6bed3a6b': {
    titre: 'Conseil des 8 — délibération stratégique avec 8 IA',
    probleme: 'Les décisions stratégiques sont souvent prises sans regard critique extérieur. Difficile d\'avoir une vraie vision à 360°.',
    solution: 'Plateforme qui fait délibérer 8 IA aux profils opposés (analyste financier, stratège, marketeur, etc.) sur votre projet, puis livre une synthèse claire.',
    resultat: 'Une analyse stratégique complète en 8 minutes au lieu de 2 jours de réunions.',
    secteur: 'Conseil stratégique',
  },
  '38196280-38de-8167-adb5-ec858129dc83': {
    titre: 'Publication d\'une formation en 1 clic depuis Notion',
    probleme: 'À chaque modification du catalogue, il fallait demander à un développeur d\'intervenir et redéployer le site.',
    solution: 'Le formateur coche simplement une case dans Notion. Le site se met à jour automatiquement en une minute.',
    resultat: 'Plus besoin de développeur, délai de mise en ligne réduit de 2 jours à 1 minute.',
    secteur: 'Formation professionnelle',
  },
  '38196280-38de-817b-9bc6-e2bb5e8d6930': {
    titre: 'Sécurisation d\'une infrastructure d\'IA exposée',
    probleme: 'Un serveur d\'IA était accessible librement depuis internet : n\'importe qui pouvait consommer le crédit IA de l\'entreprise sans laisser de trace.',
    solution: 'Fermeture de l\'accès public, mise en place d\'un mot de passe sur les points d\'entrée sensibles, et désactivation des passerelles non sécurisées.',
    resultat: 'Crédit IA préservé, accès non autorisés stoppés à 100 %, aucun impact sur les usages internes.',
    secteur: 'Sécurité informatique',
  },
  '38196280-38de-81b4-a0f0-d54feeeb05cb': {
    titre: 'Création d\'une formation en 45 minutes au lieu de 3 semaines',
    probleme: 'Créer une formation complète (modules, cours, supports) demandait 3 semaines de travail. Impossible de faire grandir le catalogue rapidement.',
    solution: 'Chaîne d\'IA qui génère automatiquement les modules, cours, contenus et supports à partir d\'un simple titre validé dans Notion.',
    resultat: 'Une formation complète prête en 45 minutes (×400 plus rapide qu\'avant).',
    secteur: 'Formation professionnelle',
  },
  '38196280-38de-81ca-9cc6-e6c401248a58': {
    titre: 'Veille SEO automatique chaque semaine',
    probleme: 'L\'analyse SEO du site était faite manuellement, et les contenus du blog n\'étaient pas alignés avec les vraies recherches Google.',
    solution: 'Audit SEO automatique chaque lundi matin, avec suggestions de contenu à publier pour mieux ressortir sur Google.',
    resultat: '+30 % de mots-clés bien positionnés en 3 mois, plus aucun travail d\'analyse manuel.',
    secteur: 'Formation professionnelle',
  },
  '38196280-38de-81f4-b891-e7d2b3d928c1': {
    titre: 'Site vitrine immersif pour un centre de formation',
    probleme: 'Site institutionnel basique, peu engageant, avec un faible taux de demandes d\'inscription.',
    solution: 'Refonte complète avec animations, défilement fluide et scènes interactives pour raconter les métiers. Le site se met à jour en une minute après chaque modification.',
    resultat: 'Temps de lecture multiplié par 4, demandes de devis en hausse de 60 %.',
    secteur: 'Formation professionnelle',
  },
  '38196280-38de-81f9-877d-e2134b74abc2': {
    titre: 'Détection automatique de prospects santé sur LinkedIn',
    probleme: 'Le commercial passait des heures à chercher sur LinkedIn les professionnels de santé parlant de leurs problématiques, sans méthode systématique.',
    solution: 'Chaîne automatisée qui repère les bons profils, analyse leurs publications, et alerte instantanément quand un prospect chaud apparaît.',
    resultat: '80 prospects qualifiés par jour au lieu de 5 manuellement, alertes en temps réel.',
    secteur: 'Santé / E-commerce',
  },
};

const richText = (s) => ({ rich_text: [{ type: 'text', text: { content: s } }] });
const title = (s) => ({ title: [{ type: 'text', text: { content: s } }] });

let ok = 0;
for (const [pageId, u] of Object.entries(updates)) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        'Titre': title(u.titre),
        'Problème': richText(u.probleme),
        'Solution': richText(u.solution),
        'Résultat chiffré': richText(u.resultat),
        'Secteur': richText(u.secteur),
      },
    });
    console.log(`✓ ${u.titre}`);
    ok++;
  } catch (e) {
    console.error(`✗ ${pageId}: ${e.message}`);
  }
}
console.log(`\nDone: ${ok}/${Object.keys(updates).length}`);
