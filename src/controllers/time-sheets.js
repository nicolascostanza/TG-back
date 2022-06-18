import Tsheet from '../models/Time-sheets';

const getAllTs = async (req, res) => {
  try {
    const getAllT = await Tsheet.find({})
      .populate('employeeId', { firstName: 1, lastName: 1 })
      .populate('task', { taskName: 1, taskDescription: 1 });
    return res.status(200).json({
      message: 'All Time-sheets are:',
      data: getAllT,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const getTsById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameters',
        data: {},
        error: false,
      });
    }
    const empId = await Tsheet.findById(req.params.id)
      .populate('employeeId', { firstName: 1, lastName: 1 })
      .populate('task', { taskName: 1, taskDescription: 1 });
    if (empId) {
      return res.status(200).json({
        message: `Time-sheet with ID:${req.params.id} sent:`,
        data: empId,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Time-sheet with ID:${req.params.id} not found`,
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
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
      message: 'Time-sheet has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Tsheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Time-sheet with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Time-sheet successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Tsheet.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `Time-sheet with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.json({
      message: 'Time-sheet successfully deleted',
      data: result,
      error: false,
    }).status(204);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

export default {
  getAllTs,
  getTsById,
  createTimeSheet,
  updateTimesheet,
  deleteTimesheet,
};
