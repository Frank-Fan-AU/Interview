如何使用useContext和useReducer自带的组合来实现轻量的状态管理库

# useContext
React 官方提供的跨组件层级传递数据的机制

为什么用：避免组件树中深层次的prop Drilling

核心API：
- React.createContext():创建一个Context对象
- Context.Provider: 数据提供者，其value属性可被后代消费者获取
- Context.Consumer / useContext() 数据消费者

# useReducer

可以看做是useState更强大的版本，适用于更复杂的状态逻辑

为什么用？
- 当状态逻辑复杂，包含多个子值时。
- 当下一个状态依赖于之前的状态时
- 集中管理状态更新逻辑

核心API
- const [state, dispatch] = useReducer(reducer, initialArg, init?)
- reducer 函数 (currentState, action) => newState
- dispatch 函数：触发状态更新，传递action对象

# 在表达时： 为何选择useContext + useReducer?

useReducer: 集中状态管理逻辑，使状态变更可预测

useContext: 将state和dispatch函数全局注入，避免逐层传递

- 优势
    - 轻量
    - 清晰： 状态逻辑与UI组件分离
    - 想把redux更容易上手和维护
    - 性能： useContext本身可能导致不必要的重渲染，但可通过React.memo或拆分Context优化
    