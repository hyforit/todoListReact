import { useState, useMemo, useContext } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import { TodoStateContext } from '../TodoContext';

function TodoList() {
  // todos 구조분해 할당없이 할당해줌
  const todos = useContext(TodoStateContext);

  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterTodos = () => {
    if (search === '') {
      return todos;
    }
    // 검색어에 맞는 요소들 배열 반환 대소문자 상관없이
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
  };

  // onChange 함수가 실행될 때마다 리렌더링 되어서 getAnalyedTodoData 함수를 계속 호출하게 된다.
  // 사용자가 todos를 변경시키지 않는다면 수행하지 않도록 => useMemo 사용
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]); // 의존성배열

  return (
    <div className='TodoList'>
      <h4>Todos</h4>
      <div>
        <div>전체 투두 : {totalCount}</div>
        <div>완료 투두 : {doneCount}</div>
        <div>미완 투두 : {notDoneCount}</div>
      </div>
      <input value={search} placeholder='검색어를 입력하세요' onChange={onChangeSearch} />
      <div className='todos_wrapper'>
        {filterTodos().map((todo) => (
          <TodoItem {...todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
