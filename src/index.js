// use "import" to import libraries
import express from 'express';
import timesheets from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/time-sheets', timesheets);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
