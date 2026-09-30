const express = require('express');
const router = express.Router();
const JobOpening = require('../models/JobOpening');

// Admin GET: Returns all jobs, sorted oldest first (FIFO)
router.get('/admin', async (req, res) => {
    try {
        const jobs = await JobOpening.find().sort({ createdAt: 1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Public GET: Returns only active jobs, sorted oldest first (FIFO)
router.get('/', async (req, res) => {
    try {
        const jobs = await JobOpening.find({ status: 'Active' }).sort({ createdAt: 1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Public GET Single: Returns job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await JobOpening.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job opening not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new job opening
router.post('/', async (req, res) => {
    const job = new JobOpening({
        jobRole: req.body.jobRole,
        experience: req.body.experience,
        location: req.body.location,
        employmentType: req.body.employmentType,
        jobDescription: req.body.jobDescription,
        responsibilities: req.body.responsibilities,
        requirements: req.body.requirements,
        salary: req.body.salary,
        industry: req.body.industry,
        additionalInformation: req.body.additionalInformation,
        status: req.body.status || 'Active'
    });

    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a job opening
router.put('/:id', async (req, res) => {
    try {
        const job = await JobOpening.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job opening not found' });
        
        if (req.body.jobRole) job.jobRole = req.body.jobRole;
        if (req.body.experience) job.experience = req.body.experience;
        if (req.body.location) job.location = req.body.location;
        if (req.body.employmentType) job.employmentType = req.body.employmentType;
        if (req.body.jobDescription !== undefined) job.jobDescription = req.body.jobDescription;
        if (req.body.responsibilities !== undefined) job.responsibilities = req.body.responsibilities;
        if (req.body.requirements !== undefined) job.requirements = req.body.requirements;
        if (req.body.salary !== undefined) job.salary = req.body.salary;
        if (req.body.industry !== undefined) job.industry = req.body.industry;
        if (req.body.additionalInformation !== undefined) job.additionalInformation = req.body.additionalInformation;
        if (req.body.status) job.status = req.body.status;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a job opening
router.delete('/:id', async (req, res) => {
    try {
        const job = await JobOpening.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job opening not found' });
        
        await job.deleteOne();
        res.json({ message: 'Job opening deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
