'use client';

import { useState } from 'react';
import { TimeRange } from '@/types';
import ExerciseSearch from '@/components/ExerciseSearch';

interface LeaderboardUser {
  id: string;
  name: string;
  clan: string | null;
  slope: number;
  logs: number;
  currentWeight: number;
  reps: number;
  exerciseId: string;
  exerciseName: string;
}

export default function LeaderboardsPage() {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('3m');

  // TODO: Fetch leaderboard data from Supabase
  const mockUsers: LeaderboardUser[] = [];

  const handleExerciseSelect = (exerciseId: string, exerciseName: string) => {
    setSelectedExerciseId(exerciseId);
    setSelectedExerciseName(exerciseName);
  };

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '4w', label: '4 Weeks' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' },
  ];

  // Filter and sort users
  const filteredUsers = mockUsers
    .filter(user => selectedExerciseId ? user.exerciseId === selectedExerciseId : true)
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
                <ExerciseSearch
                  selectedExerciseId={selectedExerciseId}
                  onSelect={handleExerciseSelect}
                  placeholder="Search exercises..."
                />
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
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">No Leaderboard Data Yet</h3>
              <p className="text-[#8b8b8b] mb-4">
                Be the first to log workouts and appear on the leaderboard!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

