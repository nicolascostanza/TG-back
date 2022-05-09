// use "import" to import libraries
import express from 'express';
import * as employeesControllers from'./resources/employees';

// use "require" to import JSON files
const employees = require('./data/employees.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello Alva!');
});

app.get('/emplyees', (req, res) => {
  res.status(200).json({
    data: employees,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.get('/employee/:id', employeesControllers.getEmployeeById)