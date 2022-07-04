import Joi from 'joi';

const validateAdmin = (req, res, next) => {
  const adminSchema = Joi.object({
    firstName: Joi.string().min(3).required().regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    lastName: Joi.string().min(3).required().regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    email: Joi.string().email().min(7).required(),
    password: Joi.string().min(8).required().regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
    active: Joi.boolean().required(),
    isDeleted: Joi.boolean().optional(),
  });
  const validation = adminSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateAdminUpd = (req, res, next) => {
  const adminSchema = Joi.object({
    firstName: Joi.string().min(3).regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    lastName: Joi.string().min(3).regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    email: Joi.string().email().min(7),
    password: Joi.string().min(8).regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
    active: Joi.boolean(),
    isDeleted: Joi.boolean().optional(),
  });
  const validation = adminSchema.validate(req.body);
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
  validateAdmin,
  validateAdminUpd,
};
