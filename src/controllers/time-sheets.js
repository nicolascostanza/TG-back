import Tsheet from '../models/Time-sheets';

const getAllTs = async (req, res) => {
  try {
    const data = await Tsheet.find(req.query)
      .populate('task')
      .populate('employeeId')
      .populate('project');
    if (data.length < 1) {
      return res.status(404).json({
        message: 'Timesheets has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Data for all Time-sheets sent',
      data,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getTsById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameters',
        data: null,
        error: false,
      });
    }
    const empId = await Tsheet.findById(req.params.id).populate('employeeId', { firstName: 1, surname: 1 }).populate('task', { taskName: 1, taskDescription: 1 });
    if (empId) {
      return res.status(200).json({
        message: `The data for the timesheet with id ${req.params.id} has been sent`,
        data: empId,
        error: false,
      });
    }
    return res.status(400).json({
      message: `There is no timesheet with id ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    const result = await Tsheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        msg: 'The Timesheet has not been found',
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'There was an error',
      error: `the error is: ${error}`,
    });
  }
};

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
      success: false,
      msg: 'There was an error',
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
  getAllTs,
  getTsById,
  updateTimesheet,
  createTimeSheet,
  deleteTimesheet,
};
