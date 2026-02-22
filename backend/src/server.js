require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Security
// ─────────────────────────────────────────────
app.use(helmet());

// ✅ SIMPLE & SAFE CORS (Fix Network Error)
app.use(cors({
    origin: true,   // allow all origins (safe for now)
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true
}));

// Handle preflight
app.options('*', cors());

// Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Logging (only in dev)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// ─────────────────────────────────────────────
// Rate Limiting
// ─────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({
        success: true,
        message: 'Portfolio API running 🚀',
        environment: process.env.NODE_ENV
    });
});

// 404
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global error handler
app.use((err, _req, res, _next) => {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

startServer();