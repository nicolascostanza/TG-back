import Project from '../models/Projects';

const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      clientName: req.body.clientName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      projectManager: req.body.projectManager,
      team: req.body.team,
      tasks: req.body.tasks,
      adminId: req.body.adminId,
    });

    const result = await project.save();
    return res.status(201).json({
      message: 'Project has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        error: true,
      });
    }
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project succesfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal sever error',
      data: undefined,
      error: true,
    });
  }
};

export default {
  createProject,
  deleteProject,
};
