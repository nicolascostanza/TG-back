import express from 'express';
import fs from 'fs';
import timesheets from '../data/time-sheets.json';

const router = express.Router();

// Get Timesheet

router.get('/', (req, res) => {
  res.status(200).json({
    data: timesheets,
  });
});

router.get('/:id', (req, res) => {
  const timesheetsId = req.params.id;
  const timesheet = timesheets
    .find((timesheetRequested) => timesheetsId === timesheetRequested.id.toString());
  const validIds = timesheets.map((ts) => ts.id);
  if (timesheet) {
    res.status(200).json({ timesheet });
  } else {
    res.status(404).send(`Timesheet with ID: ${timesheetsId} were not found. Valid IDs: ${validIds}`);
  }
});

// Edit - Update Timesheet

router.put('/:id', (req, res) => {
  const timesheetsId = req.params.id;
  const filteredTimesheets = timesheets
    .find((timesheet) => timesheet.id.toString() === timesheetsId);
  const updatedTimesheet = req.body;

  if (filteredTimesheets) {
    timesheets.forEach((timesheet) => {
      const newTS = timesheet;
      if (timesheet.id.toString() === timesheetsId) {
        newTS.employeeId = updatedTimesheet.employeeId
          ? updatedTimesheet.employeeId
          : timesheet.employeeId;
        newTS.description = updatedTimesheet.description ? updatedTimesheet.description
          : timesheet.description;
        newTS.project = updatedTimesheet.project ? updatedTimesheet.project : timesheet.project;
        newTS.date = updatedTimesheet.date ? updatedTimesheet.date : timesheet.date;
        newTS.hours = updatedTimesheet.hours ? updatedTimesheet.hours : timesheet.hours;
        newTS.task = updatedTimesheet.task ? updatedTimesheet.task : timesheet.task;
        newTS.approved = updatedTimesheet.approved ? updatedTimesheet.approved : timesheet.approved;
        newTS.role = updatedTimesheet.role ? updatedTimesheet.role : timesheet.role;
      }
    });

    fs.writeFile('src/data/time-sheets.js', JSON.stringify(filteredTimesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('The timesheet was updated succesfully');
      }
    });
  } else {
    res.send(`No timesheet with the id of ${req.params.id} were found.`);
  }
});

// Delete Timesheet

router.delete('/delete/:id', (req, res) => {
  const timesheetsId = req.params.id;
  const filteredTimesheets = timesheets
    .filter((timesheet) => timesheet.id.toString() !== timesheetsId);
  if (timesheets.length === filteredTimesheets.length) {
    res.send(`No timesheets with the id of ${req.params.id} were found`);
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Time-sheet deleted');
      }
    });
  }
});

export default router;
