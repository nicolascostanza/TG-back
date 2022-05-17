import Joi from 'joi';

const TimesheetValidationUp = (req, res, next) => {
  const TsObJ = Joi.object({
    employeeId: Joi.string(),
    description: Joi.string().min(3),
    project: Joi.string().min(3),
    date: Joi.date(),
    hours: Joi.number().min(1),
    task: Joi.string().min(3),
    approved: Joi.bool(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL'),
  });
  const valid = TsObJ.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      msg: 'There was an error',
      success: valid.error.details[0].message,
    });
  }
  return next();
};

export default {
  TimesheetValidationUp,
};
