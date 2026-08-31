import { useStore } from '@/store/StoreContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const total = cart.reduce((s, i) => s + i.book.price * i.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">Your Cart</h2>
            <span className="text-sm text-slate-400">({cart.length})</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <ShoppingBag className="w-12 h-12 mb-3 opacity-50" />
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm">Add some books to get started.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.book.id}
                  className="flex gap-3 bg-slate-50 rounded-xl p-3"
                >
                  <img
                    src={item.book.cover}
                    alt={item.book.title}
                    className="w-16 h-20 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-slate-800 line-clamp-1">
                      {item.book.title}
                    </h3>
                    <p className="text-xs text-slate-500">{item.book.author}</p>
                    <p className="text-sm font-bold text-emerald-600 mt-1">
                      ${item.book.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.book.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.book.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.book.id)}
                        className="ml-auto p-1.5 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total</span>
                <span className="text-2xl font-bold text-slate-800">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
