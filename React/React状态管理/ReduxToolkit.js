import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 创建计数器 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1; //RTK使用immer库，可以直接修改state
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// 导出 actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// 创建 store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// 计数器组件
const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Redux Toolkit 计数器示例</h2>
      <div>
        <span>当前计数: {count}</span>
      </div>
      <div>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        <button onClick={() => dispatch(reset())}>重置</button>
      </div>
    </div>
  );
};

// 主应用组件
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Redux Toolkit 计数器</h1>
        <Counter />
      </div>
    </Provider>
  );
};

export default App;

// Redux Toolkit 核心概念：
// 1. createSlice - 创建包含 reducer 和 action creators 的 slice
// 2. configureStore - 创建 store，自动配置 Redux DevTools 和中间件
// 3. useSelector - 从 store 中获取状态
// 4. useDispatch - 获取 dispatch 函数来发送 actions
// 5. Provider - 为应用提供 store 上下文
