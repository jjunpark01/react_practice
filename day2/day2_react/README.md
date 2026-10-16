# React 첫걸음: 이 프로젝트 따라 읽기

이 프로젝트는 Vite로 만든 React 연습 앱입니다. 화면의 카운터를 눌러 보면서 **상태를 가진 곳**, **함수를 넘기는 곳**, **함수를 받는 곳**을 순서대로 살펴보세요.

## 실행하기

```bash
npm install
npm run dev
```

터미널에 표시되는 주소를 브라우저에서 열면 됩니다. `npm run dev`는 개발 서버를 켜고, 저장한 코드 변경을 화면에 반영합니다.

## 파일 구조와 읽는 순서

```text
index.html                 브라우저가 처음 읽는 HTML. 비어 있는 #root가 있음
src/main.jsx               #root에 React의 App을 연결하는 시작점
src/App.jsx                화면의 최상위 컴포넌트. count 상태와 함수의 주인
src/components/Main.jsx    App에서 숫자와 함수를 받아 Button으로 전달
src/components/Button.jsx  전달받은 함수를 클릭 이벤트에 연결
src/components/Header.jsx  아직 App에서 사용하지 않는 연습용 컴포넌트
src/components/Footer.jsx  아직 App에서 사용하지 않는 연습용 컴포넌트
src/index.css              페이지 전체에 적용되는 스타일
src/App.css                이 화면의 세부 스타일
src/assets/                코드에서 import해 사용하는 이미지
public/                    경로로 직접 참조하는 정적 파일 (예: /icons.svg)
package.json               설치 패키지와 npm 명령어
vite.config.js             Vite 설정
```

읽는 순서: `index.html` → `src/main.jsx` → `src/App.jsx` → `src/components/Main.jsx` → `src/components/Button.jsx`.

`App`, `Main`, `Button`처럼 **JSX를 반환하는 함수**가 컴포넌트입니다. `<Main />`은 Main 함수를 화면 요소로 사용하는 JSX 문법입니다. `import`는 다른 파일에서 내보낸 값을 가져오고, `export`는 다른 파일에서 가져갈 수 있게 공개합니다. 이 프로젝트의 `Main`은 기본 내보내기라 `import Main ...`으로, `Button`은 이름 붙인 내보내기라 `import { Button } ...`으로 가져옵니다.

## 카운터에서 값과 함수가 움직이는 길

```text
App: useState(0)으로 count를 보관하고 handleIncrement 함수를 만듦
  │ count={count}, onIncrement={handleIncrement}  (props 전달)
  ▼
Main: { count, onIncrement }로 받음
  │ label={`Count is ${count}`}, onClick={onIncrement}  (props 전달)
  ▼
Button: { label, onClick }으로 받음
  │ <button onClick={onClick}>  (클릭 이벤트에 함수 연결)
  ▼
클릭 → handleIncrement 실행 → setCount로 상태 변경 → 새 count로 다시 그림
```

**props**는 부모가 자식 컴포넌트에 주는 입력값입니다. `<Main count={count} />`에서 왼쪽 `count`는 자식에게 붙인 props 이름이고, 오른쪽 `{count}`는 App 안의 변수입니다. Main의 매개변수 `function Main({ count, onIncrement })`가 그 값을 받습니다. `{ ... }`는 객체에서 같은 이름의 값을 꺼내는 구조 분해 문법입니다.

함수도 값이므로 props로 전달할 수 있습니다. `onIncrement={handleIncrement}`는 **함수를 넘기고**, `onIncrement={handleIncrement()}`는 렌더링 중 **함수를 즉시 실행**합니다. 클릭할 때 실행하려면 첫 번째 형태를 사용합니다. Button의 `onClick={onClick}`은 받은 함수를 HTML 버튼의 클릭 이벤트에 연결합니다.

**state**는 화면에 영향을 주는, React가 기억하는 값입니다. App의 `useState(0)`은 처음 값이 0인 `count`와 변경 함수 `setCount`를 만듭니다. `setCount((previousCount) => previousCount + 1)`은 직전 값을 바탕으로 다음 값을 계산합니다. 상태를 바꾸면 App이 다시 실행되고 새 숫자가 Main과 Button으로 내려갑니다. 자식은 App의 `count`를 직접 수정하지 않습니다.

## 처음부터 공부하는 순서

1. **JavaScript 기초**: 함수 선언과 호출, 매개변수, 객체, 구조 분해, `import`/`export`를 익히세요. 일반 함수 `greet`와 `greet()`의 차이를 직접 실행해 보세요.
2. **JSX와 컴포넌트**: `main.jsx`가 `App`을 그리는 과정과 `App.jsx`의 `return (...)`을 읽으세요. `className`, `{count}`, `<Main />`의 의미를 확인하세요.
3. **props**: App에서 Main으로, Main에서 Button으로 어떤 이름과 값이 넘어가는지 주석과 함께 추적하세요. `label`의 문구를 바꿔 보세요.
4. **이벤트와 함수 전달**: Button의 `onClick`부터 App의 `handleIncrement`까지 거꾸로 따라가세요. `onClick={onClick}`을 지우고 클릭 결과를 비교해 보세요.
5. **state와 다시 그리기**: `useState(0)`을 `useState(10)`으로 바꾸고, 클릭 후 화면 값이 어떻게 변하는지 관찰하세요. 그다음 증가량을 2로 바꿔 보세요.
6. **직접 확장하기**: App에 `handleReset` 함수를 만들고 Main을 거쳐 Button에 전달해 초기화 버튼을 추가하세요. 이어서 `Header`와 `Footer`를 App에서 import해 화면에 배치하고, 제목이나 숫자를 props로 전달해 보세요.

처음에는 **값은 부모에서 자식으로 내려가고, 자식의 이벤트는 전달받은 함수를 호출해 부모의 상태를 바꾼다**는 흐름 하나에 집중하면 됩니다.
