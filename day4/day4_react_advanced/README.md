# Day 4: day3 Todo에서 일기 앱으로

이 프로젝트는 **현재 `day3_todo` 코드를 복사한 실습 시작점**입니다. 원본 day3 파일은 수정하지 않았습니다. 지금 `App.jsx`에는 Todo 3개와 `useState`가 있고 `Header`, `Editor`, `List`, `TodoItem` 컴포넌트가 있습니다. `todos`가 `List`로 전달되지 않아 화면에는 임시 항목 3개만 보입니다. 추가·검색·체크·삭제 버튼도 아직 연결 전입니다.

오늘은 day3의 상태·props·이벤트 흐름을 완성한 다음, 데이터를 일기로 바꾸고 PDF 미션의 `useReducer → Context → React Router → 최적화` 순서로 발전시킵니다. 이 폴더는 완성 답안이 아니라 직접 구현할 시작 코드와 가이드입니다.

## 실행하기

```bash
cd day4_react_advanced
npm install
npm run dev
```

먼저 `src/App.jsx → src/components/Editor.jsx → List.jsx → TodoItem.jsx` 순서로 읽으세요. day3 원본의 [실습 가이드](../../day3_todo/README.md) 중 3~6단계를 함께 참고할 수 있습니다. 수정할 때마다 브라우저에서 확인하고, 마지막에 `npm run build`를 실행하세요. day3 원본에서 이후에 한 수정은 day4 복사본에 자동 반영되지 않습니다.

## day3와 오늘의 연결

| day3 Todo | day4 일기 앱 | 배우는 점 |
| --- | --- | --- |
| `App`의 `useState(initialTodos)` | `useReducer(diaryReducer, initialDiaries)` | 추가·수정·삭제를 액션으로 관리 |
| `App → Editor`의 `onCreate` props | 폼에서 Dispatch Context 사용 | 여러 위치에서 상태 변경 |
| `App → List → TodoItem`의 props | 필요한 곳에서 Context 읽기 | 중간 전달 줄이기 |
| `List`의 검색 결과 | `Home`의 검색·정렬에 `useMemo` | 필요할 때만 재계산 |
| Todo 항목 한 개 | 일기 카드와 상세 페이지 | URL로 항목 구분 |
| `App` 한 화면 | 목록·작성·상세·수정 페이지 | 라우팅과 뒤로가기 |

```text
day3: App(useState) → Editor / List → TodoItem
day4: App(useReducer) → Context Provider → Routes → 페이지 → DiaryItem/DiaryForm
```

## 목표 파일 구조

`✓`는 현재 복사된 파일, `+`는 해당 단계에서 만들 파일입니다. `Editor`, `List`, `TodoItem`은 1단계까지 사용하고, 이후 내용을 일기용 컴포넌트로 옮기세요.

```text
day4_react_advanced/
├── index.html                         ✓ #root
├── package.json                       ✓ Vite/React/React Router
└── src/
    ├── main.jsx                       ✓ 4단계에서 BrowserRouter 추가
    ├── App.jsx                        ✓ 현재 Todo 상태; 이후 Provider/Routes
    ├── App.css, index.css             ✓ 스타일을 작성할 자리
    ├── components/
    │   ├── Header.jsx                 ✓ 날짜 헤더; 이후 이동 링크
    │   ├── Editor.jsx                 ✓ 입력창 → DiaryForm의 출발점
    │   ├── List.jsx                   ✓ 목록 → Home의 출발점
    │   ├── TodoItem.jsx               ✓ 항목 → DiaryItem의 출발점
    │   ├── DiaryForm.jsx              + 작성·수정 공통 폼
    │   └── DiaryItem.jsx              + 일기 카드
    ├── reducer/
    │   ├── diaryActions.js            + 액션 타입 상수
    │   └── DiaryReducer.js            + 초기 상태와 순수 리듀서
    ├── context/
    │   └── DiaryContext.jsx           + State/Dispatch Context
    └── pages/
        ├── Home.jsx                   + / 목록·검색·정렬
        ├── New.jsx                    + /new 작성
        ├── Detail.jsx                 + /detail/:id 상세
        └── Edit.jsx                   + /edit/:id 수정
```

## 1단계: day3 Todo 기능 이어서 완성하기

현재 `App`의 `todos`는 화면과 연결되지 않았습니다. 고급 기능을 적용하기 전에 day3에서 배운 흐름을 한 번 완성합니다.

1. `Editor`의 입력값을 로컬 `useState`로 관리합니다. `App`에 `onCreate(content)`를 만들고 props로 내려보냅니다. 공백 입력은 막고, 새 Todo마다 다른 `id`를 부여합니다.
2. `App`의 `todos`를 `List`에 전달합니다. 고정된 `<TodoItem />` 세 개를 `todos.map(...)`으로 바꾸고 `key={todo.id}`를 넣습니다.
3. `List`에서 검색어를 로컬 상태로 두고 `content`가 검색어를 포함한 항목만 표시합니다.
4. `App`에 `onUpdate(id)`와 `onDelete(id)`를 만듭니다. `List`를 거쳐 `TodoItem`의 체크박스·삭제 버튼에 연결합니다. `map`과 `filter`로 **새 배열**을 반환합니다.

**확인:** 추가·검색·체크·삭제가 화면에 반영되는가? 하나를 체크하거나 삭제할 때 다른 항목은 그대로인가?

## 2단계: Todo를 일기로 바꾸고 `useReducer` 적용하기

PDF의 일기/게시글 앱에 맞게 데이터 구조를 바꿉니다.

| Todo 필드 | 일기 필드 | 처리 |
| --- | --- | --- |
| `id` | `id` | 유지; URL에도 사용 |
| `content` | `title` + `content` | 제목과 본문으로 분리 |
| `date` | `createdAt` | 작성 시각으로 사용 |
| `isDone` | 없음 | 완료 체크는 제거 |

`Editor`를 참고해 제목·본문 입력이 있는 `DiaryForm`을 만들고, `List`의 반복 렌더링을 `DiaryItem`에 적용합니다. 작성 폼과 수정 폼은 같은 컴포넌트를 재사용할 수 있습니다.

`src/reducer/diaryActions.js`에 `ADD`, `UPDATE`, `DELETE` 타입 상수를 만들고, `DiaryReducer.js`에 `initialDiaries`와 `diaryReducer(state, action)`을 작성합니다. `App`의 `useState`를 `useReducer(diaryReducer, initialDiaries)`로 교체하세요.

```js
{ type: ADD, payload: { id: 3, title: '제목', content: '본문', createdAt: Date.now() } }
{ type: UPDATE, payload: { id: 3, title: '새 제목', content: '새 본문' } }
{ type: DELETE, payload: { id: 3 } }
```

입력 검사와 ID·날짜 생성은 이벤트 핸들러에서 하고, 리듀서는 액션을 받아 **새 배열과 새 객체**를 반환합니다. `UPDATE`에는 `map`, `DELETE`에는 `filter`가 유용합니다. **확인:** 추가·수정·삭제가 동작하고 다른 일기는 그대로인가?

## 3단계: Context로 상태와 변경 함수 공유하기

1. `DiaryStateContext`와 `DiaryDispatchContext`를 `src/context/DiaryContext.jsx`에 만듭니다.
2. `App`의 `useReducer` 결과인 `diaries`와 `dispatch`를 각각의 Provider에 전달합니다.
3. `Home`, `DiaryItem`, `DiaryForm`, `Header` 등 필요한 컴포넌트가 `useContext`로 값을 읽게 합니다. 이제 `App → List → Item`의 중간 전달을 줄일 수 있습니다.
4. 폼의 입력값과 검색어는 해당 컴포넌트의 로컬 상태로 둡니다. 저장된 일기 목록만 전역으로 공유합니다.

**확인:** 일기를 삭제하면 목록과 Header의 개수가 같이 바뀌는가? 중간 컴포넌트에 삭제 함수를 props로 넘기지 않아도 되는가?

## 4단계: 라우팅과 최적화

React Router는 설치되어 있습니다. `main.jsx`에서 `<App />`을 `<BrowserRouter>`로 감싸고, `App.jsx`의 `<Routes>` 안에 다음 `<Route>`를 만드세요.

| URL | 페이지 | 기능 |
| --- | --- | --- |
| `/` | `Home` | 목록·검색·정렬 |
| `/new` | `New` | 작성 후 목록으로 이동 |
| `/detail/:id` | `Detail` | URL의 ID로 일기 찾기 |
| `/edit/:id` | `Edit` | 기존 값을 채워 수정 |

Header와 일기 카드의 이동에는 `<Link>`, 저장·삭제 후 이동에는 `useNavigate()`를 사용합니다. 상세·수정 페이지에서는 `useParams()`의 `id`를 읽으세요. URL의 ID는 **문자열**이므로 숫자 ID와 비교할 때 `Number(id)`로 변환합니다. 없는 ID는 안내와 목록 링크를 보여 주세요. 네 URL을 주소창에서 직접 열고, 뒤로가기·앞으로가기를 확인하세요.

기능을 완성한 뒤 다음 위치에 최적화를 적용하고 전후 렌더링을 관찰합니다.

- `useMemo`: 검색어·정렬 기준·일기 배열로 계산한 표시 목록.
- `React.memo`: props가 그대로인 `DiaryItem`.
- `useCallback`: 자식에게 전달하는 이벤트 함수. 의존성 배열도 확인하세요.

PDF 체크리스트는 위 셋 중 **최소 두 가지** 적용을 요구합니다. Context를 직접 읽는 컴포넌트는 Context 값이 바뀌면 `React.memo`와 관계없이 다시 렌더링될 수 있습니다.

## 마무리 체크리스트

- [ ] day3 Todo의 추가·검색·완료 변경·삭제를 한 번 완성했다.
- [ ] 일기 데이터에 제목·본문·작성 시각을 사용한다.
- [ ] `useReducer`의 ADD/UPDATE/DELETE로 일기를 관리한다.
- [ ] State/Dispatch Context로 여러 컴포넌트가 같은 상태를 공유한다.
- [ ] `/`, `/new`, `/detail/:id`, `/edit/:id`가 동작한다.
- [ ] 존재하지 않는 ID를 처리한다.
- [ ] `useMemo`, `useCallback`, `React.memo` 중 둘 이상을 적용한다.
- [ ] 뒤로가기·앞으로가기가 정상 동작한다.
- [ ] `npm run build`가 통과한다.

현재는 새로고침 시 초기 데이터로 돌아오는 메모리 상태입니다. 영구 저장은 PDF의 필수 항목이 아닙니다.
