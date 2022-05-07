// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const projects = require('./data/projects.json');
const projectsRouter = require('./resources/projects');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/projects', projectsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/projects', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
