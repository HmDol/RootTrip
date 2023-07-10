import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 이메일 인증 코드 전송 함수
 * @param {*} email 이메일
 * @returns 에러 메시지 or 성공
 */
export async function sendVerifyNumber(type, email) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/email/verify/send`, { type, email })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return status;
}

/**
 * 이메일 인증 코드 검증 함수
 * @param {*} value 이메일 인증 코드
 */
export async function authVerifyNumber(email, verifyNumber) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/email/verify/auth`, {
      email,
      verifyNumber,
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return status;
}

/**
 * auth 임시 비밀번호 발급 함수
 * @param {*} email 이메일, 인증 번호
 * @returns
 */
export async function sendPassword(email, verifyNumber) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/email/resetpassword`, {
      email,
      verifyNumber,
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return status;
}
