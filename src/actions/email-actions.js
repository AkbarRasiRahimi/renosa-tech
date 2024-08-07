"use server";

import nodemailer from "nodemailer";
import { ERRORS, MESSAGES } from "@/enums/enums.js";
import { ResetToken } from "@/model/reset-token-model";
import { VerificationToken } from "@/model/verification-token-model";
import { User } from "@/model/user-model";


const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: `Email Verification  ${token}`,
    text: `Your verification code is: ${token}`,
  };

  await transporter.sendMail(mailOptions);
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendResetPasswordEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: `Password Reset`,
    text: `Please go to the following link to reset your password: ${process.env.NEXTAUTH_URL}/reset-password/${token}`,
  };

  await transporter.sendMail(mailOptions);
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerifyEmail = async (email) => {
  try {
    const verificationCode = generateVerificationCode();
    const verificationToken = new VerificationToken({
      token: verificationCode,
      email,
    });

    await verificationToken.save();
    await sendVerificationEmail(email, verificationToken.token);
    return true;
  } catch (error) {
    return false;
  }
};

const sendResetPasswordLink = async (prevState, formData) => {
  const email = formData.get("email");
  const recaptcha = formData.get("recaptcha");

  let errors = {};
  let messages = {};

  if (typeof email !== "string" || !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(email)) {
    errors.email = ERRORS.INVALID_EMAIL;
  }

  if (typeof recaptcha !== "string" || recaptcha.length < 6) {
    errors.recaptcha = ERRORS.INVALID_RECAPTCHA;
  }

  if (Object.keys(errors).length > 0) {
    return { errors, messages };
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      messages = MESSAGES.USER_NOT_FOUND;
      return {
        messages,
      };
    }

    const resetTokenExists = await ResetToken.findOne({ email });
    if (resetTokenExists) {
      messages = MESSAGES.RESET_TOKEN_EXIST;
      return {
        messages,
      };
    }

    const resetToken = generateResetToken();
    const resetTokenEntry = new ResetToken({
      token: resetToken,
      email,
    });

    await resetTokenEntry.save();
    await sendResetPasswordEmail(email, resetToken);
    messages = MESSAGES.RESET_TOKEN_SUCCESSFULLY;
    return {
      messages,
    };
  } catch (error) {
    messages = MESSAGES.FAILED_OPERATION;
    return {
      messages,
    };
  }
};

const generateResetToken = () => {
  return Array.from({ length: 32 }, () => String.fromCharCode(Math.floor(65 + Math.random() * 26))).join("");
};

export default sendVerifyEmail;
export { sendResetPasswordLink };
