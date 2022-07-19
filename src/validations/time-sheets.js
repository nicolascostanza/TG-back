import Joi from 'joi';

const TimesheetValidation = (req, res, next) => {
  const TsObJ = Joi.object({
    employeeId: Joi.string().alphanum().length(24).required(),
    projectId: Joi.string().alphanum().length(24).required(),
    date: Joi.date().required(),
    hours: Joi.number().min(1).required(),
    taskId: Joi.string().alphanum().length(24).required(),
    approved: Joi.bool().optional(),
    isDeleted: Joi.boolean().optional(),
  });
  const validation = TsObJ.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const TimesheetValidationUp = (req, res, next) => {
  const TsObJe = Joi.object({
    employeeId: Joi.string().alphanum().length(24),
    projectId: Joi.string().alphanum().length(24),
    date: Joi.date(),
    hours: Joi.number().min(1),
    taskId: Joi.string().alphanum().length(24),
    approved: Joi.bool(),
    isDeleted: Joi.boolean().optional(),
  });
  const validation = TsObJe.validate(req.body);
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
  TimesheetValidationUp, TimesheetValidation,
};
