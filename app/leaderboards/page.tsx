'use client';

import { useState } from 'react';
import { Exercise, TimeRange } from '@/types';

interface LeaderboardUser {
  id: string;
  name: string;
  clan: string | null;
  slope: number;
  logs: number;
  currentWeight: number;
  reps: number;
  exercise: Exercise;
}

export default function LeaderboardsPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('bench');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('3m');

  // Mock leaderboard data - in real app, fetch from Supabase
  const mockUsers: LeaderboardUser[] = [
    {
      id: '1',
      name: 'John Strong',
      clan: 'Iron Warriors',
      slope: 45.2,
      logs: 42,
      currentWeight: 315,
      reps: 5,
      exercise: 'bench',
    },
    {
      id: '2',
      name: 'Sarah Power',
      clan: 'Powerlifters United',
      slope: 38.7,
      logs: 38,
      currentWeight: 285,
      reps: 5,
      exercise: 'bench',
    },
    {
      id: '3',
      name: 'Mike Beast',
      clan: null,
      slope: 32.1,
      logs: 35,
      currentWeight: 275,
      reps: 5,
      exercise: 'bench',
    },
    {
      id: '4',
      name: 'Alex Gains',
      clan: 'Iron Warriors',
      slope: 28.5,
      logs: 30,
      currentWeight: 265,
      reps: 5,
      exercise: 'bench',
    },
    {
      id: '5',
      name: 'Emma Lift',
      clan: 'Beginner Gains',
      slope: 25.3,
      logs: 28,
      currentWeight: 255,
      reps: 5,
      exercise: 'bench',
    },
  ];

  const exercises: { value: Exercise; label: string; icon: string }[] = [
    { value: 'bench', label: 'Bench', icon: '🏋️' },
    { value: 'squat', label: 'Squat', icon: '🦵' },
    { value: 'deadlift', label: 'Deadlift', icon: '⚡' },
    { value: 'custom', label: 'Custom', icon: '➕' },
  ];

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '4w', label: '4 Weeks' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' },
  ];

  // Filter and sort users
  const filteredUsers = mockUsers
    .filter(user => user.exercise === selectedExercise)
    .sort((a, b) => b.slope - a.slope);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-white mb-8">
            Global Leaderboards
          </h1>
          <p className="text-[#8b8b8b] mb-8">
            See who's making the most progress. Rankings based on slope (rate of improvement).
          </p>

          {/* Filters */}
          <div className="bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#8b8b8b] mb-3">
                  Exercise
                </label>
                <div className="flex gap-2 flex-wrap">
                  {exercises.map((exercise) => (
                    <button
                      key={exercise.value}
                      onClick={() => setSelectedExercise(exercise.value)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                        ${
                          selectedExercise === exercise.value
                            ? 'bg-[#d4af37] text-[#0f0f0f] font-semibold text-white'
                            : 'bg-[#2a2a2a] text-[#8b8b8b] hover:bg-[#252525] hover:text-white'
                        }
                      `}
                    >
                      <span>{exercise.icon}</span>
                      <span>{exercise.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8b8b8b] mb-3">
                  Time Period
                </label>
                <div className="flex gap-2 flex-wrap">
                  {timeRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setSelectedTimeRange(range.value)}
                      className={`
                        px-4 py-2 rounded-lg font-medium text-sm transition-all
                        ${
                          selectedTimeRange === range.value
                            ? 'bg-[#d4af37] text-[#0f0f0f] font-semibold text-white'
                            : 'bg-[#2a2a2a] text-[#8b8b8b] hover:bg-[#252525] hover:text-white'
                        }
                      `}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#8b8b8b]">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#8b8b8b]">User</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#8b8b8b]">Clan</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-[#8b8b8b]">Slope</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-[#8b8b8b]">Current Lift</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-[#8b8b8b]">Logs</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-t border-[#1a1a1a] hover:bg-[#2a2a2a]/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <span className="text-xl">👑👑👑</span>}
                          {index === 1 && <span className="text-xl">👑👑</span>}
                          {index === 2 && <span className="text-xl">👑</span>}
                          <span className={`font-bold ${index < 3 ? 'text-[#d4af37]' : 'text-white'}`}>
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-white">{user.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        {user.clan ? (
                          <span className="text-sm text-[#8b8b8b]">{user.clan}</span>
                        ) : (
                          <span className="text-sm text-[#8b8b8b] italic">No clan</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-[#4a90e2]">+{user.slope.toFixed(1)} lbs</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-medium text-white">
                          {user.currentWeight} lbs × {user.reps}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm text-[#8b8b8b]">{user.logs} logs</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-[#8b8b8b]">
              No data available for this filter combination.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

