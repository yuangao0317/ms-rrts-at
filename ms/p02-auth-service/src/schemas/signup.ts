import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().min(4).max(18).required().messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Username must contain at least 4 characters',
    'string.max': 'Username must contain less than 18 characters',
    'string.empty': 'Username is required'
  }),
  password: Joi.string().min(8).max(18).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password must contain at least 8 characters',
    'string.max': 'Password must contain less than 18 characters',
    'string.empty': 'Password is required'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Invalid email',
    'string.empty': 'Email is a required field'
  }),
  country: Joi.string().required().messages({
    'string.base': 'Country must be of type string',
    'string.empty': 'Country is a required field'
  }),
  profilePicture: Joi.string().required().messages({
    'string.base': 'Please add a profile picture',
    'string.email': 'Profile picture is required',
    'string.empty': 'Profile picture is required'
  })
});
export { signupSchema };