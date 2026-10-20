import { useDispatch, useSelector } from 'react-redux';
import { filterChanged } from '../todosSlice.js';

export default function TodoFilter() {
  const filter = useSelector(state => state.todos.filter);
  const dispatch = useDispatch();

  return (
    <div className="filter-row">
      <label htmlFor="filter">보기</label>
      {/* 선택값의 원본은 store입니다. 변경 시 action으로 새 조건을 전달합니다. */}
      <select
        id="filter"
        value={filter}
        onChange={event => dispatch(filterChanged(event.target.value))}
      >
        <option value="all">전체</option>
        <option value="open">미완료</option>
        <option value="done">완료</option>
      </select>
    </div>
  );
}
