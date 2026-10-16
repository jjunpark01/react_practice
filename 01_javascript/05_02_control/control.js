/**
 * [05_02_js_control] 연산자·조건문·반복문·함수로 로직 만들기 실습
 *
 * 실행 방법:
 * node 01_javascript/05_02_control/control.js
 */

// ==========================================
// 1단계: 점수에 따른 학점 계산기 만들기
// - 점수(0~100)에 따라 A, B, C, D, F 반환 (if-else & switch)
// ==========================================
console.log('=== 1단계: 학점 계산기 ===');
function getGrade(score){
    if(score>=90) return 'A';
    else if(score>=80) return 'B';
    else if(score>=70) return 'C';
    else if (score>=60 )return 'D';
    else return 'F';
}
console.log(getGrade(100));


// ==========================================
// 2단계: 반복문으로 누적 합과 짝수만 더하기
// - 1부터 100까지의 합 (기대값: 5050)
// - 1부터 100까지 중 짝수만 더한 합 (continue 활용, 기대값: 2550)
// - 누적 합이 200을 넘으면 중단 (break 활용, 20까지 더하면 210)
// ==========================================
console.log('\n=== 2단계: for 문과 continue/break ===');
// TODO: 여기에 코드를 작성하세요.
let sum=0;
let sum_even=0;
for(let i=1; i<=100; i++){
    sum+= i;
    if(i%2===0){
        sum_even+=i;
    }
}
console.log(sum);
console.log(sum_even);
// ==========================================
// 3단계: 함수로 로직 분리 + 콜백 연습
// - getGrade(score): 학점 계산 함수
// - printGrade(name, score, callback): 콜백을 통해 출력 형식을 제어
// - 삼항 연산자 (score >= 60 ? "합격" : "불합격")
// - null 병합 연산자 (name ?? "익명 사용자")
// ==========================================
console.log('\n=== 3단계: 함수 분리, 콜백, 삼항/null병합 연산자 ===');
// TODO: 여기에 코드를 작성하세요.
function printGrade(name,score,callback){
    const grade = getGrade(score);
    callback(name, grade);
    score>=60 ? console.log("합격"):console.log("불합격");
}
printGrade("형준",100,(name,grade)=>console.log(
    `[통지표] ${name} 학생의 등급은 ${grade}입니다.`));
    
const inputName = null;
const userName = inputName ?? "게스트";

console.log(userName); // 게스트

