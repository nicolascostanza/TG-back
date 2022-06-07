import joi from 'joi';

const creationValidation = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi.string().min(3).required(),
    surname: joi.string().min(3).required(),
    email: joi.string().email().min(7).required(),
    gender: joi.string().valid('Male', 'Female', 'Other'),
    adress: joi.string(),
    dob: joi.date().required(),
    password: joi.string().min(8).required(),
    phone: joi.string().min(9).max(10),
    active: joi.boolean().required(),
  });

  const validation = Schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error when validating the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const updateValidation = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi.string().min(3),
    surname: joi.string().min(3),
    email: joi.string().email().min(7),
    gender: joi.string().valid('Male', 'Female', 'Other'),
    adress: joi.string(),
    dob: joi.date(),
    password: joi.string().min(8),
    phone: joi.string().min(9).max(10),
    active: joi.boolean(),
  });

  const validation = Schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error when validating the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  creationValidation,
  updateValidation,
};
