import Joi from 'joi';

const TimesheetValidationUp = (req, res, next) => {
  const TsObJe = Joi.object({
    employeeId: Joi.string(),
    description: Joi.string().min(3),
    project: Joi.string().min(3),
    date: Joi.date(),
    hours: Joi.number().min(1),
    task: Joi.array(),
    approved: Joi.bool(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL'),
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

const TimesheetValidation = (req, res, next) => {
  const TsObJ = Joi.object({
    employeeId: Joi.string().required(),
    description: Joi.string().min(3).max(80),
    project: Joi.string().min(3).required(),
    date: Joi.date().required(),
    hours: Joi.number().min(1).required(),
    task: Joi.array(),
    approved: Joi.bool().required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required(),
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

export default {
  TimesheetValidationUp, TimesheetValidation,
};
