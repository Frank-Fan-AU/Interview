import React, { useState, lazy, Suspense } from 'react';

// 使用 lazy() 函数创建懒加载组件
// 只有当组件被实际渲染时才会加载对应的代码包
const LazyComponent = lazy(() => import('./LazyComponent'));

// 加载中的占位组件
const LoadingSpinner = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>正在加载组件...</p>
    </div>
);

// 错误边界组件
const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h3>组件加载失败</h3>
                <button onClick={() => setHasError(false)}>重试</button>
            </div>
        );
    }

    return (
        <div onError={() => setHasError(true)}>
            {children}
        </div>
    );
};

const App = () => {
    // 控制是否显示懒加载组件的状态
    const [show, setShow] = useState(false);

    return (
        <div style={{ padding: '20px' }}>
            <h1>React 懒加载示例</h1>
            
            {/* 切换按钮 */}
            <button 
                onClick={() => setShow(!show)}
                style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px',
                    marginBottom: '20px'
                }}
            >
                {show ? '隐藏' : '显示'} 懒加载组件
            </button>

            {/* Suspense 组件用于处理懒加载组件的加载状态 */}
            <Suspense fallback={<LoadingSpinner />}>
                {/* 错误边界包裹懒加载组件 */}
                <ErrorBoundary>
                    {/* 只有当 show 为 true 时才会渲染 LazyComponent */}
                    {show && <LazyComponent />}
                </ErrorBoundary>
            </Suspense>
        </div>
    );
};

export default App;