const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.post('/add', (req, res) => {
  const adminData = req.body;
  if (adminData.firstName && adminData.lastName
        && adminData.email && adminData.password && adminData.active) {
    admins.push(adminData);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('The admin has been created successfully');
      }
    });
  } else {
    res.status(400).json({ msg: 'Admin cannot be created' });
  }
});

router.put('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === parseInt(req.params.id, 10));
  if (found) {
    const uptadeAdmin = req.body;
    admins.forEach((admin) => {
      if (admin.id === parseInt(req.params.id, 10)) {
        const newAdmin = admin;
        newAdmin.firstName = uptadeAdmin.firstName ? uptadeAdmin.firstName : admin.firstName;
        newAdmin.lastName = uptadeAdmin.lastName ? uptadeAdmin.lastName : admin.lastName;
        newAdmin.email = uptadeAdmin.email ? uptadeAdmin.email : admin.email;
        newAdmin.password = uptadeAdmin.password ? uptadeAdmin.password : admin.password;
        newAdmin.active = uptadeAdmin.active ? uptadeAdmin.active : admin.active;
        fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send(`Admin ${req.params.id} has been edited`);
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No admin with the id of ${req.params.id} was founded` });
  }
});

module.exports = router;
