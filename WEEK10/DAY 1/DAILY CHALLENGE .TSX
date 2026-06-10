import React, { useState } from 'react';

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================
export interface Book {
  id: string;
  title: string;
  author: string;
}

// ==========================================
// 2. GENERIC LIST COMPONENT
// ==========================================
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

export function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  emptyMessage = "No items found." 
}: ListProps<T>) {
  if (items.length === 0) {
    return <p className="text-gray-500 italic text-center my-4">{emptyMessage}</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="p-4 hover:bg-gray-50 transition-colors">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// ==========================================
// 3. MAIN BOOKAPP COMPONENT
// ==========================================
export default function BookApp() {
  // Manage the state of our books array using our Book type
  const [books, setBooks] = useState<Book[]>([
    { id: '1', title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: '2', title: '1984', author: 'George Orwell' },
    { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ]);

  // Form states for tracking inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Handle appending a new book object securely to our state array
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim()) return;

    const newBook: Book = {
      id: crypto.randomUUID(), // Generates a reliable unique ID string
      title: title.trim(),
      author: author.trim(),
    };

    setBooks((prevBooks) => [...prevBooks, newBook]);
    
    // Clear form inputs
    setTitle('');
    setAuthor('');
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-md font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">📚 My Reading List</h1>

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} className="space-y-3 mb-6 bg-white p-4 rounded-lg border border-gray-100">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase">Book Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Dune"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g., Frank Herbert"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          Add Book
        </button>
      </form>

      {/* Rendering our Generic List component tailored for the Book type */}
      <List
        items={books}
        keyExtractor={(book) => book.id}
        emptyMessage="Your reading list is empty. Add a book to get started!"
        renderItem={(book) => (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{book.title}</span>
            <span className="text-sm text-gray-500">by {book.author}</span>
          </div>
        )}
      />
    </div>
  );
}