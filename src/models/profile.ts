export type FitnessGoal = 'muscle_gain' | 'fat_loss' | 'endurance' | 'strength' | 'flexibility' | 'general_fitness';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
  name: string;
  age?: number;
  gender?: Gender;
  heightCm?: number;
  weightKg?: number;
  fitnessLevel: FitnessLevel;
  goals: FitnessGoal[];
  availableMaterialIds: string[];
  weeklyWorkouts: number;
}
