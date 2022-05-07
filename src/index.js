// use "import" to import libraries
import express from 'express';
import res from 'express/lib/response';

const app = express();
const tasksRouter = require('./resources/tasks.js');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/tasks', tasksRouter)

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
