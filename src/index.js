import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const URL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

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
