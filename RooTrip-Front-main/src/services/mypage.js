import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

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
 * @param {Object} sexForm 변경할 닉네임
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
