# 常见性能瓶颈：
不必要的组件重渲染
庞大的组件树与深层嵌套
大量数据处理与渲染
首屏加载时间过长

# React.memo优化组件渲染
主要用于优化函数组件，避免不必要的重渲染的

## 简单案例：

```jsx
// 优化前：每次父组件重渲染，子组件都会重新渲染
const ChildComponent = ({ data }) => {
  console.log('ChildComponent 重新渲染');
  return <div>{data}</div>;
};

// 优化后：只有当props发生变化时才重新渲染
const OptimizedChildComponent = React.memo(({ data }) => {
  console.log('OptimizedChildComponent 重新渲染');
  return <div>{data}</div>;
});

// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const data = "固定数据";

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        点击次数: {count}
      </button>
      {/* 这个组件会每次都重新渲染 */}
      <ChildComponent data={data} />
      {/* 这个组件只有在data变化时才重新渲染 */}
      <OptimizedChildComponent data={data} />
    </div>
  );
};
```

# useCallback与useMemo
usecallback用于记忆化函数，usememo用于记忆化值

usecallback主要是为了避免函数因为其他地方的改变而重新渲染，导致使用函数的组件也重新渲染

usememo主要是有的值计算复杂，且依赖项不经常变动

## useCallback优化案例：

```jsx
// 优化前：每次父组件重渲染，都会创建新的函数引用
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  
  // 每次重渲染都会创建新的函数
  const handleClick = () => {
    console.log('按钮被点击');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        计数: {count}
      </button>
      <ChildComponent onButtonClick={handleClick} />
    </div>
  );
};

// 优化后：使用useCallback记忆化函数
const OptimizedParentComponent = () => {
  const [count, setCount] = useState(0);
  
  // 使用useCallback，只有当依赖项变化时才创建新函数
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
  }, []); // 空依赖数组，函数永远不会重新创建

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        计数: {count}
      </button>
      <ChildComponent onButtonClick={handleClick} />
    </div>
  );
};

// 子组件使用React.memo优化
const ChildComponent = React.memo(({ onButtonClick }) => {
  console.log('ChildComponent 重新渲染');
  return <button onClick={onButtonClick}>子组件按钮</button>;
});
```

## useMemo优化案例：

```jsx
// 优化前：每次组件重渲染都会重新计算复杂值
const ExpensiveComponent = ({ items }) => {
  const [count, setCount] = useState(0);
  
  // 每次重渲染都会重新计算
  const expensiveValue = items.reduce((sum, item) => {
    // 模拟复杂计算
    for (let i = 0; i < 1000000; i++) {
      sum += item.value;
    }
    return sum;
  }, 0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        计数: {count}
      </button>
      <div>计算结果: {expensiveValue}</div>
    </div>
  );
};

// 优化后：使用useMemo缓存计算结果
const OptimizedExpensiveComponent = ({ items }) => {
  const [count, setCount] = useState(0);
  
  // 只有当items变化时才重新计算
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => {
      // 模拟复杂计算
      for (let i = 0; i < 1000000; i++) {
        sum += item.value;
      }
      return sum;
    }, 0);
  }, [items]); // 依赖项：items

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        计数: {count}
      </button>
      <div>计算结果: {expensiveValue}</div>
    </div>
  );
};
```

# 使用虚拟化(Windowing)优化列表性能

只渲染视口(Viewport)内可见的列表项，以及少量视口外用户缓冲的列表项

极大减少DOM节点数量和渲染开销，适用于成百上千条数据的长列表

## 如何实现
常用库： react-window, react-virtualized

核心原理：计算并仅渲染可见区域的Item

# 首屏加载性能

非常影响首屏加载性能的一个点是js包的体积，如果初始要加载的js包的体积过大，用户就要等待过长的时间

这种时候代码的分割就是一种有效的解决策略
案例见./CodeSplittingApp.js

# 如何知道哪里需要优化？ React DevTools Profiler
React官方提供的浏览器扩展工程

## 能做什么？
Profiler Tab: 记录组件渲染次数和耗时
Flamegraph Chart: 可视化组件渲染层级与耗时
Ranked Chart： 按渲染耗时排序组件

