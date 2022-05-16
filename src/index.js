import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import timesheets from './controllers/time-sheets';
import admins from './controllers/admins';
import superAdminsRouter from './controllers/super-admins';

const URL = 'mongodb+srv://AlfonsoDalix:RadiumRocket@basp-tg.amp3e.mongodb.net/BaSP-TG?retryWrites=true&w=majority';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.use('/superAdmin', superAdminsRouter);
app.use('/admins', admins);
app.use('/time-sheets', timesheets);

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
