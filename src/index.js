// use "import" to import libraries
import express from 'express';
import tasks from './resources/tasks';
import timesheets from './resources/time-sheets';
import projects from './resources/projects';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/tasks', tasks);
app.use('/projects', projects);
app.use('/time-sheets', timesheets);

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
