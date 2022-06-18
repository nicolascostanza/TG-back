import Task from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({})
      .populate('assignedEmployee', { firstName: 1, lastName: 1 })
      .populate('parentProject', { name: 1 });
    return res.status(200).json({
      message: 'All tasks are:',
      data: allTasks,
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

const getTasksById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameters',
        data: { },
        error: false,
      });
    }
    const task = await Task.findById(req.params.id)
      .populate('assignedEmployee', { firstName: 1, lastName: 1 })
      .populate('parentProject', { name: 1 });
    if (task) {
      return res.status(200).json({
        message: `Task with ID:${req.params.id} sent:`,
        data: task,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Task with ID:${req.params.id} not found`,
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

const createTask = async (req, res) => {
  try {
    const task = new Task({
      parentProject: req.body.parentProject,
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      assignedEmployee: req.body.assignedEmployee,
      startDate: req.body.startDate,
      status: req.body.status,
    });
    const result = await task.save();
    return res.status(201).json({
      message: 'Task has been created',
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

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Task with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `Task with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.json({
      message: 'Task successfully deleted',
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

  getAllTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
};
