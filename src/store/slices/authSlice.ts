import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';

// 초기 상태 정의
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그인 요청 액션
    loginRequest: (state, action: PayloadAction<{ id: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },

    // 로그인 성공 액션
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    // 로그인 실패 액션
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },

    // 로그아웃 액션
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

// 액션 생성자 내보내기
export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

// 리듀서 내보내기
export default authSlice.reducer;
