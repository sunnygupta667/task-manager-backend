import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cors from 'cors';
dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());



// Database connection 
connectDB();


// Import routes
import router from './routes/task.route.js';
// Use routes
app.use('/api/tasks', router);


const PORT = process.env.PORT || 5000;
// Server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});