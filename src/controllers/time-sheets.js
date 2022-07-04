import Tsheet from '../models/Time-sheets';

const getAllTs = async (req, res) => {
  const {
    projectId, approved, employeeId,
  } = req.query;
  try {
    const data = await Tsheet
      .find({
        employeeId: { $regex: new RegExp(employeeId || '', 'i') },
        projectId: { $regex: new RegExp(projectId || '', 'i') },
        approved: approved ?? { $in: [false, true] },
        isDeleted: { $ne: true },
      })
      .populate('employeeId', { firstName: 1, lastName: 1 })
      .populate('projectId', { name: 1, team: 1 })
      .populate('taskId', { taskName: 1, taskDescription: 1 });
    if (data.length < 1) {
      return res.status(404).json({
        message: 'All Time-sheets are:',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'All Time-sheets are:',
      data,
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
      .populate('projectId', { name: 1, team: 1 })
      .populate('taskId', { taskName: 1, taskDescription: 1 });
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
      projectId: req.body.project,
      date: req.body.date,
      hours: req.body.hours,
      taskId: req.body.task,
      approved: req.body.approved,
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
    const result = await Tsheet
      .findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!result) {
      return res.status(404).json({
        message: `Time-sheet with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Time-sheet successfully deleted',
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

export default {
  getAllTs,
  getTsById,
  createTimeSheet,
  updateTimesheet,
  deleteTimesheet,
};
