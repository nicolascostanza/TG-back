import Task from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json({
      message: 'Tasks data sended',
      data: allTasks,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      data: undefined,
      error: true,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    if (req.params.id) {
      const task = await Task.findById(req.params.id);
      res.status(200).json({
        message: 'Filtered tasks by id has been sent',
        data: task,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `There are not task whit id ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500)({
      message: 'Internal server error',
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      parentProject: req.body.parentProject,
      taskCreatorId: req.body.taskCreatorId,
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
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
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
    return res.status(400).json({
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
};
