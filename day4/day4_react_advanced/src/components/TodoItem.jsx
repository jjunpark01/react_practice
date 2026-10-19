import React from 'react'

export default function TodoItem() {
    return (
        <div className='TodoItem'>
            <input type="checkbox"/>
            <span>할 일 예시</span>
            <span>날짜</span>
            <button>삭제</button>
        </div>
    );
}
