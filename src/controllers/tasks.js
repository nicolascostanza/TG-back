import Task from '../models/Tasks';

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

export default {
  createTask,
  deleteTask,
};
