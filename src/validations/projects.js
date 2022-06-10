import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(30).required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    description: Joi.string().min(3).max(200).required(),
    clientName: Joi.string().min(3).max(30).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    projectManager: Joi.string().min(3).max(30).required(),
    team: Joi.array(),
    tasks: Joi.array(),
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

const validateModification = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(30).regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    description: Joi.string().min(3).max(200),
    clientName: Joi.string().min(3).max(30),
    startDate: Joi.date(),
    endDate: Joi.date(),
    projectManager: Joi.string().min(3).max(30),
    team: Joi.array(),
    tasks: Joi.array(),
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
  validateModification,
};
