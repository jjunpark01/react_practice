/**
 * [05_03_js_object_array - 3단계] 배열 + 객체로 장바구니 구조 만들기
 *
 * 실행 방법:
 * node 01_javascript/05_03_object_array/cart.js
 */

console.log('=== 3단계: 장바구니 배열 & 객체 조작 ===');

// TODO: cartItems 배열 선언 (3개 이상의 { name, price, quantity } 객체 포함)
// TODO: 반복문(for or reduce)으로 전체 금액(price * quantity) 계산
// TODO: 특정 상품 이름으로 아이템을 찾아 수량 변경 또는 삭제
// TODO: push, pop, splice 등 배열 메서드를 사용한 추가/삭제
const cartItems = [
    { name: "노트북", price: 1200000, quantity: 1 },
    { name: "마우스", price: 12000, quantity: 2 },
    { name: "키보드", price: 200000, quantity: 1 },
]
const totalPrice = cartItems.reduce((acc, item) =>
    acc + item.price * item.quantity, 0);
console.log(`총 결제 금액:${totalPrice.toLocaleString()}원`);
