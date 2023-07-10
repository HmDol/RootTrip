import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 회원가입
 * @param {Object} registerForm 이름, 닉네임, 이메일, 비밀번호
 * @returns message (message or Error)
 */
export async function register(registerForm) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/auth/register`, registerForm)
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return status;
}

/**
 * accessToken 재발급
 * @param {String} refreshToken client 측의 refreshToken
 * @returns message (message or Error)
 */
export async function reIssue(refreshToken) {
  const { status, message, ...token } = await axios
    .post(`${MAIN_SERVER}/api/auth/token/reissue`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return token.data;
}

/**
 * 이메일, 닉네임 중복 체크
 * @param {String} type 중복 확인할 타입
 * @param {String} data 입력한 값
 * @returns message (message or Error)
 */
export async function findOne(type, data) {
  const { status, message } = await axios
    .get(`${MAIN_SERVER}/api/auth/check?type=${type}&data=${data}`)
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return status;
}

/**
 * 로그아웃
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function logout(accessToken) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return status;
}

/**
 * 로그인
 * @param {Object} loginForm 이메일, 비밀번호
 * @returns message (message or Error)
 */
export async function login(loginForm) {
  const { status, message, ...token } = await axios
    .post(`${MAIN_SERVER}/api/auth/login`, loginForm)
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return token.data;
}

/**
 * 소셜 로그인 (카카오톡, 네이버, 구글)
 * @param {String} provider 소셜 제공자
 * @param {String} code 로그인 코드
 * @returns accessToken, refreshToken, expire
 */
export async function socialLogin(provider, code) {
  const { status, message, ...token } = await axios
    .post(`${MAIN_SERVER}/api/auth/social`, {
      provider,
      code,
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return token.data;
}

/**
 * 닉네임 변경
 * @param {Object} nicknameForm 변경할 닉네임
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function changeNickname(nicknameForm, accessToken) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/mypage/account/edit/nickname`, nicknameForm, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));
  if (!status) throw new Error(message);
  return status;
}

/**
 * 성별 변경
 * @param {Object} sexForm 변경할 성별
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function changeSex(sexForm, accessToken) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/mypage/account/edit/gender`, sexForm, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));
  if (!status) throw new Error(message);
  return status;
}

/**
 * 비밀번호 변경
 * @param {Object} passwordForm 변경할 닉네임
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function changePassword(passwordForm, accessToken) {
  const { status, message } = await axios
    .post(
      `${MAIN_SERVER}/api/mypage/account/personal-info/change-password`,
      passwordForm,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => new Error(e.message));
  if (!status) throw new Error(message);
  return status;
}

/**
 * 회원탈퇴
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function goUnsigned(accessToken) {
  const { status, message, ...token } = await axios
    .post(`${MAIN_SERVER}/api/mypage/account/personal-info/withdrawal`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));
  if (!status) throw new Error(message);

  return status;
}
