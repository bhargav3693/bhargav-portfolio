const Contact = require('../models/Contact');

// POST /api/contact — save new message
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const ip = req.ip || req.connection?.remoteAddress;

        const contact = await Contact.create({ name, email, subject, message, ip });

        res.status(201).json({
            success: true,
            message: 'Message received! I\'ll get back to you shortly.',
            data: { id: contact._id, name: contact.name },
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        console.error('Contact Submit Error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// GET /api/contact/admin — view all messages (protected)
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        console.error('Get Contacts Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// PATCH /api/contact/:id/read — mark as read
const markRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!contact) return res.status(404).json({ success: false, message: 'Not found.' });
        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { submitContact, getContacts, markRead };
