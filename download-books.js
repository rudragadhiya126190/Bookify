import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const books = [
  { name: 'alice', pdf: 'https://www.gutenberg.org/ebooks/28885.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12794270-L.jpg' },
  { name: 'franken', pdf: 'https://www.gutenberg.org/ebooks/84.pdf.images', cover: 'https://covers.openlibrary.org/b/id/11293375-L.jpg' },
  { name: 'sherlock', pdf: 'https://www.gutenberg.org/ebooks/1661.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12626563-L.jpg' },
  { name: 'dracula', pdf: 'https://www.gutenberg.org/ebooks/345.pdf.images', cover: 'https://covers.openlibrary.org/b/id/10352621-L.jpg' },
  { name: 'time', pdf: 'https://www.gutenberg.org/ebooks/35.pdf.images', cover: 'https://covers.openlibrary.org/b/id/10996866-L.jpg' },
  { name: 'moby', pdf: 'https://www.gutenberg.org/ebooks/2701.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12718240-L.jpg' },
  { name: 'pride', pdf: 'https://www.gutenberg.org/ebooks/1342.pdf.images', cover: 'https://covers.openlibrary.org/b/id/10346119-L.jpg' },
  { name: 'treasure', pdf: 'https://www.gutenberg.org/ebooks/120.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12718339-L.jpg' },
  { name: 'jekyll', pdf: 'https://www.gutenberg.org/ebooks/43.pdf.images', cover: 'https://covers.openlibrary.org/b/id/11292644-L.jpg' },
  { name: 'great', pdf: 'https://www.gutenberg.org/ebooks/1400.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12718321-L.jpg' },
  { name: 'odyssey', pdf: 'https://www.gutenberg.org/ebooks/1727.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12842208-L.jpg' },
  { name: 'republic', pdf: 'https://www.gutenberg.org/ebooks/1497.pdf.images', cover: 'https://covers.openlibrary.org/b/id/10521177-L.jpg' },
  { name: 'origin', pdf: 'https://www.gutenberg.org/ebooks/1227.pdf.images', cover: 'https://covers.openlibrary.org/b/id/10138141-L.jpg' },
  { name: 'peloponnesian', pdf: 'https://www.gutenberg.org/ebooks/7142.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12531543-L.jpg' },
  { name: 'art', pdf: 'https://www.gutenberg.org/ebooks/132.pdf.images', cover: 'https://covers.openlibrary.org/b/id/12531548-L.jpg' },
  { name: 'wealth', pdf: 'https://www.gutenberg.org/ebooks/3300.pdf.images', cover: 'https://covers.openlibrary.org/b/id/10198220-L.jpg' },
  { name: 'principles', pdf: 'https://www.gutenberg.org/ebooks/30107.pdf.images', cover: 'https://covers.openlibrary.org/b/id/10295128-L.jpg' }
];

const pdfDir = path.join(__dirname, 'public', 'pdfs');
const coverDir = path.join(__dirname, 'public', 'covers');

if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
if (!fs.existsSync(coverDir)) fs.mkdirSync(coverDir, { recursive: true });

async function downloadAll() {
  for (const book of books) {
    try {
      // Download PDF
      const pdfRes = await fetch(book.pdf);
      if (pdfRes.ok) {
        const buffer = Buffer.from(await pdfRes.arrayBuffer());
        fs.writeFileSync(path.join(pdfDir, `${book.name}.pdf`), buffer);
        console.log(`Saved PDF: ${book.name}.pdf`);
      }

      // Download Cover
      const coverRes = await fetch(book.cover);
      if (coverRes.ok) {
        const buffer = Buffer.from(await coverRes.arrayBuffer());
        fs.writeFileSync(path.join(coverDir, `${book.name}.jpg`), buffer);
        console.log(`Saved Cover: ${book.name}.jpg`);
      }
    } catch (err) {
      console.error(`Error with ${book.name}: ${err.message}`);
    }
  }
  console.log('🎉 All books and covers downloaded successfully!');
}

downloadAll();