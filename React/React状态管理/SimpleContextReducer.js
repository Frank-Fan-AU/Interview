import React, { createContext, useContext, useReducer } from 'react';

// 1. 初始状态
const initialState = {
  count: 0,
  name: '计数器'
};

// 2. Action 类型
const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET_NAME: 'SET_NAME'
};

// 3. Reducer 函数
const counterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTIONS.RESET:
      return { ...state, count: 0 };
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

// 4. 创建 Context
const CounterContext = createContext();
const DispatchContext = createContext();

// 5. Provider 组件
export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const increment = () => dispatch({ type: ACTIONS.INCREMENT });
  const decrement = () => dispatch({ type: ACTIONS.DECREMENT });
  const reset = () => dispatch({ type: ACTIONS.RESET });
  const setName = (name) => dispatch({ type: ACTIONS.SET_NAME, payload: name });

  return (
      <DispatchContext.Provider value={dispatch}>
      <CounterContext.Provider value={state}>
        {children}
      </CounterContext.Provider>
    </DispatchContext.Provider>
  );
};

// 6. 自定义 Hook
export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
};
export const useDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('useDispatch must be used within CounterProvider');
  }
  return context;
};

// 7. 计数器组件
function CounterDisplay() {
  const { state } = useContext(CounterContext);
  return (
    <div>
      <h2>{state.name}</h2>
      <h3>当前值: {state.count}</h3>
    </div>
  );
}
function CounterButtons() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+1</button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-1</button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>重置</button>
    </div>
  );
}

// 8. 名称设置组件
const NameSetter = () => {
  const { state } = useCounter();
  const dispatch = useDispatch();

  return (
    <div>
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: ACTIONS.SET_NAME, payload: e.target.value })}
        placeholder="输入名称"
      />
    </div>
  );
};

// 9. 主应用
const App = () => {
  return (
    <CounterProvider>
        <CounterDisplay />
        <CounterButtons />
        <NameSetter />

    </CounterProvider>
  );
};

export default App; 