import { useState, type ReactNode } from 'react';
import { useStore } from '@/store/StoreContext';
import { LayoutDashboard, BookOpen, Package, Store, BookOpenCheck } from 'lucide-react';

export type AdminTab = 'dashboard' | 'books' | 'orders';

interface AdminLayoutProps {
  tab: AdminTab;
  onTabChange: (t: AdminTab) => void;
  onExit: () => void;
  children: ReactNode;
}

export function AdminLayout({ tab, onTabChange, onExit, children }: AdminLayoutProps) {
  const { books, orders } = useStore();

  const navItems: { id: AdminTab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'books', label: 'Manage Books', icon: BookOpen, badge: books.length },
    { id: 'orders', label: 'My Orders', icon: Package, badge: orders.length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden md:flex flex-col w-60 bg-slate-900 text-slate-300 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-700">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <BookOpenCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white">Bookify</p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === item.id
                    ? 'bg-emerald-500 text-white'
                    : 'hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
                {item.badge !== undefined && (
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      tab === item.id
                        ? 'bg-white/20'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-700">
          <button
            onClick={onExit}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Store className="w-5 h-5" /> Exit to Store
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900 flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs ${
                tab === item.id ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>

      <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
