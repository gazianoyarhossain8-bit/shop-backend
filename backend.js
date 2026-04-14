import express from 'express';
import cors from 'cors';
import productRouter from './routes/product.js'; 
import dotenv from 'dotenv';
import connectDB from './ConnectDB.js';
import cookieparser from 'cookie-parser';


dotenv.config(); 

const app = express();
app.use(cookieparser());

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

connectDB();
app.use('/images', express.static('images')); // Serve static files from the uploads directory


// Routes
app.use('/api', productRouter);

// Start the server

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});