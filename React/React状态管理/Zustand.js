// Zustand 计数器案例
// Zustand 是一个轻量级的状态管理库，API简单，体积小，TypeScript友好

import { create } from 'zustand'

// 1. 定义 store 类型（可选，但推荐使用TypeScript）
// interface CounterStore {
//   count: number
//   increment: () => void
//   decrement: () => void
//   reset: () => void
//   incrementBy: (amount: number) => void
// }

// 2. 创建 store
const useCounterStore = create((set) => ({
  // 状态
  count: 0,
  
  // 操作方法
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
}))

// 3. React 组件示例
import React from 'react'

// 计数器组件
function Counter() {
  // 从 store 中获取状态和方法
  const { count, increment, decrement, reset, incrementBy } = useCounterStore()
  
  return (
    <div>
      <h2>Zustand 计数器示例</h2>
      <div>当前计数: {count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
      <button onClick={reset}>重置</button>
    </div>
  )
}

// 4. 另一个组件示例 - 显示计数器的平方
function CounterSquare() {
  // 只订阅 count 状态
  const count = useCounterStore((state) => state.count)
  
  return (
    <div>
      <h3>计数器平方</h3>
      <p>当前计数的平方: {count * count}</p>
    </div>
  )
}

// 5. 主应用组件
function CounterApp() {
  return (
    <div>
      <Counter />
      <CounterSquare />
    </div>
  )
}

// 6. 使用示例
// 在 React 应用中使用：
// import CounterApp from './Zustand.js'
// 
// function App() {
//   return (
//     <div>
//       <CounterApp />
//     </div>
//   )
// }

// 7. Zustand 的优势总结：
// - 简单：API 简洁，学习成本低
// - 轻量：体积小，bundle size 小
// - 灵活：支持部分订阅，避免不必要的重渲染
// - TypeScript 友好：原生支持类型推断
// - 无 Provider：不需要包裹 Provider 组件
// - 支持中间件：可以添加 devtools、persist 等中间件

// 8. 高级用法示例：

// 异步操作
const useAsyncStore = create((set) => ({
  data: null,
  loading: false,
  error: null,
  
  fetchData: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      set({ data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))

// 持久化存储
// import { persist } from 'zustand/middleware'
// 
// const usePersistedStore = create(
//   persist(
//     (set) => ({
//       count: 0,
//       increment: () => set((state) => ({ count: state.count + 1 }))
//     }),
//     {
//       name: 'counter-storage', // localStorage 的 key
//     }
//   )
// )

export default CounterApp
