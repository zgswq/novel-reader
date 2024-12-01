import { create } from 'zustand';
import { Book } from '../types';
import { mockBooks } from '../mock/books';

interface BookStore {
  books: Book[];
  currentBook: Book | null;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  setCurrentBook: (book: Book | null) => void;
  updateReadingPosition: (id: string, position: number) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: mockBooks,
  currentBook: null,
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  removeBook: (id) => set((state) => ({
    books: state.books.filter((book) => book.id !== id),
    currentBook: state.currentBook?.id === id ? null : state.currentBook,
  })),
  setCurrentBook: (book) => set({ currentBook: book }),
  updateReadingPosition: (id, position) => set((state) => ({
    books: state.books.map((book) =>
      book.id === id ? { ...book, lastReadPosition: position } : book
    ),
    currentBook: state.currentBook?.id === id
      ? { ...state.currentBook, lastReadPosition: position }
      : state.currentBook,
  })),
}));