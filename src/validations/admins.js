import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const adminSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().min(7).required(),
    password: Joi.string().min(6).required(),
    active: Joi.boolean().required(),
  });
  const validation = adminSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  validateCreation,
};
