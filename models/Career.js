const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOpening' },
    jobRole: { type: String },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String },
    position: { type: String },
    resumeUrl: { type: String }, 
    resumeData: { type: Buffer },
    resumeContentType: { type: String },
    coverLetter: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', CareerSchema);
