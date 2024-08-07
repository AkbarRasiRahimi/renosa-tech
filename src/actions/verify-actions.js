"use server";

import { VerificationToken } from "@/model/verification-token-model";
import { MESSAGES } from "@/enums/enums.js";
import { User } from "@/model/user-model";
import { redirect } from "next/navigation";
export const getVerifyExpiry = async (email) => {
  const verifiedUser = await User.findOne({ email });

  if (!verifiedUser || verifiedUser.emailVerified) {
    return redirect("/");
  }
  const verificationToken = await VerificationToken.findOne({ email });
  const now = Date.now();
  const expiry = verificationToken?.createdAt?.getTime() + 5 * 60 * 1000;
  if (expiry) {
    return Math.round((expiry - now) / 1000);
  }
  return null;
};

export const verifyEmail = async (email, verificationCode, recaptcha) => {
  const verifiedUser = await User.findOne({ email });

  if (!verifiedUser) {
    return {
      messages: MESSAGES.USER_NOT_FOUND,
    };
  }

  if (!verificationCode) {
    return {
      messages: MESSAGES.EMPTY_VERIFICATION_CODE,
    };
  }

  if (typeof recaptcha !== "string" || recaptcha.length < 6) {
    return {
      messages: MESSAGES.INVALID_RECAPTCHA,
    };
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
  });
  const result = await response.json();

  if (!result.success) {
    return {
      messages: MESSAGES.INVALID_RECAPTCHA,
    };
  }

  const verificationToken = await VerificationToken.findOne({ email });

  if (!verificationToken) {
    return {
      messages: MESSAGES.EMAIL_VERIFICATION_CODE_EXPIRED,
    };
  }

  const token = verificationToken.token;

  if (verificationCode !== token) {
    return {
      messages: MESSAGES.INVALID_VERIFICATION_CODE,
    };
  }

  verifiedUser.emailVerified = true;
  await verifiedUser.save();
  return {
    messages: MESSAGES.USER_ACTIVATED_SUCCESSFULLY,
  };
};
