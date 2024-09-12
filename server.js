const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

const users = []; // In-memory user store

// Register Route
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();
    const port = 5000;

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());

    // Connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/medication-tracker', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Define routes
    app.use('/api/auth', require('./routes/auth'));

    // Start server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

});
