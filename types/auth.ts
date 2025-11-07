// types/auth.ts

export interface PasswordResetUser {
  identifier: string;
  email: string;
  phone: string;
  maskedEmail: string;
  maskedPhone: string;
  verificationMethod?: "email" | "phone";
  otp?: string;
  otpTimestamp?: number;
  otpVerified?: boolean;
}

export type VerificationMethod = "email" | "phone";
