/**
 * Contenu éditorial différencié des pages /zones/[slug]/ — vague 1 (9 villes).
 * Les données factuelles (nb PME, secteurs NAF) viennent de data/zones/stats.json
 * (recherche-entreprises.api.gouv.fr, à rafraîchir tous les 3 mois via
 * `node scripts/fetch_zone_stats.mjs`). Le contenu éditorial ci-dessous reste stable
 * et n'a pas besoin d'être régénéré — seuls les chiffres du bloc stats évoluent.
 */
import stats from '../../data/zones/stats.json';

export interface ZoneStats {
  slug: string;
  nomUsage: string;
  departement: string;
  codeCommune: string;
  totalEntreprisesActives: number;
  totalPME3a49: number;
  topSecteurs: { code: string; libelle: string; count: number }[];
  calculeLe: string;
}

export interface Zone {
  slug: string;
  ville: string;
  departement: string;
  departementNom: string;
  tier: 1 | 2 | 3;
  distanceLeMans: string; // "45 km / 40 min"
  modeIntervention: string;
  zoneActivite: string; // nom réel d'une zone d'activité / bassin économique local
  accroche: string; // paragraphe d'ancrage local, 100-150 mots
  pitchSecteur: string; // angle sectoriel basé sur le NAF dominant, 150-200 mots
  etudeCasSlug?: string; // slug d'une étude de cas existante à mettre en avant si pertinente
  faq: { question: string; reponse: string }[];
  published: boolean;
}

export const ZONE_STATS: ZoneStats[] = stats as ZoneStats[];

export const ZONES: Zone[] = [
  {
    slug: 'le-mans',
    ville: 'Le Mans',
    departement: '72',
    departementNom: 'Sarthe',
    tier: 1,
    distanceLeMans: 'siège Alliance Digitale',
    modeIntervention: 'Présentiel dans vos locaux ou dans nos espaces de formation, ou à distance selon vos préférences.',
    zoneActivite: 'zones d\'activité de Ruaudin, Novaxis et du technopôle du Mans',
    accroche: `Le Mans concentre le principal bassin économique de la Sarthe. Autour du centre-ville et des zones d'activité de Ruaudin, Novaxis et du technopôle, plusieurs milliers de PME emploient entre 3 et 49 salariés — le cœur de cible d'Alliance Digitale. C'est notre ville de rattachement : les échanges en présentiel s'organisent sans contrainte de déplacement, et la majorité de nos accompagnements en cours se déroulent ici.`,
    pitchSecteur: `Le tissu manceau est dominé par le commerce et la réparation automobile, suivi des activités scientifiques et techniques puis de l'hébergement-restauration. Cette diversité sectorielle est un atout : elle permet d'adapter précisément les cas pratiques de formation au métier de chaque entreprise plutôt que de proposer un contenu générique. Pour un commerce ou un garage, l'automatisation porte souvent sur les devis, les relances et la prise de rendez-vous ; pour un bureau d'études ou un cabinet technique, sur la rédaction, l'analyse de documents et la veille.`,
    etudeCasSlug: 'comptes-rendus-pme-industrielle',
    faq: [
      {
        question: "Intervenez-vous directement dans les locaux des entreprises manceaux ?",
        reponse: "Oui, c'est notre mode d'intervention principal au Mans : audit et formation se font sur site, dans vos locaux, avec vos outils et vos équipes.",
      },
      {
        question: "Vos formations sont-elles adaptées aux commerces et garages du Mans, très présents localement ?",
        reponse: "Oui. Le secteur commerce et réparation automobile est le premier employeur PME de la ville : nos ateliers pratiques s'appuient sur des cas concrets — prise de rendez-vous automatisée, relances devis, gestion des stocks — directement transposables à ce type d'activité.",
      },
      {
        question: "Combien de temps faut-il pour mettre en place un premier automatisme ?",
        reponse: "Un premier workflow simple (relance email, notification, saisie automatisée) se conçoit en une demi-journée à une journée d'atelier, directement opérationnel à l'issue de la session.",
      },
    ],
    published: true,
  },
  {
    slug: 'sable-sur-sarthe',
    ville: 'Sablé-sur-Sarthe',
    departement: '72',
    departementNom: 'Sarthe',
    tier: 1,
    distanceLeMans: 'environ 45 km / 40 min du Mans',
    modeIntervention: 'Présentiel dans vos locaux à Sablé-sur-Sarthe et alentours, ou en visioconférence.',
    zoneActivite: 'zone industrielle de Sablé-Solesmes',
    accroche: `Deuxième pôle économique de la Sarthe, Sablé-sur-Sarthe s'appuie sur une zone industrielle historique (Sablé-Solesmes) où commerce, construction et industrie manufacturière forment l'essentiel du tissu PME. À environ 45 minutes du Mans, un déplacement sur site reste pertinent pour un audit initial ; les sessions de formation suivantes peuvent s'organiser à distance pour limiter les allers-retours.`,
    pitchSecteur: `Après le commerce, la construction/BTP et l'industrie manufacturière sont les deux secteurs les plus représentés parmi les PME de 3 à 49 salariés à Sablé. Pour une entreprise du bâtiment, l'automatisation porte typiquement sur le suivi de chantier, la facturation et les relances fournisseurs ; pour un atelier de production, sur la traçabilité, les commandes et le reporting qualité — des cas que nous intégrons directement dans les ateliers plutôt que de dérouler un programme générique.`,
    faq: [
      {
        question: "Une PME de la zone industrielle de Sablé-Solesmes peut-elle être accompagnée sur site ?",
        reponse: "Oui, nous nous déplaçons sur la zone industrielle de Sablé-Solesmes pour l'audit initial. Les ateliers de formation suivants peuvent ensuite se tenir en présentiel ou en visio selon votre organisation.",
      },
      {
        question: "Le BTP a-t-il des besoins spécifiques en automatisation ?",
        reponse: "Oui : suivi de chantier, relances devis/factures, et centralisation des documents sont les cas les plus fréquents que nous traitons pour les entreprises du bâtiment de la région sabolienne.",
      },
      {
        question: "Proposez-vous un financement OPCO pour les PME de Sablé ?",
        reponse: "Oui, comme pour l'ensemble de nos formations, une prise en charge OPCO peut être étudiée — contactez-nous pour vérifier votre éligibilité.",
      },
    ],
    published: true,
  },
  {
    slug: 'la-ferte-bernard',
    ville: 'La Ferté-Bernard',
    departement: '72',
    departementNom: 'Sarthe',
    tier: 1,
    distanceLeMans: 'environ 43 km / 40 min du Mans',
    modeIntervention: 'Présentiel dans vos locaux ou à distance, selon la formule retenue.',
    zoneActivite: 'zone d\'activité de la Bruère',
    accroche: `À l'est de la Sarthe, La Ferté-Bernard et sa zone d'activité de la Bruère rassemblent un tissu de PME orienté commerce et industrie manufacturière légère. C'est un bassin d'emploi moins dense que Le Mans ou Sablé, ce qui rend l'accompagnement souvent plus direct : peu d'intermédiaires, décisions rapides, mise en œuvre concrète dès la première session.`,
    pitchSecteur: `Le commerce local est suivi par l'industrie manufacturière puis les activités scientifiques et techniques. Pour les artisans et petits commerces fertois, les automatisations les plus rentables concernent la prise de rendez-vous, les relances clients et la gestion des avis ; pour les ateliers de production, la centralisation des commandes et le suivi de stock.`,
    faq: [
      {
        question: "Une petite structure de 3 à 5 salariés à La Ferté-Bernard peut-elle être accompagnée ?",
        reponse: "Oui, c'est même le profil le plus courant du bassin fertois. Les formations sont dimensionnées pour de petites équipes, avec un format court (demi-journée) adapté à une organisation resserrée.",
      },
      {
        question: "Le déplacement jusqu'à La Ferté-Bernard est-il facturé en plus ?",
        reponse: "Non, le déplacement dans la Sarthe est inclus dans nos prestations d'accompagnement.",
      },
    ],
    published: true,
  },
  {
    slug: 'la-fleche',
    ville: 'La Flèche',
    departement: '72',
    departementNom: 'Sarthe',
    tier: 1,
    distanceLeMans: 'environ 46 km / 45 min du Mans',
    modeIntervention: 'Présentiel dans vos locaux ou à distance, selon vos contraintes d\'organisation.',
    zoneActivite: 'zones d\'activité de La Flèche et bassin mécanique de précision',
    accroche: `La Flèche dispose d'un bassin d'emploi structuré autour de la mécanique de précision et de l'aéronautique, en plus d'un tissu commercial dense. C'est une ville où la culture industrielle est ancienne — les PME y sont souvent habituées à la rigueur qualité, ce qui facilite l'adoption de processus automatisés documentés plutôt que d'outils improvisés.`,
    pitchSecteur: `Après le commerce, la construction/BTP et l'industrie manufacturière dominent le tissu PME fléchois. Pour les sous-traitants mécanique et les PME industrielles, l'automatisation porte souvent sur le suivi de production, la traçabilité qualité et la gestion documentaire (fiches techniques, non-conformités) — un terrain où l'IA générative associée à des workflows n8n apporte un gain de temps net sans remettre en cause les process qualité existants.`,
    faq: [
      {
        question: "Vos formations conviennent-elles aux sous-traitants mécanique/aéronautique de La Flèche ?",
        reponse: "Oui. Nous adaptons les ateliers à la gestion documentaire et à la traçabilité qualité, des enjeux centraux pour ce type d'activité, sans remettre en cause vos process existants.",
      },
      {
        question: "Peut-on tester l'automatisation sur un seul processus avant de généraliser ?",
        reponse: "C'est la démarche que nous recommandons systématiquement : un premier workflow pilote sur un processus limité, mesurable, avant d'étendre à d'autres tâches.",
      },
    ],
    published: true,
  },
  {
    slug: 'mamers',
    ville: 'Mamers',
    departement: '72',
    departementNom: 'Sarthe',
    tier: 1,
    distanceLeMans: 'environ 45 km / 40 min du Mans',
    modeIntervention: 'Présentiel dans vos locaux (Nord Sarthe) ou à distance.',
    zoneActivite: 'bassin agricole et agroalimentaire du Saosnois',
    accroche: `Au nord de la Sarthe, Mamers et le Saosnois forment un bassin plus rural, avec une présence notable d'activités agricoles et agroalimentaires en complément du commerce local. C'est une zone où l'offre d'accompagnement numérique est plus rare qu'au Mans ou à Sablé — un axe que nous couvrons spécifiquement pour ne pas laisser les PME du nord du département sans solution de proximité.`,
    pitchSecteur: `Le commerce arrive en tête, suivi de près par l'industrie manufacturière et la construction. Pour les PME agricoles et agroalimentaires de la zone, les automatisations les plus utiles concernent le suivi des commandes fournisseurs, la traçabilité et les alertes de stock — des cas que nous intégrons aux ateliers pratiques plutôt que de proposer un contenu tourné vers les services urbains.`,
    faq: [
      {
        question: "Le Nord Sarthe (Mamers, Saosnois) est-il vraiment couvert par vos accompagnements ?",
        reponse: "Oui, explicitement. C'est une zone moins densément couverte par l'offre de formation numérique, et nous nous déplaçons sur ce secteur au même titre que sur Le Mans ou Sablé.",
      },
      {
        question: "Proposez-vous des cas d'usage adaptés à l'agroalimentaire ?",
        reponse: "Oui : suivi de commandes, alertes de stock et traçabilité sont des cas fréquents que nous traitons pour les PME agroalimentaires de la région.",
      },
    ],
    published: true,
  },
  {
    slug: 'chateau-du-loir',
    ville: 'Château-du-Loir',
    departement: '72',
    departementNom: 'Sarthe',
    tier: 1,
    distanceLeMans: 'environ 40 km / 35 min du Mans',
    modeIntervention: 'Présentiel dans vos locaux (Sud Sarthe) ou à distance.',
    zoneActivite: 'bassin industriel de Montval-sur-Loir',
    accroche: `Au sud de la Sarthe, Château-du-Loir — rattaché depuis 2016 à la commune de Montval-sur-Loir — conserve un tissu industriel historique. Le commerce, l'hébergement-restauration et l'industrie manufacturière y forment l'essentiel des PME de 3 à 49 salariés. C'est une zone complémentaire de La Flèche pour couvrir le sud du département sans laisser de zone blanche entre la Sarthe et l'Indre-et-Loire.`,
    pitchSecteur: `Le commerce domine, suivi de l'hébergement-restauration puis de l'industrie manufacturière — un profil un peu différent du reste de la Sarthe, avec un poids plus marqué du tourisme et de la restauration locale (vallée du Loir). Pour les hôtels-restaurants, les automatisations les plus demandées concernent la prise de réservation, les avis clients et les relances ; pour l'industrie locale, la gestion documentaire et le suivi de production.`,
    faq: [
      {
        question: "Travaillez-vous avec les hôtels-restaurants de la vallée du Loir ?",
        reponse: "Oui, ce secteur est bien représenté localement. Nous adaptons les ateliers à la gestion des réservations, des avis clients et des relances, spécifiques à l'hôtellerie-restauration.",
      },
      {
        question: "Château-du-Loir et Montval-sur-Loir, est-ce la même zone d'intervention ?",
        reponse: "Oui, Château-du-Loir est le nom d'usage historique de la commune nouvelle de Montval-sur-Loir depuis 2016 ; notre zone d'intervention couvre l'ensemble du secteur.",
      },
    ],
    published: true,
  },
  {
    slug: 'laval',
    ville: 'Laval',
    departement: '53',
    departementNom: 'Mayenne',
    tier: 2,
    distanceLeMans: 'environ 75 km / 55 min du Mans',
    modeIntervention: 'Présentiel sur site à Laval (jour dédié organisé à l\'avance) ou à distance.',
    zoneActivite: 'pôle économique lavallois (agroalimentaire, plasturgie, numérique)',
    accroche: `Laval est le pôle économique majeur de la Mayenne, avec plus de 1 300 PME de 3 à 49 salariés actives sur la commune. Le tissu y est nettement plus orienté services aux entreprises que dans le reste de notre zone d'intervention, avec une forte présence de l'agroalimentaire et de la plasturgie en complément. À près d'une heure du Mans, les interventions sur site se planifient à l'avance sur une journée dédiée, ou s'organisent à distance pour un suivi régulier.`,
    pitchSecteur: `Contrairement à la Sarthe où le commerce domine partout, les services administratifs et de soutien aux entreprises arrivent en tête à Laval, suivis du commerce puis des activités scientifiques et techniques. C'est un profil plus proche des métropoles régionales : PME de services, cabinets, prestataires B2B — pour qui l'automatisation porte souvent sur la gestion de la relation client, la facturation et le reporting, plutôt que sur des processus de production.`,
    faq: [
      {
        question: "Alliance Digitale intervient-elle en dehors de la Sarthe, à Laval ?",
        reponse: "Oui. Laval fait partie de notre zone d'intervention élargie aux départements limitrophes. Les déplacements s'organisent sur une journée dédiée pour optimiser le trajet.",
      },
      {
        question: "Vos formations sont-elles adaptées aux PME de services (le profil dominant à Laval) ?",
        reponse: "Oui, c'est même l'un de nos terrains de prédilection : gestion de la relation client, facturation, reporting et automatisation des tâches administratives récurrentes.",
      },
      {
        question: "Peut-on organiser une session groupée pour plusieurs PME lavalloises ?",
        reponse: "Oui, une formation inter-entreprises peut être organisée à Laval si plusieurs structures locales sont intéressées — cela permet de mutualiser le déplacement et souvent le coût.",
      },
    ],
    published: true,
  },
  {
    slug: 'alencon',
    ville: 'Alençon',
    departement: '61',
    departementNom: 'Orne',
    tier: 2,
    distanceLeMans: 'environ 55 km / 50 min du Mans',
    modeIntervention: 'Présentiel sur site à Alençon ou à distance.',
    zoneActivite: 'zones d\'activité alençonnaises et bassin industriel ornais',
    accroche: `Préfecture de l'Orne, Alençon présente un tissu PME diversifié avec environ 600 entreprises de 3 à 49 salariés. Le marché de l'accompagnement en IA et automatisation y est nettement moins couvert qu'en Sarthe ou en Mayenne, ce qui en fait une zone d'opportunité pour les PME locales cherchant un accompagnement de proximité plutôt qu'un cabinet parisien.`,
    pitchSecteur: `Le commerce domine, suivi de la construction/BTP puis des activités scientifiques et techniques. Pour les PME du bâtiment ornais, les automatisations les plus rentables concernent le suivi de chantier et la facturation ; pour les commerces, la prise de rendez-vous et les relances. Le poids notable de la construction, plus élevé qu'au Mans, oriente une partie de nos cas pratiques vers ce secteur.`,
    faq: [
      {
        question: "Existe-t-il une offre de formation IA/automatisation dédiée aux PME à Alençon ?",
        reponse: "L'offre locale est encore limitée sur ce créneau, ce qui nous a conduits à étendre notre zone d'intervention jusqu'à Alençon. Nous nous déplaçons sur site pour l'audit et la formation.",
      },
      {
        question: "Le secteur du BTP, bien présent à Alençon, a-t-il un accompagnement spécifique ?",
        reponse: "Oui, le suivi de chantier, la facturation et les relances fournisseurs sont des cas que nous traitons régulièrement pour les entreprises du bâtiment de l'Orne.",
      },
    ],
    published: true,
  },
  {
    slug: 'angers',
    ville: 'Angers',
    departement: '49',
    departementNom: 'Maine-et-Loire',
    tier: 2,
    distanceLeMans: 'environ 95 km / 1h10 du Mans',
    modeIntervention: 'Présentiel sur site à Angers (journée dédiée) ou à distance — le distanciel est recommandé pour un suivi régulier compte tenu de la distance.',
    zoneActivite: 'métropole angevine (végétal, numérique, industrie)',
    accroche: `Angers est la plus grande agglomération de notre zone d'intervention élargie, avec près de 3 000 PME de 3 à 49 salariés actives sur la seule commune. Le marché y est plus concurrentiel qu'ailleurs dans notre périmètre — plusieurs acteurs de l'accompagnement numérique y sont déjà implantés — mais la taille du bassin économique laisse une place réelle pour un accompagnement de terrain, pragmatique, à destination des PME qui n'ont pas les moyens d'un grand cabinet de conseil.`,
    pitchSecteur: `Le commerce, l'hébergement-restauration et les activités scientifiques et techniques dominent le tissu PME angevin — un profil de métropole diversifiée, avec un secteur du végétal (horticulture, semences) qui reste une spécificité locale forte même s'il pèse moins parmi les PME de moins de 50 salariés. Pour les PME de services et commerce, l'automatisation porte sur la relation client et la facturation ; pour l'hôtellerie-restauration, sur la réservation et la gestion des avis.`,
    faq: [
      {
        question: "Pourquoi choisir Alliance Digitale plutôt qu'un cabinet basé à Angers ?",
        reponse: "Notre positionnement est celui d'un accompagnement pragmatique et abordable pour les PME, sans les coûts d'un grand cabinet de conseil — avec un déplacement organisé sur une journée dédiée à Angers pour optimiser le trajet.",
      },
      {
        question: "Le distanciel est-il une bonne option pour une PME angevine ?",
        reponse: "Oui, nous le recommandons pour le suivi régulier après un premier audit sur site, afin de limiter les frais de déplacement liés à la distance depuis Le Mans.",
      },
      {
        question: "Travaillez-vous avec le secteur du végétal, spécificité économique d'Angers ?",
        reponse: "Nous n'avons pas encore de cas dédié à ce secteur, mais les principes d'automatisation (commandes, traçabilité, relation client) s'y appliquent comme ailleurs — à étudier ensemble lors d'un audit.",
      },
    ],
    published: true,
  },
  {
    slug: 'tours',
    ville: 'Tours',
    departement: '37',
    departementNom: 'Indre-et-Loire',
    tier: 2,
    distanceLeMans: 'environ 85 km / 1h05 du Mans',
    modeIntervention: 'Présentiel sur site à Tours (journée dédiée) ou à distance — le distanciel est recommandé pour un suivi régulier compte tenu de la distance.',
    zoneActivite: 'métropole tourangelle (tourisme, santé, numérique)',
    accroche: `Tours est, avec Angers, la plus grande agglomération de notre zone d'intervention élargie, avec près de 2 800 PME de 3 à 49 salariés actives sur la seule commune. Le tissu économique y est très diversifié — commerce, tourisme (Val de Loire), santé et services numériques — avec une offre d'accompagnement déjà présente localement, ce qui nous positionne sur un accompagnement pragmatique et abordable plutôt qu'un discours généraliste.`,
    pitchSecteur: `Le commerce arrive largement en tête, suivi de l'hébergement-restauration (poids du tourisme ligérien) puis des activités scientifiques et techniques. Pour les commerces et l'hôtellerie-restauration tourangelle, l'automatisation porte sur la prise de réservation, les avis clients et les relances ; pour les PME de services et bureaux d'études, sur la rédaction assistée, l'analyse de documents et le reporting client.`,
    faq: [
      {
        question: "Alliance Digitale se déplace-t-elle jusqu'à Tours pour un audit ?",
        reponse: "Oui, Tours fait partie de notre zone d'intervention élargie. Le déplacement s'organise sur une journée dédiée pour l'audit initial ; le suivi peut ensuite se faire à distance.",
      },
      {
        question: "Le secteur touristique tourangeau (Val de Loire) a-t-il des besoins spécifiques ?",
        reponse: "Oui : réservation, gestion des avis clients et relances sont les cas les plus fréquents pour les hôtels, restaurants et sites touristiques de la région.",
      },
      {
        question: "Pourquoi choisir Alliance Digitale plutôt qu'un acteur déjà implanté à Tours ?",
        reponse: "Notre approche reste centrée sur l'accompagnement de terrain pour PME — audit concret, formation Qualiopi, mise en œuvre immédiate — sans les coûts d'un grand cabinet de conseil.",
      },
    ],
    published: true,
  },
];

export function getZoneStats(slug: string): ZoneStats | undefined {
  return ZONE_STATS.find((s) => s.slug === slug);
}

export function getZones(): (Zone & { stats?: ZoneStats })[] {
  return ZONES.filter((z) => z.published).map((z) => ({ ...z, stats: getZoneStats(z.slug) }));
}

export function getZoneBySlug(slug: string): (Zone & { stats?: ZoneStats }) | undefined {
  const z = ZONES.find((z) => z.slug === slug && z.published);
  if (!z) return undefined;
  return { ...z, stats: getZoneStats(slug) };
}
