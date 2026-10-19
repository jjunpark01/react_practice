# Day 3: day2에서 일기 앱으로 발전시키기

이 프로젝트는 **완성 답안이 아닌 실습 시작점**입니다. 먼저 실행하면 예시 일기 2개가 보이고, 버튼을 누르면 일기가 하나씩 추가됩니다. day2의 `count`가 `diaries` 배열로 바뀌었을 뿐, `App → Main → Button`으로 값과 함수를 전달하는 흐름은 같습니다.

오늘 목표는 이 시작점을 PDF 미션의 순서대로 `useReducer → Context API → React Router → 메모이제이션` 구조로 발전시키는 것입니다. 과제에서 요구하는 추가·수정·삭제, 4개 페이지, URL 파라미터와 최적화는 직접 구현합니다.

## 시작하기

```bash
cd day3_react_advanced
npm install
npm run dev
```

터미널에 표시된 주소를 열어 예시 일기 2개와 **예시 일기 추가** 버튼을 확인하세요. React Router는 이미 의존성에 포함되어 있습니다. 코드를 변경한 뒤에는 `npm run build`와 `npm run lint`로 확인할 수 있습니다.

> 이 실습은 새로고침 시 데이터가 사라지는 메모리 상태로 시작합니다. 저장 기능은 PDF의 필수 요구사항이 아닙니다.

## day2와 오늘 코드 연결하기

| day2에서 배운 것 | 현재 시작 코드 | 오늘 확장할 것 |
| --- | --- | --- |
| `useState(0)`으로 숫자 보관 | `useState(initialDiaries)`로 일기 배열 보관 | `useReducer`로 추가·수정·삭제 관리 |
| `App → Main → Button` props 전달 | `diaries`, `onAddSample`을 props로 전달 | 여러 페이지가 공유할 상태·함수를 Context로 전달 |
| 버튼 클릭 → 부모의 상태 변경 | 버튼 클릭 → `setDiaries` 호출 | 폼·버튼 → `dispatch({ type, payload })` |
| 하나의 `App` 화면 | 하나의 일기 목록 화면 | 목록·작성·상세·수정 페이지 |

day2의 [`App.jsx`](../../day2/day2_react/src/App.jsx)는 현재 `null`을 반환해 화면이 보이지 않습니다. 이 프로젝트에는 같은 상태·이벤트·props 개념을 바로 확인할 수 있는 화면을 넣었습니다. `src/App.jsx` → `src/components/Main.jsx` → `src/components/Button.jsx` 순서로 읽으세요. `DiaryItem.jsx`에서는 배열의 각 항목을 `key`와 함께 렌더링합니다.

## 현재 구조와 실습을 마쳤을 때의 구조

`✓`는 이미 있는 파일이고, `+`는 해당 단계에서 직접 만들 파일입니다.

```text
day3_react_advanced/
├── index.html                     ✓ React가 붙을 #root
├── package.json                   ✓ Vite/React/React Router 명령과 의존성
└── src/
    ├── main.jsx                   ✓ React 시작점; 3단계에서 BrowserRouter 배치
    ├── App.jsx                    ✓ 현재 상태 주인; 이후 Provider와 Routes 배치
    ├── index.css                  ✓ 공통 스타일
    ├── components/
    │   ├── Header.jsx             ✓ 일기 개수 표시; 이후 내비게이션 추가
    │   ├── Main.jsx               ✓ 현재 props 전달과 목록 렌더링; 이후 목록 페이지로 이동
    │   ├── DiaryItem.jsx          ✓ 일기 카드; 이후 상세 링크/삭제 버튼 추가
    │   ├── Button.jsx             ✓ day2에서 가져온 클릭 함수 전달 패턴
    │   ├── Footer.jsx             ✓ 하단 영역
    │   └── DiaryForm.jsx          + 작성·수정에서 함께 쓸 폼
    ├── reducer/
    │   ├── diaryActions.js        + ADD/UPDATE/DELETE 액션 타입 상수
    │   └── DiaryReducer.js        + 초기 상태와 순수 리듀서
    ├── context/
    │   └── DiaryContext.jsx       + StateContext, DispatchContext, Provider
    └── pages/
        ├── Home.jsx               + / 목록·검색·정렬
        ├── New.jsx                + /new 작성
        ├── Detail.jsx             + /detail/:id 상세
        └── Edit.jsx               + /edit/:id 수정
```

파일과 폴더는 **필요한 단계에서** 만드세요. 기존 `Main.jsx`는 3단계에서 `Home.jsx`로 옮기거나 `Home` 안에서 재사용하면 됩니다.

## 1단계: `useState`를 `useReducer`로 바꾸기

1. `src/reducer/diaryActions.js`에 `ADD`, `UPDATE`, `DELETE` 타입을 상수로 선언하고 내보냅니다. 문자열 값을 한곳에서 관리하면 `dispatch`와 리듀서의 오타를 줄일 수 있습니다.
2. `src/reducer/DiaryReducer.js`에 `initialDiaries`와 `diaryReducer(state, action)`을 만듭니다. 현재 `App.jsx`의 예시 일기 두 개를 초기 상태로 옮기세요.
3. `App.jsx`의 `useState`를 `useReducer(diaryReducer, initialDiaries)`로 교체합니다. 현재 `handleAddSample`에서 `setDiaries` 대신 `dispatch`를 호출하세요.
4. `DiaryForm.jsx`를 만들고 제목·내용을 입력받아 `ADD`를 보내세요. `DiaryItem.jsx`에 삭제 버튼을, 수정할 수 있는 입력 UI에 `UPDATE`를 연결하세요. 이 단계에서는 한 화면에서 모두 구현해도 됩니다.

액션의 데이터 모양을 먼저 정하면 구현하기 쉽습니다.

```js
{ type: ADD, payload: { id: 3, title: '제목', content: '내용' } }
{ type: UPDATE, payload: { id: 3, title: '새 제목', content: '새 내용' } }
{ type: DELETE, payload: { id: 3 } }
```

리듀서는 `state`나 일기 객체를 직접 고치지 않고 **새 배열과 새 객체를 반환**해야 합니다. `Date.now()` 같은 ID 생성과 입력값 검사는 이벤트 핸들러에서 처리하고, 리듀서는 받은 액션만으로 다음 상태를 계산하세요. 수정·삭제할 때는 `map`/`filter`를 떠올려 보세요. 개발 중에는 `dispatch` 직전에 액션을 로그로 확인할 수 있습니다.

**확인:** 작성 후 목록에 나타나는가? 제목과 내용을 수정하면 바뀌는가? 삭제하면 사라지는가? 다른 일기가 그대로 남는가?

## 2단계: Context로 상태와 변경 함수를 공유하기

1. `src/context/DiaryContext.jsx`에 `DiaryStateContext`와 `DiaryDispatchContext`를 각각 만듭니다.
2. `App.jsx`의 `useReducer` 결과를 두 Provider에 전달합니다. 상태 Context에는 `diaries`, 변경 Context에는 `dispatch`를 제공합니다.
3. `Main`과 `DiaryItem`에서 필요한 값을 `useContext`로 읽습니다. 이제 중간 컴포넌트가 자신이 쓰지 않는 `diaries`나 `onAddSample`을 단순히 전달할 필요가 없습니다.
4. `Header`도 같은 상태를 읽어 일기 개수를 표시해 보세요. 일기를 추가·삭제할 때 Header와 목록이 함께 바뀌면 공유가 연결된 것입니다.

```text
App의 useReducer
  ├─ DiaryStateContext.Provider → Header, Main, DiaryItem에서 읽기
  └─ DiaryDispatchContext.Provider → 작성 폼, 수정 폼, 삭제 버튼에서 dispatch
```

Context를 여러 파일로 나누어도 되지만, 이번 실습은 `DiaryContext.jsx` 한 파일로 시작해도 충분합니다. 폼 입력 중인 `title`과 `content`는 해당 폼의 로컬 `useState`에 두세요. 앱 전체에서 공유해야 할 **저장된 일기 목록**만 Context에 둡니다.

**확인:** `Main`을 거쳐 props로 전달하지 않아도 `DiaryItem`의 삭제 버튼이 동작하는가? Header의 개수도 바로 바뀌는가?

## 3단계: 4개 페이지와 최적화

### 라우팅

1. `src/main.jsx`에서 `<App />`을 `<BrowserRouter>`로 감쌉니다.
2. `App.jsx`에서 `<Routes>` 안에 다음 `<Route>`를 만듭니다.

   | URL | 페이지 | 핵심 역할 |
   | --- | --- | --- |
   | `/` | `Home` | 목록, 검색, 정렬 |
   | `/new` | `New` | 폼 제출 후 목록으로 이동 |
   | `/detail/:id` | `Detail` | URL의 ID로 일기 찾기 |
   | `/edit/:id` | `Edit` | 기존 값으로 폼 시작, 수정 후 이동 |

3. Header의 홈·작성 이동은 `<Link>`로, 저장·삭제 후 이동은 `useNavigate()`로 연결합니다.
4. 상세와 수정 페이지에서 `useParams()`의 `id`를 읽습니다. URL 파라미터는 **문자열**이므로 현재 숫자 ID와 비교할 때 `Number(id)`로 변환하세요. 존재하지 않는 ID는 안내 문구와 목록으로 가는 링크를 보여 주세요.
5. 작성·수정 폼은 `DiaryForm` 하나를 재사용해 보세요. 폼의 입력 상태는 처음 받은 일기를 기준으로 초기화하면 됩니다.

브라우저 주소창에서 네 URL을 직접 열어 보고, 링크 이동 뒤 뒤로가기·앞으로가기도 확인하세요. Vite 개발 서버에서는 SPA 경로가 처리되지만, 배포 환경에서는 별도의 경로 fallback 설정이 필요할 수 있습니다.

### 최적화

기능을 먼저 완성한 다음 다음 세 군데를 관찰하며 적용하세요.

- `useMemo`: `Home`의 검색어·정렬 기준·일기 배열이 바뀔 때만 표시 목록을 다시 계산합니다. 의존성은 `[diaries, search, sortOrder]`처럼 **계산에 실제로 쓰인 값**으로 구성하세요.
- `React.memo`: `DiaryItem`처럼 props가 그대로일 때 다시 그릴 필요가 없는 목록 항목에 적용해 봅니다.
- `useCallback`: 자식에게 전달하는 이벤트 함수를 메모이제이션합니다. 함수 안에서 이전 상태를 참조한다면 의존성이나 업데이트 방식을 확인하세요.

`React.memo`만 붙여도 Context에서 직접 읽는 값이 바뀌면 해당 컴포넌트는 다시 렌더링됩니다. 최적화 전후를 비교하고, 실제로 필요한 곳에만 남기세요. PDF 체크리스트는 위 세 가지 중 **최소 2개 적용**을 요구합니다.

## 최종 점검

- [ ] 추가·수정·삭제가 `useReducer` 액션으로 동작한다.
- [ ] 상태와 변경 함수를 Context로 공유한다.
- [ ] `/`, `/new`, `/detail/:id`, `/edit/:id`가 각각 맞는 화면을 보여 준다.
- [ ] 잘못된 일기 ID를 처리한다.
- [ ] `useMemo`, `useCallback`, `React.memo` 중 두 가지 이상을 실제 코드에 적용했다.
- [ ] 브라우저 뒤로가기와 앞으로가기가 동작한다.
- [ ] `npm run build`와 `npm run lint`가 통과한다.

**읽는 순서:** 현재 `App → Main → Button/DiaryItem` → 1단계 `diaryActions → DiaryReducer → App` → 2단계 `DiaryContext → 소비 컴포넌트` → 3단계 `main → App의 Routes → pages`.
