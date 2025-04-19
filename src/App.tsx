import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { addTodo, toggleTodo, removeTodo } from './store/slices/todoSlice';
import { loginRequest, logout } from './store/slices/authSlice';
import styles from './App.module.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const todolist = useAppSelector((state) => state.todos);
  const { isAuthenticated, loading, error, user } = useAppSelector((state) => state.auth);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ id, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      {!isAuthenticated ? (
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>로그인</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor='id'>아이디:</label>
              <input type='text' id='id' value={id} onChange={(e) => setId(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password'>비밀번호:</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit' disabled={loading} className={styles.loginButton}>
              {loading ? '로그인 중...' : '로그인'}
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <p className={styles.loginHint}>힌트: 아이디 'test', 비밀번호 '1234'로 로그인하세요.</p>
          </form>
        </div>
      ) : (
        <div className={styles.todoContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>투두리스트</h1>
            <div className={styles.userInfo}>
              <span>안녕하세요, {user?.userId}님!</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
              </button>
            </div>
          </div>

          <div className={styles.addTodo}>
            <input
              type='text'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder='할 일을 입력하세요'
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddTodo();
              }}
            />
            <button onClick={handleAddTodo}>추가</button>
          </div>

          <ul className={styles.todolist}>
            {todolist.map((item) => (
              <li key={item.id} className={`${styles.todo} ${item.isCompleted ? styles.completed : ''}`}>
                <span className={styles.item} onClick={() => handleToggleTodo(item.id)}>
                  {item.todo}
                </span>
                <button onClick={() => handleRemoveTodo(item.id)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
