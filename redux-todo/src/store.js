import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice.js';

// 컴포넌트 밖에서 한 번 생성합니다. 렌더링마다 새 store를 만들지 않습니다.
export const store = configureStore({
  reducer: {
    // 이 키가 상태 경로를 결정합니다: state.todos.items, state.todos.filter
    // slice의 name은 action type을 정하고, 이 키는 상태 경로를 정합니다.
    todos: todosReducer,
  },
});
