import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
  username: Joi.alternatives().conditional(Joi.string().email(), {
    then: Joi.string().email().required().messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email',
      'string.empty': 'Email is a required field'
    }),
    otherwise: Joi.string().min(4).max(12).required().messages({
      'string.base': 'Username must be of type string',
      'string.min': 'Invalid username',
      'string.max': 'Invalid username',
      'string.empty': 'Username is a required field'
    })
  }),
  password: Joi.string().min(8).max(18).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password must contain at least 8 characters',
    'string.max': 'Password must contain less than 18 characters',
    'string.empty': 'Password is required'
  })
});

export { loginSchema };
