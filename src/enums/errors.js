export const SIGN_UP_FAILED = 'Failed to sign up.'
export const FORBIDDEN_IP = 'You do not have permission to access this page.'
export const IP_EXIST = 'IP address is duplicated.'
export const INVALID_IP = 'Invalid IP address.'
export const QUERY_PARAMS = 'Invalid Query Params.'
export const FILL_ALL_REQUIRED_FIELDS = 'Please fill out all required fields.'
export const REQUIRED = 'This field is required.'
export const USERNAME_OR_PASSWORD_NOT_VALID = 'Invalid username or password.'
export const INCORRECT_PASSWORD = 'Incorrect password.'
export const ACCOUNT_IS_NOT_ACTIVATED = 'Your account is not activated.'
export const ACTIVATION_CODE_IS_WRONG = 'The activation code is incorrect.'
export const CATEGORY_NOT_FOUND = 'Category not found.'
export const PARENT_CATEGORY_NOT_FOUND = 'Parent category not found.'
export const PARENT_CATEGORY_ERROR = 'Parent category cannot be itself.'
export const PRODUCT_DOES_NOT_FOUND = 'Such product does not exist.'
export const SHOULD_BE_PERSIAN =
  'Please enter Persian characters in Persian fields.'
export const SHOULD_BE_ENGLISH =
  'Please enter English characters in English fields.'
export const INVALID_INPUT = 'Invalid input.'
export const INVALID_EMAIL = 'Invalid email.'
export const INVALID_DISPLAY_NAME = 'Invalid display name.'
export const INVALID_PASSWORD = 'Invalid password.'
export const INVALID_TOKEN = 'Invalid security token.'
export const INVALID_EXCHANGE_NAME = 'Invalid exchange name.'
export const INVALID_API_KEY = ' Invalid api key.'
export const INVALID_SECRET_KEY = ' Invalid secret key.'
export const INVALID_BASE_URL = ' Invalid base url.'
export const TOKEN_NOT_FOUND = 'Security token not found.'
export const TOKEN_INVALID = 'Invalid security token.'
export const INVALID_RECAPTCHA = 'Invalid reCAPTCHA.'
export const TOKEN_EXPIRED = 'Token expired.'
export const INTERNAL_SERVER_ERROR = 'Server error.'
export const UNAUTHORIZED = 'Unauthorized.'
export const FORBIDDEN = 'Access denied.'
export const SIGN_IN_REQUIRED = 'Please sign in again.'
export const GONE =
  'The requested resource could not be found. Please reload the page.'
export const INVALID_JSON = 'Invalid JSON.'
export const LARGE_IMAGE = 'Image is too large.'
export const NOT_SET_PASSWORD = 'You have not set a password yet.'
export function TOO_FAST(reqTime, timeUnit) {
  return `You cannot send the code again within ${reqTime} ${timeUnit}.`
}
export function NOT_VALID(noun) {
  return `${noun} is not valid.`
}
export function EXIST(noun) {
  return `${noun} is duplicated.`
}
export function NOT_FOUND(noun = '') {
  return `${noun} not found.`
}
export function LEAST_X_CHARACTERS_AND_MAX_Y_CHARACTERS(noun, x, y) {
  return `${noun} must be at least ${x} and at most ${y} characters long.`
}
export function MAX_X_CHARACTERS(noun, x) {
  return `${noun} must be at most ${x} characters long.`
}
export function MIN_X_CHARACTERS(noun, x) {
  return `${noun} must be at least ${x} characters long.`
}
export function MIN_X_ITEMS(noun, x) {
  return `At least ${x} ${noun} must be present.`
}
export function CAN_NOT_DELETE_BECAUSE_X_HAS_RELATION_TO_Y(x, y) {
  return `You cannot delete ${x} because it has a relationship with ${y}. Please delete the relationship first.`
}
export function EXPIRED(x) {
  return `${x} is expired.`
}
export function INVALID(x) {
  return `${x} is invalid.`
}
export function CAN_NOT_SIGN_IN_UNTIL_SECONDS(x) {
  return `You cannot sign in for up to ${x} seconds.`
}
export function CAN_NOT_CREATE_MORE_THAN_X(noun, x) {
  return `You cannot create more than ${x} ${noun}.`
}
export function SHOULD_BE_INTEGER(noun) {
  return `${noun} must be an integer.`
}
export function SHOULD_BE_STRING(noun) {
  return `${noun} must be a string.`
}
export function SHOULD_BE_BOOLEAN(noun) {
  return `${noun} must be a boolean.`
}
export function SHOULD_BE_ARRAY(noun) {
  return `${noun} must be an array.`
}
export function SHOULD_BE_UUID(noun) {
  return `${noun} must be a UUID.`
}
export function SHOULD_BE_INT_AND_GT_X(noun, x) {
  return `${noun} must be an integer greater than ${x}.`
}
export function SHOULD_BE_DATE(noun) {
  return `${noun} must be of the Date type.`
}
export function SHOULD_BE_TIMESTAMP(noun) {
  return `${noun} must be of the Timestamp type with the format YYYY-MM-DDTHH:mm:ssZ.`
}
export function SHOULD_BE_BEFORE(noun) {
  return `${noun} should be before than todays date.`
}
export function FROMDATE_SHOULD_BE_BEFORE_TODATE() {
  return `The time interval is incorrect.`
}
export function SHOULD_BE_UNIXTIME(noun) {
  return `${noun} must be Unixtime.`
}
