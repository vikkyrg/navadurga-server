const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    // Customer Submitted
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    
    // Management Fields
    status: { type: String, default: 'New' }, // New, Contacted, In Progress, Resolved, Closed
    priority: { type: String, default: 'Medium' }, // Low, Medium, High
    source: { type: String, default: 'Website' },
    
    // Simple Follow-up & Notes
    followUpDate: { type: String },
    followUpNote: { type: String },
    internalNote: { type: String },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

EnquirySchema.pre('save', function() {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
