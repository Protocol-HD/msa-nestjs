export const OAUTH_URIS = {
  KAKAO: {
    GET_TOKEN:
      'https://kauth.kakao.com/oauth/token?grant_type=authorization_code',
    GET_USER_INFO: 'https://kapi.kakao.com/v2/user/me',
  },
  NAVER: {
    GET_TOKEN:
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code',
    GET_USER_INFO: 'https://openapi.naver.com/v1/nid/me',
  },
};
