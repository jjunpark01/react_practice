import { useState } from 'react'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'

const initialDiaries = [
  { id: 1, title: '첫 번째 일기', content: 'day2에서 배운 state와 props를 다시 살펴봅니다.' },
  { id: 2, title: '두 번째 일기', content: '오늘은 일기 목록을 여러 페이지로 발전시킵니다.' },
]

function App() {
  // day2의 count를 일기 객체의 배열로 확장한 시작점입니다.
  const [diaries, setDiaries] = useState(initialDiaries)

  function handleAddSample() {
    const newDiary = {
      id: Date.now(),
      title: `연습 일기 ${diaries.length + 1}`,
      content: '다음 단계에서 입력 폼으로 교체해 보세요.',
    }
    setDiaries((previousDiaries) => [newDiary, ...previousDiaries])
  }

  return (
    <div className="app-shell">
      <Header diaryCount={diaries.length} />
      <Main diaries={diaries} onAddSample={handleAddSample} />
      <Footer />
    </div>
  )
}

export default App
