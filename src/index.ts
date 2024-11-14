import express from 'express';
import { userRoutes } from './routes/userRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import { questionRoutes } from './routes/questionRoutes';
import { phaseRoutes } from './routes/phaseRoutes';
import progressRouter from './routes/phaseProgressRoute';
dotenv.config();

const app = express();

app.use(cors());

app.set('json spaces', 2);
app.use(express.json());
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/phases', phaseRoutes)
app.use('/progress', progressRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
