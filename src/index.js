// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
import timesheets from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/time-sheets', timesheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
