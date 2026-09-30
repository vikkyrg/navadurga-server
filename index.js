require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const enquiryRoutes = require('./routes/enquiry');
const careerRoutes = require('./routes/career');

const app = express();

// For development and Vercel preview environments, we allow all origins.
// In a strict production environment, you can replace this with specific URLs.
app.use(cors({
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/navadurga')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/enquiry', enquiryRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/jobOpenings', require('./routes/jobOpening'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
