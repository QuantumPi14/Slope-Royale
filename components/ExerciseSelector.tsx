'use client';

import { Exercise } from '@/types';

interface ExerciseSelectorProps {
  selected: Exercise;
  onSelect: (exercise: Exercise) => void;
}

const exercises: { value: Exercise; label: string; icon: string }[] = [
  { value: 'bench', label: 'Bench', icon: '🏋️' },
  { value: 'squat', label: 'Squat', icon: '🦵' },
  { value: 'deadlift', label: 'Deadlift', icon: '⚡' },
  { value: 'custom', label: 'Custom', icon: '➕' },
];

export default function ExerciseSelector({ selected, onSelect }: ExerciseSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {exercises.map((exercise) => (
        <button
          key={exercise.value}
          onClick={() => onSelect(exercise.value)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all
            ${
              selected === exercise.value
                ? 'bg-[#d4af37] text-[#0f0f0f] font-semibold shadow-lg shadow-[#d4af37]/20'
                : 'bg-[#2a2a2a] text-[#8b8b8b] hover:bg-[#1a1a1a] hover:text-white'
            }
          `}
        >
          <span>{exercise.icon}</span>
          <span>{exercise.label}</span>
        </button>
      ))}
    </div>
  );
}

