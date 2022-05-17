import Tsheet from '../models/Time-sheets';

const createTimeSheet = async (req, res) => {
  try {
    const timeSheet = new Tsheet({
      employeeId: req.body.employeeId,
      description: req.body.description,
      project: req.body.project,
      date: req.body.date,
      hours: req.body.hours,
      task: req.body.task,
      approved: req.body.approved,
      role: req.body.role,
    });

    const result = await timeSheet.save();
    return res.status(201).json({
      msg: 'Timesheet has been successfuly created',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There has been an error',
      error: `the error is: ${error}`,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Tsheet.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The Timesheet with ID: ${req.params.id} hasn't been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The Timesheet has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};
export default {
  createTimeSheet,
  deleteTimesheet,
};
