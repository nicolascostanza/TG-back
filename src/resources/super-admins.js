const express = require('express');
const fs = require('fs');
const superAdminsList = require('../data/super-admins.json');

const router = express.Router();

/// // Method Post
router.post('/postSuperAdmin', (req, res) => {
  const superAdminData = req.body;
  if (
    superAdminData.id
    && superAdminData.first_name
    && superAdminData.last_name
    && superAdminData.email
    && superAdminData.password
    && superAdminData.active
  ) {
    superAdminsList.push(superAdminData);
    fs.writeFile(
      'src/data/super-admins.json',
      JSON.stringify(superAdminsList),
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Super Admin Created');
        }
      },
    );
  } else {
    res.send('Theres a error in the validation');
  }
});

/// // Method Edit
router.put('/edit/:id', (req, res) => {
  const superAdminData = req.body;
  const superAdminId = req.params.id;
  const superAdmins = superAdminsList.find(
    (superAdmin) => superAdmin.id === superAdminId,
  );
  if (superAdmins) {
    if (
      true
    ) {
      Object.assign(superAdmins, superAdminData);
      fs.writeFile(
        'src/data/super-admins.json',
        JSON.stringify(superAdminsList),
        (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Super Admin Edited');
          }
        },
      );
    } else {
      res.send('Theres a error in the validation');
    }
    res.send(superAdmins);
  } else {
    res.send('Super Admin not found');
  }
});

/// // Method: Get a Super Admin by Id
router.get('/getById/:id', (req, res) => {
  const superAdminId = req.params.id;
  const superAdmins = superAdminsList.find(
    (superAdmin) => superAdmin.id === superAdminId,
  );
  if (superAdmins) {
    res.send(superAdmins);
  } else {
    res.send('Super Admin not found');
  }
});

/// // Method Delete
router.delete('/delete/:id', (req, res) => {
  const superAdminID = req.params.id;
  const filteredSuperAdmins = superAdminsList.filter(
    (superAdmin) => superAdmin.id !== superAdminID,
  );
  if (superAdminsList.length === filteredSuperAdmins.length) {
    res.send('Could not delete user because it was not found');
  } else {
    fs.writeFile(
      'src/data/super-admins.json',
      JSON.stringify(filteredSuperAdmins),
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Super Admin Deleted');
        }
      },
    );
  }
});

/// // Methods search by filter

/// Filter by First name
router.get('/getByFirstName', (req, res) => {
  const superAdminFirstName = req.query.firstName;
  const filterSuperAdmin = superAdminsList.filter(
    (superAdmin) => superAdmin.first_name === superAdminFirstName,
  );
  if (filterSuperAdmin.length > 0) {
    res.send(filterSuperAdmin);
  } else {
    res.send('Super Admin not found');
  }
});

/// Filter by Last name
router.get('/getByLastName', (req, res) => {
  const superAdminLastName = req.query.lastName;
  const filterSuperAdmin = superAdminsList.filter(
    (superAdmin) => superAdmin.last_name === superAdminLastName,
  );
  if (filterSuperAdmin.length > 0) {
    res.send(filterSuperAdmin);
  } else {
    res.send('Last name not found');
  }
});

/// Filter by Email
router.get('/getByEmail', (req, res) => {
  const superAdminEmail = req.query.email;
  const filterSuperAdmin = superAdminsList.filter(
    (superAdmin) => superAdmin.email === superAdminEmail,
  );
  if (filterSuperAdmin.length > 0) {
    res.send(filterSuperAdmin);
  } else {
    res.send('Email not found');
  }
});

module.exports = router;
