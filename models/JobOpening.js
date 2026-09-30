const mongoose = require('mongoose');

const JobOpeningSchema = new mongoose.Schema({
    jobRole: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    employmentType: { type: String, required: true },
    jobDescription: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    salary: { type: String },
    industry: { type: String },
    additionalInformation: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobOpening', JobOpeningSchema);
