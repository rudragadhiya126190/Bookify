import { useState } from 'react';
import { StoreProvider } from './store/StoreContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StorePage } from './components/customer/StorePage';
import { PdfReader } from './components/customer/PdfReader';
import { AdminLayout, type AdminTab } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminBooks } from './components/admin/AdminBooks';
import { AdminOrders } from './components/admin/AdminOrders';
import { Navbar } from './components/Navbar';
import { AuthModal } from './context/AuthModal';
import type { Book } from './data/books';

type Route = 'store' | 'admin';

function AppInner() {
  const { user } = useAuth();
  const [route, setRoute] = useState<Route>('store');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [readingBook, setReadingBook] = useState<Book | null>(null);

  if (!user) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
        {/* Background Library Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 filter brightness-50 scale-105 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')` 
          }}
        ></div>

        {/* Glassmorphism Card Container */}
        <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 inline-block">📚</span>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Bookify</h1>
            <p className="text-sm text-gray-600 mt-1">Please sign in to explore the library</p>
          </div>

          <AuthModal isOpen={true} onClose={() => {}} />
        </div>
      </div>
    );
  }

  if (readingBook) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <PdfReader
          book={readingBook}
          onClose={() => setReadingBook(null)}
          onBack={() => setReadingBook(null)}
        />
      </div>
    );
  }

  if (route === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <AdminLayout
            tab={adminTab}
            onTabChange={setAdminTab}
            onExit={() => setRoute('store')}
          >
            {adminTab === 'dashboard' && <AdminDashboard />}
            {adminTab === 'books' && <AdminBooks />}
            {adminTab === 'orders' && <AdminOrders />}
          </AdminLayout>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <StorePage
        onAdminClick={() => setRoute('admin')}
        onReadBook={(book) => setReadingBook(book)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppInner />
      </StoreProvider>
    </AuthProvider>
  );
}