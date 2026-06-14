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

export async function getFormations(): Promise<Formation[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_FORMATIONS_DB_ID;
  if (!token || !dbId) return [];
  const notion = new Client({ auth: token });
  const response = await notion.databases.query({
    database_id: dbId,
    filter: { property: 'Active', checkbox: { equals: true } },
  });
  return response.results.map((page: any) => {
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
  });
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_CASE_STUDIES_DB_ID;
  if (!token || !dbId) return [];
  const notion = new Client({ auth: token });
  const response = await notion.databases.query({
    database_id: dbId,
    filter: { property: 'Publié', checkbox: { equals: true } },
  });
  return response.results.map((page: any) => {
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
  });
}

export async function getResources(): Promise<Resource[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_RESOURCES_DB_ID;
  if (!token || !dbId) return [];
  const notion = new Client({ auth: token });
  const response = await notion.databases.query({
    database_id: dbId,
    filter: { property: 'Publié', checkbox: { equals: true } },
  });
  return response.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      slug: getPropertyText(p.Slug) || page.id,
      title: getPropertyText(p.Titre) || 'Ressource',
      description: getPropertyText(p.Description),
      content: '',
      published: getCheckbox(p.Publie),
    };
  });
}
