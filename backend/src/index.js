import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './libs/db.js';
import todayCalories from './routes/list.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use(cors({
  origin: "https://mern-stack-ai-diet-tracker-frontend.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://mern-stack-ai-diet-tracker-frontend.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send(200);
});

// Route
app.use("/today", todayCalories);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
