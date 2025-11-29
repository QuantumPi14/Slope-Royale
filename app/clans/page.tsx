'use client';

import { useState } from 'react';

interface Clan {
  id: string;
  name: string;
  members: number;
  description: string;
  isMember: boolean;
}

export default function ClansPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [clanName, setClanName] = useState('');
  const [clanDescription, setClanDescription] = useState('');

  // Mock clans data - in real app, fetch from Supabase
  const mockClans: Clan[] = [
    {
      id: '1',
      name: 'Iron Warriors',
      members: 12,
      description: 'A competitive group focused on strength gains',
      isMember: true,
    },
    {
      id: '2',
      name: 'Powerlifters United',
      members: 8,
      description: 'For serious powerlifters only',
      isMember: false,
    },
    {
      id: '3',
      name: 'Beginner Gains',
      members: 25,
      description: 'Supportive community for beginners',
      isMember: false,
    },
  ];

  const handleCreateClan = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create clan in Supabase
    console.log({ clanName, clanDescription });
    setShowCreateModal(false);
    setClanName('');
    setClanDescription('');
  };

  const handleJoinClan = (clanId: string) => {
    // TODO: Join clan in Supabase
    console.log('Join clan:', clanId);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Clans</h1>
            <div className="flex gap-3">
              <button
                onClick={() => {/* TODO: Open join clan modal */}}
                className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#252525] transition-colors border border-[#1a1a1a]"
              >
                Join Clan
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#d4af37] text-[#0f0f0f] font-semibold text-white px-6 py-3 rounded-lg font-medium hover:bg-[#b8941f] transition-colors"
              >
                Create Clan
              </button>
            </div>
          </div>

          <p className="text-[#8b8b8b] mb-8">
            Join or create a clan to compete with friends and track progress together.
          </p>

          {/* My Clans */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">My Clans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockClans
                .filter(clan => clan.isMember)
                .map((clan) => (
                  <div
                    key={clan.id}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#d4af37]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white">{clan.name}</h3>
                      <span className="text-xs bg-[#22C55E]/20 text-[#22C55E] px-2 py-1 rounded">
                        Member
                      </span>
                    </div>
                    <p className="text-sm text-[#8b8b8b] mb-4">{clan.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8b8b8b]">
                        👥 {clan.members} members
                      </span>
                      <button className="text-sm text-[#d4af37] hover:text-[#DC2626] font-medium">
                        View Leaderboard →
                      </button>
                    </div>
                  </div>
                ))}
              {mockClans.filter(clan => clan.isMember).length === 0 && (
                <div className="col-span-full text-center py-8 text-[#8b8b8b]">
                  You're not in any clans yet. Create or join one to get started!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Create Clan Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Create Clan</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-[#8b8b8b] hover:text-white"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateClan} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                    Clan Name
                  </label>
                  <input
                    type="text"
                    value={clanName}
                    onChange={(e) => setClanName(e.target.value)}
                    placeholder="Iron Warriors"
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#EF4444]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                    Description
                  </label>
                  <textarea
                    value={clanDescription}
                    onChange={(e) => setClanDescription(e.target.value)}
                    placeholder="A competitive group focused on strength gains"
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#EF4444] resize-none"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-[#1a1a1a] text-white py-2 rounded-lg font-medium hover:bg-[#252525] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#d4af37] text-[#0f0f0f] font-semibold text-white py-2 rounded-lg font-medium hover:bg-[#b8941f] transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

