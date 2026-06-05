import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import BookList from './BookList';

export default function App() {
  return (
    <Provider store={store}>
      <BookList />
    </Provider>
  );
}