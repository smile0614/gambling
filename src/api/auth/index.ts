/**
 * Auth API — mock implementation (no backend).
 *
 * Every function keeps its original name/signature so consumers are untouched,
 * but resolves locally with mock data instead of calling the server.
 */
import {
  LoginRequest,
  ResetPasswordRequest,
  SignUpEmailRequest,
  SignUpPhoneRequest,
  VerifyCodeRequest,
  VerifyRequestType,
} from '@/base/types/requestTypes';

import { mockLoginResponse } from '../_mock/db';
import { respond, respondCreated } from '../_mock/respond';

export const api_checkAuthKey = (key: string) => {
  return respond(true);
};

export const api_validateAuthToken = (token: string) => {
  return respond(true);
};

export const api_login = (data: LoginRequest) => {
  return respond(mockLoginResponse);
};

export const api_loginWithGoogle = (code: string, referralCode: string) => {
  return respond(mockLoginResponse);
};

export const api_loginWithGooglePop = (token: string, referralCode: string) => {
  return respond(mockLoginResponse);
};

export const api_loginWithTelegram = (data: any) => {
  return respond(mockLoginResponse);
};

export const api_loginWithWallet = (address: string, signature: string, referralCode: string) => {
  return respond(mockLoginResponse);
};

export const api_verify = (data: VerifyCodeRequest) => {
  return respond(mockLoginResponse);
};

export const api_sendMail = (email: string, request: VerifyRequestType) => {
  return respond({ success: true });
};

export const api_signupWithEmail = (data: SignUpEmailRequest) => {
  return respondCreated({ success: true });
};

export const api_sendMailToUser = (email: string, request: VerifyRequestType) => {
  return respond({ success: true });
};

export const api_sendSMSToUser = (phone: string, request: VerifyRequestType) => {
  return respond({ success: true });
};

export const api_verifyCodeToUser = (data: VerifyCodeRequest) => {
  return respond({ success: true });
};

export const api_signupWithPhone = (data: SignUpPhoneRequest) => {
  return respondCreated({ success: true });
};

export const api_forgetPassword = (email: string) => {
  return respond({ success: true });
};

export const api_sendSMS = (phone: string, request: VerifyRequestType) => {
  return respond({ success: true });
};

export const api_sendVerifyQRCode = (email: string) => {
  return respond({ success: true });
};

export const api_resetPassword = (data: ResetPasswordRequest) => {
  return respond({ success: true });
};

export const api_validateToken = (token: string) => {
  return respond(true);
};

export const api_getSetLogin = () => {
  return respond({ isSetLogin: true });
};

export const api_setLoginPassword = (password: string) => {
  return respond({ success: true });
};

export const api_changePassword = (
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
  codeOtp: string = '',
) => {
  return respond({ success: true });
};

export const api_get2FAStatus = (email: string) => {
  // Returning false keeps the login flow single-step (no 2FA prompt).
  return respond(false);
};

export const api_requestSelfExclusion = async (disabledTo: number) => {
  return respond({ success: true });
};

export const api_setSelfExclusion = async (token: string, disabledTo: number) => {
  return respond({ success: true });
};
