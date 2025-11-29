export default function Header() {
  const navItems = [
    { label: 'Dashboard', active: true },
    { label: 'Log', active: false },
    { label: 'Calendar', active: false },
    { label: 'Clans', active: false },
  ];

  return (
    <header className="border-b border-[#1a1a1a] bg-[#050505] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-[#F5F5F5]">💪 SlopeRoyale</div>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`
                    text-sm font-medium transition-colors
                    ${
                      item.active
                        ? 'text-[#EF4444]'
                        : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                    }
                  `}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

