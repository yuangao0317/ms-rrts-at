import { IResponse } from 'src/shared/common.interface';
import { api } from 'src/store/api';

import { ISignInPayload, ISignUpPayload } from '../interfaces/auth.interface';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<IResponse, ISignUpPayload>({
      query(body: ISignUpPayload) {
        return {
          url: '/auth/signup',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Auth']
    }),
    signIn: builder.mutation<IResponse, ISignInPayload>({
      query(body: ISignInPayload) {
        return {
          url: '/auth/signin',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Auth']
    }),
    logout: builder.mutation<IResponse, void>({
      query() {
        return {
          url: '/auth/signout',
          method: 'POST',
          body: {}
        };
      },
      invalidatesTags: ['Auth']
    }),
    resendEmail: builder.mutation<IResponse, { userId: number; email: string }>({
      query(data) {
        return {
          url: '/auth/resend-email',
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Auth']
    }),
    verifyEmail: builder.mutation<IResponse, string>({
      query(token: string) {
        return {
          url: '/auth/verify-email',
          method: 'PUT',
          body: { token }
        };
      },
      invalidatesTags: ['Auth']
    }),
    checkCurrentUserSession: builder.query<IResponse, void>({
      query: () => 'auth/currentuser',
      providesTags: ['Currentuser']
    }),
    forgotPassword: builder.mutation<IResponse, string>({
      query(email: string) {
        return {
          url: 'auth/forgot-password',
          method: 'PUT',
          body: { email }
        };
      },
      invalidatesTags: ['Auth']
    }),
    resetPassword: builder.mutation<IResponse, { password: string; confirmPassword: string; token: string }>({
      query(data) {
        return {
          url: `auth/reset-password/${data.token}`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['Auth']
    })
  })
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useResendEmailMutation,
  useVerifyEmailMutation,
  useCheckCurrentUserSessionQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
