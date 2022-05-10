const express = require('express');

const fs = require('fs');

const router = express.Router();
const employees = require('../data/employees.json');

router.get('/getAll', (req, res) => {
  res.status(200).json({
    employees,
  });
});

router.get('/getById/:id', (req, res) => {
  const employeesId = req.params.id;
  const users = employees.find((employee) => employee.id === employeesId);
  if (users) {
    res.send(users);
  } else {
    res.send('user not found');
  }
});

router.get('/getByFname/', (req, res) => {
  const employeesFname = req.query.full_name;
  const Fname = employees.filter((name) => name.full_name === employeesFname);
  if (Fname.length > 0) {
    res.send(Fname);
  } else {
    res.send(`${employees.Fname} not found`);
  }
});

router.post('/add', (req, res) => {
  const userData = req.body;
  if (userData.id && userData.full_name && userData.email && userData.gender && userData.address
    && userData.dob && userData.password && userData.phone && userData.active !== '') {
    if (employees.every((employee) => userData.id !== employee.id)) {
      employees.push(userData);
      fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('User created');
        }
      });
    } else {
      res.send('This id already exists');
    }
  } else {
    res.send('This user is incomplete');
  }
});

module.exports = router;
