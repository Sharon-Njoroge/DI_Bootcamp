import React from 'react';
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// ==========================================
// 1. REDUX ASYNC THUNKS (Middleware)
// ==========================================

// Helper function to simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ageUpAsync = createAsyncThunk(
  'age/ageUpAsync',
  async (amount) => {
    await delay(1000); // 1-second delay
    return amount;
  }
);

export const ageDownAsync = createAsyncThunk(
  'age/ageDownAsync',
  async (amount) => {
    await delay(1000); // 1-second delay
    return amount;
  }
);

// ==========================================
// 2. REDUX SLICE & REDUCER
// ==========================================
const ageSlice = createSlice({
  name: 'age',
  initialState: {
    value: 20,
    loading: false,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // Age Up Lifecycle
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.value += action.payload;
      })
      // Age Down Lifecycle
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.value -= action.payload;
      });
  },
});

// ==========================================
// 3. REDUX STORE CONFIGURATION
// ==========================================
const store = configureStore({
  reducer: {
    age: ageSlice.reducer,
  },
});

// ==========================================
// 4. REACT COMPONENTS
// ==========================================

function AgeDisplay() {
  const { value, loading } = useSelector((state) => state.age);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h2>Current Age: {value}</h2>
      
      {loading && (
        <div style={spinnerContainerStyle}>
          <div style={spinnerStyle} />
          <p style={{ margin: 0, color: '#3498db', fontWeight: 'bold' }}>Updating age...</p>
        </div>
      )}

      {/* Embedded keyframe animation for the spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function AgeControls() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.age.loading);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh on form submit
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
      <button 
        type="button"
        onClick={() => dispatch(ageUpAsync(1))} 
        disabled={loading}
        style={{ ...buttonStyle, backgroundColor: loading ? '#bdc3c7' : '#2ecc71' }}
      >
        Age Up
      </button>
      
      <button 
        type="button"
        onClick={() => dispatch(ageDownAsync(1))} 
        disabled={loading}
        style={{ ...buttonStyle, backgroundColor: loading ? '#bdc3c7' : '#e74c3c' }}
      >
        Age Down
      </button>
    </form>
  );
}

// ==========================================
// 5. MAIN APP COMPONENT & PROVIDER WRAPPER
// ==========================================
function AppContent() {
  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', margin: '0 0 10px 0' }}>Age Tracker</h1>
      <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '14px' }}>Redux Toolkit + Thunk Challenge</p>
      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
      <AgeDisplay />
      <AgeControls />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

// ==========================================
// 6. INLINE UI STYLES
// ==========================================
const containerStyle = {
  maxWidth: '400px',
  margin: '100px auto',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const buttonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  transition: 'background-color 0.2s ease',
};

const spinnerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  marginTop: '15px',
};

const spinnerStyle = {
  display: 'inline-block',
  width: '20px',
  height: '20px',
  border: '3px solid rgba(0,0,0,0.1)',
  borderRadius: '50%',
  borderTopColor: '#3498db',
  animation: 'spin 0.8s linear infinite',
};