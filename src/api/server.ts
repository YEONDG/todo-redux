type Login = {
  id: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    // 필요한 사용자 정보 추가 가능
  };
};

export const login = ({ id, password }: Login): Promise<LoginResponse> => {
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
