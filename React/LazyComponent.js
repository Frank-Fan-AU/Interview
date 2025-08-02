import React from 'react';

// 这是一个懒加载的组件
// 只有当用户点击按钮时才会被加载和渲染
const LazyComponent = () => {
    return (
        <div style={{
            border: '2px solid #007bff',
            borderRadius: '8px',
            padding: '20px',
            margin: '20px 0',
            backgroundColor: '#f8f9fa'
        }}>
            <h2>🎉 懒加载组件已成功加载！</h2>
            <p>这个组件是通过 <code>React.lazy()</code> 懒加载的。</p>
            <ul>
                <li>✅ 减少初始包大小</li>
                <li>✅ 提高首屏加载速度</li>
                <li>✅ 按需加载，节省带宽</li>
            </ul>
            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '15px',
                borderRadius: '5px',
                marginTop: '15px'
            }}>
                <strong>工作原理：</strong>
                <br />
                1. 使用 <code>React.lazy()</code> 包装组件
                <br />
                2. 用 <code>Suspense</code> 处理加载状态
                <br />
                3. 只有当组件被实际渲染时才加载代码
            </div>
        </div>
    );
};

export default LazyComponent; 