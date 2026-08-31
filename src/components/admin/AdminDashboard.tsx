import { useStore } from '@/store/StoreContext';
import { CATEGORIES } from '@/data/books';
import { BookOpen, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const PIE_COLORS = [
  '#10b981',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
];

export function AdminDashboard() {
  const { books, orders } = useStore();

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  // Sales per book
  const salesByBook = books.map((b) => {
    let count = 0;
    orders.forEach((o) =>
      o.items.forEach((i) => {
        if (i.book.id === b.id) count += i.quantity;
      })
    );
    return { name: b.title.length > 18 ? b.title.slice(0, 18) + '…' : b.title, sales: count };
  });

  // Sales by category
  const salesByCategory = CATEGORIES.map((cat) => {
    let count = 0;
    books
      .filter((b) => b.category === cat)
      .forEach((b) => {
        orders.forEach((o) =>
          o.items.forEach((i) => {
            if (i.book.id === b.id) count += i.quantity;
          })
        );
      });
    return { name: cat, value: count };
  }).filter((c) => c.value > 0);

  const stats = [
    { label: 'Total Books', value: books.length, icon: BookOpen, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Revenue', value: `${totalRevenue.toFixed(2)}`, icon: DollarSign, bg: 'bg-amber-50', text: 'text-amber-600' },
    {
      label: 'Books Sold',
      value: orders.reduce((s, o) => s + o.items.reduce((q, i) => q + i.quantity, 0), 0),
      icon: TrendingUp, bg: 'bg-rose-50', text: 'text-rose-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-slate-200 p-5"
            >
              <div
                className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${s.text}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-800 mb-4">Sales by Book</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByBook}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  angle={-35}
                  textAnchor="end"
                  height={70}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-800 mb-4">Sales by Category</h2>
          {salesByCategory.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                  >
                    {salesByCategory.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-400 text-sm">
              No sales data yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
