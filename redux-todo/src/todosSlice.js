import { createSlice, nanoid } from '@reduxjs/toolkit';

// 공유할 원본 데이터만 저장합니다. 완료 개수와 필터 결과는 저장하지 않습니다.
const initialState = { items: [], filter: 'all' };

const todosSlice = createSlice({
  // action type의 접두사: todos/todoAdded, todos/todoToggled 등
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        // 여기의 state는 전체 store가 아니라 todos 부분의 Immer draft입니다.
        // Immer가 다음 상태를 만들므로 이 안에서는 push 문법을 쓸 수 있습니다.
        // push 결과(배열 길이)를 return하지 않습니다.
        state.items.push(action.payload);
      },
      prepare(title) {
        // todoAdded(title)을 호출할 때 실행됩니다. 아직 store 변경은 없습니다.
        // 매번 달라지는 id는 reducer 밖에서 만들고 payload에 담습니다.
        return {
          payload: { id: nanoid(), title: title.trim(), done: false },
        };
      },
    },
    todoToggled(state, action) {
      // payload는 제목이나 배열 순서가 아니라 변경할 항목의 고유 id입니다.
      const target = state.items.find(item => item.id === action.payload);
      if (target) {
        target.done = !target.done;
      }
    },
    todoRemoved(state, action) {
      // filter는 조건이 true인 항목만 남긴 새 배열을 만듭니다.
      // 해당 id가 아닌 항목만 남겨 draft의 items에 할당합니다.
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    filterChanged(state, action) {
      // 화면의 select가 전달하는 값: all / open / done
      state.filter = action.payload;
    },
  },
});

// 컴포넌트에서는 변경 요청 객체를 만드는 action creator를 가져갑니다.
export const { todoAdded, todoToggled, todoRemoved, filterChanged } = todosSlice.actions;

// store에는 이 slice의 상태 변경 규칙을 등록합니다.
export default todosSlice.reducer;
