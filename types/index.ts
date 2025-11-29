export type Exercise = 'bench' | 'squat' | 'deadlift' | 'custom';

export type TimeRange = '4w' | '3m' | '6m' | '1y' | 'all';

export interface WorkoutLog {
  id: string;
  date: string;
  exercise: Exercise;
  weight: number;
  reps: number;
  sets: number;
  isPR: boolean;
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface StreakData {
  current: number;
  lastWorkout: string;
  nextGoal?: string;
}

export interface Achievement {
  id: string;
  label: string;
  icon: string;
  unlocked: boolean;
}

export interface ChartDataPoint {
  date: string;
  weight: number;
  reps: number;
  sets: number;
  isPR: boolean;
}

