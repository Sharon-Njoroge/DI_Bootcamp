import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit';

// 1. Define Initial State with Mock Data
const initialState = {
  books: [
    { id: 1, title: "The Shining", author: "Stephen King", genre: "Horror" },
    { id: 2, title: "Dracula", author: "Bram Stoker", genre: "Horror" },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
    { id: 4, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy" },
    { id: 5, title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
    { id: 6, title: "Neuromancer", author: "William Gibson", genre: "Science Fiction" },
  ],
  selectedGenre: "All" // Tracks the UI filter state
};

// 2. Create Slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setGenreFilter: (state, action) => {
      state.selectedGenre = action.payload;
    }
  }
});

export const { setGenreFilter } = inventorySlice.actions;

// 3. Configure Store
export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer
  }
});

// ==========================================
// SELECTORS (Performance Optimization Layer)
// ==========================================

// Base selector to grab the raw slices of state
export const selectBooks = (state) => state.inventory.books;
export const selectCurrentGenre = (state) => state.inventory.selectedGenre;

// Memoized selector for Horror books
export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Horror')
);

// Memoized selector for Fantasy books
export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Fantasy')
);

// Memoized selector for Science Fiction books
export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Science Fiction')
);

// Dynamic Master Selector: Combines current selection and books list efficiently
export const selectFilteredBooks = createSelector(
  [selectBooks, selectCurrentGenre],
  (books, currentGenre) => {
    if (currentGenre === 'All') return books;
    return books.filter(book => book.genre === currentGenre);
  }
);