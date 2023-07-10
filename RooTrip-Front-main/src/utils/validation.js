import {
  regExpName,
  regExpEmail,
  regExpPassword,
  regExpNickname,
} from '@constants/regExp';
import { findOne } from '@services/auth';
import {
  INVALID_NAME_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_NICKNAME_ERROR,
  INVALID_PASSWORD_ERROR,
  UNKNOWN_ERROR,
} from '@constants/error';

// 데이터 이름
const NAME = 'name';
const EMAIL = 'email';
const NICKNAME = 'nickname';
const PASSWORD = 'password';

async function validate(type, data) {
  let error = '';
  let isValid = true;

  switch (type) {
    case NAME:
      // 이름 유효성 검사
      if (!regExpName.test(data)) {
        isValid = false;
        error = INVALID_NAME_ERROR;
      }

      break;

    case EMAIL:
      // 이메일 유효성 검사
      if (!regExpEmail.test(data)) {
        isValid = false;
        error = INVALID_EMAIL_ERROR;
        break;
      }

      break;
    case NICKNAME:
      // 닉네임 유효성 검사
      if (!regExpNickname.test(data)) {
        isValid = false;
        error = INVALID_NICKNAME_ERROR;
      }

      // 닉네임 중복 검사
      await findOne(type, data).catch((e) => {
        isValid = false;
        error = e.message;
      });

      break;
    case PASSWORD:
      // 비밀번호 유효성 검사
      if (!regExpPassword.test(data)) {
        isValid = false;
        error = INVALID_PASSWORD_ERROR;
      }

      break;
    default:
      isValid = false;
      error = UNKNOWN_ERROR;

      break;
  }

  return { isValid, error, type };
}

export default validate;
