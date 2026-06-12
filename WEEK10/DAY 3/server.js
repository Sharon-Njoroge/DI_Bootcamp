require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- INITIALIZATION & ENV FALLBACKS ---
const app = express();
const PORT = process.env.PORT || 3000;

// Fallback secrets if .env file isn't explicitly configured yet
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'fallback_access_secret_key_2026';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_secret_key_2026';

// Parsing Engine Middleware
app.use(express.json());
app.use(cookieParser());

// --- IN-MEMORY DATA STORAGE ---
const users = []; 
let activeRefreshTokens = []; // Track active refresh sessions for invalidation

// Security configuration flags for HTTP-Only cookies
const COOKIE_OPTIONS = {
    httpOnly: true,    // Blocks malicious client-side JavaScript execution (XSS defense)
    secure: false,     // Flip to true in live production environments serving over HTTPS
    sameSite: 'strict' // Direct shield blocking CSRF cross-origin state changes
};

// --- AUTHENTICATION INTERCEPTOR MIDDLEWARE ---
function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: Missing Access Token' });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid or Expired Token' });
        }
        req.user = decodedUser;
        next();
    });
}

// --- BACKEND API ENDPOINTS ---

// 1. Account Creation
app.post('/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const userExists = users.find(u => u.username === username);
        if (userExists) {
            return res.status(400).json({ message: 'Username is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ id: Date.now().toString(), username, password: hashedPassword });

        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error processing registration.' });
    }
});

// 2. Authentication Login (Issues Dual Cookies)
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Access Token: Lifespan short (15 mins)
        const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        // Refresh Token: Lifespan long (7 days)
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        activeRefreshTokens.push(refreshToken);

        res.cookie('accessToken', accessToken, { ...COOKIE_OPTIONS, maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.json({ message: 'Authentication successful!', username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error processing login.' });
    }
});

// 3. Silent Access Token Rotation via Refresh Token
app.post('/auth/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken || !activeRefreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Refresh Token Missing or Revoked' });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Refresh Token verification signature.' });

        const newAccessToken = jwt.sign({ userId: decoded.userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        res.cookie('accessToken', newAccessToken, { ...COOKIE_OPTIONS, maxAge: 15 * 60 * 1000 });
        res.json({ message: 'Access token rotated successfully!' });
    });
});

// 4. Session Revocation (Logout)
app.post('/auth/logout', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    activeRefreshTokens = activeRefreshTokens.filter(token => token !== refreshToken);

    res.clearCookie('accessToken', COOKIE_OPTIONS);
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    res.json({ message: 'Logged out cleanly. Cookies dropped.' });
});

// 5. Data Access Safeguarded Route
app.get('/api/dashboard', authenticateToken, (req, res) => {
    res.json({ 
        message: 'Access Granted: Hello from the protected data payload server.',
        authenticatedUserId: req.user.userId 
    });
});

// --- FRONTEND MONOLITH INTERFACE ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Monolithic JWT Testing Studio</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
        <div class="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
            <div>
                <h1 class="text-2xl font-bold text-emerald-400 mb-2">JWT Monolith Panel</h1>
                <p class="text-xs text-slate-400 mb-6">Node.js Single-File Architecture</p>
                
                <div class="space-y-4 mb-6">
                    <div>
                        <label class="block text-xs font-medium text-slate-400 mb-1">Username</label>
                        <input id="username" type="text" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-400 mb-1">Password</label>
                        <input id="password" type="password" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm">
                    </div>
                    <div class="flex gap-3">
                        <button onclick="handleAuth('/auth/register')" class="flex-1 bg-slate-700 hover:bg-slate-600 font-medium py-2 rounded-lg text-sm transition-colors">Register User</button>
                        <button onclick="handleAuth('/auth/login')" class="flex-1 bg-emerald-600 hover:bg-emerald-500 font-medium py-2 rounded-lg text-sm transition-colors">Login User</button>
                    </div>
                </div>

                <hr class="border-slate-700 my-6">

                <div class="space-y-3">
                    <h3 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">Endpoint Control Actions</h3>
                    <button onclick="fetchProtectedData()" class="w-full bg-blue-600 hover:bg-blue-500 font-medium py-2 rounded-lg text-sm transition-colors">Request Protected Data (/api/dashboard)</button>
                    <div class="flex gap-3">
                        <button onclick="refreshTokens()" class="flex-1 bg-amber-600 hover:bg-amber-500 text-xs font-medium py-2 rounded-lg transition-colors">Trigger Rotation</button>
                        <button onclick="logout()" class="flex-1 bg-rose-600 hover:bg-rose-500 text-xs font-medium py-2 rounded-lg transition-colors">Invalidate Session</button>
                    </div>
                </div>
            </div>

            <div class="flex flex-col h-full min-h-[350px]">
                <h2 class="text-sm font-semibold mb-2 text-slate-300 flex justify-between items-center">
                    <span>Console Activity Monitoring System</span>
                    <button onclick="document.getElementById('consoleLog').innerText = 'Awaiting interaction...'" class="text-[10px] text-slate-500 hover:text-slate-400 uppercase tracking-widest">Clear Logs</button>
                </h2>
                <div id="consoleLog" class="flex-1 font-mono text-[11px] bg-slate-950 p-4 rounded-xl border border-slate-700 overflow-y-auto text-emerald-400 whitespace-pre-wrap">Awaiting interaction...</div>
            </div>
        </div>

        <script>
            const logBox = document.getElementById('consoleLog');

            function printLog(title, status, data) {
                const time = new Date().toLocaleTimeString();
                const color = status >= 400 ? '🔴' : (status >= 300 ? '🟡' : '🟢');
                logBox.innerText += \`\\n\\n[\${time}] \${color} \${title} (Status: \${status})\\n\${JSON.stringify(data, null, 2)}\`;
                logBox.scrollTop = logBox.scrollHeight;
            }

            async function handleAuth(url) {
                const u = document.getElementById('username').value;
                const p = document.getElementById('password').value;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: u, password: p })
                });
                printLog('POST ' + url, res.status, await res.json());
            }

            async function fetchProtectedData() {
                const res = await fetch('/api/dashboard');
                printLog('GET /api/dashboard', res.status, await res.json());
            }

            async function refreshTokens() {
                const res = await fetch('/auth/refresh', { method: 'POST' });
                printLog('POST /auth/refresh', res.status, await res.json());
            }

            async function logout() {
                const res = await fetch('/auth/logout', { method: 'POST' });
                printLog('POST /auth/logout', res.status, await res.json());
            }
        </script>
    </body>
    </html>
    `);
});

// --- LIFECYCLE INITIALIZER ---
app.listen(PORT, () => {
    console.log('================================================================');
    console.log(`🚀 Monolithic Secure Server running at: http://localhost:${PORT}`);
    console.log('================================================================');
});
