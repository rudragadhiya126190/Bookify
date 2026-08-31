import type { Book } from '@/data/books';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  onView: (book: Book) => void;
  onAdd: (book: Book) => void;
}

export function BookGrid({ books, onView, onAdd }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <p className="text-lg font-medium">No books found</p>
        <p className="text-sm">Try a different search or category.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onView={() => onView(book)}
          onAdd={() => onAdd(book)}
        />
      ))}
    </div>
  );
}
