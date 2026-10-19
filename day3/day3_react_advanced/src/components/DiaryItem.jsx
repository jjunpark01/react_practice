export default function DiaryItem({ diary }) {
  return (
    <li className="diary-item">
      <h3>{diary.title}</h3>
      <p>{diary.content}</p>
      <small>id: {diary.id}</small>
    </li>
  )
}
