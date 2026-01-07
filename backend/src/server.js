import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import noteRoutes from './noteRoutes.js';
import { connectDB } from '../config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: '*',
}));
app.use(express.json());
//app.use(rateLimiter);

app.use('/api/notes', noteRoutes);

connectDB().then(() =>
{
    app.listen(PORT, () =>
        console.log('Server is running on port:', PORT));
});