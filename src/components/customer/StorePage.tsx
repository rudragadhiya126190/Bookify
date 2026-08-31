import { useMemo, useState } from 'react';
import { useStore } from '@/store/StoreContext';
import { CATEGORIES, type Book, type Category } from '@/data/books';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BookGrid } from './BookGrid';
import { BookDetailModal } from './BookDetailModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutPage } from './CheckoutPage';
import { SuccessPage } from './SuccessPage';
import type { Order } from '@/store/StoreContext';
import { Menu, SlidersHorizontal } from 'lucide-react';

interface StorePageProps {
  onAdminClick: () => void;
  onReadBook: (book: Book) => void;
}

type View = 'browse' | 'checkout' | 'success';

export function StorePage({ onAdminClick, onReadBook }: StorePageProps) {
  const { books, cart, addToCart } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<View>('browse');
  const [order, setOrder] = useState<Order | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: books.length };
    CATEGORIES.forEach((cat) => {
      c[cat] = books.filter((b) => b.category === cat).length;
    });
    return c;
  }, [books]);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchCat = category === 'All' || b.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [books, category, search]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleAdd = (book: Book) => {
    addToCart(book);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        search={search}
        onSearchChange={setSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onLogoClick={() => {
          setView('browse');
          setCategory('All');
          setSearch('');
        }}
        onAdminClick={onAdminClick}
      />

      {view === 'browse' && (
        <div className="flex">
          <Sidebar
            selected={category}
            onSelect={(c) => {
              setCategory(c);
              setSidebarOpen(false);
            }}
            counts={counts}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 px-4 sm:px-6 py-6 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {category === 'All' ? 'All Books' : category}
                </h1>
                <p className="text-sm text-slate-500">
                  {filtered.length} book{filtered.length !== 1 ? 's' : ''} available
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
            </div>
            <BookGrid
              books={filtered}
              onView={setDetailBook}
              onAdd={handleAdd}
            />
          </main>
        </div>
      )}

      {view === 'checkout' && (
        <CheckoutPage
          onBack={() => setView('browse')}
          onSuccess={(o) => {
            setOrder(o);
            setView('success');
          }}
        />
      )}

      {view === 'success' && order && (
        <SuccessPage
          order={order}
          onContinue={() => setView('browse')}
          onRead={onReadBook}
        />
      )}

      <BookDetailModal
        book={detailBook}
        onClose={() => setDetailBook(null)}
        onAdd={handleAdd}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setView('checkout');
        }}
      />
    </div>
  );
}
