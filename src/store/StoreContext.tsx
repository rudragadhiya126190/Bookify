import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { BOOKS, type Book, type Category } from '@/data/books';

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
}

interface StoreState {
  books: Book[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerName: string, address: string) => Order;
  addBook: (book: Omit<Book, 'id'>) => void;
  deleteBook: (bookId: string) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

const STORAGE_KEY = 'bookify-store-v3';

interface PersistedState {
  books: Book[];
  orders: Order[];
  cart: CartItem[];
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.books?.length) {
        return {
          books: parsed.books,
          orders: parsed.orders ?? [],
          cart: parsed.cart ?? [],
        };
      }
    }
  } catch {
    // ignore corrupted storage
  }
  return { books: BOOKS, orders: [], cart: [] };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => loadState());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable
    }
  }, [state]);

  const value = useMemo<StoreState>(
    () => ({
      books: state.books,
      cart: state.cart,
      orders: state.orders,
      addToCart: (book) =>
        setState((s) => {
          const existing = s.cart.find((i) => i.book.id === book.id);
          if (existing) {
            return {
              ...s,
              cart: s.cart.map((i) =>
                i.book.id === book.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { ...s, cart: [...s.cart, { book, quantity: 1 }] };
        }),
      removeFromCart: (bookId) =>
        setState((s) => ({
          ...s,
          cart: s.cart.filter((i) => i.book.id !== bookId),
        })),
      updateQuantity: (bookId, quantity) =>
        setState((s) => ({
          ...s,
          cart: s.cart
            .map((i) =>
              i.book.id === bookId ? { ...i, quantity: Math.max(1, quantity) } : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => setState((s) => ({ ...s, cart: [] })),
      placeOrder: (customerName, address) => {
        const order: Order = {
          id: `o${Date.now()}`,
          customerName,
          address,
          items: state.cart,
          total: state.cart.reduce(
            (sum, i) => sum + i.book.price * i.quantity,
            0
          ),
          date: new Date().toISOString(),
        };
        setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
        return order;
      },
      addBook: (book) =>
        setState((s) => ({
          ...s,
          books: [...s.books, { ...book, id: `b${Date.now()}` }],
        })),
      deleteBook: (bookId) =>
        setState((s) => ({
          ...s,
          books: s.books.filter((b) => b.id !== bookId),
          cart: s.cart.filter((i) => i.book.id !== bookId),
        })),
    }),
    [state]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export type { Book, Category };
