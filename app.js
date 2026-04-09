import express from 'express';
import authRouter from './src/routers/auth.routes.js';
import cookieParser from "cookie-parser";
import errorMiddleware from './src/middlewares/error.middlewares.js';
import { limiter } from './src/middlewares/limiters.js';





const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use(limiter);
app.use(errorMiddleware)

export default app;