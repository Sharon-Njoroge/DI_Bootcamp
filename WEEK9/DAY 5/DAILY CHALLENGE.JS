import React, { useCallback } from 'react';
import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// ==========================================
// 1. INITIAL STATES & REDUX SETUP
// ==========================================

const initialTaskState = {
  tasks: [
    { id: '1', title: 'Buy groceries', categoryId: 'cat1', completed: false },
    { id: '2', title: 'Finish Redux lab', categoryId: 'cat2', completed: true },
  ],
};

const initialCategoryState = {
  categories: [
    { id: 'cat1', name: 'Personal' },
    { id: 'cat2', name: 'Work' },
  ],
  selectedCategoryId: 'cat1',
};

// Tasks Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialTaskState,
  reducers: {
    addTask: (state, action) => {
      // Expects payload: { id, title, categoryId }
      state.tasks.push({ ...action.payload, completed: false });
    },
    editTask: (state, action) => {
      // Expects payload: { id, title }
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) task.title = action.payload.title;
    },
    deleteTask: (state, action) => {
      // Expects payload: id (string)
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleTaskProgress: (state, action) => {
      // Expects payload: id (string)
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

// Categories Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: initialCategoryState,
  reducers: {
    addCategory: (state, action) => {
      // Expects payload: { id, name }
      state.categories.push(action.payload);
    },
    editCategory: (state, action) => {
      // Expects payload: { id, name }
      const cat = state.categories.find(c => c.id === action.payload.id);
      if (cat) cat.name = action.payload.name;
    },
    deleteCategory: (state, action) => {
      // Expects payload: id (string)
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
    selectCategory: (state, action) => {
      // Expects payload: id (string or null)
      state.selectedCategoryId = action.payload;
    },
  },
});

// Export Actions
export const { addTask, editTask, deleteTask, toggleTaskProgress } = taskSlice.actions;
export const { addCategory, editCategory, deleteCategory, selectCategory } = categorySlice.actions;

// Configure Global Store
export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    categories: categorySlice.reducer,
  },
});

// ==========================================
// 2. MEMOIZED SELECTORS (PERFORMANCE)
// ==========================================

const selectAllTasks = (state) => state.tasks.tasks;
const selectAllCategories = (state) => state.categories.categories;
export const selectCurrentCategoryId = (state) => state.categories.selectedCategoryId;

// Returns tasks belonging to a specific selected category
export const selectTasksByCategory = createSelector(
  [selectAllTasks, selectCurrentCategoryId],
  (tasks, selectedCategoryId) => {
    if (!selectedCategoryId) return tasks;
    return tasks.filter(task => task.categoryId === selectedCategoryId);
  }
);

// Computes the count of completed tasks
export const selectCompletedTasksCount = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(task => task.completed).length
);

// Returns category details based on a dynamic ID
export const selectCategoryById = (categoryId) => 
  createSelector(
    [selectAllCategories],
    (categories) => categories.find(cat => cat.id === categoryId)
  );

// ==========================================
// 3. COMPONENTS & PERFORMANCE OPTIMIZATIONS
// ==========================================

// CategorySelector Component
export const CategorySelector = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const currentId = useSelector(selectCurrentCategoryId);

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ fontWeight: 'bold' }}>Filter by Category: </label>
      <select 
        value={currentId || ''} 
        onChange={(e) => dispatch(selectCategory(e.target.value || null))}
      >
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
};

// Memoized Child Component to prevent domino-effect re-renders
const TaskItem = React.memo(({ task, onToggle, onEdit, onDelete }) => {
  const handleEdit = () => {
    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle && newTitle.trim() !== '') {
      onEdit(task.id, newTitle);
    }
  };

  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: '10px 0' }}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      <span style={{ margin: '0 12px', color: task.completed ? '#888' : '#000' }}>
        {task.title}
      </span>
      <button onClick={handleEdit} style={{ marginRight: '5px' }}>Edit</button>
      <button onClick={() => onDelete(task.id)} style={{ color: 'red' }}>Delete</button>
    </li>
  );
});

TaskItem.displayName = 'TaskItem';

// Main TaskList Component
export const TaskList = () => {
  const dispatch = useDispatch();
  
  // Dynamic performance optimization via memoized state calculation
  const filteredTasks = useSelector(selectTasksByCategory);
  const completedCount = useSelector(selectCompletedTasksCount);

  // Cache function references to preserve React.memo on child components
  const handleToggle = useCallback((id) => {
    dispatch(toggleTaskProgress(id));
  }, [dispatch]);

  const handleEdit = useCallback((id, title) => {
    dispatch(editTask({ id, title }));
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  return (
    <div>
      <h3>Completed Tasks Tracker: <span style={{ color: 'green' }}>{completedCount}</span></h3>
      {filteredTasks.length === 0 ? (
        <p>No tasks found for this category.</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={handleToggle} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};