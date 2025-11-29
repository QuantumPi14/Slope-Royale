'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import CalendarView from '@/components/CalendarView';

interface WorkoutEvent {
  id: string;
  date: string;
  exercise: Exercise;
  weight: number;
  reps: number;
  sets: number;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('bench');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  // Mock workouts - in real app, fetch from Supabase
  // Generate some workouts for the current month
  const getCurrentMonthWorkouts = (): WorkoutEvent[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Generate workouts for various days this month
    const dates = [
      Math.max(1, today.getDate() - 5),
      Math.max(1, today.getDate() - 3),
      Math.max(1, today.getDate() - 1),
      Math.min(daysInMonth, today.getDate() + 2),
      Math.min(daysInMonth, today.getDate() + 5),
    ];
    
    return dates.map((day, index) => ({
      id: `workout-${index + 1}`,
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      exercise: ['bench', 'squat', 'deadlift', 'bench', 'squat'][index] as Exercise,
      weight: [185, 225, 275, 190, 230][index],
      reps: 5,
      sets: 3,
    }));
  };

  const [workouts, setWorkouts] = useState<WorkoutEvent[]>(getCurrentMonthWorkouts());

  const exercises: { value: Exercise; label: string; icon: string }[] = [
    { value: 'bench', label: 'Bench', icon: '🏋️' },
    { value: 'squat', label: 'Squat', icon: '🦵' },
    { value: 'deadlift', label: 'Deadlift', icon: '⚡' },
    { value: 'custom', label: 'Custom', icon: '➕' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to Supabase
    const newWorkout: WorkoutEvent = {
      id: Date.now().toString(),
      date: formDate,
      exercise: selectedExercise,
      weight: parseInt(weight),
      reps: parseInt(reps),
      sets: parseInt(sets),
    };
    setWorkouts([...workouts, newWorkout]);
    // Reset form
    setWeight('');
    setReps('');
    setSets('');
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setFormDate(date);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-[#F5F5F5] mb-8">
            Workout Calendar
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Log Workout Form */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-[#F5F5F5]">Log Workout</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                      Exercise
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {exercises.map((exercise) => (
                        <button
                          key={exercise.value}
                          type="button"
                          onClick={() => setSelectedExercise(exercise.value)}
                          className={`
                            flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                            ${
                              selectedExercise === exercise.value
                                ? 'bg-[#d4af37] text-[#0f0f0f] font-semibold'
                                : 'bg-[#1a1a1a] text-[#8b8b8b] hover:bg-[#252525] hover:text-[#F5F5F5]'
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
                    <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                      Weight (lbs)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="185"
                      className="w-full bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                        Reps
                      </label>
                      <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        placeholder="5"
                        className="w-full bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                        Sets
                      </label>
                      <input
                        type="number"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        placeholder="3"
                        className="w-full bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#d4af37] text-[#0f0f0f] font-semibold py-3 rounded-lg font-medium hover:bg-[#DC2626] transition-colors"
                  >
                    Log Workout
                  </button>
                </form>
              </div>
            </div>

            {/* Calendar View */}
            <div className="lg:col-span-2">
              <CalendarView
                workouts={workouts}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

