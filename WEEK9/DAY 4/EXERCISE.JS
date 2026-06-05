import React, { useEffect } from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

---

// ==========================================
// 1. REDUX THUNK ACTION CREATOR (Step 3)
// ==========================================
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!response.ok) {
        throw new Error(`User not found (Status: ${response.status})`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ==========================================
// 2. REDUX SLICE DEFINITION (Step 2)
// ==========================================
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

// ==========================================
// 3. STORE CONFIGURATION (Step 1)
// ==========================================
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

---

// ==========================================
// 4. REACT COMPONENT (Steps 4 & 5)
// ==========================================
const UserData = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  // Fetch initial user on mount
  useEffect(() => {
    dispatch(fetchUserData(1));
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>User Profile (Redux Thunk)</h2>
      
      {/* Step 6: Testing States */}
      {loading && (
        <p style={{ textAlign: 'center', color: '#666' }}>🔄 Fetching user data...</p>
      )}
      
      {error && (
        <div style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '12px', borderRadius: '6px', marginBottom: '15px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && !loading && (
        <div style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#0070f3' }}>{data.name}</h3>
          <p style={{ margin: '8px 0' }}><strong>Username:</strong> {data.username}</p>
          <p style={{ margin: '8px 0' }}><strong>Email:</strong> {data.email}</p>
          <p style={{ margin: '8px 0', marginBottom: 0 }}><strong>Company:</strong> {data.company?.name}</p>
        </div>
      )}

      {/* Interactive Testing Buttons */}
      <div style={{ marginTop: '25px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button 
          onClick={() => dispatch(fetchUserData(1))}
          style={{ padding: '10px 16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Fetch Valid User (ID: 1)
        </button>
        
        <button 
          onClick={() => dispatch(fetchUserData(999))}
          style={{ padding: '10px 16px', backgroundColor: '#e00', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Simulate Error (ID: 999)
        </button>
      </div>
    </div>
  );
};

---

// ==========================================
// 5. ROOT APP WITH PROVIDER WRAPPER
// ==========================================
export default function App() {
  return (
    <Provider store={store}>
      <UserData />
    </Provider>
  );
}