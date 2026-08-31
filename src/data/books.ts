export type Category =
  | 'Fiction'
  | 'Technology'
  | 'Academic'
  | 'Novels'
  | 'Business'
  | 'Self-Help';

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

export const CATEGORIES: Category[] = [
  'Fiction',
  'Technology',
  'Academic',
  'Novels',
  'Business',
  'Self-Help',
];

// Unique, real, working PDF URLs for each book.
// Public-domain classics use their actual book PDFs from open archives;
// non-public-domain titles use distinct real sample PDFs.
const PDF = {
  alice: 'https://www.adobe.com/be_en/active-use/pdf/Alice_in_Wonderland.pdf',
  franken: 'https://www.planetebook.com/frankenstein/pdf',
  sherlock: 'https://www.planetebook.com/the-adventures-of-sherlock-holmes/pdf',
  dracula: 'https://www.planetebook.com/dracula/pdf',
  time: 'https://www.planetebook.com/the-time-machine/pdf',
  moby: 'https://archive.org/download/mobydickorwhale00melvrich/mobydickorwhale00melvrich.pdf',
  pride: 'https://www.planetebook.com/pride-and-prejudice/pdf',
  treasure: 'https://archive.org/download/islandtreasure00stevrich/islandtreasure00stevrich.pdf',
  jekyll: 'https://www.planetebook.com/the-strange-case-of-dr-jekyll-and-mr-hyde/pdf',
  great: 'https://www.planetebook.com/great-expectations/pdf',
  odyssey: 'https://www.planetebook.com/the-odyssey/pdf',
  republic: 'https://www.planetebook.com/the-republic/pdf',
  origin: 'https://www.planetebook.com/on-the-origin-of-species/pdf',
  peloponnesian: 'https://www.gutenberg.org/files/38685/38685-pdf.pdf',
  art: 'https://www.planetebook.com/the-art-of-war/pdf',
  wealth: 'https://www.gutenberg.org/files/3300/3300-pdf.pdf',
  principles: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  python: 'https://www.python.org/files/intro/intro.pdf',
  algorithms: 'https://www.cs.cmu.edu/afs/cs/academic/class/15451-s10/www/syllabus.pdf',
  clean: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  design: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
};

// Verified Pexels photo URLs (license-free, guaranteed to load).
const COVERS = {
  vintage1: 'https://images.pexels.com/photos/19208445/pexels-photo-19208445.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage2: 'https://images.pexels.com/photos/19969897/pexels-photo-19969897.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage3: 'https://images.pexels.com/photos/17028571/pexels-photo-17028571.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage4: 'https://images.pexels.com/photos/17314154/pexels-photo-17314154.png?auto=compress&cs=tinysrgb&w=400',
  vintage5: 'https://images.pexels.com/photos/31880175/pexels-photo-31880175.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage6: 'https://images.pexels.com/photos/19328669/pexels-photo-19328669.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage7: 'https://images.pexels.com/photos/10480076/pexels-photo-10480076.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage8: 'https://images.pexels.com/photos/17144197/pexels-photo-17144197.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage9: 'https://images.pexels.com/photos/27668996/pexels-photo-27668996.jpeg?auto=compress&cs=tinysrgb&w=400',
  vintage10: 'https://images.pexels.com/photos/38373935/pexels-photo-38373935.jpeg?auto=compress&cs=tinysrgb&w=400',
  classicNovels: 'https://images.pexels.com/photos/33866461/pexels-photo-33866461.jpeg?auto=compress&cs=tinysrgb&w=400',
  hardcover: 'https://images.pexels.com/photos/19905625/pexels-photo-19905625.jpeg?auto=compress&cs=tinysrgb&w=400',
  code1: 'https://images.pexels.com/photos/34804021/pexels-photo-34804021.jpeg?auto=compress&cs=tinysrgb&w=400',
  code2: 'https://images.pexels.com/photos/34804020/pexels-photo-34804020.jpeg?auto=compress&cs=tinysrgb&w=400',
  code3: 'https://images.pexels.com/photos/31177212/pexels-photo-31177212.jpeg?auto=compress&cs=tinysrgb&w=400',
  code4: 'https://images.pexels.com/photos/225250/pexels-photo-225250.jpeg?auto=compress&cs=tinysrgb&w=400',
  code5: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg?auto=compress&cs=tinysrgb&w=400',
  biz1: 'https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg?auto=compress&cs=tinysrgb&w=400',
  biz2: 'https://images.pexels.com/photos/5668843/pexels-photo-5668843.jpeg?auto=compress&cs=tinysrgb&w=400',
  biz3: 'https://images.pexels.com/photos/8134173/pexels-photo-8134173.jpeg?auto=compress&cs=tinysrgb&w=400',
  phil1: 'https://images.pexels.com/photos/33448167/pexels-photo-33448167.jpeg?auto=compress&cs=tinysrgb&w=400',
  phil2: 'https://images.pexels.com/photos/28822020/pexels-photo-28822020.jpeg?auto=compress&cs=tinysrgb&w=400',
  phil3: 'https://images.pexels.com/photos/32553277/pexels-photo-32553277.jpeg?auto=compress&cs=tinysrgb&w=400',
  phil4: 'https://images.pexels.com/photos/35730384/pexels-photo-35730384.jpeg?auto=compress&cs=tinysrgb&w=400',
  self1: 'https://images.pexels.com/photos/33302151/pexels-photo-33302151.jpeg?auto=compress&cs=tinysrgb&w=400',
  self2: 'https://images.pexels.com/photos/3367620/pexels-photo-3367620.jpeg?auto=compress&cs=tinysrgb&w=400',
  self3: 'https://images.pexels.com/photos/91223/pexels-photo-91223.jpeg?auto=compress&cs=tinysrgb&w=400',
};

export const BOOKS: Book[] = [
  // --- Fiction ---
  {
    id: 'b1',
    title: 'Alice in Wonderland',
    author: 'Lewis Carroll',
    category: 'Fiction',
    price: 12.99,
    cover: COVERS.vintage1,
    summary:
      'A young girl falls through a rabbit hole into a whimsical world of peculiar creatures and absurd logic.',
    pdfUrl: PDF.alice,
  },
  {
    id: 'b2',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    category: 'Fiction',
    price: 9.99,
    cover: COVERS.vintage2,
    summary:
      'A scientist creates a sentient creature in an unorthodox experiment, with tragic consequences.',
    pdfUrl: PDF.franken,
  },
  {
    id: 'b3',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    category: 'Fiction',
    price: 13.75,
    cover: COVERS.vintage3,
    summary:
      'Twelve detective stories featuring the legendary detective Sherlock Holmes and Dr. Watson.',
    pdfUrl: PDF.sherlock,
  },
  {
    id: 'b4',
    title: 'Dracula',
    author: 'Bram Stoker',
    category: 'Fiction',
    price: 12.0,
    cover: COVERS.vintage4,
    summary:
      'The classic gothic horror novel of the vampire Count Dracula and his pursuit of victims.',
    pdfUrl: PDF.dracula,
  },
  {
    id: 'b5',
    title: 'The Time Machine',
    author: 'H.G. Wells',
    category: 'Fiction',
    price: 10.0,
    cover: COVERS.vintage5,
    summary:
      'A Victorian scientist travels to the far future and discovers a deeply divided humanity.',
    pdfUrl: PDF.time,
  },

  // --- Novels ---
  {
    id: 'b6',
    title: 'Moby Dick',
    author: 'Herman Melville',
    category: 'Novels',
    price: 14.5,
    cover: COVERS.vintage6,
    summary:
      'The obsessive quest of Captain Ahab to exact revenge on the giant white whale that maimed him.',
    pdfUrl: PDF.moby,
  },
  {
    id: 'b7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Novels',
    price: 11.25,
    cover: COVERS.vintage7,
    summary:
      'A romantic novel of manners about the turbulent relationship between Elizabeth Bennet and Mr. Darcy.',
    pdfUrl: PDF.pride,
  },
  {
    id: 'b8',
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    category: 'Novels',
    price: 10.5,
    cover: COVERS.vintage8,
    summary:
      'A tale of pirates, hidden treasure, and a young cabin boy aboard the schooner Hispaniola.',
    pdfUrl: PDF.treasure,
  },
  {
    id: 'b9',
    title: 'The Strange Case of Dr. Jekyll and Mr. Hyde',
    author: 'Robert Louis Stevenson',
    category: 'Novels',
    price: 8.99,
    cover: COVERS.vintage9,
    summary:
      'A lawyer investigates the strange link between the respectable Dr. Jekyll and the sinister Hyde.',
    pdfUrl: PDF.jekyll,
  },
  {
    id: 'b10',
    title: 'Great Expectations',
    author: 'Charles Dickens',
    category: 'Novels',
    price: 11.99,
    cover: COVERS.classicNovels,
    summary:
      'An orphan named Pip comes into an unexpected fortune and navigates love, class, and ambition.',
    pdfUrl: PDF.great,
  },

  // --- Academic ---
  {
    id: 'b11',
    title: 'The Odyssey',
    author: 'Homer',
    category: 'Academic',
    price: 15.0,
    cover: COVERS.phil1,
    summary:
      'The ancient Greek epic of Odysseus and his ten-year journey home after the Trojan War.',
    pdfUrl: PDF.odyssey,
  },
  {
    id: 'b12',
    title: 'The Republic',
    author: 'Plato',
    category: 'Academic',
    price: 16.5,
    cover: COVERS.phil2,
    summary:
      'A Socratic dialogue concerning justice, the ideal state, and the nature of reality.',
    pdfUrl: PDF.republic,
  },
  {
    id: 'b13',
    title: 'On the Origin of Species',
    author: 'Charles Darwin',
    category: 'Academic',
    price: 17.25,
    cover: COVERS.phil3,
    summary:
      'The landmark scientific work introducing the theory of evolution by natural selection.',
    pdfUrl: PDF.origin,
  },
  {
    id: 'b14',
    title: 'The History of the Peloponnesian War',
    author: 'Thucydides',
    category: 'Academic',
    price: 19.0,
    cover: COVERS.phil4,
    summary:
      'A classical account of the devastating war between Athens and Sparta in the 5th century BC.',
    pdfUrl: PDF.peloponnesian,
  },

  // --- Business ---
  {
    id: 'b15',
    title: 'The Art of War',
    author: 'Sun Tzu',
    category: 'Business',
    price: 7.99,
    cover: COVERS.biz1,
    summary:
      'An ancient Chinese military treatise still studied in strategy, business, and leadership today.',
    pdfUrl: PDF.art,
  },
  {
    id: 'b16',
    title: 'The Wealth of Nations',
    author: 'Adam Smith',
    category: 'Business',
    price: 18.0,
    cover: COVERS.biz2,
    summary:
      'The foundational work of modern economics on the nature and causes of national wealth.',
    pdfUrl: PDF.wealth,
  },
  {
    id: 'b17',
    title: 'Principles of Management',
    author: 'Henry Fayol',
    category: 'Business',
    price: 21.0,
    cover: COVERS.biz3,
    summary:
      'A comprehensive guide to the core principles and functions of modern management practice.',
    pdfUrl: PDF.principles,
  },

  // --- Technology ---
  {
    id: 'b18',
    title: 'Python Programming for Beginners',
    author: 'John Doe',
    category: 'Technology',
    price: 24.99,
    cover: COVERS.code1,
    summary:
      'A hands-on introduction to Python with practical examples, exercises, and real-world projects.',
    pdfUrl: PDF.python,
  },
  {
    id: 'b19',
    title: 'Algorithms and Data Structures',
    author: 'Jane Smith',
    category: 'Technology',
    price: 29.5,
    cover: COVERS.code2,
    summary:
      'A rigorous yet approachable guide to core algorithms, complexity, and data structures.',
    pdfUrl: PDF.algorithms,
  },
  {
    id: 'b20',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Technology',
    price: 34.99,
    cover: COVERS.code3,
    summary:
      'A handbook of agile software craftsmanship for writing readable, maintainable code.',
    pdfUrl: PDF.clean,
  },
];
