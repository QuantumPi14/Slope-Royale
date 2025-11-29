'use client';

import { useState } from 'react';
import ExerciseSelector from '@/components/ExerciseSelector';
import StatCard from '@/components/StatCard';
import ProgressChart from '@/components/ProgressChart';
import StreakSummary from '@/components/StreakSummary';
import AchievementsRow from '@/components/AchievementsRow';
import { Exercise, TimeRange } from '@/types';
import { getMockLogs, getChartData, getStreakData, getAchievements } from '@/lib/mockData';

export default function Dashboard() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('bench');
  const [timeRange, setTimeRange] = useState<TimeRange>('3m');

  const logs = getMockLogs(selectedExercise, timeRange);
  const chartData = getChartData(logs);
  const streak = getStreakData();
  const achievements = getAchievements();

  // Calculate stats
  const currentWeight = logs[logs.length - 1]?.weight || 0;
  const previousWeight = logs[logs.length - 2]?.weight || currentWeight;
  const weightChange = currentWeight - previousWeight;
  const maxWeight = Math.max(...logs.map(l => l.weight), 0);
  const totalPRs = logs.filter(l => l.isPR).length;
  const avgWeight = logs.length > 0 ? logs.reduce((sum, l) => sum + l.weight, 0) / logs.length : 0;

  const stats = [
    {
      label: 'Current Max',
      value: `${currentWeight} lbs`,
      change: weightChange !== 0 ? `${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} lbs` : undefined,
      trend: weightChange > 0 ? 'up' as const : weightChange < 0 ? 'down' as const : 'neutral' as const,
    },
    {
      label: 'All-Time PR',
      value: `${maxWeight} lbs`,
    },
    {
      label: 'Average',
      value: `${Math.round(avgWeight)} lbs`,
    },
    {
      label: 'PRs This Period',
      value: totalPRs,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            <span className="text-white">Track your strength </span>
            <span className="text-[#4a90e2]">progress</span>
            <span className="text-white"> over time.</span>
          </h1>
          <p className="text-[#8b8b8b] text-lg">
            Every rep counts. Every session matters.
          </p>
        </div>

        {/* Exercise Selector */}
        <div className="mb-6">
          <ExerciseSelector selected={selectedExercise} onSelect={setSelectedExercise} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart - Takes 2 columns on desktop */}
          <div className="lg:col-span-2">
            <ProgressChart
              data={chartData}
              onRangeChange={setTimeRange}
              currentRange={timeRange}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StreakSummary streak={streak} />
            <div>
              <h3 className="text-sm font-medium text-[#8b8b8b] mb-3">Achievements</h3>
              <AchievementsRow achievements={achievements} />
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <div className="text-[#8b8b8b] mb-1">Total Logs</div>
            <div className="text-xl font-bold text-white">{logs.length}</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <div className="text-[#8b8b8b] mb-1">Heaviest Lift</div>
            <div className="text-xl font-bold text-[#d4af37]">{maxWeight} lbs</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <div className="text-[#8b8b8b] mb-1">Time Trained</div>
            <div className="text-xl font-bold text-white">
              {Math.floor((Date.now() - new Date(logs[0]?.date || Date.now()).getTime()) / (1000 * 60 * 60 * 24))} days
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
