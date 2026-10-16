// Main이 보낸 props를 받습니다. onClick에는 App에서 만든 함수가 들어 있습니다.
export function Button({ label, onClick }) {
  return (
    // 클릭하면 브라우저 이벤트가 발생하고, React가 전달받은 onClick 함수를 실행합니다.
    <button type="button" className="counter" onClick={onClick}>
      {label}
    </button>
  )
}
