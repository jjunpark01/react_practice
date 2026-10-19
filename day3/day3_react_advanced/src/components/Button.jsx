// day2에서 사용한 함수 전달 패턴을 그대로 재사용합니다.
export function Button({ label, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  )
}
