import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
// 다른 사가들 import

// 루트 사가
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    // 다른 사가들 추가
  ]);
}
