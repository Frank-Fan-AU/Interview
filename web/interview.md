# 什么是CRP（Critical Rendering Path）？

## 定义
CRP（Critical Rendering Path）是浏览器将HTML、CSS和JavaScript转换为屏幕上的像素所必须经过的步骤序列。它决定了页面首次渲染的速度。

## 组成部分

### 1. DOM（Document Object Model）
- 浏览器解析HTML文档
- 构建DOM树
- 每个HTML元素成为DOM树中的一个节点

### 2. CSSOM（CSS Object Model）
- 浏览器解析CSS文件
- 构建CSSOM树
- 计算每个节点的样式

### 3. 渲染树（Render Tree）
- 结合DOM和CSSOM
- 只包含可见元素
- 计算每个元素的布局信息

### 4. 布局（Layout/Reflow）
- 计算每个元素的确切位置和大小
- 确定元素在视口中的坐标

### 5. 绘制（Paint）
- 将渲染树中的每个节点转换为屏幕上的像素
- 填充颜色、绘制边框等

## 阻塞资源

### CSS阻塞
```html
<!-- CSS会阻塞渲染 -->
<link rel="stylesheet" href="styles.css">
```

### JavaScript阻塞
```html
<!-- JavaScript会阻塞DOM解析 -->
<script src="app.js"></script>
```

## 优化策略

### 1. 减少阻塞资源
- 内联关键CSS
- 异步加载非关键CSS
- 延迟加载JavaScript

### 2. 优化CSS
```html
<!-- 预加载关键CSS -->
<link rel="preload" href="critical.css" as="style">
<link rel="stylesheet" href="critical.css">
```

### 3. 优化JavaScript
```html
<!-- 异步加载JavaScript -->
<script src="app.js" async></script>
<script src="app.js" defer></script>
```

### 4. 减少重排重绘
- 批量DOM操作
- 使用transform代替top/left
- 使用visibility代替display

## 性能指标

### 1. First Paint (FP)
- 首次绘制时间
- 页面开始有视觉变化

### 2. First Contentful Paint (FCP)
- 首次内容绘制
- 页面主要内容开始显示

### 3. Largest Contentful Paint (LCP)
- 最大内容绘制
- 页面主要内容完全显示

## 工具
- Chrome DevTools Performance面板
- Lighthouse
- WebPageTest
- PageSpeed Insights

## 最佳实践
1. 最小化关键资源数量
2. 减少关键资源大小
3. 优化关键路径长度
4. 预加载关键资源
5. 使用CDN加速资源加载

---

# 当导航到一个URL时会发生什么？

## 概述
当你在浏览器中输入URL或点击链接时，会发生一系列复杂的步骤，这个过程涉及多个网络协议和技术。

## 详细步骤

### 1. 输入URL
```
https://www.example.com/page
```

### 2. DNS解析
- 浏览器检查DNS缓存
- 如果没有缓存，向DNS服务器查询
- 递归查询：本地DNS → 根DNS → 顶级域名DNS → 权威DNS
- 获得IP地址（如：93.184.216.34）

### 3. TCP连接
- **三次握手**建立TCP连接
  1. 客户端发送SYN包
  2. 服务器回复SYN-ACK包
  3. 客户端发送ACK包
- 如果是HTTPS，还会进行TLS握手

### 4. TLS握手（HTTPS）
```
Client Hello → Server Hello → Certificate → Key Exchange → Finished
```

### 5. HTTP请求
```
GET /page HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0...
Accept: text/html,application/xhtml+xml...
```

### 6. 服务器处理
- 服务器接收请求
- 路由到对应的处理程序
- 执行业务逻辑
- 查询数据库（如需要）
- 生成响应

### 7. HTTP响应
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1234

<!DOCTYPE html>
<html>...
```

### 8. 浏览器解析
- **HTML解析**：构建DOM树
- **CSS解析**：构建CSSOM树
- **JavaScript执行**：可能修改DOM/CSSOM

### 9. 渲染过程
- **构建渲染树**：结合DOM和CSSOM
- **布局**：计算元素位置和大小
- **绘制**：将像素绘制到屏幕

### 10. 资源加载
- 解析HTML中的资源链接（CSS、JS、图片等）
- 并行下载资源
- 按优先级加载关键资源

## 关键概念

### DNS缓存层级
1. **浏览器缓存**：最近访问的域名
2. **操作系统缓存**：系统DNS缓存
3. **路由器缓存**：本地网络DNS
4. **ISP DNS缓存**：互联网服务提供商
5. **根DNS服务器**：顶级域名服务器

### HTTP状态码
- **2xx**：成功（200 OK）
- **3xx**：重定向（301, 302, 304）
- **4xx**：客户端错误（404, 403）
- **5xx**：服务器错误（500, 502）

### 性能优化点
1. **DNS预解析**：
```html
<link rel="dns-prefetch" href="//cdn.example.com">
```

2. **预连接**：
```html
<link rel="preconnect" href="https://api.example.com">
```

3. **预加载关键资源**：
```html
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="app.js" as="script">
```

## 网络协议栈
```
应用层：HTTP/HTTPS
传输层：TCP
网络层：IP
数据链路层：以太网/WiFi
物理层：电缆/无线电波
```

## 安全考虑
- **HTTPS**：加密传输
- **HSTS**：强制HTTPS
- **CSP**：内容安全策略
- **CORS**：跨域资源共享

## 调试工具
- **Chrome DevTools**：Network面板
- **Wireshark**：网络包分析
- **curl**：命令行HTTP客户端
- **Postman**：API测试工具

---

# 博客网页案例：访问过程详解

## 场景设定
假设你访问一个博客网站：`https://myblog.com/post/123`

这个博客页面包含：
- 文章标题和正文
- 作者头像和简介
- 3张配图
- 评论区域
- 相关文章推荐

## 完整访问过程

### 阶段1：网络连接建立

#### 1.1 DNS解析
```
用户输入：https://myblog.com/post/123
↓
浏览器检查缓存：myblog.com → 192.168.1.100
↓
如果没有缓存，查询DNS服务器
↓
获得IP地址：192.168.1.100
```

#### 1.2 TCP连接建立
```
客户端 → SYN → 服务器
客户端 ← SYN-ACK ← 服务器  
客户端 → ACK → 服务器
TCP连接建立完成
```

#### 1.3 TLS握手（HTTPS）
```
Client Hello → 服务器
← Server Hello + Certificate ← 服务器
Client Key Exchange → 服务器
← Finished ← 服务器
安全连接建立完成
```

### 阶段2：主页面请求

#### 2.1 HTTP请求
```
GET /post/123 HTTP/1.1
Host: myblog.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
Accept: text/html,application/xhtml+xml,application/xml
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

#### 2.2 服务器处理
```
服务器接收请求
↓
路由到博客文章处理程序
↓
查询数据库获取文章内容
↓
查询数据库获取作者信息
↓
查询数据库获取评论数据
↓
生成HTML响应
```

#### 2.3 HTTP响应
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 15420
Cache-Control: max-age=3600
ETag: "abc123"

<!DOCTYPE html>
<html>
<head>
    <title>我的博客文章标题</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/blog.css">
</head>
<body>
    <header>...</header>
    <article>
        <h1>文章标题</h1>
        <div class="author">
            <img src="/images/avatar.jpg" alt="作者头像">
            <span>作者名称</span>
        </div>
        <div class="content">
            <p>文章正文内容...</p>
            <img src="/images/post1.jpg" alt="配图1">
            <img src="/images/post2.jpg" alt="配图2">
            <img src="/images/post3.jpg" alt="配图3">
        </div>
    </article>
    <script src="/js/comments.js"></script>
    <script src="/js/analytics.js"></script>
</body>
</html>
```

### 阶段3：浏览器解析和渲染

#### 3.1 HTML解析
```
浏览器开始解析HTML
↓
构建DOM树：
html
├── head
│   ├── title
│   └── link (CSS)
└── body
    ├── header
    ├── article
    │   ├── h1
    │   ├── div.author
    │   └── div.content
    └── script
```

#### 3.2 CSS解析（阻塞渲染）
```
发现CSS链接：/css/main.css, /css/blog.css
↓
发送HTTP请求获取CSS文件
↓
解析CSS，构建CSSOM树
↓
计算每个DOM节点的样式
```

#### 3.3 渲染树构建
```
结合DOM和CSSOM
↓
排除不可见元素（如display:none）
↓
计算每个元素的布局信息
↓
生成渲染树
```

#### 3.4 首次绘制
```
浏览器开始绘制页面
↓
用户看到页面基本结构
↓
First Paint (FP) 完成
```

### 阶段4：资源并行加载

#### 4.1 图片资源加载
```
解析到img标签
↓
并行发送HTTP请求：
- GET /images/avatar.jpg
- GET /images/post1.jpg  
- GET /images/post2.jpg
- GET /images/post3.jpg
↓
服务器返回图片文件
↓
浏览器解码图片
↓
绘制到页面
```

#### 4.2 JavaScript执行
```
解析到script标签
↓
发送HTTP请求获取JS文件
↓
执行JavaScript代码：
- 加载评论系统
- 初始化分析工具
- 可能修改DOM
```

#### 4.3 字体加载（如果有）
```
解析到@font-face
↓
发送HTTP请求获取字体文件
↓
浏览器渲染文字
```

### 阶段5：交互功能激活

#### 5.1 评论系统
```
comments.js加载完成
↓
初始化评论组件
↓
发送AJAX请求获取评论数据
↓
渲染评论列表
↓
绑定事件监听器
```

#### 5.2 分析工具
```
analytics.js加载完成
↓
发送页面浏览事件
↓
记录用户行为数据
```

## 性能时间线

```
0ms     - 开始DNS解析
50ms    - DNS解析完成
100ms   - TCP连接建立
200ms   - TLS握手完成
250ms   - 发送HTTP请求
300ms   - 服务器开始处理
500ms   - 服务器返回HTML
600ms   - 浏览器开始解析HTML
800ms   - CSS加载完成
900ms   - 首次绘制(FP)
1000ms  - 首次内容绘制(FCP)
1200ms  - 图片开始加载
1500ms  - 最大内容绘制(LCP)
2000ms  - 页面完全加载
```

## 优化建议

### 1. 关键资源优化
```html
<!-- 内联关键CSS -->
<style>
  .header { /* 关键样式 */ }
  .article { /* 关键样式 */ }
</style>

<!-- 异步加载非关键CSS -->
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 2. 图片优化
```html
<!-- 使用WebP格式 -->
<picture>
  <source srcset="/images/post1.webp" type="image/webp">
  <img src="/images/post1.jpg" alt="配图1" loading="lazy">
</picture>

<!-- 响应式图片 -->
<img srcset="/images/post1-300.jpg 300w,
             /images/post1-600.jpg 600w,
             /images/post1-900.jpg 900w"
     sizes="(max-width: 600px) 300px,
            (max-width: 900px) 600px,
            900px"
     src="/images/post1-600.jpg" alt="配图1">
```

### 3. JavaScript优化
```html
<!-- 延迟加载非关键JS -->
<script src="/js/comments.js" defer></script>

<!-- 异步加载分析工具 -->
<script src="/js/analytics.js" async></script>
```

### 4. 缓存策略
```html
<!-- 设置缓存头 -->
<meta http-equiv="Cache-Control" content="max-age=3600">
```

## 常见问题和解决方案

### 1. 图片加载慢
- **解决方案**：使用CDN、图片压缩、WebP格式、懒加载

### 2. CSS阻塞渲染
- **解决方案**：内联关键CSS、异步加载非关键CSS

### 3. JavaScript阻塞解析
- **解决方案**：使用async/defer、代码分割

### 4. 字体加载闪烁
- **解决方案**：使用font-display: swap、预加载字体