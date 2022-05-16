import Task from '../models/Tasks';

const createTask = async (req, res) => {
  try {
    const task = new Task({
      parentProject: req.body.parentProject,
      taskCreatorId: req.body.taskCreatorId,
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      assignedEmployee: [
        {
          employeeId: req.body.assignedEmployee.employeeId,
          employeeRole: req.body.assignedEmployee.employeeRole,
          employeeName: req.body.assignedEmployee.employeeName,
        },
      ],
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
      message: error.details[0].message,
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
    return res.status(204).json({
      message: 'The task has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.details[0].message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTask,
  deleteTask,
};
