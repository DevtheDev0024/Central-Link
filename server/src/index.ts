import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { membersRouter } from './routes/members.js';

const app = express();
const port = Number(process.env.PORT ?? 3001);
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

app.use(helmet());
app.use(
  cors({
    origin: corsOrigin,
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/members', membersRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`CLTC API listening on http://localhost:${port}`);
});
