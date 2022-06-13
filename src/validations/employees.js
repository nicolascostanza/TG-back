import joi from 'joi';

const creationValidation = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi
      .string()
      .min(3)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    lastName: joi
      .string()
      .min(3)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    email: joi.string().email().min(7).required(),
    gender: joi.string().valid('Male', 'Female', 'Other'),
    address: joi.string().regex(/^[a-zA-Z0-9\s,'-]*$/),
    dob: joi.date().required(),
    password: joi
      .string()
      .min(8)
      .required()
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
    phone: joi.string().regex(/^[0-9\-+]{9,10}$/),
    active: joi.boolean().required(),
  });

  const validation = Schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const updateValidation = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi
      .string()
      .min(3)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    lastName: joi
      .string()
      .min(3)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    email: joi.string().email().min(7),
    gender: joi.string().valid('Male', 'Female', 'Other'),
    address: joi.string().regex(/^[a-zA-Z0-9\s,'-]*$/),
    dob: joi.date(),
    password: joi
      .string()
      .min(8)
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
    phone: joi.string().regex(/^[0-9\-+]{9,10}$/),
    active: joi.boolean(),
  });

  const validation = Schema.validate(req.body);

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
  creationValidation,
  updateValidation,
};
