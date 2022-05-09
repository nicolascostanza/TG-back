const express = require('express');
const superAdminsList = require('../data/super-admins.json');

const router = express.Router();

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
