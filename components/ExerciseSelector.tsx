'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabaseClient';
import ExerciseSearch from './ExerciseSearch';

interface LoggedExercise {
  id: string;
  name: string;
}

interface ExerciseSelectorProps {
  loggedExercises: LoggedExercise[];
  selectedExerciseId: string | null;
  onSelect: (exerciseId: string) => void;
  loading?: boolean;
}

export default function ExerciseSelector({ loggedExercises, selectedExerciseId, onSelect, loading = false }: ExerciseSelectorProps) {
  const handleExerciseSelect = (exerciseId: string, exerciseName: string) => {
    onSelect(exerciseId);
  };

  const handlePillClick = (exerciseId: string) => {
    onSelect(exerciseId);
  };

  // If no logged exercises, show search bar by default
  if (loggedExercises.length === 0 && !loading) {
    return (
      <div>
        <ExerciseSearch
          selectedExerciseId={selectedExerciseId}
          onSelect={handleExerciseSelect}
          placeholder="Search exercises..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Pills for logged exercises */}
      {loggedExercises.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {loggedExercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => handlePillClick(exercise.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all
                ${
                  selectedExerciseId === exercise.id
                    ? 'bg-[#d4af37] text-[#0f0f0f] font-semibold shadow-lg shadow-[#d4af37]/20'
                    : 'bg-[#2a2a2a] text-[#8b8b8b] hover:bg-[#1a1a1a] hover:text-white'
                }
              `}
            >
              <span>{exercise.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search bar for finding new exercises */}
      <div>
        <ExerciseSearch
          selectedExerciseId={selectedExerciseId}
          onSelect={handleExerciseSelect}
          placeholder="Search exercises..."
        />
      </div>
    </div>
  );
}

