import type { Book } from '@/data/books';
import { Plus, Eye } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onView: () => void;
  onAdd: () => void;
}

export function BookCard({ book, onView, onAdd }: BookCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-emerald-700">
          {book.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">by {book.author}</p>
        <p className="text-sm text-slate-600 mt-2 line-clamp-2 flex-1">
          {book.summary}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-emerald-600">
            ${book.price.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={onView}
            className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-4 h-4" /> Details
          </button>
          <button
            onClick={onAdd}
            className="flex-1 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
