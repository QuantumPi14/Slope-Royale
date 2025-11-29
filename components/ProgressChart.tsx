'use client';

import { useState } from 'react';
import { ChartDataPoint, TimeRange } from '@/types';

interface ProgressChartProps {
  data: ChartDataPoint[];
  onRangeChange: (range: TimeRange) => void;
  currentRange: TimeRange;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: '4w', label: '4w' },
  { value: '3m', label: '3m' },
  { value: '6m', label: '6m' },
  { value: '1y', label: '1y' },
  { value: 'all', label: 'All' },
];

export default function ProgressChart({ data, onRangeChange, currentRange }: ProgressChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8 text-center">
        <div className="text-[#8b8b8b]">No data available for this range</div>
      </div>
    );
  }

  // Calculate chart dimensions and scaling
  const maxWeight = Math.max(...data.map(d => d.weight));
  const minWeight = Math.min(...data.map(d => d.weight));
  const weightRange = maxWeight - minWeight || 1;
  const padding = 50;
  const chartHeight = 300;

  // Calculate slope/trend
  const firstWeight = data[0]?.weight || 0;
  const lastWeight = data[data.length - 1]?.weight || 0;
  const slope = lastWeight - firstWeight;
  const percentChange = firstWeight > 0 ? ((slope / firstWeight) * 100).toFixed(1) : '0';

  // Calculate points for the line
  const getX = (index: number, width: number) => {
    return padding + (index / (data.length - 1 || 1)) * (width - padding * 2);
  };

  const getY = (weight: number, height: number) => {
    return padding + ((maxWeight - weight) / weightRange) * (height - padding * 2);
  };

  const hoveredPoint = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Strength Progress</h3>
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span className="text-[#8b8b8b]">
              Slope: <span className="text-white font-medium">{slope > 0 ? '+' : ''}{slope.toFixed(1)} lbs</span>
            </span>
            <span className="text-[#8b8b8b]">
              Change: <span className={`font-medium ${slope >= 0 ? 'text-[#4a90e2]' : 'text-[#d4af37]'}`}>
                {slope >= 0 ? '+' : ''}{percentChange}%
              </span>
            </span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => onRangeChange(range.value)}
              className={`
                px-3 py-1 rounded text-xs font-medium transition-all
                ${
                  currentRange === range.value
                    ? 'bg-[#d4af37] text-[#0f0f0f] font-semibold'
                    : 'bg-[#2a2a2a] text-[#8b8b8b] hover:bg-[#1a1a1a] hover:text-white'
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-x-auto" style={{ height: chartHeight }}>
        <svg width="100%" height={chartHeight} viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet" className="min-w-[800px]">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding + ratio * (chartHeight - padding * 2);
            return (
              <line
                key={ratio}
                x1={padding}
                y1={y}
                x2={800 - padding}
                y2={y}
                stroke="#2a2a2a"
                strokeWidth="1"
              />
            );
          })}

          {/* Area under line */}
          {data.length > 0 && (
            <polygon
              points={`
                ${padding},${chartHeight - padding}
                ${data.map((point, index) => `${getX(index, 800)},${getY(point.weight, chartHeight)}`).join(' ')}
                ${800 - padding},${chartHeight - padding}
              `}
              fill="url(#gradient)"
              opacity="0.2"
            />
          )}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a90e2" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4a90e2" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Chart line */}
          {data.length > 1 && (
            <polyline
              points={data.map((point, index) => `${getX(index, 800)},${getY(point.weight, chartHeight)}`).join(' ')}
              fill="none"
                stroke="#d4af37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          {data.map((point, index) => {
            const x = getX(index, 800);
            const y = getY(point.weight, chartHeight);
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r={point.isPR ? 6 : 4}
                  fill={point.isPR ? '#d4af37' : '#c0c0c0'}
                  stroke={point.isPR ? '#ffffff' : '#2a2a2a'}
                  strokeWidth={point.isPR ? 2 : 1}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer"
                />
                {point.isPR && (
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    fill="#d4af37"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    PR
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2" style={{ width: padding }}>
          {[maxWeight, (maxWeight + minWeight) / 2, minWeight].map((weight, i) => (
            <div key={i} className="text-xs text-[#A3A3A3] text-right pr-2">
              {Math.round(weight)}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredPoint && hoveredIndex !== null && (
          <div
            className="absolute bg-[#1a1a1a] border border-[#d4af37] rounded-lg p-3 shadow-xl z-10 pointer-events-none"
            style={{
              left: `${(getX(hoveredIndex, 800) / 800) * 100}%`,
              top: `${getY(hoveredPoint.weight, chartHeight) - 100}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-xs text-[#8b8b8b] mb-1">
              {new Date(hoveredPoint.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="text-sm font-bold text-white mb-1">
              {hoveredPoint.weight} lbs
            </div>
            <div className="text-xs text-[#8b8b8b]">
              {hoveredPoint.sets} sets × {hoveredPoint.reps} reps
            </div>
            {hoveredPoint.isPR && (
              <div className="mt-1 text-xs text-[#d4af37] font-bold">Personal Record</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
