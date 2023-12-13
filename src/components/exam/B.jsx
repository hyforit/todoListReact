import { useReducer } from 'react';

// reducer라는 함수로 컴포넌트 밖에서 상태변화를 처리하고 있음
// state = 상태값
// action 객체 = type, data
function reducer(state, action) {
  if (action.type === 'DECREASE') {
    return state - action.data;
  } else if (action.type === 'INCREASE') {
    return state + action.data;
  }
}

function B() {
  // useReducer 인자 = reducer함수 , 초기값 => state 변수 생성
  // 반환 => [값, 함수(트리거 = 상태변화를 발동)]
  // 상태변화를 처리하는 함수는 외부에서 인자로 받은 reducer함수이다
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <h4>{count}</h4>
      <div>
        <button
          onClick={() => {
            // 클릭 버튼을 누르면 dispatch()실행 => 매개변수의 reducer함수 실행
            dispatch({
              // 객체 = action
              type: 'DECREASE',
              data: 1,
            });
          }}>
          -
        </button>
        <button
          onClick={() => {
            dispatch({
              type: 'INCREASE',
              data: 1,
            });
          }}>
          +
        </button>
      </div>
    </div>
  );
}

export default B;
