import { Button } from './Button.jsx'

// App이 보낸 props를 { count, onIncrement }로 받아 사용합니다.
// count는 숫자이고, onIncrement는 App에서 만든 함수입니다.
function Main({ count, onIncrement }) {
  return (
    // Main → Button: 화면에 보일 글자와 받은 함수를 다시 자식에게 전달합니다.
    <Button label={`Count is ${count}`} onClick={onIncrement} />
  )
}

export default Main
