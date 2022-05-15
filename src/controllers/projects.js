import Project from '../models/Projects';

const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      clientName: req.body.clientName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      projectManager: req.boy.projectManager,
      team: req.body.team,
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
      // data: ,
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
    const result = await Project.findByIdAndDelete(req.params.id); // ver que onda ocn esta funcion
    if (!result) {
      return res.status(404).json({
        message: 'Project not found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project succesfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal sever error',
      error: true,
    });
  }
};

export default {
  createProject,
  deleteProject,
};
