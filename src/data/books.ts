export type Category = 'Fiction' | 'Technology' | 'Academic' | 'Novels' | 'Business' | 'Self-Help' | 'Biography' | 'Children' | 'Fantasy' | 'History' | 'Mystery' | 'Romance' | 'Science';

export const CATEGORIES: Category[] = [
  'Fiction', 'Technology', 'Academic', 'Novels', 'Business', 
  'Self-Help', 'Biography', 'Children', 'Fantasy', 'History', 
  'Mystery', 'Romance', 'Science'
];

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  price: number;
  cover: string;
  summary: string;
  pdfUrl: string;
}

const DUMMY_PDF = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

export const FALLBACK_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'The Art of Programming',
    author: 'Jane Doe',
    category: 'Technology',
    price: 24.99,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    summary: 'A hands-on introduction to modern software development and clean coding principles.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b2',
    title: 'Mysteries of the Deep',
    author: 'Robert Lang',
    category: 'Science',
    price: 19.99,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    summary: 'Exploring the uncharted territories of our oceans and marine ecosystems.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b3',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    price: 21.50,
    cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800',
    summary: 'From the big bang to black holes, a journey through cosmological wonders.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b4',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    category: 'Mystery',
    price: 15.99,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    summary: 'A psychological thriller about a woman’s act of violence against her husband.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b5',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    price: 18.00,
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    summary: 'An easy & proven way to build good habits and break bad ones.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b6',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    price: 12.99,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
    summary: 'A classic tale of the American dream, wealth, and tragedy in the 1920s.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b7',
    title: 'Sapiens: A Brief History',
    author: 'Yuval Noah Harari',
    category: 'History',
    price: 22.00,
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    summary: 'How humankind evolved and conquered the planet through cognitive revolutions.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b8',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    price: 16.50,
    cover: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=800',
    summary: 'A fantasy adventure of Bilbo Baggins participating in a quest to reclaim treasure.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b9',
    title: 'Start With Why',
    author: 'Simon Sinek',
    category: 'Business',
    price: 20.00,
    cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=800',
    summary: 'How great leaders inspire everyone to take action.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b10',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Romance',
    price: 11.25,
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    summary: 'A romantic novel of manners following Elizabeth Bennet.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b11',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    category: 'Biography',
    price: 25.00,
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800',
    summary: 'The exclusive biography of Apple co-founder Steve Jobs.',
    pdfUrl: DUMMY_PDF,
  },
  {
    id: 'b12',
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    category: 'Children',
    price: 9.99,
    cover: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
    summary: 'A classic children’s picture book about a voracious caterpillar.',
    pdfUrl: DUMMY_PDF,
  }
];

export const BOOKS = FALLBACK_BOOKS;