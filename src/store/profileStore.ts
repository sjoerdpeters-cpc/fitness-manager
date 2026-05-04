import { create } from 'zustand';
import type { UserProfile, FitnessGoal } from '../models/profile';
import type { WeightRange } from '../models/material';
import { MATERIAL_WEIGHT_CONFIGS } from '../data/weights';

interface ProfileState {
  profile: UserProfile;
  isOnboarded: boolean;
  materialWeightRanges: Record<string, WeightRange>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setOnboarded: (value: boolean) => void;
  toggleGoal: (goal: FitnessGoal) => void;
  toggleMaterial: (materialId: string) => void;
  setWeightRange: (materialId: string, range: WeightRange) => void;
}

const defaultProfile: UserProfile = {
  name: 'Atleet',
  fitnessLevel: 'intermediate',
  goals: ['general_fitness'],
  availableMaterialIds: ['mat_001', 'mat_002', 'mat_010'],
  weeklyWorkouts: 3,
};

const defaultWeightRanges: Record<string, WeightRange> = Object.fromEntries(
  MATERIAL_WEIGHT_CONFIGS.map((c) => [
    c.materialId,
    { minKg: c.defaultMin, maxKg: c.defaultMax },
  ])
);

export const useProfileStore = create<ProfileState>((set) => ({
  profile: defaultProfile,
  isOnboarded: false,
  materialWeightRanges: defaultWeightRanges,

  updateProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),

  setOnboarded: (value) => set({ isOnboarded: value }),

  toggleGoal: (goal) =>
    set((state) => {
      const goals = state.profile.goals.includes(goal)
        ? state.profile.goals.filter((g) => g !== goal)
        : [...state.profile.goals, goal];
      return { profile: { ...state.profile, goals } };
    }),

  toggleMaterial: (materialId) =>
    set((state) => {
      const ids = state.profile.availableMaterialIds.includes(materialId)
        ? state.profile.availableMaterialIds.filter((id) => id !== materialId)
        : [...state.profile.availableMaterialIds, materialId];
      return { profile: { ...state.profile, availableMaterialIds: ids } };
    }),

  setWeightRange: (materialId, range) =>
    set((state) => ({
      materialWeightRanges: {
        ...state.materialWeightRanges,
        [materialId]: range,
      },
    })),
}));
