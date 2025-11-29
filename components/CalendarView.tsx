'use client';

import { useState } from 'react';
import { Exercise } from '@/types';

interface WorkoutEvent {
  id: string;
  date: string;
  exercise: Exercise;
  weight: number;
  reps: number;
  sets: number;
}

interface CalendarViewProps {
  workouts: WorkoutEvent[];
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
}

const exercises: Record<Exercise, { icon: string; color: string }> = {
  bench: { icon: '🏋️', color: '#d4af37' },
  squat: { icon: '🦵', color: '#4a90e2' },
  deadlift: { icon: '⚡', color: '#4a9b4a' },
  custom: { icon: '➕', color: '#8b8b8b' },
};

export default function CalendarView({ workouts, selectedDate, onDateSelect }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Get previous month's trailing days
  const prevMonth = new Date(year, month - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const days: Array<{ date: Date; isCurrentMonth: boolean; dateString: string }> = [];

  // Add previous month's trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, daysInPrevMonth - i);
    days.push({
      date,
      isCurrentMonth: false,
      dateString: date.toISOString().split('T')[0],
    });
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      dateString: date.toISOString().split('T')[0],
    });
  }

  // Add next month's leading days to fill the grid
  const totalCells = days.length;
  const remainingCells = 42 - totalCells; // 6 rows × 7 days
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      dateString: date.toISOString().split('T')[0],
    });
  }

  const getWorkoutsForDate = (dateString: string) => {
    return workouts.filter(w => w.date === dateString);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#252525] transition-colors text-sm font-medium"
          >
            Today
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 text-[#8b8b8b] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 text-[#8b8b8b] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold text-white">
            {monthNames[month]} {year}
          </h2>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-[#8b8b8b]"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((day, index) => {
          const dayWorkouts = getWorkoutsForDate(day.dateString);
          const isToday = day.dateString === today;
          const isSelected = selectedDate === day.dateString;

          return (
            <div
              key={index}
              onClick={() => onDateSelect(day.dateString)}
              className={`
                min-h-[100px] p-2 border border-[#2a2a2a] rounded-lg cursor-pointer transition-all
                ${!day.isCurrentMonth ? 'opacity-30' : ''}
                ${isToday ? 'bg-[#d4af37]/10 border-[#d4af37]/30' : ''}
                ${isSelected ? 'bg-[#EF4444]/20 border-[#d4af37]' : 'hover:bg-[#1a1a1a]'}
              `}
            >
              <div className={`
                text-sm font-medium mb-1
                ${isToday ? 'text-[#d4af37]' : isSelected ? 'text-white' : 'text-[#8b8b8b]'}
              `}>
                {day.date.getDate()}
              </div>
              <div className="space-y-1">
                {dayWorkouts.slice(0, 3).map((workout) => {
                  const exerciseInfo = exercises[workout.exercise];
                  return (
                    <div
                      key={workout.id}
                      className="text-xs px-2 py-1 rounded truncate"
                      style={{
                        backgroundColor: `${exerciseInfo.color}20`,
                        color: exerciseInfo.color,
                        borderLeft: `3px solid ${exerciseInfo.color}`,
                      }}
                    >
                      {exerciseInfo.icon} {workout.weight}lbs × {workout.reps}
                    </div>
                  );
                })}
                {dayWorkouts.length > 3 && (
                  <div className="text-xs text-[#8b8b8b] px-2">
                    +{dayWorkouts.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

