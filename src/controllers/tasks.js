import Task from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({}).populate('assignedEmployee', { firstName: 1, surname: 1 }).populate('parentProject', { name: 1 });
    return res.status(200).json({
      message: 'Tasks data sended',
      data: allTasks,
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

const getTasksById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameters',
        data: null,
        error: false,
      });
    }
    const task = await Task.findById(req.params.id).populate('assignedEmployee', { firstName: 1, surname: 1 }).populate('parentProject', { name: 1 });
    if (task) {
      return res.status(200).json({
        message: `The data for the employee with id ${req.params.id} has been sent`,
        data: task,
        error: false,
      });
    }
    return res.status(404).json({
      message: `There are not employee with id ${req.params.id}`,
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

const deleteTask = async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The task with ID: ${req.params.id} hasn't been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The task has been successfully deleted',
      data: result,
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
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const result = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `The task with ID: ${req.params.id} hasn't been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task has been updated',
      data: result,
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

export default {
  getAllTasks,
  getTasksById,
  createTask,
  deleteTask,
  updateTask,
};
