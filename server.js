const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Models
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    medications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medication' }],
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: false }
}));

const Medication = mongoose.model('Medication', new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    start_date: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: false }
}));

const Dose = mongoose.model('Dose', new mongoose.Schema({
    scheduled_time: { type: Date, required: true },
    taken_time: { type: Date, required: false },
    medication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true }
}));

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    medications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medication' }]
}));

// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY || 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        req.session.user_id = user._id;
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

app.get('/dashboard', async (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    const user = await User.findById(req.session.user_id).populate('medications');
    res.render('dashboard', { medications: user.medications });
});

app.get('/add_medication', (req, res) => {
    res.render('add_medication');
});

app.post('/add_medication', async (req, res) => {
    const { name, dosage, frequency, start_date } = req.body;
    const medication = new Medication({
        name,
        dosage,
        frequency,
        start_date: new Date(start_date),
        user_id: req.session.user_id
    });
    await medication.save();
    res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
