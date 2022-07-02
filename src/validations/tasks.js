import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const taskValidation = Joi.object({
    parentProject: Joi.string().alphanum().required(),
    taskName: Joi.string().min(1).max(50).required(),
    taskDescription: Joi.string().min(1).max(250).optional(),
    assignedEmployee: Joi.array(),
    startDate: Joi.date().required(),
    status: Joi.string()
      .valid('Ready to deliver', 'Paused', 'Unassigned', 'Completed', 'In progress', 'Cancelled')
      .required(),
    isDeleted: Joi.boolean().optional(),
  });
  const validation = taskValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const taskValidation = Joi.object({
    parentProject: Joi.string().alphanum(),
    taskName: Joi.string().min(1).max(50),
    taskDescription: Joi.string().min(1).max(250),
    assignedEmployee: Joi.array(),
    startDate: Joi.date(),
    status: Joi.string()
      .valid('Ready to deliver', 'Paused', 'Unassigned', 'Completed', 'In progress', 'Cancelled'),
    isDeleted: Joi.boolean().optional(),
  });
  const validation = taskValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
  validateUpdate,
};
