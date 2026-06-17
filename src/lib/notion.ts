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
    problem: getPropertyText(p.Probleme),
    solution: getPropertyText(p.Solution),
    result: getPropertyText(p.Resultat_chiffre),
    image: getPropertyText(p.Visuel),
    videoUrl: getPropertyText(p.Video_preuve),
    published: getCheckbox(p.Publie),
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
