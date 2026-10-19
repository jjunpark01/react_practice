import { Button } from './Button.jsx'
import DiaryItem from './DiaryItem.jsx'

// day2의 Main과 같습니다: App에서 값과 함수를 받아 자식에게 전달합니다.
export default function Main({ diaries, onAddSample }) {
  return (
    <main className="content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">STARTER</p>
          <h2>일기 목록</h2>
        </div>
        <Button label="예시 일기 추가" onClick={onAddSample} />
      </div>

      <ul className="diary-list">
        {diaries.map((diary) => (
          <DiaryItem key={diary.id} diary={diary} />
        ))}
      </ul>
    </main>
  )
}
