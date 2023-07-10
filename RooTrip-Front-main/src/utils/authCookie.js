import Cookies from 'js-cookie';

// refreshToken을 쿠키에 저장하는 함수
// session cookie 브라우저가 닫히면 만료
export function setRefreshToken(token) {
  Cookies.set('refreshToken', token);
}

// refreshToken을 쿠키에서 가져오는 함수
export function getRefreshToken() {
  return Cookies.get('refreshToken');
}

// refreshToken을 쿠키에서 삭제하는 함수
export function removeRefreshToken() {
  Cookies.remove('refreshToken');
}
