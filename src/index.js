// use "import" to import libraries
import express from 'express';

import admins from './resources/admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', admins);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
