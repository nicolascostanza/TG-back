import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const URL = process.env.DATABASE_URL;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(
  URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Fail to connect', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
