import Joi from 'joi';

const creationValidation = (req, res, next) => {
  const Schema = Joi.object({
    firebaseUid: Joi.string(),
    firstName: Joi
      .string()
      .min(3)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    lastName: Joi
      .string()
      .min(3)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    email: Joi.string().email().min(7).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    address: Joi.string().regex(/^[a-zA-Z0-9\s,'-]*$/),
    dob: Joi.date().required(),
    password: Joi
      .string()
      .min(8)
      .required()
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
    phone: Joi.string().regex(/^[0-9\-+]{9,10}$/),
    active: Joi.boolean().required(),
    isDeleted: Joi.boolean().optional(),
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
  const Schema = Joi.object({
    firstName: Joi
      .string()
      .min(3)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    lastName: Joi
      .string()
      .min(3)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    email: Joi.string().email().min(7),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    address: Joi.string().regex(/^[a-zA-Z0-9\s,'-]*$/),
    dob: Joi.date(),
    password: Joi
      .string()
      .min(8)
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
    phone: Joi.string().regex(/^[0-9\-+]{9,10}$/),
    active: Joi.boolean(),
    isDeleted: Joi.boolean().optional(),
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
