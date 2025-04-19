import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';
import { LoginCredentials, LoginResponse } from '../types';
import { login } from '../../api/server';

// 로그인 처리를 위한 사가 함수
function* loginSaga(action: PayloadAction<LoginCredentials>) {
  try {
    // API 호출 (call 이펙트 사용)
    const response: LoginResponse = yield call(login, action.payload);

    // 성공 시 loginSuccess 액션 디스패치
    if (response.success && response.data) {
      yield put(loginSuccess(response.data));
      // 필요시 로컬 스토리지에 토큰 저장
      // localStorage.setItem('token', response.data.token);
    } else {
      yield put(loginFailure(response.message));
    }
  } catch (error) {
    // 에러 발생 시 loginFailure 액션 디스패치
    if (error instanceof Error) {
      yield put(loginFailure(error.message));
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      yield put(loginFailure(String(error.message)));
    } else {
      yield put(loginFailure('로그인 중 오류가 발생했습니다.'));
    }
  }
}

// 인증 관련 사가 모음
export function* authSaga() {
  // loginRequest 액션이 디스패치되면 loginSaga 실행
  yield takeLatest(loginRequest.type, loginSaga);
  // 필요시 다른 인증 관련 사가 추가 가능
}
