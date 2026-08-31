import type { Book } from '@/data/books';
import { X, Plus, FileText } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAdd: (book: Book) => void;
}

export function BookDetailModal({ book, onClose, onAdd }: BookDetailModalProps) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[fadeIn_0.2s_ease]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-slate-100 z-10"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/5 aspect-[3/4] bg-slate-100 overflow-hidden">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:w-3/5 p-6 flex flex-col">
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold w-fit">
              {book.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-800 mt-3">{book.title}</h2>
            <p className="text-slate-500 mt-1">by {book.author}</p>
            <p className="text-slate-600 mt-4 leading-relaxed">{book.summary}</p>
            <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
              <FileText className="w-4 h-4" /> PDF included for online reading
            </div>
            <div className="mt-auto pt-6 flex items-center justify-between">
              <span className="text-2xl font-bold text-emerald-600">
                ${book.price.toFixed(2)}
              </span>
              <button
                onClick={() => {
                  onAdd(book);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
