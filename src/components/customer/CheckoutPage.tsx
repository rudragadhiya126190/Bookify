import { useState } from 'react';
import { useStore } from '@/store/StoreContext';
import type { Order } from '@/store/StoreContext';
import { ArrowLeft, CreditCard, MapPin, User, ScanLine } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: (order: Order) => void;
}

export function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { cart, placeOrder } = useStore();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});

  const total = cart.reduce((s, i) => s + i.book.price * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!address.trim()) errs.address = 'Please enter your shipping address';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const order = placeOrder(name.trim(), address.trim());
    onSuccess(order);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 text-lg">Your cart is empty.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Customer Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-colors ${
                  errors.name
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-slate-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Shipping Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, State, ZIP"
                rows={3}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-colors resize-none ${
                  errors.address
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-slate-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100'
                }`}
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ScanLine className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-slate-700">UPI Payment</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-40 h-40 bg-white border-2 border-slate-200 rounded-xl p-2 flex items-center justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=bookify@upi&pn=Bookify&am=1&cu=INR"
                  alt="UPI QR Code"
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs text-slate-400 text-center">
                Scan this QR code with any UPI app to pay (mock for demo)
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" /> Confirm Purchase
          </button>
        </form>

        <div className="bg-slate-50 rounded-2xl p-5">
          <h2 className="font-bold text-slate-800 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.book.id} className="flex gap-3">
                <img
                  src={item.book.cover}
                  alt={item.book.title}
                  className="w-12 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800 line-clamp-1">
                    {item.book.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    Qty {item.quantity} × ${item.book.price.toFixed(2)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
            <span className="text-slate-600">Total</span>
            <span className="text-xl font-bold text-slate-800">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
