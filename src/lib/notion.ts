import { Client } from '@notionhq/client';

export interface Formation {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  format: string;
  audience: string;
  objectives: string;
  prerequisites: string;
  image?: string;
  active: boolean;
  online: boolean;
  price?: number;
  fundingActive: boolean;
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
  if (!token || !dbId) return [];
  try {
    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: 'Active', checkbox: { equals: true } },
    });
    return response.results.map(mapFormation);
  } catch (err) {
    console.warn('Notion getFormations error:', (err as Error).message);
    return [];
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
  if (!token || !dbId) return [];
  try {
    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: 'Publié', checkbox: { equals: true } },
    });
    return response.results.map(mapResource);
  } catch (err) {
    console.warn('Notion getResources error:', (err as Error).message);
    return [];
  }
}

function mapFormation(page: any): Formation {
  const p = page.properties;
  return {
    id: page.id,
    slug: getPropertyText(p.Slug) || page.id,
    title: getPropertyText(p.Nom) || 'Formation sans titre',
    subtitle: getPropertyText(p.Sous_titre),
    description: getPropertyText(p.Description),
    duration: getPropertyText(p.Duree),
    format: getPropertyText(p.Format),
    audience: getPropertyText(p.Public_vise),
    objectives: getPropertyText(p.Objectifs_pedagogiques),
    prerequisites: getPropertyText(p.Prerequis),
    image: getPropertyText(p.Image),
    active: getCheckbox(p.Active),
    online: getCheckbox(p.En_ligne),
    price: Number(getPropertyText(p.Prix)) || undefined,
    fundingActive: getCheckbox(p.Financement_actif),
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
  const resourceUrl = getFileUrl(p.Ressource);
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
    module: getSelect(p.Module),
    exercise: exercicePath,
    solutionUrl: solutionUrl || `/ressources/${getPropertyText(p.Slug) || page.id}/solution.pdf`,
    published: getCheckbox(p.Publie),
  };
}
