export type MuscleGroupType = 'region' | 'parent_group' | 'muscle_group' | 'functional_group';
export type BodyRegion = 'upper_body' | 'arms' | 'core' | 'lower_body' | 'full_body';
export type BodySide = 'left' | 'right' | 'both';
export type BodyView = 'front' | 'back' | 'side';

export interface MuscleGroup {
  id: string;
  name: string;
  englishName: string;
  latinName: string | null;
  slug: string;
  type: MuscleGroupType;
  parentId: string | null;
  bodyRegion: BodyRegion;
  bodyPart: string;
  side: BodySide;
  views: BodyView[];
  aliases: string[];
  isLeaf: boolean;
  importance: number;
}
