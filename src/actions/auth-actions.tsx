"use server";

import { ERRORS, MESSAGES } from "@/enums/enums.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/model/user-model";
import { ResetToken } from "@/model/reset-token-model";
import sendVerifyEmail from "@/actions/email-actions";
import { VerificationToken } from "@/model/verification-token-model";

type FormData = {
  token?: string;
  email?: string;
  password?: string;
  displayName?: string;
  recaptcha?: string;
};

type FormState = {
  errors?: {
    email?: string;
    password?: string;
    recaptcha?: string;
    display_name?: string;
  };
  messages?: {
    type?: string;
    text?: string;
  };
};

export async function signUpAction(prevState: FormState, formData: FormData) {
  const email = formData.email;
  const password = formData.password || "";
  const displayName = formData.displayName;
  const recaptcha = formData.recaptcha;

  let errors: FormState["errors"] = {};
  let messages: FormState["messages"] = {};

  if (typeof displayName !== "string" || displayName.length < 3 || displayName.length > 255) {
    errors.display_name = ERRORS.INVALID_DISPLAY_NAME;
  }

  if (typeof email !== "string" || !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(email)) {
    errors.email = ERRORS.INVALID_EMAIL;
  }

  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    errors.password = ERRORS.INVALID_PASSWORD;
  }

  if (typeof recaptcha !== "string" || recaptcha.length < 6) {
    errors.recaptcha = ERRORS.INVALID_RECAPTCHA;
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
    errors.recaptcha = ERRORS.INVALID_RECAPTCHA;
    return {
      errors,
      messages,
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      messages,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    uid: uuidv4(),
    email,
    displayName,
    password: hashedPassword,
    emailVerified: false,
    disabled: false,
  });

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      messages = MESSAGES.EMAIL_EXISTS;
      return {
        errors,
        messages,
      };
    }

    await newUser.save();
    const sendVerifyRes = await sendVerifyEmail(email);

    if (sendVerifyRes) {
      return {
        errors: {},
        messages: MESSAGES.NEW_EMAIL_VERIFICATION(email),
      };
    } else {
      return {
        errors: {},
      };
    }
  } catch (error: any) {
    return {
      errors,
      messages: {
        type: "warning",
        text: error.message,
      },
    };
  }
}

export async function signInAction(prevState: FormState, formData: FormData) {
  const email = formData.email;
  const password = formData.password || "";
  const recaptcha = formData.recaptcha;

  console.log(email, password);

  let errors: FormState["errors"] = {};
  let messages: FormState["messages"] = {};

  if (typeof email !== "string" || !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(email)) {
    errors.email = ERRORS.INVALID_EMAIL;
  }

  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    errors.password = ERRORS.INVALID_PASSWORD;
  }

  if (typeof recaptcha !== "string" || recaptcha.length < 6) {
    errors.recaptcha = ERRORS.INVALID_RECAPTCHA;
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
    errors.recaptcha = ERRORS.INVALID_RECAPTCHA;
    return {
      errors,
      messages,
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      messages,
    };
  }

  const user = await User.findOne({ email });
  if (!user) {
    messages = MESSAGES.USER_NOT_FOUND;
    return {
      errors,
      messages,
    };
  } else if (user.disabled) {
    messages = MESSAGES.USER_DISABLED;
    return {
      errors,
      messages,
    };
  } else if (!user.emailVerified) {
    messages = MESSAGES.EMAIL_NOT_VERIFIED;

    const verificationToken = await VerificationToken.findOne({ email });
    if (!verificationToken) {
      const sendVerifyRes = await sendVerifyEmail(email);
      if (sendVerifyRes) {
        return {
          errors: {},
          messages: MESSAGES.MUST_EMAIL_VERIFICATION(),
        };
      } else {
        return {
          errors: {},
          messages: MESSAGES.FAILED_OPERATION,
        };
      }
    } else {
      messages = MESSAGES.MUST_EMAIL_VERIFICATION();
    }

    return {
      errors,
      messages,
    };
  } else if (!(await bcrypt.compare(password, user.password))) {
    messages = MESSAGES.INVALID_PASSWORD;
    return {
      errors,
      messages,
    };
  } else {
    messages = MESSAGES.LOGGED_IN_SUCCESSFULLY;
    return {
      errors,
      messages,
    };
  }
}

export async function resetPassword(prevState: FormState, formData: FormData) {
  const token = formData.token;
  const password = formData.password || "";
  const recaptcha = formData.recaptcha;

  let errors: FormState["errors"] = {};
  let messages: FormState["messages"] = {};

  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    errors.password = ERRORS.INVALID_PASSWORD;
  }

  if (typeof recaptcha !== "string" || recaptcha.length < 6) {
    errors.recaptcha = ERRORS.INVALID_RECAPTCHA;
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
    errors.recaptcha = ERRORS.INVALID_RECAPTCHA;
    return {
      errors,
      messages,
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      messages,
    };
  }

  const resetTokenExists = await ResetToken.findOne({ token });

  if (!resetTokenExists) {
    messages = MESSAGES.INVALID_TOKEN;
    return { errors, messages };
  }

  const email = resetTokenExists.email;
  const user = await User.findOne({ email });

  console.log(email);

  if (!user) {
    messages = MESSAGES.USER_NOT_FOUND;
    return { errors, messages };
  }

  user.password = await bcrypt.hash(password, 10);
  await user.save();
  messages = MESSAGES.PASSWORD_RESET_SUCCESSFULLY;
  return { errors, messages };
}

export const checkResetToken = async (resetToken: string) => {
  try {
    const resetTokenExists = await ResetToken.findOne({ token: resetToken });
    if (resetTokenExists) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Modify your getUserProfile function
export const getUserProfile = async (email: string) => {
  const user = await User.findOne({ email }).lean(); // Use .lean() to get a plain JavaScript object
  return user;
};
