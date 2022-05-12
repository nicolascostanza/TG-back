import express from 'express';
import fs from 'fs';
import timesheets from '../data/time-sheets.json';

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.status(200).json({ data: timesheets });
});

router.get('/getByEmployee/:employeeId', (req, res) => {
  const tsEmp = req.params.employeeId;
  const ts = timesheets.filter((tSheet) => tSheet.employeeId === tsEmp);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: `No timesheets found for employee ${tsEmp}` });
  }
});

router.get('/getByProject/:project', (req, res) => {
  const tsProj = req.params.project;
  const ts = timesheets.filter((tSheet) => tSheet.project === tsProj);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: `No timesheets found for project ${tsProj}` });
  }
});

router.get('/getByDate', (req, res) => {
  const tsDate = req.query.date;
  const ts = timesheets.filter((tSheet) => tSheet.date === tsDate);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: 'No timesheets found for this date' });
  }
});

router.get('/getByStatus/:approved', (req, res) => {
  const tsAp = req.params.approved;
  const ts = timesheets.filter((tSheet) => tSheet.approved.toString() === tsAp);
  if (ts.length > 0) {
    res.status(200).json({ data: ts });
  } else {
    res.status(404).json({ msg: 'No timesheets found' });
  }
});

const isRepeated = (array, data) => {
  let repeated = false;
  for (let i = 0; i < array.length; i += 1) {
    if (timesheets[i].id === data.id) {
      repeated = true;
    }
  }
  return repeated;
};

router.post('/add', (req, res) => {
  const tsData = req.body;
  if (isRepeated(timesheets, tsData)) {
    res.status(409).json({ msg: 'This timesheet id corresponds to an existing timesheet' });
  } else if (tsData.id && tsData.employeeId && tsData.description && tsData.project
    && tsData.date && tsData.hours && tsData.task && tsData.approved !== '' && tsData.role) {
    timesheets.push(tsData);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Timesheet created');
      }
    });
  } else {
    res.status().json({ msg: 'Please complete all fields' });
  }
});

export default router;
