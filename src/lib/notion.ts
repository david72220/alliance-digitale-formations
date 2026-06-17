import { Client } from '@notionhq/client';

const LOCAL_FORMATIONS: Formation[] = [
  {
    id: 'automatisation-taches-repetitives-pme',
    slug: 'automatisation-taches-repetitives-pme',
    title: "Automatiser les tâches répétitives en PME",
    generalObjective: "Aider les dirigeants et opérationnels à identifier, concevoir et déployer des workflows automatisés dans leur PME sans compétence de développement.",
    program: "Cartographie des tâches répétitives ; principes de l'automatisation no-code ; présentation de n8n, Notion, Airtable et des connecteurs bureautiques ; conception d'un premier workflow ; sécurité des données et bonnes pratiques.",
    duration: "1 journée",
    audience: "Dirigeants, assistants, responsables commerciaux, administratifs et opérationnels de PME",
    methods: "Présentiel ou distanciel, ateliers pratiques, démonstrations en direct, conception collective d'un workflow.",
    outcomes: "Cartographier les tâches répétitives de l'entreprise ; concevoir un premier workflow automatisé ; choisir les bons outils no-code/low-code ; sécuriser les flux de données.",
    competencies: "Analyse de processus, utilisation de n8n, connecteurs d'applications, sécurité des flux.",
    schedule: "Matinée : concepts et démonstrations. Après-midi : atelier de conception d'un workflow.",
    materials: "Supports numériques, accès à une instance de démonstration, templates de workflows.",
    evaluationTools: "QCM, démonstration du workflow conçu, fiche de synthèse.",
    assessment: "Auto-évaluation et restitution collective.",
    attendanceSheets: "Feuilles d'émargement signées.",
    active: true,
    subtitle: "Gagner du temps sans coder",
    description: "Identifier et automatiser les tâches chronophages du quotidien : emails, saisies, relances, exports, notifications. Formation orientée solutions concrètes avec n8n, Notion, Airtable et les outils bureautiques.",
    format: "Présentiel ou distanciel",
    objectives: "Cartographier les tâches répétitives de l'entreprise ; concevoir un premier workflow automatisé ; choisir les bons outils no-code/low-code ; sécuriser les flux de données.",
    prerequisites: "Connaissance des outils bureautiques classiques (email, tableur, CRM). Aucune compétence technique requise.",
    image: "/images/hero-formation-ia.png",
    online: false,
    price: undefined,
    fundingActive: true,
  },
  {
    id: 'ia-productivite-quotidienne-pme',
    slug: 'ia-productivite-quotidienne-pme',
    title: "IA et productivité au quotidien",
    generalObjective: "Permettre aux salariés d'utiliser l'IA générative de manière concrète, sécurisée et immédiatement utile dans leur travail quotidien.",
    program: "Introduction à l'IA générative ; rédaction efficace de prompts ; cas d'usage métier (emails, documents, réunions, prospection, tableur) ; sécurité des données ; outils accessibles et bonnes pratiques.",
    duration: "1/2 journée",
    audience: "Salariés, dirigeants, commerciaux et assistants de PME",
    methods: "Présentiel ou distanciel, démonstrations interactives, exercices pratiques sur des cas réels.",
    outcomes: "Maîtriser les prompts efficaces ; utiliser l'IA en toute sécurité ; gagner du temps sur la rédaction et l'analyse ; identifier les cas d'usage immédiats.",
    competencies: "Prompt engineering, rédaction assistée, analyse de données, sécurité des données.",
    schedule: "Matinée ou après-midi, alternance théorie / pratique.",
    materials: "Supports numériques, bibliothèque de prompts, checklist de sécurité.",
    evaluationTools: "Exercices pratiques, QCM.",
    assessment: "Auto-évaluation.",
    attendanceSheets: "Feuilles d'émargement signées.",
    active: true,
    subtitle: "Utiliser l'IA concrètement dans son métier",
    description: "Formation pratique pour intégrer l'IA générative dans les tâches quotidiennes : rédaction, recherche, analyse de données, préparation de réunions, prospection et organisation.",
    format: "Présentiel ou distanciel",
    objectives: "Maîtriser les prompts efficaces ; utiliser l'IA en toute sécurité ; gagner du temps sur la rédaction et l'analyse ; identifier les cas d'usage immédiats.",
    prerequisites: "Aucune compétence technique requise. Apportez simplement votre ordinateur.",
    image: "/images/hero-formation-ia.png",
    online: false,
    price: undefined,
    fundingActive: true,
  },
  {
    id: 'securite-donnees-conformite-pme',
    slug: 'securite-donnees-conformite-pme',
    title: "Sécurité des données et conformité",
    generalObjective: "Donner aux PME les réflexes et outils essentiels pour protéger leurs données et anticiper la conformité RGPD et AI Act avant de déployer l'IA.",
    program: "Risques réels pour une PME ; mots de passe et gestionnaire de mots de passe ; double authentification ; sécurité des emails et pièces jointes ; registre RGPD simplifié ; bases légales ; droits d'accès ; impacts de l'IA sur la sécurité ; plan d'action.",
    duration: "1/2 journée",
    audience: "Dirigeants, RH, administratifs et responsables informatiques de PME",
    methods: "Présentiel ou distanciel, ateliers pratiques, audit collectif, mise en situation.",
    outcomes: "Évaluer la maturité sécurité de l'entreprise ; déployer les protections essentielles ; rédiger un registre RGPD simple ; anticiper les risques liés à l'IA.",
    competencies: "Sécurité des accès, gestion des mots de passe, RGPD opérationnel, protection des échanges.",
    schedule: "Matinée ou après-midi, alternance concepts et exercices pratiques.",
    materials: "Supports numériques, templates de registre, checklist de sécurité.",
    evaluationTools: "QCM, audit pratique, fiche d'action.",
    assessment: "Auto-évaluation et plan d'action individuel.",
    attendanceSheets: "Feuilles d'émargement signées.",
    active: true,
    subtitle: "Protéger l'entreprise avant d'adopter l'IA",
    description: "Formation essentielle pour identifier les risques liés aux données personnelles, mettre en place les bons réflexes en matière de mots de passe, double authentification, emails sécurisés et registre RGPD.",
    format: "Présentiel ou distanciel",
    objectives: "Évaluer la maturité sécurité de l'entreprise ; déployer les protections essentielles ; rédiger un registre RGPD simple ; anticiper les risques liés à l'IA.",
    prerequisites: "Aucune compétence technique requise. Avoir accès à la liste des outils utilisés dans l'entreprise.",
    image: "/images/hero-formation-ia.png",
    online: false,
    price: undefined,
    fundingActive: true,
  },
];

const LOCAL_RESOURCES: Resource[] = [
  {
    id: 'rgpd-pme-10-points-controle',
    slug: 'rgpd-pme-10-points-controle',
    title: "RGPD en PME : les 10 points de contrôle essentiels",
    description: "Un micro-cours concret pour identifier les risques RGPD réels dans une PME et appliquer des solutions immédiatement opérationnelles.",
    content: '/ressources/rgpd-pme-10-points-controle/cours.md',
    contentJson: '/ressources/rgpd-pme-10-points-controle/data.json',
    module: "Sécurité des données",
    exercise: '/ressources/rgpd-pme-10-points-controle/exercice.md',
    solutionUrl: '/ressources/rgpd-pme-10-points-controle/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-identifier-cartographier-taches',
    slug: 'automatisation-identifier-cartographier-taches',
    title: "Identifier et cartographier ses tâches répétitives",
    description: "Apprenez à repérer les tâches chronophages de votre PME et à les prioriser pour une automatisation rapide et rentable.",
    content: '/ressources/automatisation-identifier-cartographier-taches/cours.md',
    contentJson: '/ressources/automatisation-identifier-cartographier-taches/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-identifier-cartographier-taches/exercice.md',
    solutionUrl: '/ressources/automatisation-identifier-cartographier-taches/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-connecteurs-n8n',
    slug: 'automatisation-connecteurs-n8n',
    title: "Connecteurs et scénarios avec n8n : relier vos outils du quotidien",
    description: "Apprenez à connecter vos applications métiers (Google Sheets, Gmail, Notion, Airtable, CRM, etc.) avec n8n pour créer des scénarios d'automatisation fiables.",
    content: '/ressources/automatisation-connecteurs-n8n/cours.md',
    contentJson: '/ressources/automatisation-connecteurs-n8n/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-connecteurs-n8n/exercice.md',
    solutionUrl: '/ressources/automatisation-connecteurs-n8n/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-relances-clients',
    slug: 'automatisation-relances-clients',
    title: "Automatiser les relances clients sans être intrusif",
    description: "Mettez en place une suite de relances emails et SMS pour les devis en attente, les impayés ou les paniers abandonnés.",
    content: '/ressources/automatisation-relances-clients/cours.md',
    contentJson: '/ressources/automatisation-relances-clients/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-relances-clients/exercice.md',
    solutionUrl: '/ressources/automatisation-relances-clients/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-saisie-export-donnees',
    slug: 'automatisation-saisie-export-donnees',
    title: "Automatiser la saisie et l'export de données : finir la copie manuelle",
    description: "Apprenez à automatiser la saisie répétitive, la consolidation de tableurs et l'export de données vers vos outils métiers.",
    content: '/ressources/automatisation-saisie-export-donnees/cours.md',
    contentJson: '/ressources/automatisation-saisie-export-donnees/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-saisie-export-donnees/exercice.md',
    solutionUrl: '/ressources/automatisation-saisie-export-donnees/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-notifications-alertes',
    slug: 'automatisation-notifications-alertes',
    title: "Automatiser les notifications et alertes",
    description: "Apprenez à remplacer la surveillance manuelle par des alertes intelligentes : stocks bas, devis en attente, factures impayées, retours clients.",
    content: '/ressources/automatisation-notifications-alertes/cours.md',
    contentJson: '/ressources/automatisation-notifications-alertes/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-notifications-alertes/exercice.md',
    solutionUrl: '/ressources/automatisation-notifications-alertes/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-securiser-maintenir-workflows',
    slug: 'automatisation-securiser-maintenir-workflows',
    title: "Sécuriser et maintenir ses workflows automatiques",
    description: "Un workflow automatique mal sécurisé est un risque. Apprenez à protéger vos accès, surveiller vos scénarios, gérer les erreurs et maintenir vos automatisations.",
    content: '/ressources/automatisation-securiser-maintenir-workflows/cours.md',
    contentJson: '/ressources/automatisation-securiser-maintenir-workflows/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-securiser-maintenir-workflows/exercice.md',
    solutionUrl: '/ressources/automatisation-securiser-maintenir-workflows/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-documenter-workflow',
    slug: 'automatisation-documenter-workflow',
    title: "Documenter son workflow automatique",
    description: "Un workflow non documenté est un workflow fragile. Apprenez à rédiger une documentation claire pour que n'importe quel collaborateur puisse comprendre, reprendre et dépanner vos automatisations.",
    content: '/ressources/automatisation-documenter-workflow/cours.md',
    contentJson: '/ressources/automatisation-documenter-workflow/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-documenter-workflow/exercice.md',
    solutionUrl: '/ressources/automatisation-documenter-workflow/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
  {
    id: 'automatisation-cas-pratique-complet',
    slug: 'automatisation-cas-pratique-complet',
    title: "Cas pratique complet : automatiser une PME en 5 étapes concrètes",
    description: "Cas pratique final du module Automatisation : diagnostiquer, prioriser et déployer des flux automatisés dans une PME sarthoise.",
    content: '/ressources/automatisation-cas-pratique-complet/cours.md',
    contentJson: '/ressources/automatisation-cas-pratique-complet/data.json',
    module: "Automatisation",
    exercise: '/ressources/automatisation-cas-pratique-complet/exercice.md',
    solutionUrl: '/ressources/automatisation-cas-pratique-complet/solution.pdf',
    published: true,
    photo: '/images/hero-formation-ia.png',
  },
];

const LOCAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'comptes-rendus-pme-industrielle',
    slug: 'comptes-rendus-pme-industrielle',
    title: "Automatisation des comptes rendus clients",
    client: "PME industrielle",
    anonymized: true,
    sector: "Industrie",
    problem: "Un responsable commercial passait 4 à 5 heures par semaine à rédiger des comptes rendus de visite et à les retranscrire dans le CRM.",
    solution: "Mise en place d'un workflow de dictée vocale + IA locale qui génère un compte rendu structuré et l'enregistre automatiquement dans le CRM en respectant la confidentialité client.",
    result: "Gain de 2h30 par semaine, amélioration de la qualité des suivis et réduction des oublis.",
    image: "/images/hero-formation-ia.png",
    videoUrl: "",
    published: true,
  },
];

export interface Formation {
  id: string;
  slug: string;
  title: string;
  generalObjective: string;
  program: string;
  duration: string;
  audience: string;
  methods: string;
  outcomes: string;
  competencies: string;
  schedule: string;
  materials: string;
  evaluationTools: string;
  assessment: string;
  attendanceSheets: string;
  active: boolean;
  photo?: string;
  subtitle?: string;
  description?: string;
  format?: string;
  objectives?: string;
  prerequisites?: string;
  image?: string;
  online?: boolean;
  price?: number;
  fundingActive?: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  anonymized: boolean;
  sector: string;
  problem: string;
  solution: string;
  result: string;
  image?: string;
  videoUrl?: string;
  published: boolean;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  contentJson?: string;
  module: string;
  exercise: string;
  solutionUrl: string;
  published: boolean;
  photo?: string;
}

function getPropertyText(property: any): string {
  if (!property) return '';
  if (property.type === 'title' && Array.isArray(property.title)) {
    return property.title.map((t: any) => t.plain_text).join('');
  }
  if (property.type === 'rich_text' && Array.isArray(property.rich_text)) {
    return property.rich_text.map((t: any) => t.plain_text).join('');
  }
  if (property.type === 'select' && property.select) {
    return property.select.name;
  }
  if (property.type === 'number' && typeof property.number === 'number') {
    return String(property.number);
  }
  if (property.type === 'url' && typeof property.url === 'string') {
    return property.url;
  }
  return '';
}

function getCheckbox(property: any): boolean {
  return property?.type === 'checkbox' && property.checkbox === true;
}

function getSelect(property: any): string {
  return property?.select?.name || '';
}

function getFileUrl(property: any): string {
  if (property?.type !== 'files' || !Array.isArray(property.files)) return '';
  const file = property.files[0];
  if (!file) return '';
  if (file.type === 'external') return file.external.url;
  if (file.type === 'file') return file.file.url;
  return '';
}

export async function getFormations(): Promise<Formation[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_FORMATIONS_DB_ID;
  if (!token || !dbId) return LOCAL_FORMATIONS;

  try {
    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: 'Active', checkbox: { equals: true } },
    });
    const notionFormations = response.results.map(mapFormation);
    return notionFormations;
  } catch (err) {
    console.warn('Notion getFormations error:', (err as Error).message);
    return LOCAL_FORMATIONS;
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_CASE_STUDIES_DB_ID;
  if (!token || !dbId) return LOCAL_CASE_STUDIES;

  try {
    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: 'Publié', checkbox: { equals: true } },
    });
    const notionStudies = response.results.map(mapCaseStudy);
    // Fusion : Notion écrase les champs des études locales en cas de conflit
    const merged = new Map<string, CaseStudy>();
    [...LOCAL_CASE_STUDIES, ...notionStudies].forEach((s) => merged.set(s.slug, { ...merged.get(s.slug), ...s }));
    return Array.from(merged.values());
  } catch (err) {
    console.warn('Notion getCaseStudies error:', (err as Error).message);
    return LOCAL_CASE_STUDIES;
  }
}

export async function getResources(): Promise<Resource[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_RESOURCES_DB_ID;
  if (!token || !dbId) return LOCAL_RESOURCES;

  try {
    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: 'Publié', checkbox: { equals: true } },
    });
    const notionResources = response.results.map(mapResource);
    // Fusion : Notion écrase les champs des ressources locales en cas de conflit
    const merged = new Map<string, Resource>();
    [...LOCAL_RESOURCES, ...notionResources].forEach((r) => merged.set(r.slug, { ...merged.get(r.slug), ...r }));
    return Array.from(merged.values());
  } catch (err) {
    console.warn('Notion getResources error:', (err as Error).message);
    return LOCAL_RESOURCES;
  }
}

function mapFormation(page: any): Formation {
  const p = page.properties;
  const title = getPropertyText(p.Nom) || 'Formation sans titre';
  const slug = getPropertyText(p.Slug) || page.id;
  return {
    id: page.id,
    slug,
    title,
    generalObjective: getPropertyText(p['Objectif général']),
    program: getPropertyText(p["Le programme de formation détaillé"]),
    duration: getPropertyText(p["durée (H)"]),
    audience: getPropertyText(p.Public),
    methods: getPropertyText(p["Méthodes pédagogiques"]),
    outcomes: getPropertyText(p["Résultats pedagogiques"]),
    competencies: getPropertyText(p["Compétences visées"]),
    schedule: getPropertyText(p.Déroulé),
    materials: getPropertyText(p["Les supports de cours"]),
    evaluationTools: getPropertyText(p["Les outils d'évaluation"]),
    assessment: getPropertyText(p["bilan pédagogique"]),
    attendanceSheets: getPropertyText(p["Les feuilles d'émargement"]),
    active: getCheckbox(p.Active),
    photo: getFileUrl(p.photo),
    subtitle: '',
    description: getPropertyText(p['Objectif général']),
    format: '',
    objectives: getPropertyText(p["Résultats pedagogiques"]),
    prerequisites: '',
    image: '',
    online: false,
    price: undefined,
    fundingActive: false,
  };
}

function mapCaseStudy(page: any): CaseStudy {
  const p = page.properties;
  return {
    id: page.id,
    slug: getPropertyText(p.Slug) || page.id,
    title: getPropertyText(p.Titre) || 'Étude de cas',
    client: getPropertyText(p.Client),
    anonymized: getCheckbox(p.Anonymise),
    sector: getPropertyText(p.Secteur),
    problem: getPropertyText(p.Problème) || getPropertyText(p.Probleme),
    solution: getPropertyText(p.Solution),
    result: getPropertyText(p['Résultat chiffré']) || getPropertyText(p.Resultat_chiffre),
    image: getPropertyText(p.Visuel) || getFileUrl(p.Visuel),
    videoUrl: getPropertyText(p['Vidéo preuve']) || getPropertyText(p.Video_preuve),
    published: getCheckbox(p.Publié) || getCheckbox(p.Publie),
  };
}

function mapResource(page: any): Resource {
  const p = page.properties;
  const resourceUrl = getFileUrl(p.ressource);
  const exerciceUrl = getFileUrl(p.Exercice);
  const solutionUrl = getFileUrl(p['Solution exercice']);
  // Dérive le chemin local à partir de l’URL publique si disponible
  const resourcePath = resourceUrl ? resourceUrl.replace(/^https?:\/\/[^/]+\//, '') : `ressources/${page.id}/cours.md`;
  const exercicePath = exerciceUrl ? exerciceUrl.replace(/^https?:\/\/[^/]+\//, '') : `ressources/${page.id}/exercice.md`;
  return {
    id: page.id,
    slug: getPropertyText(p.Slug) || page.id,
    title: getPropertyText(p.Titre) || 'Ressource',
    description: getPropertyText(p.Description),
    content: resourcePath,
    contentJson: `/ressources/${getPropertyText(p.Slug) || page.id}/data.json`,
    module: getSelect(p.Module),
    exercise: exercicePath,
    solutionUrl: solutionUrl || `/ressources/${getPropertyText(p.Slug) || page.id}/solution.pdf`,
    published: getCheckbox(p.Publié),
    photo: getFileUrl(p.photo),
  };
}
