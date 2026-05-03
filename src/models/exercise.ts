export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseType = 'strength' | 'cardio' | 'flexibility' | 'balance';
export type MovementPattern = 'push' | 'pull' | 'squat' | 'hinge' | 'carry' | 'rotation' | 'lunge';

export interface ExerciseSet {
  reps?: number;
  durationSeconds?: number;
  weightKg?: number;
}

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: DifficultyLevel;
  type: ExerciseType;
  movementPattern: MovementPattern;
  primaryMuscleGroupIds: string[];
  secondaryMuscleGroupIds: string[];
  materialIds: string[];
  instructions: string[];
  tips?: string[];
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: ExerciseSet[];
  notes?: string;
}
