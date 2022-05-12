import express from 'express';
import tasks from './resources/tasks';
import adminsRouter from './resources/admins';
import timesheets from './resources/time-sheets';
import projects from './resources/projects';
import timesheets from './resources/time-sheets';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/tasks', tasks);
app.use('/admins', admins);
app.use('/projects', projects);
app.use('/time-sheets', timesheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
