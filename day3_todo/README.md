# React TodoList 실습 가이드

이 프로젝트는 원본 `onebite-react-v2/section08/chapter1`과 같은 **시작 단계**입니다. 지금 실행하면 `TodoList` 글자만 보입니다. 아래 순서대로 직접 파일을 만들고 기능을 붙여 보세요. 한 단계를 끝낼 때마다 브라우저에서 결과를 확인하면 좋습니다.

## 0. 실행하고 파일 위치 익히기

```bash
npm run dev
```

터미널에 표시되는 주소를 브라우저에서 여세요. 패키지가 없다는 오류가 나면 `npm install`을 한 번 실행하세요.

| 파일 | 역할 |
| --- | --- |
| `index.html` | React 화면이 들어갈 `<div id="root">`가 있는 HTML |
| `src/main.jsx` | `App`을 화면에 연결하는 시작점 |
| `src/App.jsx` | Todo 화면과 데이터의 중심이 될 컴포넌트 |
| `src/App.css` | `App`의 스타일 |
| `src/index.css` | 페이지 전체의 스타일 |
| `src/components/` | 직접 만들 작은 컴포넌트들을 둘 폴더 |

**먼저 해보기:** `src/App.jsx`의 `TodoList`를 다른 글자로 바꾸고 저장해 보세요. 브라우저가 자동으로 바뀌는지 확인한 뒤 다시 원래대로 돌려도 됩니다.

## 1. 화면을 작은 컴포넌트로 나누기

`src/components/`에 아래 JSX 파일을 직접 만드세요. 각 컴포넌트의 CSS 파일도 같은 폴더에 만듭니다. 처음에는 디자인보다 **화면에 모두 나타나는 것**을 목표로 하세요.

```text
src/components/
├── Header.jsx       Header.css
├── Editor.jsx       Editor.css
├── List.jsx         List.css
└── TodoItem.jsx     TodoItem.css
```

- `Header`: `오늘은 📆`와 오늘 날짜를 보여 줍니다.
- `Editor`: 할 일을 적는 입력창과 `추가` 버튼을 보여 줍니다.
- `List`: `Todo List 🌱` 제목, 검색 입력창, `TodoItem` 몇 개를 보여 줍니다.
- `TodoItem`: 체크박스, 할 일 내용, 날짜, `삭제` 버튼을 보여 줍니다.
- `App`: 위에서 만든 `Header`, `Editor`, `List`를 순서대로 배치합니다.

**힌트:** 컴포넌트는 `function Header() { return (...); }`처럼 만들고 `export default Header`로 내보낼 수 있습니다. `App.jsx`에서는 `import Header from "./components/Header"`로 가져옵니다. JSX 안에서는 HTML의 `class` 대신 `className`을 씁니다. 날짜는 `new Date().toDateString()`으로 표시할 수 있습니다.

아래는 **1단계 화면용 예시**입니다. 코드를 각 파일에 직접 적어 보세요. 버튼과 체크박스는 뒤 단계에서 작동하게 만듭니다.

### `src/components/Header.jsx`

```jsx
function Header() {
  return (
    <header>
      <h3>오늘은 📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </header>
  );
}

export default Header;
```

현재 `Header.jsx`에 있는 `export default function Header()`도 같은 내보내기 방식입니다. 위 예시처럼 함수 아래에 `export default Header;`를 적어도 됩니다. **두 방식을 동시에 쓸 필요는 없습니다.**

### `src/components/Editor.jsx`

```jsx
function Editor() {
  return (
    <div className="Editor">
      <input placeholder="새로운 Todo..." />
      <button>추가</button>
    </div>
  );
}

export default Editor;
```

### `src/components/TodoItem.jsx`

```jsx
function TodoItem() {
  return (
    <div className="TodoItem">
      <input type="checkbox" />
      <span>할 일 예시</span>
      <span>날짜</span>
      <button>삭제</button>
    </div>
  );
}

export default TodoItem;
```

### `src/components/List.jsx`

```jsx
import TodoItem from "./TodoItem";

function List() {
  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input placeholder="검색어를 입력하세요" />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
}

export default List;
```

`List`가 같은 폴더의 `TodoItem`을 가져오는 부분을 눈여겨보세요. `App.jsx`에서는 `Header`, `Editor`, `List`를 가져와 각각 `<Header />`, `<Editor />`, `<List />`로 배치합니다. `App.jsx`의 전체 예시는 바로 아래 2단계에 있습니다.

**확인:** 화면에 날짜, 입력창, 검색창, 임시 Todo 항목이 모두 보이나요? 이 단계에서 버튼은 아직 작동하지 않아도 됩니다.

## 2. Todo 데이터를 `App`에서 관리하기

`App.jsx`에 임시 Todo 데이터 3개를 만들고 `useState`로 보관해 보세요. 각 항목에는 `id`, `isDone`, `content`, `date`가 필요합니다. 예를 들어 내용은 `React 공부하기`, `빨래하기`, `노래 연습하기`로 정할 수 있습니다.

**힌트:** `useState`를 `react`에서 가져옵니다. 날짜 값은 `new Date().getTime()`으로 만들 수 있습니다. 이 단계에서는 데이터를 화면에 연결하지 않아도 괜찮습니다. 먼저 개발자 도구나 `console.log`로 배열이 잘 들어 있는지 확인해 보세요.

`src/App.jsx`에서 사용할 데이터 한 건과 상태의 예시입니다. 나머지 두 건은 직접 채워 보세요.

```jsx
import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const initialTodos = [
  { id: 0, isDone: false, content: "React 공부하기", date: Date.now() },
  // 여기에 다른 Todo 두 건 추가
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="App">
      <Header />
      <Editor />
      <List />
    </div>
  );
}

export default App;
```

`todos`는 현재 목록, `setTodos`는 목록을 새 값으로 바꾸는 함수입니다. 아직 화면에는 초기 데이터를 전달하지 않았으므로, 직접 `console.log(todos)`를 `App` 함수 안에 넣어 확인해 보세요.

**확인:** 새로고침해도 초기 Todo 데이터 3개가 만들어지나요?

## 3. 새 할 일 추가하기

`Editor`의 입력창에 글을 입력하고 `추가` 버튼을 누르면 `App`의 Todo 배열 맨 앞에 새 항목이 들어가게 만드세요. Enter 키로도 추가할 수 있게 해 보세요. 빈 입력은 추가되지 않아야 하고, 추가 후 입력창은 비워져야 합니다.

**힌트:** `Editor`의 입력값은 `useState`로 관리합니다. `App`에는 새 Todo를 만드는 함수를 두고 `Editor`에 `onCreate`라는 prop으로 전달해 보세요. 새 항목마다 다른 `id`가 필요합니다. `useRef`에 다음 번호를 기억해 둘 수 있습니다. 빈 입력일 때 입력창에 다시 초점을 주고 싶다면 입력 요소에도 `useRef`를 연결해 보세요. Enter 판별에는 `event.key === "Enter"`를 쓸 수 있습니다.

`src/components/Editor.jsx`의 기본 예시입니다. 먼저 입력과 버튼 동작을 확인하고, 빈 값을 입력했을 때 초점을 돌리는 기능은 직접 추가해 보세요.

```jsx
import { useState } from "react";

function Editor({ onCreate }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onCreate(content);
    setContent("");
  };

  return (
    <div>
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSubmit();
        }}
        placeholder="새로운 Todo..."
      />
      <button onClick={handleSubmit}>추가</button>
    </div>
  );
}

export default Editor;
```

`value`는 입력창에 보이는 값이고 `onChange`는 입력할 때마다 그 값을 바꿉니다. `onCreate`는 부모인 `App`에서 전달받는 함수입니다.

`App.jsx`의 새 항목 추가 함수는 이런 모양입니다. `import { useRef } from "react";`를 추가하고 `App` 함수 안에서 `const nextId = useRef(3);`으로 준비하세요. `<Editor onCreate={onCreate} />`로 함수를 전달하면 됩니다.

```jsx
const onCreate = (content) => {
  const newTodo = {
    id: nextId.current++,
    isDone: false,
    content,
    date: Date.now(),
  };
  setTodos((previousTodos) => [newTodo, ...previousTodos]);
};
```

**확인:** 내용 없는 Todo는 추가되지 않고, 정상적으로 추가한 뒤 입력창이 비워지나요? 아직 `List`와 데이터를 연결하지 않았다면 화면의 임시 항목은 그대로일 수 있습니다.

## 4. 데이터를 목록에 표시하고 검색하기

`App`의 `todos`를 `List`에 prop으로 전달하세요. `List`에서는 임시로 적어 둔 `TodoItem`들을 지우고, 배열을 이용해 실제 항목을 그립니다. 검색창에 입력한 글자가 내용에 들어 있는 항목만 보이게 만드세요.

**힌트:** 배열의 `.map()`으로 `TodoItem` 여러 개를 만들고, 각 항목에 `key={todo.id}`를 넣습니다. 항목의 내용과 날짜는 prop으로 전달하세요. 검색어도 `useState`로 관리하고, `.filter()`와 `.includes()`를 사용해 볼 수 있습니다. 대소문자 구분 없이 찾으려면 양쪽 문자열에 `.toLowerCase()`를 적용합니다. 숫자로 저장한 날짜는 `new Date(date).toLocaleDateString()`으로 표시할 수 있습니다.

`List`가 `todos`를 받았다면 화면에는 이렇게 반복해서 그릴 수 있습니다.

```jsx
<div className="todos_wrapper">
  {todos.map((todo) => (
    <TodoItem key={todo.id} {...todo} />
  ))}
</div>
```

`{...todo}`는 한 항목의 `id`, `isDone`, `content`, `date`를 각각 prop으로 전달합니다. 검색할 때는 `todos` 대신 검색 결과 배열을 `.map()`에 넣으면 됩니다. 필터 조건은 아래처럼 시도해 보세요.

```jsx
todo.content.toLowerCase().includes(search.toLowerCase())
```

**확인:** 처음에는 3개가 보이고, 새로 추가한 항목도 목록에 나타나나요? 검색어를 지우면 전체 항목이 다시 보이나요?

## 5. 완료 상태 바꾸기

Todo 항목의 체크박스를 누르면 해당 항목의 `isDone` 값이 바뀌게 만드세요. 다시 누르면 원래 상태로 돌아와야 합니다.

**힌트:** Todo 배열은 `App`이 가지고 있으므로 변경 함수도 `App`에 둡니다. 그 함수를 `List`를 거쳐 `TodoItem`으로 전달하세요. `.map()`으로 새 배열을 만들면서 `id`가 일치하는 항목의 `isDone`만 뒤집으면 됩니다. 체크박스의 `checked` 값은 항목의 `isDone`과 연결합니다.

`App.jsx`에 넣을 변경 함수의 예시입니다.

```jsx
const onUpdate = (targetId) => {
  setTodos((previousTodos) =>
    previousTodos.map((todo) =>
      todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
    )
  );
};
```

`List`를 통해 `TodoItem`까지 `onUpdate`를 전달한 뒤, 체크박스의 `onChange`에서 `onUpdate(id)`를 호출해 보세요. `checked={isDone}`도 연결합니다.

**확인:** 한 항목을 체크해도 다른 항목의 상태는 그대로인가요?

## 6. 할 일 삭제하기

각 `TodoItem`의 `삭제` 버튼을 누르면 해당 항목만 목록에서 사라지게 만드세요.

**힌트:** `App`에 삭제 함수를 만들고 `List`를 거쳐 `TodoItem`에 전달합니다. `.filter()`로 삭제할 `id`를 제외한 새 배열을 만들어 `setTodos`에 넣어 보세요.

`App.jsx`의 삭제 함수는 아래처럼 작성할 수 있습니다.

```jsx
const onDelete = (targetId) => {
  setTodos((previousTodos) =>
    previousTodos.filter((todo) => todo.id !== targetId)
  );
};
```

`TodoItem`의 버튼에는 `onClick={() => onDelete(id)}`를 연결해 보세요.

**확인:** 여러 항목 중 하나를 삭제했을 때 나머지는 그대로인가요? 검색한 상태에서도 해당 항목을 삭제할 수 있나요?

## 7. 모양 다듬고 마무리하기

이제 각 CSS 파일에 스타일을 추가해 보세요. 화면이 읽기 편하면 충분합니다.

- `App.css`: 적당한 너비를 정하고 가운데에 배치하기
- `Header.css`: 날짜 제목 강조하기
- `Editor.css`: 입력창과 버튼을 한 줄에 놓기
- `List.css`: 검색창과 Todo 목록 사이 간격 주기
- `TodoItem.css`: 체크박스, 내용, 날짜, 삭제 버튼 정렬하기

예를 들어 `src/App.css`에서 화면 너비와 위치를 정할 수 있습니다.

```css
.App {
  width: 500px;
  max-width: 90%;
  margin: 0 auto;
}
```

마지막으로 `npm run build`를 실행해 오류가 없는지 확인하세요. 새로고침하면 Todo가 초기 데이터로 돌아가는 것은 현재 실습 단계에서는 정상입니다. 브라우저 저장 기능은 다음 확장 과제로 남겨 두세요.

## 막혔을 때 확인할 것

- 화면이 비어 있다면 브라우저 개발자 도구의 Console과 터미널 오류를 확인하세요.
- 컴포넌트가 안 보이면 파일 이름의 대소문자, `import` 경로, `export default`를 확인하세요.
- 입력창에 글자가 안 써지면 `value`와 `onChange`가 함께 연결되어 있는지 확인하세요.
- 배열을 화면에 그릴 때 경고가 나오면 각 `TodoItem`의 `key`를 확인하세요.
- 원본 정답 코드는 `onebite-react-v2/section08/chapter2`부터 `chapter7`까지 단계별로 들어 있습니다. 먼저 직접 시도한 뒤 막힌 단계만 비교해 보세요.
