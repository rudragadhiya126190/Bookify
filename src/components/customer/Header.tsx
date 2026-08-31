import { BookOpen, Search, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  search: string;
  onSearchChange: (v: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onAdminClick: () => void;
}

export function Header({
  search,
  onSearchChange,
  cartCount,
  onCartClick,
  onLogoClick,
  onAdminClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-6">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
            Bookify
          </span>
        </button>

        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books, authors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100 border border-transparent focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 outline-none text-sm text-slate-700 transition-all"
          />
        </div>

        <button
          onClick={onCartClick}
          className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Cart"
        >
          <ShoppingCart className="w-5 h-5 text-slate-700" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={onAdminClick}
          className="px-4 py-2 rounded-full bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors shrink-0"
        >
          Admin
        </button>
      </div>
    </header>
  );
}
