import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { env } from './config/env.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use(errorMiddleware);

export default app;
