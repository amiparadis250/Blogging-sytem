
import Joi from 'joi';

const commentValidation = Joi.object({
 

content: Joi.string()
.min(3)
.required()
.messages({ 'string.min': 'Comment is required' }),
});



const validateComments = (req, res, next) => {
  const { error } = blogValidationValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }
  next();
};

export default validateComments;
