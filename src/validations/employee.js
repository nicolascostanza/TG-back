import joi from 'joi';

const creationValidation = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi.string().min(3).required(),
    surname: joi.string().min(3).required(),
    email: joi.string().email().min(7).required(),
    gender: joi.string().valid('Male', 'Female', 'Other'),
    adress: joi.string(),
    dob: joi.date().required(),
    password: joi.string().valid(joi.ref('password')).min(8).required(),
    phone: joi.number().min(10).max(10),
    active: joi.boolean().required(),
  });

  try {
    const validation = Schema.validateAsync(req.body).save();
    return next(validation);
  } catch (error) {
    return res.status(400).JSON({
      msg: 'There has been an error when validating the request',
      error: error.details[0].message,
    });
  }
};

export default {
  creationValidation,
};
