import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Filter, RotateCcw, ShoppingCart, BookOpenCheck } from 'lucide-react';
import { books, type Book } from '../data/books';

interface BookCatalogProps {
  onReadBook?: (book: Book) => void;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({ onReadBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(books.map((book) => book.category)));
    return ['All', ...uniqueCategories];
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'All' || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search Bar Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-600" />
            Book Catalog
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Explore our collection, search by title or author, and filter by categories.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or author..."
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <div className="flex items-center gap-1.5 text-gray-500 px-2 text-sm font-medium shrink-0">
          <Filter className="w-4 h-4" />
          <span>Categories:</span>
        </div>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 shadow-sm ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-indigo-100'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Book Grid / Results Section */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Book Cover Image */}
              <div className="h-48 bg-gray-100 overflow-hidden relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-indigo-700 shadow-sm">
                  {book.category}
                </span>
              </div>

              {/* Book Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base line-clamp-1 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">By {book.author}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                    {book.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">
                      ${book.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Action Buttons: Purchase & Read Online */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button 
                      onClick={() => alert(`Purchased ${book.title} successfully!`)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Purchase
                    </button>
                    <button 
                      onClick={() => onReadBook && onReadBook(book)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-medium rounded-xl transition-colors"
                    >
                      <BookOpenCheck className="w-3.5 h-3.5" />
                      Read Online
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Clean Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-lg mx-auto mt-6">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No books found</h3>
          <p className="text-sm text-gray-500 mb-6">
            We couldn't find any books matching your search or category filter criteria. Try adjusting your query or filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};