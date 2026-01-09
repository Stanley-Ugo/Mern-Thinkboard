import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import noteRoutes from './noteRoutes.js';
import { connectDB } from '../config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//NOTE: We don't need this cors config if both backend and frontend is served on the same domain
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
//app.use(rateLimiter);

app.use('/api/notes', noteRoutes);

//NOTE: only when the backend and frontend is served on the same domain -  we don't need cors config, just this.
if (process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) =>
    {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() =>
{
    app.listen(PORT, () =>
        console.log('Server is running on port:', PORT));
});