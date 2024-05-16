import { ISignInPayload, ISignUpPayload } from 'src/features/auth/interfaces/auth.interface';
import { object, ObjectSchema, string } from 'yup';

const loginUserSchema: ObjectSchema<ISignInPayload> = object({
  username: string()
    .required({ username: 'Username is a required field' })
    .min(6, { username: 'Invalid username' })
    .max(18, { username: 'Invalid username' }),
  password: string()
    .required({ password: 'Password is a required field' })
    .min(8, { password: 'Invalid password' })
    .max(18, { password: 'Invalid password' }),
  browserName: string().optional().nullable().notRequired(),
  deviceType: string().optional().nullable().notRequired()
});

const registerUserSchema: ObjectSchema<ISignUpPayload> = object({
  username: string()
    .required({ username: 'Username is a required field' })
    .min(6, { username: 'Username must contain at least 6 characters' })
    .max(18, { username: 'Username must contain less than 18 characters' }),
  password: string()
    .required({ password: 'Password is a required field' })
    .min(8, { password: 'Password must contain at least 6 characters' })
    .max(18, { password: 'Password must contain less than 18 characters' }),
  email: string().email({ email: 'Email is a required field' }).required({ email: 'Email is a required field' }),
  country: string().notOneOf(['Select Country'], { country: 'Select a country' }).required({ country: 'Country is a required field' }),
  profilePicture: string().required({ profilePicture: 'Profile picture is a required field' }),
  browserName: string().optional().nullable().notRequired(),
  deviceType: string().optional().nullable().notRequired()
});

export { loginUserSchema, registerUserSchema };
