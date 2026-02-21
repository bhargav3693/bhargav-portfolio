const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getContacts, markRead } = require('../controllers/contactController');
const { adminAuth } = require('../middleware/auth');

// Validation rules
const contactValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

// Public routes
router.post('/', contactValidation, submitContact);

// Admin protected routes
router.get('/admin', adminAuth, getContacts);
router.patch('/:id/read', adminAuth, markRead);

module.exports = router;
