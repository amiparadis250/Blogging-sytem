import Joi from 'joi';

const blogValidation = Joi.object({
 
title: Joi.string()
    .min(3)
    .required()
    .messages({ 'string.min': 'Title is required' }),

content: Joi.string()
.min(20)
.required()
.messages({ 'string.min': 'description for the post is required' }),
});



const validateBlog = (req, res, next) => {
  const { error } = blogValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }
  next();
};

export default validateBlog;
