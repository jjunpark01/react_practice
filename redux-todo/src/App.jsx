import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import TodoFilter from './components/TodoFilter.jsx';
import TodoSummary from './components/TodoSummary.jsx';

export default function App() {
  // App은 화면 구성만 담당합니다. 목록이나 dispatch를 props로 전달하지 않습니다.
  return (
    <main>
      <h1>Redux 할 일 목록</h1>
      <TodoSummary />
      <TodoForm />
      <TodoFilter />
      <TodoList />
    </main>
  );
}
