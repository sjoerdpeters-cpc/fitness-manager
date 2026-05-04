export type MaterialCategory = 'free_weight' | 'machine' | 'cable' | 'bodyweight' | 'resistance_band' | 'cardio';

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  available: boolean;
}

export interface WeightRange {
  minKg: number;
  maxKg: number;
}
