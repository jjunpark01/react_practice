import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Main from './components/Main.jsx'
import './App.css'

function App() {
  // count: 현재 값(상태), setCount: 값을 바꾸는 함수입니다.
  // 상태를 바꾸면 React가 이 컴포넌트를 다시 그려 새 값을 보여줍니다.
  const [count, setCount] = useState(0)

  // 클릭할 때 실행할 함수를 App에서 만듭니다. 아래에서 Main에 전달합니다.
  function handleIncrement() {
    setCount((previousCount) => previousCount + 1)
  }

  return (
    null
  )
}

export default App
