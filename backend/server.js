require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const connectDB = require('./db');
const Register = require('./models/Register');
const UploadedData = require('./models/UploadedData');
const BlogPost = require('./models/BlogPost');
const CareerApplication = require('./models/CareerApplication');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from project root directory
app.use(express.static(path.join(__dirname, '..')));


// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Nutrition API route
app.get('/nutrition', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  try {
    const response = await axios.get('https://api.calorieninjas.com/v1/nutrition', {
      params: { query },
      headers: { 'X-Api-Key': process.env.CALORIE_NINJAS_API_KEY || 'YOUR_API_KEY' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Request failed:', error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Image Text Nutrition API route
app.post('/imagetextnutrition', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File is required' });
  }
  try {
    const formData = new FormData();
    formData.append('file-upload', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const response = await axios.post('https://api.calorieninjas.com/v1/imagetextnutrition', formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': process.env.CALORIE_NINJAS_API_KEY || 'YOUR_API_KEY'
      }
    });

    // Save uploaded file and API response to MongoDB
    const uploadedData = new UploadedData({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      fileBuffer: req.file.buffer,
      apiResponse: response.data
    });
    await uploadedData.save();

    res.json(response.data);
  } catch (error) {
    console.error('Request failed:', error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Basic test route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Register route to save registration details
app.post('/register', async (req, res) => {
  try {
    const { name, weight, height, number, email } = req.body;
    const newRegister = new Register({ name, weight, height, number, email });
    await newRegister.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Nutrition API route
// Removed duplicate old request-based route

// GET route to fetch all register data
app.get('/registers', async (req, res) => {
  try {
    const registers = await Register.find();
    res.json(registers);
  } catch (error) {
    console.error('Error fetching registers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.post('/blog', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlogPost = new BlogPost({ title, content });
    await newBlogPost.save();
    res.status(201).json({ message: 'Blog post uploaded successfully' });
  } catch (error) {
    console.error('Error saving blog post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/career', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, jobField } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }
    const careerApplication = new CareerApplication({
      name,
      email,
      jobField,
      resume: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname
      }
    });
    await careerApplication.save();
    res.status(201).json({ message: 'Career application submitted successfully' });
  } catch (error) {
    console.error('Error saving career application:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/careers', async (req, res) => {
  try {
    const careers = await CareerApplication.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    console.error('Error fetching career applications:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
