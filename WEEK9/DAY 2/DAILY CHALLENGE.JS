import React, { useState, useEffect } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// ==========================================
// 1. REDUX SLICE & STORE CONFIGURATION
// ==========================================

const getTodayStr = () => new Date().toISOString().split('T')[0];

const initialState = {
  selectedDate: getTodayStr(),
  // O(1) state structure using YYYY-MM-DD keys for fast indexed lookups
  tasksByDay: JSON.parse(localStorage.getItem('planner_tasks')) || {}, 
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addTask: (state, action) => {
      const { date, title, description } = action.payload;
      if (!state.tasksByDay[date]) {
        state.tasksByDay[date] = [];
      }
      state.tasksByDay[date].push({
        id: crypto.randomUUID(),
        title,
        description,
        completed: false,
      });
      localStorage.setItem('planner_tasks', JSON.stringify(state.tasksByDay));
    },
    editTask: (state, action) => {
      const { date, id, updatedData } = action.payload;
      const dayTasks = state.tasksByDay[date];
      if (dayTasks) {
        const taskIndex = dayTasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          dayTasks[taskIndex] = { ...dayTasks[taskIndex], ...updatedData };
        }
      }
      localStorage.setItem('planner_tasks', JSON.stringify(state.tasksByDay));
    },
    deleteTask: (state, action) => {
      const { date, id } = action.payload;
      if (state.tasksByDay[date]) {
        state.tasksByDay[date] = state.tasksByDay[date].filter(task => task.id !== id);
        if (state.tasksByDay[date].length === 0) {
          delete state.tasksByDay[date];
        }
      }
      localStorage.setItem('planner_tasks', JSON.stringify(state.tasksByDay));
    },
  },
});

const { setSelectedDate, addTask, editTask, deleteTask } = plannerSlice.actions;

const store = configureStore({
  reducer: {
    planner: plannerSlice.reducer,
  },
});

// ==========================================
// 2. COMPONENT: TASK CONFIGURATION MODAL
// ==========================================

function TaskFormModal({ isOpen, onClose, taskToEdit }) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data Validation
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    if (taskToEdit) {
      dispatch(editTask({
        date: selectedDate,
        id: taskToEdit.id,
        updatedData: { title: title.trim(), description: description.trim() }
      }));
    } else {
      dispatch(addTask({
        date: selectedDate,
        title: title.trim(),
        description: description.trim()
      }));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={{ marginTop: 0 }}>{taskToEdit ? '✏️ Edit Task' : '➕ Add New Task'}</h3>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.errorText}>{error}</p>}
          <div style={{ marginBottom: '12px' }}>
            <label style={styles.label}>Title *</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              style={styles.input}
              placeholder="What needs to be done?"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={styles.label}>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              style={{ ...styles.input, height: '70px', resize: 'vertical' }} 
              placeholder="Add extra context (optional)"
            />
          </div>
          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 3. COMPONENT: CALENDAR DATE PICKER
// ==========================================

function Calendar() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dispatch = useDispatch();

  return (
    <div style={styles.calendarContainer}>
      <label htmlFor="date-picker" style={styles.calendarLabel}>
        Select Target Date:
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => dispatch(setSelectedDate(e.target.value))}
        style={styles.dateInput}
      />
    </div>
  );
}

// ==========================================
// 4. COMPONENT: TASK DISPLAY LIST
// ==========================================

function TaskList() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const tasks = useSelector((state) => state.planner.tasksByDay[selectedDate] || []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleToggleComplete = (task) => {
    dispatch(editTask({
      date: selectedDate,
      id: task.id,
      updatedData: { completed: !task.completed }
    }));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to completely remove this task?")) {
      dispatch(deleteTask({ date: selectedDate, id }));
    }
  };

  return (
    <div>
      <div style={styles.headerRow}>
        <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#444' }}>Agenda for {selectedDate}</h2>
        <button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} style={styles.primaryBtn}>
          + New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div style={styles.emptyState}>
          ☕ No tasks scheduled for this day. Enjoy your free time!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.map((task) => (
            <div key={task.id} style={{ ...styles.taskItem, backgroundColor: task.completed ? '#fafafa' : '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggleComplete(task)} 
                  style={styles.checkbox}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: '600', 
                    color: task.completed ? '#888' : '#222',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    wordBreak: 'break-word'
                  }}>
                    {task.title}
                  </div>
                  {task.description && (
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '0.85rem', 
                      color: task.completed ? '#aaa' : '#666',
                      wordBreak: 'break-word'
                    }}>
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginLeft: '10px' }}>
                <button onClick={() => handleEditClick(task)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDeleteClick(task.id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        taskToEdit={editingTask}
      />
    </div>
  );
}

// ==========================================
// 5. CORE WRAPPER & RUNTIME ROOT
// ==========================================

function PlannerApp() {
  return (
    <div style={styles.appWrapper}>
      <div style={styles.container}>
        <h1 style={styles.mainTitle}>📅 Daily Planner</h1>
        <Calendar />
        <TaskList />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PlannerApp />
    </Provider>
  );
}

// ==========================================
// 6. SCALABLE COMPACT UI STYLING
// ==========================================

const styles = {
  appWrapper: {
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    padding: '40px 20px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  container: {
    maxWidth: '550px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
  },
  mainTitle: {
    textAlign: 'center',
    margin: '0 0 20px 0',
    color: '#111',
    fontSize: '1.8rem'
  },
  calendarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '25px',
    border: '1px solid #e9ecef'
  },
  calendarLabel: {
    fontWeight: '600',
    color: '#495057',
    fontSize: '0.9rem'
  },
  dateInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '0.9rem',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  primaryBtn: {
    padding: '8px 14px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#777',
    border: '2px dashed #e9ecef',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    fontStyle: 'italic'
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    transition: 'all 0.2s'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    marginTop: '2px',
    cursor: 'pointer'
  },
  editBtn: {
    padding: '5px 10px',
    backgroundColor: '#f1f3f5',
    color: '#495057',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer'
  },
  deleteBtn: {
    padding: '5px 10px',
    backgroundColor: '#fff5f5',
    color: '#e03131',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(2px)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    fontSize: '0.85rem',
    color: '#495057'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    boxSizing: 'border-box',
    fontSize: '0.9rem'
  },
  errorText: {
    color: '#e03131',
    fontSize: '0.8rem',
    margin: '0 0 12px 0',
    backgroundColor: '#fff5f5',
    padding: '8px',
    borderRadius: '4px'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  cancelBtn: {
    padding: '8px 14px',
    backgroundColor: '#e9ecef',
    color: '#495057',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  saveBtn: {
    padding: '8px 14px',
    backgroundColor: '#2b8a3e',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};