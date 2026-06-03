import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// ============================================================================
// STEP 1: Create a Redux Toolkit Slice
// ============================================================================
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [
      { id: 1, text: 'Learn Redux Toolkit', completed: false },
      { id: 2, text: 'Build a Todo App', completed: false }
    ]
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(), // Unique ID using timestamp
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

// Export actions for components to use
const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

// ============================================================================
// STEP 2: Implement Redux Store
// ============================================================================
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});

// ============================================================================
// STEP 3 & 4: Create React Components & Connect via Hooks
// ============================================================================

// 1. AddTodo Component
function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '8px', marginRight: '8px', width: '250px' }}
      />
      <button type="submit" style={{ padding: '8px 12px', cursor: 'pointer' }}>
        Add Todo
      </button>
    </form>
  );
}

// 2. TodoItem Component
function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '8px',
      borderBottom: '1px solid #eee',
      width: '350px'
    }}>
      <span 
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none', 
          color: todo.completed ? '#888' : '#000',
          cursor: 'pointer',
          flexGrow: 1
        }}
      >
        {todo.text}
      </span>
      <button 
        onClick={() => dispatch(removeTodo(todo.id))}
        style={{ 
          backgroundColor: '#ff4d4d', 
          color: 'white', 
          border: 'none', 
          padding: '4px 8px', 
          cursor: 'pointer' 
        }}
      >
        Delete
      </button>
    </li>
  );
}

// 3. TodoList Component
function TodoList() {
  const todos = useSelector((state) => state.todos.items);

  return (
    <div>
      <h3>Your Tasks</h3>
      {todos.length === 0 ? (
        <p>No tasks left! 🎉</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

// ============================================================================
// STEP 5: Root App Component Wrapping Context Provider
// ============================================================================
export default function ExerciseOneTodoApp() {
  return (
    <Provider store={store}>
      <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Redux Toolkit Todo List</h1>
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  );
}