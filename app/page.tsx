'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-8 py-16 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4 tracking-tight">
              <span className="text-[#c0c0c0]">SLOPE</span>
              <span className="text-[#d4af37]">ROYALE</span>
            </h1>
            <p className="text-xl text-[#8b8b8b] mb-2 max-w-2xl mx-auto">
              Track your strength progress over time. Log your workouts and see your progress
            </p>
            <p className="text-lg text-[#8b8b8b] max-w-2xl mx-auto">
              Slope Royale measures your rate of improvement, the SLOPE. The steeper your slope, the more you're improving.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Track Progress</h3>
              <p className="text-[#8b8b8b] text-sm">
                Visualize your strength gains with detailed charts and analytics.
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-xl font-bold text-white mb-2">Compete</h3>
              <p className="text-[#8b8b8b] text-sm">
                Join clans and check your rank on global leaderboards based on your slope.
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Consistent</h3>
              <p className="text-[#8b8b8b] text-sm">
                Log workouts, track streaks, and build lasting healthy habits.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/charts"
                className="bg-[#d4af37] text-[#0f0f0f] px-8 py-4 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors text-center"
              >
                View Charts
              </Link>
              <Link
                href="/calendar"
                className="bg-[#d4af37] text-[#0f0f0f] px-8 py-4 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors text-center"
              >
                Calendar
              </Link>
              <Link
                href="/leaderboards"
                className="bg-[#d4af37] text-[#0f0f0f] px-8 py-4 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors text-center"
              >
                Leaderboards
              </Link>
            </div>

            {isLoggedIn && (
              <div className="text-center">
                <Link
                  href="/calendar"
                  className="inline-block bg-[#d4af37] text-[#0f0f0f] px-8 py-4 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
                >
                  Log Today's Workout
                </Link>
              </div>
            )}

            {!isLoggedIn && (
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-block bg-[#d4af37] text-[#0f0f0f] px-8 py-4 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
                >
                  Log In to Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
