const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated Database
let posts = [
    { id: 1, title: 'First Post', content: 'Hello World!' },
    { id: 2, title: 'Express Tips', content: 'Use middleware for cleaner code.' }
];

// GET /posts: Return all posts
app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

// GET /posts/:id: Return specific post
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.status(200).json(post);
});

// POST /posts: Create a new post
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT /posts/:id: Update an existing post
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.status(200).json(post);
});

// DELETE /posts/:id: Delete a post
app.delete('/posts/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Post not found');

    const deletedPost = posts.splice(index, 1);
    res.status(200).json(deletedPost);
});

// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => {
    console.log(`Blog API running on http://localhost:${PORT}`);
});