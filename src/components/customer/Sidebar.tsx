import { CATEGORIES, type Category } from '@/data/books';
import { Library, X } from 'lucide-react';

interface SidebarProps {
  selected: Category | 'All';
  onSelect: (c: Category | 'All') => void;
  counts: Record<string, number>;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ selected, onSelect, counts, open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[64px] left-0 z-30 lg:z-0 w-64 h-screen lg:h-[calc(100vh-64px)] bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 lg:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-700">
              <Library className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold">Categories</span>
            </div>
            <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => onSelect('All')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                selected === 'All'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Books
              <span className="float-right text-xs text-slate-400">
                {counts['All'] ?? 0}
              </span>
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  selected === cat
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
                <span className="float-right text-xs text-slate-400">
                  {counts[cat] ?? 0}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
