import axios from 'axios';
import { MAIN_SERVER } from '@config/setting';

/**
 * 선택한 마커의 게시글 가져오기
 * @param {String} accessToken accessToken
 * @param {String} postId 게시글 아이디
 * @returns
 */
export async function getOnePost(accessToken, postId) {
  const { status, data, message } = await axios
    .get(`${MAIN_SERVER}/api/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return data;
}

/**
 * 마커 정보 받기
 * @param {*} accessToken accessToken
 * @returns
 */
export async function getPosts(accessToken, viewType, polygon, markerCount) {
  const { status, data, message } = await axios
    .get(
      `${MAIN_SERVER}/api/post?viewType=${viewType}&polygon=${polygon}&markerCount=${markerCount}`,
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
 * 게시글 생성
 * @param {String} accessToken
 * @param {Object} post 사진, 경로 순서, 게시글 내용
 * @returns
 */
export async function createPost(accessToken, post) {
  const { status, data, message } = await axios
    .post(`${MAIN_SERVER}/api/post`, post, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return { status, data, message };
}

/**
 * 게시글 삭제
 * @param {String} accessToken accessToekn
 * @param {String} postId 게시글 Id
 * @returns
 */
export async function deletePost(accessToken, postId) {
  const { status, message } = await axios
    .delete(`${MAIN_SERVER}/api/post/${postId}`, {
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
 * 댓글 생성
 * @param {String} accessToken accessToken
 * @param {Numebr} postId 게시글 아이디
 * @param {String} comment 댓글 내용
 * @returns
 */
export async function createComment(accessToken, postId, comment) {
  const { status, message } = await axios
    .post(
      `${MAIN_SERVER}/api/post/${postId}/comment`,
      { comment },
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
 * 추천 기능
 * @param {String} accessToken accessToken
 * @param {String} postId 게시글 ID
 * @returns
 */
export async function likePost(accessToken, postId) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/post/${postId}/like`, null, {
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
 * 추천 취소 기능
 * @param {String} accessToken  accessToken
 * @param {String} postId 게시글 ID
 * @returns
 */
export async function unLikePost(accessToken, postId) {
  const { status, message } = await axios
    .post(`${MAIN_SERVER}/api/post/${postId}/unLike`, null, {
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
 * 댓글 받아오기
 * @param {String} accessToken accessToken
 * @param {String} postId 게시글 ID
 * @returns
 */
export async function getComments(accessToken, postId) {
  const { status, data, message } = await axios
    .get(`${MAIN_SERVER}/api/post/${postId}/comment`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => new Error(e.message));

  if (!status) throw new Error(message);
  return data;
}
