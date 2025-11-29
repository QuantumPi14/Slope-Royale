'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('User Name');
  const [email, setEmail] = useState('user@example.com');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSave = (section: string) => {
    // TODO: Save to Supabase
    console.log(`Saving ${section} settings`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-white mb-8 tracking-tight">
            Settings
          </h1>

          {/* Account Settings */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-white tracking-tight">Account</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8b8b8b] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <button
                onClick={() => handleSave('account')}
                className="bg-[#d4af37] text-[#0f0f0f] px-6 py-2 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-white tracking-tight">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white mb-1">Private Account</div>
                  <div className="text-sm text-[#8b8b8b]">
                    Hide your profile from leaderboards
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#2a2a2a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af37]"></div>
                </label>
              </div>
              <button
                onClick={() => handleSave('privacy')}
                className="bg-[#d4af37] text-[#0f0f0f] px-6 py-2 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-[#d4af37] tracking-tight">Danger Zone</h2>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-white mb-2">Delete Account</div>
                <div className="text-sm text-[#8b8b8b] mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </div>
                <button className="bg-[#d4af37] text-[#0f0f0f] px-6 py-2 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

