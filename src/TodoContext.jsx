import { createContext } from 'react';

// 1. 변경 될 수 있는 값 = todos
export const TodoStateContext = createContext();

// 2. 변경 되지 않는 값 = onCreate, onUpdate, onDelete
export const TodoDispatchContext = createContext();
