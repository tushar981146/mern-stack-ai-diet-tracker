import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './libs/db.js';


const app = express();



import todayCalories from './routes/list.js'


dotenv.config();
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser({ limit: '10mb', extended: true }));


app.use(cors({
  origin: "https://mern-stack-ai-diet-tracker-frontend.onrender.com",
  credentials: true,
}));


app.use("/today", todayCalories);
app.use('/today', todayCalories);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port, http://localhost:${PORT}`);
  connectDB();
});
