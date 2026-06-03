import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// ==========================================
// 1 & 2. REDUX STORE, SLICE, & ACTIONS
// ==========================================

const initialState = {
  // Tasks are structured by date keys: { "2026-06-03": [...] }
  tasksByDate: {},
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { date, text } = action.payload;
      if (!state.tasksByDate[date]) {
        state.tasksByDate[date] = [];
      }
      state.tasksByDate[date].push({
        id: Date.now().toString(),
        text,
      });
    },
    editTask: (state, action) => {
      const { date, id, newText } = action.payload;
      const tasks = state.tasksByDate[date];
      if (tasks) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
          task.text = newText;
        }
      }
    },
    deleteTask: (state, action) => {
      const { date, id } = action.payload;
      if (state.tasksByDate[date]) {
        state.tasksByDate[date] = state.tasksByDate[date].filter((t) => t.id !== id);
      }
    },
  },
});

const { addTask, editTask, deleteTask } = plannerSlice.actions;

const store = configureStore({
  reducer: {
    planner: plannerSlice.reducer,
  },
});

// ==========================================
// 3. CALENDAR / DATE PICKER COMPONENT
// ==========================================

const Calendar = ({ selectedDate, onDateChange }) => {
  return (
    <div style={styles.calendarContainer}>
      <label htmlFor="date-picker" style={styles.label}>Select Date: </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        style={styles.dateInput}
      />
    </div>
  );
};

// ==========================================
// 4. TASK LIST & MANAGEMENT COMPONENT
// ==========================================

const TaskList = ({ selectedDate }) => {
  const dispatch = useDispatch();
  
  // Access tasks for the specific day from Redux store
  const tasks = useSelector((state) => state.planner.tasksByDate[selectedDate] || []);

  // Local UI management states
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Handle Add Task Action
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    dispatch(addTask({ date: selectedDate, text: newTaskText }));
    setNewTaskText('');
  };

  // Handle Init Edit Mode
  const startEdit = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  // Handle Edit Action Save
  const handleSaveEdit = (id) => {
    if (!editingText.trim()) return;
    dispatch(editTask({ date: selectedDate, id, newText: editingText }));
    setEditingTaskId(null);
  };

  // Handle Delete Action
  const handleDeleteTask = (id) => {
    dispatch(deleteTask({ date: selectedDate, id }));
  };

  return (
    <div style={styles.taskWrapper}>
      <h3 style={styles.header}>Tasks for {selectedDate}</h3>

      {/* Add Task Sub-Component */}
      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          style={styles.taskInput}
        />
        <button type="submit" style={styles.addButton}>Add Task</button>
      </form>

      {/* Task List Display & Controls */}
      {tasks.length === 0 ? (
        <p style={styles.noTasks}>No tasks planned for this day.</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.listItem}>
              {editingTaskId === task.id ? (
                <div style={styles.editContainer}>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={styles.editInput}
                  />
                  <button onClick={() => handleSaveEdit(task.id)} style={styles.saveButton}>Save</button>
                  <button onClick={() => setEditingTaskId(null)} style={styles.cancelButton}>Cancel</button>
                </div>
              ) : (
                <div style={styles.taskContainer}>
                  <span style={styles.taskText}>{task.text}</span>
                  <div>
                    <button onClick={() => startEdit(task.id, task.text)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteButton}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ==========================================
// 5 & 6. MAIN APPLICATION INTEGRATION
// ==========================================

function DailyPlannerApp() {
  // Sets default state to today's date formatted as YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.mainTitle}>Daily Planner</h1>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <TaskList selectedDate={selectedDate} />
    </div>
  );
}

// Wrapper component to provide Redux context to the application
export default function App() {
  return (
    <Provider store={store}>
      <DailyPlannerApp />
    </Provider>
  );
}

// ==========================================
// INLINE STYLES (CLEAN & SCANNABLE)
// ==========================================

const styles = {
  appContainer: { maxWidth: '600px', margin: '50px auto', padding: '0 20px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  mainTitle: { textAlign: 'center', color: '#2c3e50', marginBottom: '30px' },
  calendarContainer: { marginBottom: '25px', textAlign: 'center', background: '#ecf0f1', padding: '15px', borderRadius: '8px' },
  label: { fontSize: '1.1rem', fontWeight: '600', marginRight: '10px', color: '#34495e' },
  dateInput: { padding: '8px 12px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #bdc3c7', cursor: 'pointer' },
  taskWrapper: { background: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' },
  header: { marginTop: 0, color: '#2c3e50', borderBottom: '2px solid #edf2f7', paddingBottom: '10px' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  taskInput: { flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' },
  addButton: { background: '#2ecc71', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  noTasks: { color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', margin: '20px 0' },
  list: { listStyleType: 'none', padding: 0, margin: 0 },
  listItem: { background: '#f8fafc', padding: '12px 15px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' },
  taskContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  taskText: { fontSize: '1rem', color: '#334155' },
  editContainer: { display: 'flex', gap: '8px', width: '100%' },
  editInput: { flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' },
  editButton: { background: '#3498db', color: '#fff', border: 'none', marginRight: '5px', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  saveButton: { background: '#2ecc71', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  cancelButton: { background: '#95a5a6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  deleteButton: { background: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }
};