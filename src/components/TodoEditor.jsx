import { useRef, useState, useContext } from 'react';
import './TodoEditor.css';
import { TodoDispatchContext } from '../TodoContext';

function TodoEditor() {
  const [content, setContent] = useState('');
  const inputRef = useRef();

  // context를 이용해서 onCreate함수 공급받음
  const { onCreate } = useContext(TodoDispatchContext);

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onClick = () => {
    // 빈 문자열 입력 방지
    if (content === '') {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent(''); // 입력이 완료되면 reset
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // 13 = 엔터 키를 입력하면 onClick
      onClick();
    }
  };

  return (
    <div className='TodoEditor'>
      <input
        placeholder='새로운 Todo...'
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      <button onClick={onClick}>추가</button>
    </div>
  );
}

export default TodoEditor;
