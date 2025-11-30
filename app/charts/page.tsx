'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ExerciseSelector from '@/components/ExerciseSelector';
import StatCard from '@/components/StatCard';
import ProgressChart from '@/components/ProgressChart';
import StreakSummary from '@/components/StreakSummary';
import AchievementsRow from '@/components/AchievementsRow';
import { Exercise, TimeRange } from '@/types';
import { getMockLogs, getChartData, getStreakData, getAchievements } from '@/lib/mockData';
import { useAuth } from '@/lib/useAuth';

export default function ChartsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('bench');
  const [timeRange, setTimeRange] = useState<TimeRange>('3m');

  // Get data - TODO: fetch from Supabase based on user
  // For now, show empty data for all users (logged in or not) until we implement database fetching
  const logs: any[] = [];
  const chartData: any[] = [];
  const streak = { current: 0, lastWorkout: '', nextGoal: isLoggedIn ? 'Log your first workout to start your streak' : 'Log in to start your streak' };
  const achievements: any[] = [];

  // Calculate stats - use zero values if not logged in
  const currentWeight = logs.length > 0 ? (logs[logs.length - 1]?.weight || 0) : 0;
  const previousWeight = logs.length > 1 ? (logs[logs.length - 2]?.weight || currentWeight) : currentWeight;
  const weightChange = currentWeight - previousWeight;
  const maxWeight = logs.length > 0 ? Math.max(...logs.map(l => l.weight), 0) : 0;
  const totalPRs = logs.filter(l => l.isPR).length;
  const avgWeight = logs.length > 0 ? logs.reduce((sum, l) => sum + l.weight, 0) / logs.length : 0;

  const stats = [
    {
      label: 'Current Max',
      value: '—',
      change: undefined,
      trend: 'neutral' as const,
    },
    {
      label: 'All-Time PR',
      value: '—',
    },
    {
      label: 'Average',
      value: '—',
    },
    {
      label: 'PRs This Period',
      value: '—',
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
        
        {!isLoggedIn && (
          <div className="mb-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-center">
            <p className="text-[#8b8b8b] mb-2">You're not logged in. Log in to track your strength progress.</p>
            <Link
              href="/login"
              className="inline-block bg-[#d4af37] text-[#0f0f0f] px-6 py-2 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
            >
              Log In
            </Link>
          </div>
        )}
        
        {isLoggedIn && logs.length === 0 && (
          <div className="mb-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center">
            <p className="text-[#8b8b8b] mb-4">You haven't logged any workouts yet. Start tracking your progress!</p>
            <Link
              href="/calendar"
              className="inline-block bg-[#d4af37] text-[#0f0f0f] px-6 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
            >
              Log Your First Workout
            </Link>
          </div>
        )}

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
            <div className="text-xl font-bold text-[#d4af37]">—</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <div className="text-[#8b8b8b] mb-1">Time Trained</div>
            <div className="text-xl font-bold text-white">—</div>
          </div>
        </div>
      </main>
    </div>
  );
}

