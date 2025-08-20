import { createRequest } from '../request/create-request';

// -------- Sign In --------
export const loginAction = async (input: {
  email?: string;
  username?: string;
  password: string;
  rememberMe?: boolean;
}) => {
  const payload = {
    username: input.username?.toLowerCase(),
    email: input.email?.toLowerCase(),
    password: input.password,
    rememberMe: input.rememberMe ?? true,
  };

  // Just call the API. The browser will automatically set the cookies
  // that the backend sends in the response header. That's it!
  const responseData = await createRequest(
    'POST',
    '/auth/signin'
  )({
    body: payload,
    withoutAuth: true,
  });
  console.log('loginAction completed successfully. Returning data:', responseData);

  // Return the response so the UI knows it was successful.
  return responseData;
};

// -------- Sign Up --------
export const registerAction = async (input: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const payload = {
    username: input.username.toLowerCase(),
    email: input.email.toLowerCase(),
    password: input.password,
    confirmPassword: input.confirmPassword,
  };

  return await createRequest(
    'POST',
    '/auth/signup'
  )({
    body: payload,
    withoutAuth: true,
  });
};

// -------- Verify OTP --------
export const verifyOtpAction = async (input: { email: string; otp: string }) => {
  return await createRequest(
    'PATCH',
    '/auth/verify-otp'
  )({
    body: input,
    withoutAuth: true,
  });
};

export const resendOtpAction = async (input: { email: string }) => {
  return await createRequest(
    'PATCH',
    '/auth/resend-otp'
  )({
    body: input,
    withoutAuth: true, // This is a public action, no token needed
  });
};
