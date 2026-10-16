import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// index.html의 <div id="root">를 찾아 React 앱의 시작점으로 사용합니다.
// App이 반환한 JSX가 이 root 안에 화면으로 그려집니다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
