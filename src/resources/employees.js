const express = require('express');

const fs = require('fs');

const router = express.Router();

const employees = require('../data/employees.json');

router.get('/getAll', (req, res) => {
  res.status(200).json({
    employees,
  });
});

// router.get('/getById/:id', (req, res) => {
//   const employeesId = req.params.id;
//   const users = employees.find((employee) => employee.id === employeesId);
//   if (users) {
//     res.send(users);
//   } else {
//     res.send('user not found');
//   }
// });

router.get('/getByStatus/:active', (req, res) => {
  const employeesStatus = req.params.id;
  const users = employees.filter((employee) => employee.active !== Boolean(employeesStatus));
  if (users) {
    res.send(users);
  } else {
    res.send('user not found');
  }
});

router.get('/getByFname/', (req, res) => {
  const employeesFname = req.query.full_name;
  const Fname = employees.filter((employee) => employee.full_name === employeesFname);
  if (Fname.length > 0) {
    res.send(Fname);
  } else {
    res.send('Fname not found');
  }
});

// router.post('/add', (req, res) => {
//   const userData = req.body;
//   employees.push(userData);
//   fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send('User created');
//     }
//   });
// });

router.put('/edit', (req, res) => {
  const userData = req.body;
  const filteredEmployees = employees.filter((employee) => employee.id !== userData.id);
  if (employees.length !== filteredEmployees.length) {
    let isValid = true;
    const keys = ['id', 'full_name', 'email', 'gender', 'address', 'dob', 'password', 'phone', 'active'];

    keys.forEach((key) => {
      if (isValid && !userData[key]) {
        isValid = false;
      }
    });

    if (isValid) {
      filteredEmployees.push(userData);
      fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployees), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('User edited');
        }
      });
    } else { res.send('all values should be defined'); }
  }
});

router.delete('/delete/:id', (req, res) => {
  const employeesId = req.params.id;
  const filteredEmployees = employees.filter(({ id }) => id !== employeesId);
  if (employees.length === filteredEmployees.length) {
    res.send('Could not delete project because it was not found');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employeed deleted');
      }
    });
  }
});

module.exports = router;
