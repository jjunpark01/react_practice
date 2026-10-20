import { useDispatch, useSelector } from 'react-redux';
import { todoToggled, todoRemoved } from '../todosSlice.js';

export default function TodoList() {
  // useSelector의 state는 전체 store 상태입니다. 필요한 부분을 선택합니다.
  const items = useSelector(state => state.todos.items);
  const filter = useSelector(state => state.todos.filter);
  const dispatch = useDispatch();

  // 원본과 보기 조건으로 계산한 파생값입니다. 별도의 state에 저장하지 않습니다.
  // selector 안에서 매번 새 배열을 반환하지 않고 선택 후 계산합니다.
  const visibleItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'done') return item.done;
    return !item.done;
  });

  if (visibleItems.length === 0) {
    return <p>표시할 할 일이 없습니다.</p>;
  }

  return (
    <ul>
      {visibleItems.map(item => (
        // 삭제나 필터링으로 순서가 변해도 같은 항목을 식별하도록 id를 씁니다.
        <li key={item.id}>
          <input
            type="checkbox"
            aria-label={`${item.title} 완료`}
            checked={item.done}
            onChange={() => dispatch(todoToggled(item.id))}
          />
          <span className={item.done ? 'done' : ''}>{item.title}</span>
          <button type="button" onClick={() => dispatch(todoRemoved(item.id))}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
