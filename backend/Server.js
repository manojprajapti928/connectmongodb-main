import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import User from './models/user.js'; // Make sure this is correct
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/Demo1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connection established..."))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/data/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.post('/api/sendData/', async (req, res) => {
    const { Name, Age } = req.body;
    try {
        const newUser = new User({ name: Name, age: Age });
        await newUser.save();
        res.json({ message: 'Data saved to MongoDB' });
    } catch (error) {
        res.status(500).json({ message: "Error saving data", error });
    }
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
