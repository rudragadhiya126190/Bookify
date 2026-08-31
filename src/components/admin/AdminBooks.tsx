import { useState } from 'react';
import { useStore } from '@/store/StoreContext';
import { CATEGORIES, type Category } from '@/data/books';
import { Plus, Trash2, BookOpen } from 'lucide-react';

export function AdminBooks() {
  const { books, addBook, deleteBook } = useStore();
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: 'Fiction' as Category,
    price: '',
    summary: '',
    cover: '',
    pdfUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price || !form.summary || !form.cover || !form.pdfUrl) return;
    addBook({
      title: form.title,
      author: form.author,
      category: form.category,
      price: parseFloat(form.price),
      summary: form.summary,
      cover: form.cover,
      pdfUrl: form.pdfUrl,
    });
    setForm({
      title: '',
      author: '',
      category: 'Fiction',
      price: '',
      summary: '',
      cover: '',
      pdfUrl: '',
    });
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 text-sm text-slate-700 transition-all';

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-4">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800">Add New Book</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className={inputClass}
            />
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as Category })
              }
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Price ($)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
            />
            <textarea
              placeholder="Summary"
              rows={3}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className={`${inputClass} resize-none`}
            />
            <input
              type="url"
              placeholder="Cover Image URL"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              className={inputClass}
            />
            <input
              type="url"
              placeholder="PDF File URL"
              value={form.pdfUrl}
              onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
              className={inputClass}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Book
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-slate-200">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800">
              All Books ({books.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-left">
                <tr>
                  <th className="px-5 py-3 font-medium">Book</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {books.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.cover}
                          alt={b.title}
                          className="w-9 h-12 object-cover rounded shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 line-clamp-1">
                            {b.title}
                          </p>
                          <p className="text-xs text-slate-500">{b.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                        {b.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-700">
                      ${b.price.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => deleteBook(b.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label={`Delete ${b.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
