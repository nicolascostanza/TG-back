import express from 'express';
import fs from 'fs';
import admins from '../data/admins.json';

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
  const adminId = req.params.id;
  const admin = admins.find((item) => item.id.toString() === adminId);
  if (!admin) {
    res.json({ msg: `The admin with ID ${adminId} does not exist` });
  } else {
    const adminInfo = req.body;
    Object.keys(admin).forEach((item) => {
      admin[item] = adminInfo[item] ? adminInfo[item] : admin[item];
    });
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ msg: `The admin with ID ${adminId} was updated` });
      }
    });
  }
});

export default router;
