import express from 'express';
import projects from './controllers/super-admins';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app
  .get('/super-admin/:id', projects.getProjectById)
  .delete('/super-admins/:id', projects.deleteProject);
export default app;
