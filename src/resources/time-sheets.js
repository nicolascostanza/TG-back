const express = require('express');

const timesheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: timesheets,
  });
});

router.get('/getById:id', (req, res) => {
  const tsId = req.params.id;
  const ts = timesheets.find((tSheet) => tSheet.id === tsId);
  if (ts) {
    res.send(ts);
  } else {
    res.send('Timesheet not found');
  }
});

router.get('/getByEmployee', (req, res) => {
  const tsEmp = req.query.employeeId;
  const ts = timesheets.filter((tSheet) => tSheet.employeeId === tsEmp);
  if (ts.length > 0) {
    res.send(ts);
  } else {
    res.send(`No timesheets found for employee ${tsEmp}`);
  }
});

module.exports = router;
