export type ResourceCategory =
  | 'Fundamentals'
  | 'Valuation'
  | 'Markets'
  | 'Economics'
  | 'Data & Analytics'
  | 'Case Studies';

export type ResourceType =
  | 'notes'
  | 'slides'
  | 'notebook'
  | 'dataset'
  | 'video'
  | 'link'
  | 'pdf';

export type ResourceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory | string;
  type: ResourceType;
  url: string;
  level: ResourceLevel;
  source?: 'github' | 'external';
  updatedAt?: string;
  tags: string[];
}

// [TODO: owner to provide GitHub repository with curated learning materials]
export const resourcesData: Resource[] = [];
