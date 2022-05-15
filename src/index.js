import express from 'express';
import mongoose from 'mongoose';
import timesheets from './controllers/time-sheets';
import admins from './controllers/admins';
import projects from './routes/projects';
import tasks from './controllers/tasks';
import superAdminsRouter from './controllers/super-admins';

mongoose.connect('mongodb+srv://AlfonsoDalix:RadiumRocket@basp-tg.amp3e.mongodb.net/BaSP-TG?retryWrites=true&w=majority');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/superAdmin', superAdminsRouter);
app.use('/admins', admins);
app.use('/projects', projects);
app.use('/tasks', tasks);
app.use('/time-sheets', timesheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
