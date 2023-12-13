import { useMemo, useReducer, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useRef, useCallback } from 'react';
import { TodoStateContext, TodoDispatchContext } from './TodoContext';

const mockData = [
  {
    id: 0,
    isDone: true,
    content: 'React 공부',
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래 널기',
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: true,
    content: '음악 연습',
    createDate: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE': {
      // 새로운 todo item 추가해서 배열로 만들어서 반환
      return [...state, action.data];
    }
    case 'UPDATE': {
      // state = todos 배열
      return state.map((it) => (it.id === action.data ? { ...it, isDone: !it.isDone } : it));
    }
    case 'DELETE': {
      return state.filter((it) => it.id !== action.data);
    }
  }
}

function App() {
  const idRef = useRef(3);
  const [todos, dispatch] = useReducer(reducer, mockData);

  const onCreate = (content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content, // content : content
        createDate: new Date().getTime(),
      },
    });
  };

  // memo로는 Todo Itme 컴포넌트의 불필요한 리렌더링이 완료되지 못함
  // onUpdate, onDelete함수가 참조자료형이기 때문에 App컴포넌트가 리렌더링 일어나면 함수가 재생성됨
  // 함수 재생성 방지 => useCallback 이용
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      data: targetId,
    });
  }, []); // 의존성 배열 : 비어있으면 다시생성되지 않도록 함

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      data: targetId,
    });
  }, []);

  // 재생성하지 않는 객체
  const memoizedDispatchs = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatchs}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
