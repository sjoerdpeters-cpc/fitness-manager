// Discrete beschikbare gewichten (kg), uit fitness_materials_v1.3.1/weights.json
export const ALL_WEIGHTS_KG: number[] = [
  1.25, 2.5, 5, 7.5, 10, 12, 14, 16, 18, 20, 25, 30, 40, 50,
];

export interface MaterialWeightConfig {
  materialId: string;
  applicableWeights: number[];  // subset van ALL_WEIGHTS_KG
  defaultMin: number;
  defaultMax: number;
}

// Standaard gewichtsbereiken per materiaalsoort (free_weight categorie)
export const MATERIAL_WEIGHT_CONFIGS: MaterialWeightConfig[] = [
  {
    materialId: 'mat_001', // Dumbbell
    applicableWeights: [1.25, 2.5, 5, 7.5, 10, 12, 14, 16, 18, 20, 25, 30, 40, 50],
    defaultMin: 5,
    defaultMax: 30,
  },
  {
    materialId: 'mat_002', // Barbell
    applicableWeights: [5, 7.5, 10, 12, 14, 16, 18, 20, 25, 30, 40, 50],
    defaultMin: 20,
    defaultMax: 100,
  },
  {
    materialId: 'mat_003', // Kettlebell
    applicableWeights: [5, 7.5, 10, 12, 14, 16, 18, 20, 25, 30, 40],
    defaultMin: 8,
    defaultMax: 24,
  },
  {
    materialId: 'mat_004', // EZ Curl Bar
    applicableWeights: [2.5, 5, 7.5, 10, 12, 14, 16, 18, 20, 25, 30],
    defaultMin: 5,
    defaultMax: 20,
  },
  {
    materialId: 'mat_005', // Weight Plates
    applicableWeights: [1.25, 2.5, 5, 7.5, 10, 12, 14, 16, 18, 20, 25, 30, 40, 50],
    defaultMin: 1.25,
    defaultMax: 20,
  },
];

export const materialWeightConfigById: Record<string, MaterialWeightConfig> = Object.fromEntries(
  MATERIAL_WEIGHT_CONFIGS.map((c) => [c.materialId, c])
);

export function formatWeight(kg: number): string {
  return kg % 1 === 0 ? `${kg} kg` : `${kg} kg`;
}
