import type { Material } from '../models/material';

export const materials: Material[] = [
  { id: 'mat_001', name: 'Dumbbell', category: 'free_weight', available: true },
  { id: 'mat_002', name: 'Barbell', category: 'free_weight', available: true },
  { id: 'mat_003', name: 'Kettlebell', category: 'free_weight', available: true },
  { id: 'mat_004', name: 'EZ Curl Bar', category: 'free_weight', available: false },
  { id: 'mat_005', name: 'Weight Plates', category: 'free_weight', available: true },
  { id: 'mat_006', name: 'Pull-up Bar', category: 'bodyweight', available: true },
  { id: 'mat_007', name: 'Resistance Band', category: 'resistance_band', available: true },
  { id: 'mat_008', name: 'Cable Machine', category: 'cable', available: true },
  { id: 'mat_009', name: 'Bench', category: 'machine', available: true },
  { id: 'mat_010', name: 'Geen (bodyweight)', category: 'bodyweight', available: true },
];

export const materialById: Record<string, Material> = Object.fromEntries(
  materials.map((m) => [m.id, m])
);
