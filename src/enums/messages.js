export const USER_ALREADY_SIGNED_UP = {
  type: 'warning',
  text: 'You have already signed up.',
}
export const USER_NOT_FOUND = {
  type: 'warning',
  text: 'User not found.',
}
export const USER_DISABLED = {
  type: 'warning',
  text: 'User is disabled.',
}
export const EMAIL_NOT_VERIFIED = {
  type: 'warning',
  text: 'Email is not verified.',
}
export const EXCHANGE_EXISTS = {
  type: 'warning',
  text: 'Exchange already exists.',
}
export const RESET_TOKEN_EXIST = {
  type: 'warning',
  text: 'Reset token already exists. Control your email to reset your password.',
}
export const RESET_TOKEN_SUCCESSFULLY = {
  type: 'success',
  text: 'Reset token has been sent to your email.',
}
export const EXCHANGE_ADDED = {
  type: 'success',
  text: 'Exchange has been successfully added.',
}
export const PASSWORD_RESET_SUCCESSFULLY = {
  type: 'success',
  text: 'Password has been successfully reset.',
}
export const INVALID_PASSWORD = {
  type: 'warning',
  text: 'Invalid password.',
}
export const INVALID_TOKEN = {
  type: 'warning',
  text: 'Invalid token.',
}
export const FAILED_OPERATION = {
  type: 'warning',
  text: 'Something went wrong. Please try again.',
}
export const INVALID_VERIFICATION_CODE = {
  type: 'warning',
  text: 'Invalid verification code.',
}
export const EMPTY_VERIFICATION_CODE = {
  type: 'warning',
  text: 'Verification code is empty.',
}
export const USER_SIGNED_UP_SUCCESSFULLY = {
  type: 'success',
  text: 'Registration successful. Activation code has been sent to your phone number.',
}
export const LOGGED_IN_SUCCESSFULLY = {
  type: 'success',
  text: 'Login to the system was successful.',
}
export const LOGGED_OUT_SUCCESSFULLY = {
  type: 'success',
  text: 'Logout from the system was successful.',
}
export const NOT_LOGGED_IN = {
  type: 'warning',
  text: 'You are not logged in.',
}
export const USER_ACTIVATED_SUCCESSFULLY = {
  type: 'success',
  text: 'User account has been activated.',
}
export const USER_DEACTIVATED_SUCCESSFULLY = {
  type: 'warning',
  text: 'User account has been deactivated.',
}
export function MULTIPLE_USER_STATE_CHANGED(count, isActive) {
  return {
    type: `${isActive ? 'success' : 'warning'}`,
    text: `Number of ${isActive ? 'active' : 'inactive'} user accounts has been changed to ${count}.`,
  }
}
export function ACCESS_REVOKED_SUCCESSFULLY(count) {
  return {
    type: 'warning',
    text: `Number of security tokens has been successfully revoked ${count}.`,
  }
}
export function PUBLISHED_SUCCESSFULLY(noun) {
  return {
    type: 'warning',
    text: `${noun} has been successfully published.`,
  }
}
export function DATA_SUBMITTED_SUCCESSFULLY(noun) {
  return {
    type: 'success',
    text: `${noun} has been successfully submitted.`,
  }
}
export function DATA_EDITED_SUCCESSFULLY(noun) {
  return {
    type: 'success',
    text: `${noun} has been successfully edited.`,
  }
}
export function DATA_DELETED_SUCCESSFULLY(noun, count) {
  return {
    type: 'success',
    text: `${count ? `Number of ${count}` : ''} ${noun} has been successfully deleted.`,
  }
}
export function DATA_RECOVERED_SUCCESSFULLY(noun) {
  return {
    type: 'success',
    text: `${noun} has been successfully recovered.`,
  }
}
export function TIME_REMAINING_MINUTES_SECONDS(min, sec) {
  return `You can send verification code again after ${min} minute and ${sec} seconds.`
}
export function X_ADDED_TO_Y_SUCCESSFULLY(x, y) {
  return {
    type: 'success',
    text: `${x} has been successfully added to ${y}.`,
  }
}
export function X_SENT_SUCCESSFULLY(x) {
  return {
    type: 'success',
    text: `${x} has been successfully sent.`,
  }
}
export function X_VALIDATED_SUCCESSFULLY(x) {
  return {
    type: 'success',
    text: `${x} has been successfully validated.`,
  }
}
export function X_BANNED_SUCCESSFULLY(x) {
  return {
    type: 'success',
    text: `${x} has been successfully banned.`,
  }
}
export function NEW_EMAIL_VERIFICATION(email) {
  return {
    type: 'success',
    text: `Verification Pin has been sent to ${email}.`,
  }
}
export function MUST_EMAIL_VERIFICATION() {
  return {
    type: 'warning',
    text: `Email verification is required. Verification Pin has been sent to email.`,
  }
}
export const FAILED_USER_SIGN_UP = {
  type: 'warning',
  text: 'Registration failed.',
}
export const PASSWORD_RESET_CODE_SENT = {
  type: 'success',
  text: 'If the username or email is valid, the password reset code will be sent to you.',
}
export const PASSWORD_RESET_VERIFICATION_EMAIL_SENT = {
  type: 'success',
  text: 'If the username or email is valid, the activation link will be sent to you.',
}
export const EMAIL_VERIFIED_SUCCESSFULLY = {
  type: 'success',
  text: 'Your email has been successfully verified.',
}
export const EMAIL_EXISTS = {
  type: 'warning',
  text: 'Email already exists.',
}
export const EMAIL_ALREADY_VERIFIED = 'Your email has already been verified.'
export const EMAIL_VERIFICATION_CODE_EXPIRED = {
  type: 'warning',
  text: 'The verification link has expired.',
}
export const EMAIL_VERIFICATION_CODE_NOT_FOUND =
  'The verification link is invalid.'
