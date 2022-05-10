// Call to Server and File System

const express = require('express');

const fs = require('fs');

const router = express.Router();

const employees = require('../data/employees.json');

// Get all of the list/JSON

router.get('/getAll', (req, res) => {
  res.status(200).json({
    employees,
  });
});

// Filter by Id

// router.get('/getById/:id', (req, res) => {
//   const employeesId = req.params.id;
//   const users = employees.find((employee) => employee.id === employeesId);
//   if (users) {
//     res.send(users);
//   } else {
//     res.send('user not found');
//   }
// });

// Filter by Status

router.get('/getByStatus/:active', (req, res) => {
  const employeesStatus = req.params.active;
  const users = employees.filter((employee) => employee.active.toString() === employeesStatus);
  if (users) {
    res.send(users);
  } else {
    res.send('user status not found');
  }
});

// Filter by Full Name

router.get('/getByFname/', (req, res) => {
  const employeesFname = req.query.full_name;
  const Fname = employees.filter((employee) => employee.full_name === employeesFname);
  if (Fname.length > 0) {
    res.send(Fname);
  } else {
    res.send('Full Name not found');
  }
});

// Filter by Gender

router.get('/getByGender/:gender', (req, res) => {
  const employeesGender = req.params.gender;
  const Gndr = employees.filter((employee) => employee.gender === employeesGender);
  if (Gndr.length > 0) {
    res.send(Gndr);
  } else {
    res.send('Gender not found - Insert Female or Male by parameters');
  }
});

// Post Sentence

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

// Put Sentence

router.put('/edit/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmployees = employees.find((employee) => employee.id.toString() === employeeId);
  const updEmployee = req.body;

  if (filteredEmployees) {
    employees.forEach((employee) => {
      const newEmployee = employee;
      if (employee.id.toString() === employeeId) {
        newEmployee.full_name = updEmployee.full_name ? updEmployee.full_name : employee.full_name;
        newEmployee.email = updEmployee.email ? updEmployee.email
          : employee.email;
        newEmployee.gender = updEmployee.gender ? updEmployee.gender : employee.gender;
        newEmployee.address = updEmployee.address ? updEmployee.address : employee.address;
        newEmployee.dob = updEmployee.dob ? updEmployee.dob : employee.dob;
        newEmployee.password = updEmployee.password ? updEmployee.password
          : employee.password;
        newEmployee.phone = updEmployee.phone ? updEmployee.phone : employee.phone;
        newEmployee.active = updEmployee.active ? updEmployee.active : employee.active;
      }
    });

    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee edit');
      }
    });
  } else {
    res.send('No Employee with the id selected');
  }
});

// Delete Sentence

router.delete('/delete/:id', (req, res) => {
  const employeesId = req.params.id;
  const filteredEmployees = employees.filter(({ id }) => id !== employeesId);
  if (employees.length === filteredEmployees.length) {
    res.send('Could not delete employee because it was not found');
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
