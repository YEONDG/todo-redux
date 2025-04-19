import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// 리듀서들 import
import authReducer from './slices/authSlice';
import todoReducer from './slices/todoSlice'; // 기존 todo 리듀서

// 루트 사가 import
import rootSaga from './sagas';

// Saga 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

// 스토어 설정
export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    // 다른 리듀서들 추가
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Saga 실행
sagaMiddleware.run(rootSaga);

// 타입스크립트를 위한 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 커스텀 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
