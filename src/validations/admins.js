import joi from 'joi';

const validateAdmin = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi.string().min(3).required,
    lastName: joi.string().min(3).required,
    email: joi.string().email().min().required,
    password: joi.string().valid(joi.ref('password')).min(8).required(),
    active: joi.boolean().required,
  });
  try {
    const validation = Schema.validateAsync(req.body).save();
    return next(validation);
  } catch (error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      error: true,
    });
  }
};

export default {
  validateAdmin,
};
