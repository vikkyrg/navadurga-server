const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer storage (memory for MongoDB)
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Get all career applications
router.get('/', async (req, res) => {
    try {
        const careers = await Career.find().sort({ createdAt: -1 });
        res.json(careers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new career application
router.post('/', upload.single('resumeFile'), async (req, res) => {
    const career = new Career({
        jobId: req.body.jobId,
        jobRole: req.body.jobRole,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        experience: req.body.experience,
        position: req.body.position,
        resumeData: req.file ? req.file.buffer : undefined,
        resumeContentType: req.file ? req.file.mimetype : undefined,
        coverLetter: req.body.coverLetter
    });

    try {
        const newCareer = await career.save();
        if (req.file) {
            newCareer.resumeUrl = `/api/career/resume/${newCareer._id}`;
            await newCareer.save();
        }
        res.status(201).json(newCareer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a career application
router.delete('/:id', async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) return res.status(404).json({ message: 'Application not found' });
        
        await career.deleteOne();
        res.json({ message: 'Application deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve the resume file
router.get('/resume/:id', async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career || !career.resumeData) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.set('Content-Type', career.resumeContentType);
        res.send(career.resumeData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
