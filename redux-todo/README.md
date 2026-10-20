# Redux Toolkit 투두 실습

할 일 추가·완료 변경·삭제·필터·전체/완료 개수 표시를 실습하는 예제입니다.
코드의 한국어 주석을 읽으며 상태의 소유자와 변경 경로를 따라가세요.

## 1. 실행

section12 폴더에서:

```bash
cd redux-todo
npm install
npm run dev
```

터미널에 출력되는 Local 주소를 브라우저에서 엽니다.
별도 터미널에서 같은 redux-todo 폴더로 이동해 `npm run build`로 빌드합니다.
이 예제는 기존 챕터와 같은 React 18·Vite 5 계열이며, Node.js 24 환경에서 작업했습니다.

## 2. 파일을 읽는 순서

```text
src/
├── todosSlice.js             ① 초기 상태, 변경 규칙, action creator
├── store.js                  ② todos 키로 reducer 등록
├── main.jsx                  ③ Provider로 store 연결
├── App.jsx                   ④ 화면 배치
├── components/
│   ├── TodoForm.jsx          ⑤ 로컬 입력값 → 추가 action
│   ├── TodoList.jsx          ⑥ 목록 읽기, 완료 변경, 삭제
│   ├── TodoFilter.jsx        ⑦ 보기 조건 읽기·변경
│   └── TodoSummary.jsx       ⑧ 같은 목록을 읽어 개수 계산
└── style.css
```

강의의 App.jsx를 역할별 네 컴포넌트로 나눴습니다. 처음에는 slice → store →
Provider 순서로 읽고, 화면에서는 TodoForm → TodoList → TodoFilter → TodoSummary
순서로 따라가면 됩니다.

## 3. 무엇을 어디에 저장할까?

| 데이터 | 소유자 | 변경 방식 |
| --- | --- | --- |
| 입력 중인 title | TodoForm의 useState | setTitle |
| 원본 items | Redux store | todoAdded / todoToggled / todoRemoved dispatch |
| 보기 조건 filter | Redux store | filterChanged dispatch |
| visibleItems | TodoList에서 계산 | items 또는 filter로 다시 계산 |
| completed | TodoSummary에서 계산 | items로 다시 계산 |

입력 중인 title과 저장된 item.title은 역할이 다릅니다. 제출 전에는 폼의 임시 값이고,
제출하면 그 문자열을 담은 새 항목이 store에 들어갑니다. 입력창을 비워도 저장된 제목은 유지됩니다.

filter는 이번 수업의 선택입니다. 한 화면에서만 필요하다면 로컬 상태로 둘 수도 있습니다.

## 4. 한 번의 추가를 끝까지 따라가기

` React 복습 `을 입력하고 추가 버튼을 누른다고 가정합니다.

1. 타이핑할 때 `setTitle`이 폼의 로컬 상태만 바꿉니다.
2. form 제출 시 `handleSubmit`이 실행됩니다. 새로고침을 막고 공백을 검사합니다.
3. `todoAdded(title)`이 실행되면 `prepare`가 id를 생성하고 제목 양끝 공백을 제거합니다.
4. 다음 모양의 action 객체가 만들어집니다. 아래 id는 설명용 예시입니다.

```js
{
  type: 'todos/todoAdded',
  payload: { id: '생성된-id', title: 'React 복습', done: false }
}
```

5. `dispatch(action)`이 store에 action을 전달합니다.
6. store에 등록된 todos reducer가 해당 action을 처리해 items에 항목을 추가합니다.
7. Immer가 변경 사항으로 불변성을 유지하는 다음 상태를 만듭니다.
8. TodoList와 TodoSummary의 `useSelector`가 새 items를 선택합니다. 선택 결과가
   바뀌었으므로 두 컴포넌트가 갱신되어 목록 한 줄과 `전체 1개 / 완료 0개`가 보입니다.
9. `setTitle('')`로 폼의 입력을 비웁니다. React는 이 과정의 화면 갱신을 묶어서 처리할 수 있습니다.

```text
사용자 제출
 → todoAdded(title): action 생성
 → dispatch(action): store에 전달
 → todos reducer: 다음 상태 계산
 → store 상태 갱신
 → useSelector: 필요한 값 선택
 → 목록과 요약 화면 갱신
```

`todoAdded(title)`만 호출하면 객체만 만들 뿐 store는 바뀌지 않습니다.
Provider는 store를 하위 컴포넌트에 연결하며, 그 자체가 상태 변경 규칙은 아닙니다.

## 5. 완료 변경·삭제·필터는 무엇이 다를까?

| 동작 | dispatch할 action | payload | 처리 |
| --- | --- | --- | --- |
| 추가 | todoAdded(title) | prepare가 만든 객체 | push로 추가 |
| 완료 변경 | todoToggled(id) | id | find로 찾아 done 반전 |
| 삭제 | todoRemoved(id) | id | filter로 대상 제외 |
| 보기 변경 | filterChanged('done') | 'done' | filter 문자열 변경 |

완료 보기 선택은 원본 items를 지우지 않습니다. visibleItems만 다시 계산하므로 전체 보기로
돌아가면 모든 항목이 보입니다. 요약은 언제나 원본 items 기준이라 보기 조건에 따라 바뀌지 않습니다.

미완료 보기에서 체크하면 항목이 화면에서 사라집니다. 삭제된 것이 아니라 done이 true가 되어
미완료 조건을 만족하지 않게 된 것입니다. 완료 보기에서 다시 확인하세요.

## 6. 기존 useReducer·Context와 연결하기

| 기존 개념 | 이번 예제 |
| --- | --- |
| useReducer(reducer, initialState)의 공유 상태 | store 안의 todos 상태 |
| switch(action.type)의 상태 변경 규칙 | createSlice의 reducers |
| 직접 작성한 action 객체 | createSlice가 생성한 action creator의 결과 |
| Context Provider로 상태/dispatch 전달 | React Redux Provider로 store 연결 |
| useContext로 공유 값 읽기 | useSelector로 필요한 상태 선택 |
| Context에서 dispatch 가져오기 | useDispatch로 store의 dispatch 가져오기 |

store의 `todos` 키는 `state.todos` 경로를 정합니다.
slice의 `name: 'todos'`는 `todos/todoAdded`처럼 action type의 접두사를 정합니다.
둘을 똑같이 적었지만 역할은 다릅니다.

## 7. Immer와 selector에서 주의할 점

```js
// createSlice reducer 안: Immer draft를 수정합니다.
state.items.push(action.payload);

// 잘못된 예: draft 수정과 push 반환값(배열 길이) 반환을 동시에 합니다.
// todoAdded: (state, action) => state.items.push(action.payload)

// 컴포넌트: store에서 읽은 배열은 직접 변경하지 않습니다.
// items.push(newTodo); // 금지
// items.sort(...);    // 금지: 정렬할 때는 [...items].sort(...) 사용
```

useSelector는 기본적으로 선택 결과를 `===`로 비교합니다. selector 안에서 filter로
새 배열을 매번 만들면 동일한 원본에서도 다른 참조가 나옵니다. 여기서는 원본 items를 선택한 뒤
컴포넌트에서 작은 목록을 계산합니다. 큰 계산이나 공유되는 파생 데이터에는 createSelector를 검토합니다.

이 예제에서는 공백 입력을 TodoForm에서 막습니다. prepare의 trim 자체가 추가를 취소하는 것은
아니므로, 다른 입력 경로를 추가한다면 그 경로에서도 유효성 검사를 설계해야 합니다.

## 8. 직접 검증하기

- [ ] 처음 실행: 전체 0개 / 완료 0개, 빈 목록 안내
- [ ] 공백만 입력 후 추가: 항목이 생기지 않음
- [ ] React 복습, Redux 실습 추가: 전체 2개 / 완료 0개, 입력창 초기화
- [ ] React 복습 완료 체크: 취소선 표시, 전체 2개 / 완료 1개
- [ ] 완료 보기: React 복습만 표시, 요약은 2개 / 1개 유지
- [ ] 미완료 보기: Redux 실습만 표시
- [ ] 전체 보기에서 React 복습 삭제: 전체 1개 / 완료 0개
- [ ] 마지막 항목 삭제: 전체 0개 / 완료 0개, 빈 목록 안내
- [ ] 새 항목 추가 후 완료 보기 선택, 브라우저 새로고침: 빈 목록 / 전체 보기
- [ ] `npm run build` 성공

Redux DevTools 확장이 설치되어 있으면 브라우저 개발자 도구의 Redux 탭에서 action을
확인하세요. 추가 action은 객체 payload, 완료 변경·삭제는 id payload, 보기 변경은 문자열
payload를 갖습니다. State에서 todos.items와 todos.filter를 비교해보세요.

이 예제는 메모리에만 저장합니다. 새로고침하면 store가 새로 생성되므로 목록과 필터가
초기화됩니다. localStorage나 API 저장은 별도 확장 과제이며 reducer 안에 부수 효과를 넣지 않습니다.

## 9. 이해도 점검

1. 입력창에 글자를 쓰기만 했을 때 Redux action이 발생할까요? → 아니요. 로컬 setTitle만 실행됩니다.
2. todoToggled(id)만 호출하면 바뀔까요? → 아니요. dispatch해야 합니다.
3. 삭제 후 완료 개수를 따로 감소시켜야 할까요? → 아니요. 새 items에서 계산합니다.
4. TodoSummary가 props 없이 목록 개수를 아는 이유는? → Provider 아래에서 같은 store를 읽습니다.
5. store 등록 키를 tasks로 바꾸면? → selector의 state.todos도 state.tasks로 바꿔야 합니다.

## 공식 참고 자료

- [Redux Quick Start](https://redux.js.org/tutorials/quick-start)
- [createSlice와 prepare](https://redux.js.org/toolkit/api/createSlice)
