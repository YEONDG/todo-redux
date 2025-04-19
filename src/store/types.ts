export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export interface RootState {
  todos: Todo[];
}

// 인증 관련 타입 정의
export type LoginCredentials = {
  id: string;
  password: string;
};

export type User = {
  userId: string;
  // 필요한 사용자 정보 추가 가능
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data?: User;
};

// 인증 상태 타입
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
