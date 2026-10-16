/**
 * [05_01_js_basic] 자바스크립트 변수·상수·자료형·형 변환 실습
 *
 * 실행 방법:
 * 1) 터미널 실행: node 01_javascript/05_01_basic/basic.js
 * 2) 브라우저 실행: index.html 파일을 크롬으로 열고 F12 콘솔 확인
 */

// ==========================================
// 1단계: 변수를 이용한 간단한 정보 출력
// - 이름, 나이, 직업을 let / const로 선언하고 console.log로 출력
// - 상수에 값을 재할당해보고 TypeError 발생하는지 확인
// ==========================================
console.log('=== 1단계: 변수/상수 선언 및 출력 ===');
// TODO: 여기에 코드를 작성하세요.
let name = "박형준"; const age = 26; const job = "학생";


// ==========================================
// 2단계: 다양한 자료형과 템플릿 리터럴 사용
// - 숫자, 문자열, 불리언, null, undefined 변수 선언
// - 백틱(``)을 사용해 "홍길동(30세)은 개발자입니다: true" 형태 출력
// - typeof 로 각 변수의 타입을 콘솔에 출력
// ==========================================
console.log('\n=== 2단계: 자료형 & 템플릿 리터럴 ===');
// TODO: 여기에 코드를 작성하세요.
let isDev = true;
console.log(`${name}(${age}세)은 개발자입니다: ${isDev}`);

// ==========================================
// 3단계: 형 변환 실수 찾기 & 고치기
// - "10" + "5" vs Number("10") + Number("5") 비교
// - Number(), parseInt(), parseFloat(), String(), Boolean() 테스트
// - isNaN vs Number.isNaN 차이 비교
// ==========================================
console.log('\n=== 3단계: 형 변환 비교 & NaN 테스트 ===');
// TODO: 여기에 코드를 작성하세요.
console.log("10"+"5");
console.log(Number("10")+Number("5"));
console.log(Number("hello"));
console.log(isNaN("hello")); 
console.log(Number.isNaN("hello"));










