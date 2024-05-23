import Joi, { ObjectSchema } from 'joi';

const passwordValidation = Joi.string().min(8).max(18).required().messages({
  'string.base': 'Password must be of type string',
  'string.min': 'Password must contain at least 8 characters',
  'string.max': 'Password must contain less than 18 characters',
  'string.empty': 'Password is required'
});

const forgotPasswordEmailSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.base': 'Field must be valid',
    'string.required': 'Field must be valid',
    'string.email': 'Field must be valid'
  })
});

const resetPasswordSchema: ObjectSchema = Joi.object().keys({
  password: passwordValidation,
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords should match',
    'any.required': 'Confirm password is a required field'
  })
});

const changePasswordSchema: ObjectSchema = Joi.object().keys({
  currentPassword: passwordValidation,
  newPassword: passwordValidation
});

export { forgotPasswordEmailSchema, resetPasswordSchema, changePasswordSchema };
