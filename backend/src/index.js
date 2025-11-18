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

const allowedOrigins = [
  "http://localhost:5173",     // local React
  process.env.FRONTEND_URL,    // future deployed frontend
];
app.use(cors({
  origin: (origin, callback) => {
    // Mobile apps / Postman → no origin → allow
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use("/today", todayCalories);
app.use('/today', todayCalories);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port, http://localhost:${PORT}`);
  connectDB();
});