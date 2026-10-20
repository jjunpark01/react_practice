import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoAdded } from '../todosSlice.js';

export default function TodoForm() {
  // 아직 추가하지 않은 입력은 이 폼만 사용하므로 로컬 상태로 관리합니다.
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault(); // form 제출로 페이지가 새로고침되는 것을 막습니다.
    if (!title.trim()) return; // 공백만 있으면 action도 만들지 않습니다.

    // 1. todoAdded(title)의 prepare가 id/title/done을 담은 action을 만듭니다.
    // 2. dispatch가 action을 store로 전달합니다.
    // 3. slice reducer가 items를 바꾸면 목록과 요약이 새 값을 읽습니다.
    dispatch(todoAdded(title));
    setTitle(''); // 입력창 초기화는 Redux가 아니라 이 컴포넌트가 담당합니다.
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">할 일</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
}
