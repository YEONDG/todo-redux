import { LoginCredentials, LoginResponse } from '../store/types';

// 로그인 API 함수
export const login = ({ id, password }: LoginCredentials): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id || !password) {
        reject({
          success: false,
          message: '아이디와 비밀번호를 모두 입력해주세요.',
        });
        return;
      }

      if (id === 'test' && password === '1234') {
        resolve({
          success: true,
          message: '로그인 성공',
          data: {
            userId: id,
          },
        });
      } else {
        reject({
          success: false,
          message: '아이디 또는 비밀번호가 올바르지 않습니다.',
        });
      }
    }, 3000);
  });
};
