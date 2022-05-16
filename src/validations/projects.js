import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const teamSchema = Joi.object({
    id: Joi.string().min(1).max(10).required(),
    name: Joi.string().min(3).max(30).required(),
    role: Joi.string().valid('QA', 'DEV', 'PM', 'TL').required(),
    hours: Joi.number().min(1).required(),
    rate: Joi.number().min(1).max(1000).required(),
  });

  const taskSchema = Joi.object({
    id: Joi.string().min(1).max(10).required(),
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(200).required(),
  });

  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(200).required(),
    clientName: Joi.string().min(3).max(30).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    projectManager: Joi.string().min(3).max(30).required(),
    team: Joi.array().items(teamSchema),
    tasks: Joi.array().items(taskSchema),
    adminId: Joi.string().min(1).max(10).required(),
  });

  const validation = projectValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: (validation.error.details[0].message),
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
