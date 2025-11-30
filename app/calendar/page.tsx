'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CalendarView from '@/components/CalendarView';
import ExerciseSearch from '@/components/ExerciseSearch';
import { useAuth } from '@/lib/useAuth';

interface WorkoutEvent {
  id: string;
  date: string;
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
}

export default function CalendarPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

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
      exerciseId: `exercise-${index + 1}`,
      exerciseName: ['Bench', 'Squat', 'Deadlift', 'Bench', 'Squat'][index],
      weight: [185, 225, 275, 190, 230][index],
      reps: 5,
    }));
  };

  const [workouts, setWorkouts] = useState<WorkoutEvent[]>(isLoggedIn ? getCurrentMonthWorkouts() : []);

  const handleExerciseSelect = (exerciseId: string, exerciseName: string) => {
    setSelectedExerciseId(exerciseId);
    setSelectedExerciseName(exerciseName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    if (!selectedExerciseId) {
      alert('Please select an exercise');
      return;
    }

    // TODO: Submit to Supabase
    const newWorkout: WorkoutEvent = {
      id: Date.now().toString(),
      date: formDate,
      exerciseId: selectedExerciseId,
      exerciseName: selectedExerciseName,
      weight: parseInt(weight),
      reps: parseInt(reps),
    };
    setWorkouts([...workouts, newWorkout]);
    // Reset form
    setWeight('');
    setReps('');
    setSelectedExerciseId(null);
    setSelectedExerciseName('');
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
                    <ExerciseSearch
                      selectedExerciseId={selectedExerciseId}
                      onSelect={handleExerciseSelect}
                      placeholder="Search exercises..."
                    />
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

                  <button
                    type="submit"
                    disabled={!isLoggedIn}
                    className={`
                      w-full py-3 rounded-lg font-semibold transition-colors
                      ${isLoggedIn 
                        ? 'bg-[#d4af37] text-[#0f0f0f] hover:bg-[#b8941f]' 
                        : 'bg-[#2a2a2a] text-[#8b8b8b] cursor-not-allowed opacity-50'
                      }
                    `}
                  >
                    {isLoggedIn ? 'Log Workout' : 'Log In to Log Workout'}
                  </button>
                </form>
              </div>
            </div>

            {/* Calendar View */}
            <div className="lg:col-span-2">
              <div className={!isLoggedIn ? 'opacity-50 pointer-events-none' : ''}>
                <CalendarView
                  workouts={workouts}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>
              {!isLoggedIn && (
                <div className="mt-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-center">
                  <p className="text-[#8b8b8b] mb-2">You're not logged in. Log in to view and log your workouts.</p>
                  <Link
                    href="/login"
                    className="inline-block bg-[#d4af37] text-[#0f0f0f] px-6 py-2 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

