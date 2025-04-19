import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { addTodo, toggleTodo, removeTodo } from './store/slices/todoSlice';
import styles from './App.module.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useAppDispatch();
  const todolist = useAppSelector((state) => state.todos);

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

  return (
    <div className={styles.container}>
      <div className={styles.todoContainer}>
        <h1 className={styles.title}>투두리스트</h1>

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
            <li key={item.id} className={styles.todo}>
              <span className={styles.item} onClick={() => handleToggleTodo(item.id)}>
                {item.todo}
              </span>
              <button onClick={() => handleRemoveTodo(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
