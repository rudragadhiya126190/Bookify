import { useMemo, useState } from 'react';
import type { Book } from '@/data/books';
import { X, ArrowLeft, ExternalLink, BookOpen, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface PdfReaderProps {
  book: Book;
  onClose: () => void;
  onBack: () => void;
}

function generateChapters(book: Book): string[] {
  const intro = `${book.summary}\n\nThis preview contains simulated reading content for "${book.title}" by ${book.author}, presented as a built-in reader so you can experience the book right inside Bookify without leaving the app.`;

  const chapterTitles = [
    'Chapter One — The Beginning',
    'Chapter Two — New Discoveries',
    'Chapter Three — Rising Tensions',
    'Chapter Four — A Turning Point',
    'Chapter Five — Resolution',
  ];

  const bodies = [
    'The morning light crept across the room as the story began to unfold. Every detail felt deliberate, as though the author had painted each word with care. The reader could sense that something important was about to happen.',
    'With each turn of the page, new ideas emerged. The characters grew more vivid, their motivations clearer. A quiet tension built beneath the surface, hinting at conflicts yet to come.',
    'The narrative shifted. What had once seemed simple now revealed layers of complexity. Choices carried weight, and every decision pointed toward a consequence that could not be undone.',
    'A moment of clarity arrived. The threads woven through earlier chapters began to pull together, and the shape of the whole became visible. It was the kind of passage that makes a reader pause and reflect.',
    'The story reached its close, but the impression it left did not. The final lines lingered, inviting the reader to carry the themes forward long after the book was set down.',
  ];

  const chapters = [intro];
  chapterTitles.forEach((title, i) => {
    chapters.push(`${title}\n\n${bodies[i]}`);
  });
  return chapters;
}

export function PdfReader({ book, onClose, onBack }: PdfReaderProps) {
  const chapters = useMemo(() => generateChapters(book), [book]);
  const [page, setPage] = useState(0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="font-semibold text-sm truncate">{book.title}</h1>
            <p className="text-xs text-slate-400 truncate">by {book.author}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-700 transition-colors shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          {/* Open PDF button */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-slate-800">Full PDF Reader</h2>
              <p className="text-sm text-slate-500">
                Open the complete PDF document in a new browser tab for the full
                reading experience.
              </p>
            </div>
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center gap-2 shrink-0"
            >
              <ExternalLink className="w-5 h-5" /> Open PDF Reader in New Tab
            </a>
          </div>

          {/* Built-in reader */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-200 bg-slate-50">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-slate-800">Built-in Reader</h2>
              <span className="ml-auto text-xs text-slate-400">
                Page {page + 1} of {chapters.length}
              </span>
            </div>

            <div className="p-6 sm:p-8 min-h-[320px]">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-[15px]">
                  {chapters[page]}
                </p>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <div className="flex gap-1.5">
                {chapters.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === page ? 'bg-emerald-500' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(chapters.length - 1, p + 1))}
                disabled={page === chapters.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
