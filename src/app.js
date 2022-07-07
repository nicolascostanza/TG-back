import express from 'express';
import cors from 'cors';
import router from './routes';
import authMiddleware from './validations/auth';

const app = express();

app.use(express.json());
app.use(cors());
app.use('*', authMiddleware);
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
