import { useSelector } from 'react-redux';

export default function TodoSummary() {
  // TodoList와 동일한 store의 원본 배열을 읽습니다. 복제한 목록이 아닙니다.
  const items = useSelector(state => state.todos.items);
  // 완료 개수는 파생값: 삭제/완료 변경 후 새 items를 기준으로 다시 계산합니다.
  // 보기 조건과 무관하게 항상 전체 목록의 개수입니다.
  const completed = items.filter(item => item.done).length;

  return <p aria-live="polite">전체 {items.length}개 / 완료 {completed}개</p>;
}
