import { useStore } from '@/store/StoreContext';
import { Package, MapPin, User } from 'lucide-react';

export function AdminOrders() {
  const { orders } = useStore();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2 p-5 border-b border-slate-200">
        <Package className="w-5 h-5 text-emerald-600" />
        <h2 className="font-bold text-slate-800">My Orders ({orders.length})</h2>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No orders yet</p>
          <p className="text-sm">Orders will appear here after customers buy books.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Address</th>
                <th className="px-5 py-3 font-medium">Books</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">
                    {o.id}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {o.customerName}
                    </div>
                  </td>
                  <td className="px-5 py-3 max-w-xs">
                    <div className="flex items-start gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{o.address}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="space-y-0.5">
                      {o.items.map((i) => (
                        <div key={i.book.id} className="text-xs text-slate-600">
                          {i.book.title} × {i.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3 font-semibold text-emerald-600">
                    ${o.total.toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500">
                    {new Date(o.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
