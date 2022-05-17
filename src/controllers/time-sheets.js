import Tsheet from '../models/Time-sheets';

const getAllTs = async (req, res) => {
  try {
    const getAllT = await Tsheet.find({});
    if (getAllT.length <= 0) {
      return res.status(400).json({
        message: ' No Time-sheets found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: ' Data for all Time-sheets sended',
      data: getAllT,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
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
    const empId = await Tsheet.findById(req.params.id);
    if (empId) {
      return res.status(200).json({
        message: `The data fot the employee whit id ${req.params.id} has been sent`,
        data: empId,
        error: false,
      });
    }
    return res.status(400).json({
      message: `There are not employee whit id ${req.params.id}`,
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
  getAllTs,
  getTsById,
  createTimeSheet,
  deleteTimesheet,
};
