export default function Header({ diaryCount }) {
  return (
    <header className="site-header">
      <p className="eyebrow">DAY 3 · REACT ADVANCED</p>
      <h1>나의 일기</h1>
      <p>현재 {diaryCount}개의 일기가 있습니다.</p>
    </header>
  )
}
