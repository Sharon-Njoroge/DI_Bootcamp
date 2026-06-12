// ==========================================
// 1. SHARED TYPE CONTRACTS (types/index.ts)
// ==========================================

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

export interface Contributor {
  id: number;
  story_id: number;
  user_id: number;
}


// ==========================================
// 2. DATABASE SCHEMA (PostgreSQL Migration)
// ==========================================
/*
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE Stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Contributors (
    id SERIAL PRIMARY KEY,
    story_id INT REFERENCES Stories(id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    UNIQUE(story_id, user_id)
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_story_modtime
    BEFORE UPDATE ON Stories
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
*/


// ==========================================
// 3. BACKEND BASE (backend/src/config/db.ts)
// ==========================================

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});


// ==========================================
// 4. SECURITY & AUTH MIDDLEWARE (backend/src/middleware/auth.ts)
// ==========================================

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Token Required' });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or Expired Token' });
    req.user = user as { userId: number };
    next();
  });
};

export const authorizeStoryAuthor = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  try {
    const result = await pool.query('SELECT author_id FROM stories WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Story not found' });
    
    if (result.rows[0].author_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized: You are not the author' });
    }
    next();
  } catch (error) {
    next(error);
  }
};


// ==========================================
// 5. EXPRESS ROUTING ENGINE (backend/src/index.ts)
// ==========================================

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// --- Authentication Framework ---
app.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'All fields required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );
    
    const user = result.rows[0];
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    return res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
});

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    return res.json({ accessToken, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    next(err);
  }
});

app.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET!, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    res.json({ accessToken });
  });
});

// --- Core Stories Features ---
app.get('/stories', authenticateToken, async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM stories ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/stories', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  const { title, content } = req.body;
  const authorId = req.user?.userId;
  try {
    const result = await pool.query(
      'INSERT INTO stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, authorId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.patch('/stories/:id', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user?.userId;

  try {
    // Permission Verification Layer: Author or Registered Contributor
    const accessCheck = await pool.query(
      `SELECT author_id FROM stories WHERE id = $1 
       UNION 
       SELECT user_id FROM contributors WHERE story_id = $1 AND user_id = $2`, 
      [id, userId]
    );

    if (accessCheck.rows.length === 0) {
      return res.status(403).json({ message: 'You structural write access rights here' });
    }

    const result = await pool.query(
      'UPDATE stories SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/stories/:id', authenticateToken, authorizeStoryAuthor, async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM stories WHERE id = $1', [id]);
    res.json({ message: 'Story successfully expunged' });
  } catch (err) {
    next(err);
  }
});

// --- Central Exception Safety Net ---
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal safe execution exception materialized' });
});


// ==========================================
// 6. REDUX STATE MANAGEMENT (frontend/src/features/slices)
// ==========================================

import { createSlice, createAsyncThunk, configureStore } from '@reduxModule/toolkit';

let inMemoryToken = '';
export const getInMemoryToken = () => inMemoryToken;
export const setInMemoryToken = (token: string) => { inMemoryToken = token; };

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialAuthState: AuthState = { user: null, status: 'idle' };

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials: Record<string, string>) => {
  const response = await fetch(`${process.env.VITE_API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login operational failure');
  setInMemoryToken(data.accessToken);
  return data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      setInMemoryToken('');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      });
  }
});

// --- Unified Store Configuration ---
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// ==========================================
// 7. SECURE API CLIENT PIPELINE (frontend/src/app/api.ts)
// ==========================================

export const secureFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${getInMemoryToken()}`);
  headers.set('Content-Type', 'application/json');
  
  options.credentials = 'include';
  options.headers = headers;

  let response = await fetch(url, options);

  if (response.status === 401) {
    // Attempting Silent Refresh Rotation
    const refreshResponse = await fetch(`${process.env.VITE_API_BASE_URL}/refresh-token`, { 
      method: 'POST', 
      credentials: 'include' 
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      setInMemoryToken(data.accessToken);
      
      headers.set('Authorization', `Bearer ${data.accessToken}`);
      response = await fetch(url, options);
    } else {
      store.dispatch(authSlice.actions.logout());
      window.location.href = '/login';
    }
  }

  return response;
};