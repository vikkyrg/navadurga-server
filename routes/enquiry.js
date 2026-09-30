const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// Get all enquiries
router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new enquiry (From Website)
router.post('/', async (req, res) => {
    const enquiry = new Enquiry({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
        source: 'Website',
        status: 'New',
        priority: 'Medium'
    });

    try {
        const newEnquiry = await enquiry.save();
        res.status(201).json(newEnquiry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Enquiry (Status, Priority, Follow-up, Notes)
router.put('/:id', async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        
        const updates = req.body;
        
        if (updates.status) enquiry.status = updates.status;
        if (updates.priority) enquiry.priority = updates.priority;
        if (updates.followUpDate !== undefined) enquiry.followUpDate = updates.followUpDate;
        if (updates.followUpNote !== undefined) enquiry.followUpNote = updates.followUpNote;
        if (updates.internalNote !== undefined) enquiry.internalNote = updates.internalNote;

        const updatedEnquiry = await enquiry.save();
        res.json(updatedEnquiry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an enquiry
router.delete('/:id', async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        
        await enquiry.deleteOne();
        res.json({ message: 'Enquiry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
