import './Header.css';
import { memo } from 'react';

function Header() {
  return (
    <div className='Header'>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
}

// const OptimizedHeaderComponent = memo(Header);
// memo(컴포넌트) : 컴포넌트를 인자로 받아서 새로운 최적화된 컴포넌트로 반환

//export default OptimizedHeaderComponent; //최적화된 컴포넌트로 반환
export default memo(Header);
