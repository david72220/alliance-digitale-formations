import { Client } from '@notionhq/client';

const LOCAL_FORMATIONS: Formation[] = [
  {
    id: 'litteratie-ia-salaries',
    slug: 'litteratie-ia-salaries',
    title: "Littératie IA pour les salariés",
    generalObjective: "Aider les salariés à utiliser l'IA dans leur travail quotidien.",
    program: "Rédaction, recherche, organisation, sécurité des données et automatisation simple.",
    duration: "1/2 journée",
    audience: "Salariés de PME et dirigeants",
    methods: "Présentiel ou distanciel, exercices pratiques, démonstrations.",
    outcomes: "Maîtriser les outils IA les plus utiles au poste de travail ; identifier les cas d'automatisation simples ; adopter les bonnes pratiques de sécurité des données.",
    competencies: "Utilisation de l'IA, prompts, sécurité des données.",
    schedule: "Matinée ou après-midi.",
    materials: "Supports numériques, accès aux outils.",
    evaluationTools: "QCM et exercice pratique.",
    assessment: "Auto-évaluation.",
    attendanceSheets: "Feuilles d'émargement signées.",
    active: true,
    subtitle: "Comprendre et utiliser l'IA au quotidien",
    description: "Formation collective pour aider les salariés à utiliser l'IA dans leur travail quotidien : rédaction, recherche, organisation, sécurité des données et automatisation simple.",
    format: "Présentiel ou distanciel",
    objectives: "Maîtriser les outils IA les plus utiles au poste de travail ; identifier les cas d'automatisation simples ; adopter les bonnes pratiques de sécurité des données.",
    prerequisites: "Aucune compétence technique requise. Apportez simplement votre ordinateur et vos questions.",
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
    // Fusion : Notion écrase les champs des formations locales en cas de conflit
    const merged = new Map<string, Formation>();
    [...LOCAL_FORMATIONS, ...notionFormations].forEach((f) => merged.set(f.slug, { ...merged.get(f.slug), ...f }));
    return Array.from(merged.values());
  } catch (err) {
    console.warn('Notion getFormations error:', (err as Error).message);
    return LOCAL_FORMATIONS;
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_CASE_STUDIES_DB_ID;
  if (!token || !dbId) return [];
  try {
    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: 'Publié', checkbox: { equals: true } },
    });
    return response.results.map(mapCaseStudy);
  } catch (err) {
    console.warn('Notion getCaseStudies error:', (err as Error).message);
    return [];
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
  };
}
