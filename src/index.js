import express from 'express';

// use "require" to import JSON files
import admins from './resources/admins';
import projects from './resources/projects';
import timesheets from './resources/time-sheets';
import superAdminsRouter from './resources/super-admins';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/superAdmin', superAdminsRouter);
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
