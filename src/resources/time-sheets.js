const express = require('express');
const fs = require('fs');
const timesheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: timesheets,
  });
});

// return one timesheet according to a specific id
router.get('/getById/:id', (req, res) => {
  const tsId = req.params.id;
  const ts = timesheets.find((tSheet) => tSheet.id === tsId);
  if (ts) {
    res.send(ts);
  } else {
    res.send('Timesheet not found');
  }
});

// return all timesheets corresponding to a specific employee
router.get('/getByEmployee', (req, res) => {
  const tsEmp = req.query.employeeId;
  const ts = timesheets.filter((tSheet) => tSheet.employeeId === tsEmp);
  if (ts.length > 0) {
    res.send(ts);
  } else {
    res.send(`No timesheets found for employee ${tsEmp}`);
  }
});

// this function check if a id key is repeated
const isRepeated = (array, data) => {
  let repeated = false;
  for (let i = 0; i < array.length; i += 1) {
    if (timesheets[i].id === data.id) {
      repeated = true;
    }
  }
  return repeated;
};

// create timesheet
router.post('/add', (req, res) => {
  const tsData = req.body;
  if (isRepeated(timesheets, tsData)) {
    res.send('This timesheet id corresponds to an existing timesheet');
  } else if (tsData.id && tsData.employeeId && tsData.description && tsData.project
    && tsData.date && tsData.hours && tsData.task && tsData.approved !== '' && tsData.role) {
    timesheets.push(tsData);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheet created');
      }
    });
  } else {
    res.send('Please complete all fields');
  }
});

module.exports = router;
