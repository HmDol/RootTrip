import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 검색한 게시글 보여주기
 * @param {String} accessToken accessToken
 * @param {Array} cities 검색 도시
 * @returns
 */
async function getRecommendPost(accessToken, cities) {
  const { status, data, message } = await axios
    .post(
      `${MAIN_SERVER}/api/route`,
      { cities },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return data;
}

/**
 * 좋아요 게시글 가져오기
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function likedArticle(accessToken) {
  const { status, message, ...token } = await axios
    .post(`${MAIN_SERVER}/api/mypage/activity/likes`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));
  if (!status) throw new Error(message);
  return token.data;
}

/**
 * 저장된 게시글 가져오기
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function savedArticle(accessToken) {
  const { status, message, ...token } = await axios
    .post(`${MAIN_SERVER}/api/mypage/activity/saved/trip-posts`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));
  if (!status) throw new Error(message);
  return token.data;
}

/**
 * 나의 게시글 가져오기
 * @param {String} accessToken client 측의 accessToken
 * @returns message (message or Error)
 */
export async function myTripArticle(accessToken) {
  const { status, message, ...token } = await axios
    .post(`${MAIN_SERVER}/api/mypage/activity/upload-post`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));
  if (!status) throw new Error(message);
  return token.data;
}

export default getRecommendPost;
