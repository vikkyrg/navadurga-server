const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // save to uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  }
});

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
        resumeUrl: req.file ? `/uploads/${req.file.filename}` : '',
        coverLetter: req.body.coverLetter
    });

    try {
        const newCareer = await career.save();
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

module.exports = router;
