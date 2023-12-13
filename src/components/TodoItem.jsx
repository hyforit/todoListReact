import './TodoItem.css';
import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../TodoContext';

function TodoItem({ id, isDone, content, createDate }) {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };
  const onDeleteBtn = () => {
    onDelete(id);
  };
  return (
    <div className='TodoItem'>
      <input type='checkbox' checked={isDone} onChange={onChangeCheckbox} />
      <div className='content'>{content}</div>
      <div className='date'>{new Date(createDate).toLocaleDateString()}</div>
      <button onClick={onDeleteBtn}>삭제</button>
    </div>
  );
}

export default memo(TodoItem);
/*
 onUpdate, onDelete 때문에 다른 item도 바뀌게 된다.
 => App컴포넌트가 리렌더링 되면  onUpdate, onDelete함수(참조자료형)도 다시 생성되기 때문이다.
    원시자료형(숫자, 문자 등)
*/
