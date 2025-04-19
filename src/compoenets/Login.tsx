import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loginRequest } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ id, password }));
  };

  if (isAuthenticated) {
    return <div>이미 로그인되어 있습니다.</div>;
  }

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='id'>아이디:</label>
          <input type='text' id='id' value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='password'>비밀번호:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? '로딩 중...' : '로그인'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
