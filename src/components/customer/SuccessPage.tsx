import type { Order } from '@/store/StoreContext';
import type { Book } from '@/data/books';
import { CheckCircle2, BookOpen, ArrowLeft, Library } from 'lucide-react';

interface SuccessPageProps {
  order: Order;
  onContinue: () => void;
  onRead: (book: Book) => void;
}

export function SuccessPage({ order, onContinue, onRead }: SuccessPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Your purchase is successful!
        </h1>
        <p className="text-slate-500 mt-2">Order completed.</p>
        <p className="text-sm text-slate-400 mt-1">Order ID: {order.id}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
        <h2 className="font-bold text-slate-800 mb-3">Purchased Books</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.book.id}
              className="flex items-center gap-3 bg-slate-50 rounded-xl p-3"
            >
              <img
                src={item.book.cover}
                alt={item.book.title}
                className="w-12 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-800 text-sm">
                  {item.book.title}
                </p>
                <p className="text-xs text-slate-500">Qty {item.quantity}</p>
              </div>
              <button
                onClick={() => onRead(item.book)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Read Online
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onContinue}
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <Library className="w-4 h-4" /> Browse Library
        </button>
      </div>
    </div>
  );
}
