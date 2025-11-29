import { WorkoutLog, ChartDataPoint, Exercise, TimeRange } from '@/types';

// Generate mock workout data
const generateMockLogs = (exercise: Exercise, count: number = 30): WorkoutLog[] => {
  const logs: WorkoutLog[] = [];
  const baseWeights: Record<Exercise, number> = {
    bench: 185,
    squat: 225,
    deadlift: 275,
    custom: 200,
  };

  const today = new Date();
  let currentWeight = baseWeights[exercise];
  let prCount = 0;

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i * 2); // Every 2 days

    // Simulate progressive overload with some variation
    const variation = (Math.random() - 0.5) * 10;
    currentWeight = Math.max(baseWeights[exercise] * 0.8, currentWeight + variation + (i % 3 === 0 ? 5 : 0));
    
    const isPR = Math.random() > 0.85 && prCount < 3;
    if (isPR) prCount++;

    logs.push({
      id: `log-${i}`,
      date: date.toISOString().split('T')[0],
      exercise,
      weight: Math.round(currentWeight),
      reps: Math.floor(Math.random() * 3) + 4, // 4-6 reps
      sets: Math.floor(Math.random() * 2) + 3, // 3-4 sets
      isPR,
    });
  }

  return logs;
};

export const getMockLogs = (exercise: Exercise, range: TimeRange = 'all'): WorkoutLog[] => {
  const allLogs = generateMockLogs(exercise, 60);
  
  const today = new Date();
  const rangeDays: Record<TimeRange, number> = {
    '4w': 28,
    '3m': 90,
    '6m': 180,
    '1y': 365,
    'all': Infinity,
  };

  const cutoffDate = new Date(today);
  cutoffDate.setDate(cutoffDate.getDate() - rangeDays[range]);

  return allLogs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= cutoffDate;
  });
};

export const getChartData = (logs: WorkoutLog[]): ChartDataPoint[] => {
  return logs.map(log => ({
    date: log.date,
    weight: log.weight,
    reps: log.reps,
    sets: log.sets,
    isPR: log.isPR,
  }));
};

export const getStreakData = () => {
  return {
    current: 12,
    lastWorkout: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    nextGoal: '225×5 bench in 7 days',
  };
};

export const getAchievements = () => {
  return [
    { id: 'pr', label: 'New PR', icon: '🔥', unlocked: true },
    { id: 'month', label: 'Best Month', icon: '⭐', unlocked: true },
    { id: 'consistent', label: 'Most Consistent Week', icon: '💪', unlocked: false },
  ];
};

