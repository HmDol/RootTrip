import {
  INVALID_NAME_ERROR,
  EMAIL_VERIFICATION_NOT_COMPLETED_ERROR,
  INVALID_NICKNAME_ERROR,
  INVALID_PASSWORD_ERROR,
  PASSWORD_MISMATCH_ERROR,
  UNKNOWN_ERROR,
} from '@constants/error';

const NAME = 'name';
const EMAIL = 'email';
const NICKNAME = 'nickname';
const PASSWORD = 'password';
const PASSWORD2 = 'password2';

function showError(errorType) {
  let error = '';
  switch (errorType) {
    case NAME:
      error = INVALID_NAME_ERROR;
      break;

    case EMAIL:
      error = EMAIL_VERIFICATION_NOT_COMPLETED_ERROR;
      break;

    case NICKNAME:
      error = INVALID_NICKNAME_ERROR;
      break;

    case PASSWORD:
      error = INVALID_PASSWORD_ERROR;
      break;
    case PASSWORD2:
      error = PASSWORD_MISMATCH_ERROR;
      break;

    default:
      error = UNKNOWN_ERROR;
      break;
  }

  return error;
}

export default showError;
