// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const superAdminsRouter = require('./resources/super-admins');

const app = express();
const port = 3000;

app.use('/superAdmin', superAdminsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
