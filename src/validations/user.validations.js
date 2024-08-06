import Joi from 'joi';

const usersValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({ 'string.email': 'Please enter a valid email address' }),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&+\\-*/^%=<>]{8,}$'
      )
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    }),
  names: Joi.string()
    .min(3)
    .required()
    .messages({ 'string.min': 'First name is required' }),
 
 
});

const validateUser = (req, res, next) => {
  const { error } = usersValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }
  next();
};

export default validateUser;
