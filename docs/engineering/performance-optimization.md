# 前端性能优化

前端性能优化是提升用户体验的关键环节，它直接影响网站的加载速度、响应性和用户满意度。本文将从多个维度详细介绍前端性能优化的策略和技术。

## 为什么性能优化很重要

- **用户体验**：页面加载速度直接影响用户体验，加载时间每增加 1 秒，转化率可能下降 7%
- **搜索引擎排名**：页面速度是搜索引擎排名的重要因素
- **用户留存**：53% 的移动用户会放弃加载时间超过 3 秒的网站
- **业务转化**：网站性能与业务指标（如转化率、跳出率）直接相关

## 性能指标

### 核心指标

1. **首次内容绘制（FCP, First Contentful Paint）**：首次有内容渲染到屏幕上的时间
2. **最大内容绘制（LCP, Largest Contentful Paint）**：最大内容元素渲染完成的时间
3. **首次输入延迟（FID, First Input Delay）**：用户首次交互到浏览器响应的时间
4. **累积布局偏移（CLS, Cumulative Layout Shift）**：页面元素意外偏移的程度

### 其他重要指标

1. **首字节时间（TTFB, Time to First Byte）**：从请求到收到第一个字节的时间
2. **DOM 内容加载（DCL, DOMContentLoaded）**：DOM 树构建完成的时间
3. **页面完全加载（Load）**：页面及所有资源加载完成的时间
4. **首次有意义绘制（FMP, First Meaningful Paint）**：页面主要内容出现的时间
5. **可交互时间（TTI, Time to Interactive）**：页面完全可交互的时间

## 性能优化策略

### 1. 网络传输优化

#### 减少 HTTP 请求

- **合并文件**：将多个 CSS/JS 文件合并为一个
- **CSS Sprites**：将多个小图标合并为一个图片，通过 CSS 定位显示
- **内联小资源**：将小型 CSS/JS 直接内联到 HTML 中
- **懒加载**：延迟加载非关键资源

```javascript
// 图片懒加载示例
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll("img.lazy");
  
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });
    
    lazyImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  }
});
```

#### 压缩资源

- **Minify**：压缩 HTML、CSS、JavaScript 代码
- **Gzip/Brotli**：启用服务器压缩
- **图片优化**：选择合适的格式和压缩级别
  - JPEG：适合照片
  - PNG：适合需要透明度的图像
  - WebP：新一代格式，同等质量下体积更小
  - SVG：适合图标和简单图形
  - AVIF：更新的高压缩比格式

```html
<!-- 响应式图片 -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述">
</picture>
```

#### 使用 CDN

- 将静态资源部署到 CDN，减少传输距离和时间
- 利用 CDN 的缓存机制提高资源加载速度

#### HTTP 缓存策略

- **强缓存**：通过 `Cache-Control` 和 `Expires` 头控制
- **协商缓存**：通过 `ETag` 和 `Last-Modified` 头控制

```nginx
# Nginx 缓存配置示例
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

#### 使用 HTTP/2 或 HTTP/3

- 多路复用：在单个连接上并行请求多个资源
- 服务器推送：服务器主动推送相关资源
- 头部压缩：减少请求头大小

### 2. 资源加载优化

#### 关键渲染路径优化

- **减少关键资源数量**：识别并优先加载关键 CSS/JS
- **减少关键资源大小**：内联关键 CSS
- **减少关键路径长度**：减少阻塞渲染的资源

```html
<!-- 内联关键 CSS -->
<style>
  /* 关键样式 */
  .header { ... }
  .hero { ... }
</style>

<!-- 异步加载非关键 CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

#### 资源提示

- **preload**：提前加载当前页面需要的资源
- **prefetch**：提前加载将来页面可能需要的资源
- **preconnect**：提前建立与服务器的连接
- **dns-prefetch**：提前解析域名

```html
<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="main.js" as="script">

<!-- 预连接到重要域名 -->
<link rel="preconnect" href="https://api.example.com">

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

<!-- 预获取可能需要的资源 -->
<link rel="prefetch" href="next-page.html">
```

#### 异步加载 JavaScript

- **async**：异步加载脚本，加载完成后立即执行
- **defer**：异步加载脚本，在 HTML 解析完成后执行

```html
<!-- 异步加载，加载完立即执行 -->
<script async src="analytics.js"></script>

<!-- 异步加载，等待 HTML 解析完成后执行 -->
<script defer src="non-critical.js"></script>
```

#### 代码拆分

- 使用动态导入（Dynamic Import）按需加载代码
- 基于路由的代码拆分

```javascript
// 动态导入示例
button.addEventListener('click', async () => {
  const module = await import('./heavy-module.js');
  module.doSomething();
});
```

### 3. 渲染优化

#### 减少重排和重绘

- **批量 DOM 操作**：使用 DocumentFragment 或虚拟 DOM
- **避免强制同步布局**：不要在修改 DOM 后立即查询布局信息
- **使用 CSS 动画代替 JS 动画**：CSS 动画通常更高效
- **使用 transform 和 opacity 进行动画**：这些属性不会触发重排

```javascript
// 不好的做法：频繁操作 DOM
for (let i = 0; i < 1000; i++) {
  container.innerHTML += '<div>' + i + '</div>';
}

// 好的做法：使用 DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.textContent = i;
  fragment.appendChild(div);
}
container.appendChild(fragment);
```

#### 使用 requestAnimationFrame

- 与浏览器渲染周期同步，避免丢帧
- 在视觉变化前执行 JavaScript

```javascript
function animate() {
  // 更新动画
  element.style.transform = `translateX(${position}px)`;
  position += 5;
  
  // 继续下一帧
  if (position < 1000) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

#### 使用 Web Workers

- 将耗时计算移至后台线程，避免阻塞主线程

```javascript
// main.js
const worker = new Worker('worker.js');

worker.onmessage = function(e) {
  console.log('计算结果：', e.data);
};

worker.postMessage([1, 2, 3, 4]);

// worker.js
onmessage = function(e) {
  const result = e.data.reduce((sum, num) => sum + num, 0);
  postMessage(result);
};
```

#### 避免长任务

- 将大任务拆分为小任务，使用 `setTimeout` 或 `requestIdleCallback` 调度

```javascript
function processArray(array, callback) {
  const chunk = 100;
  let index = 0;
  
  function doChunk() {
    const limit = Math.min(index + chunk, array.length);
    for (let i = index; i < limit; i++) {
      callback(array[i]);
    }
    index = limit;
    
    if (index < array.length) {
      setTimeout(doChunk, 0);
    }
  }
  
  doChunk();
}
```

### 4. JavaScript 优化

#### 减少 JavaScript 体积

- **Tree Shaking**：移除未使用的代码
- **代码分割**：按需加载代码
- **压缩代码**：使用 Terser 等工具压缩

#### 避免内存泄漏

- 及时清除事件监听器
- 避免闭包导致的意外引用
- 使用 WeakMap 和 WeakSet 存储对象引用

```javascript
// 不好的做法：可能导致内存泄漏
function setupListener(element) {
  let data = { /* 大量数据 */ };
  
  element.addEventListener('click', function() {
    console.log(data);
  });
}

// 好的做法：避免闭包引用大数据
function setupListener(element) {
  element.addEventListener('click', handleClick);
}

function handleClick() {
  // 处理点击事件
}
```

#### 使用防抖和节流

- **防抖（Debounce）**：将多次触发的事件合并为一次
- **节流（Throttle）**：限制事件触发的频率

```javascript
// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const debouncedResize = debounce(() => {
  console.log('窗口大小改变');
}, 300);

window.addEventListener('resize', debouncedResize);
```

#### 使用 Web API 高效处理数据

- 使用 `requestIdleCallback` 在浏览器空闲时执行任务
- 使用 `IntersectionObserver` 高效检测元素可见性
- 使用 `ResizeObserver` 监听元素大小变化

```javascript
// 使用 requestIdleCallback
requestIdleCallback(function(deadline) {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    doTask(tasks.shift());
  }
  
  if (tasks.length > 0) {
    requestIdleCallback(processRemainingTasks);
  }
});
```

### 5. CSS 优化

#### 优化选择器

- 避免使用通配符选择器（`*`）
- 减少选择器嵌套层级
- 避免使用 CSS 表达式

```css
/* 不好的做法 */
body div ul li a { ... }

/* 好的做法 */
.nav-link { ... }
```

#### 减少重排属性的使用

- 避免频繁修改会导致重排的属性（如 width、height、margin 等）
- 使用 transform 代替 top、left 等属性进行动画

```css
/* 不好的做法 */
.box {
  position: absolute;
  left: 100px;
  top: 50px;
  transition: left 0.5s, top 0.5s;
}
.box:hover {
  left: 120px;
  top: 70px;
}

/* 好的做法 */
.box {
  position: absolute;
  left: 100px;
  top: 50px;
  transition: transform 0.5s;
}
.box:hover {
  transform: translate(20px, 20px);
}
```

#### 使用 CSS 预处理器优化

- 使用变量减少重复代码
- 使用 mixins 封装常用样式
- 使用嵌套提高可读性

```scss
// SCSS 示例
$primary-color: #3498db;
$border-radius: 4px;

@mixin button-style {
  padding: 10px 15px;
  border-radius: $border-radius;
  border: none;
  cursor: pointer;
}

.button {
  @include button-style;
  background-color: $primary-color;
  color: white;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
  
  &.secondary {
    background-color: #e74c3c;
  }
}
```

#### 关键 CSS 和非关键 CSS 分离

- 内联关键 CSS，异步加载非关键 CSS
- 使用媒体查询延迟加载非关键 CSS

```html
<style>
  /* 关键 CSS */
  body { font-family: sans-serif; margin: 0; }
  header { background: #333; color: white; padding: 1rem; }
</style>

<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

### 6. 图片和多媒体优化

#### 响应式图片

- 使用 `srcset` 和 `sizes` 属性提供不同分辨率的图片
- 使用 `<picture>` 元素根据不同条件提供不同图片

```html
<img src="small.jpg"
     srcset="small.jpg 500w,
             medium.jpg 1000w,
             large.jpg 1500w"
     sizes="(max-width: 600px) 500px,
            (max-width: 1200px) 1000px,
            1500px"
     alt="响应式图片示例">
```

#### 图片格式选择

- **JPEG**：适合照片和复杂图像
- **PNG**：适合需要透明度的图像
- **SVG**：适合图标和简单图形
- **WebP**：新一代格式，同等质量下体积更小
- **AVIF**：更新的高压缩比格式

#### 图片懒加载

- 使用 `loading="lazy"` 属性（现代浏览器原生支持）
- 使用 IntersectionObserver API 实现自定义懒加载

```html
<!-- 原生懒加载 -->
<img src="image.jpg" loading="lazy" alt="懒加载图片">
```

#### 视频优化

- 提供多种格式（MP4、WebM）
- 使用 `preload="none"` 或 `preload="metadata"` 延迟加载
- 考虑使用视频缩略图代替自动播放

```html
<video controls preload="metadata" poster="thumbnail.jpg">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>
```

### 7. 字体优化

#### 使用 font-display

- 控制字体加载和显示策略

```css
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap; /* 立即使用系统字体，字体加载完成后替换 */
}
```

#### 字体子集化

- 只包含网站使用的字符，减小字体文件大小

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&text=HelloWorld&display=swap" rel="stylesheet">
```

#### 使用系统字体

- 使用系统默认字体可以避免额外的字体下载

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
```

### 8. 服务端优化

#### 服务器响应时间优化

- 优化数据库查询
- 实现有效的缓存策略
- 使用 CDN 分发静态资源

#### 实现服务端渲染（SSR）

- 减少首屏加载时间
- 提高 SEO 效果

```javascript
// Next.js SSR 示例
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }
  };
}

function Page({ data }) {
  return <div>{data.title}</div>;
}
```

#### 使用 Service Worker 实现离线功能

- 缓存资源，提供离线访问能力
- 实现后台同步和推送通知

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(error => {
        console.log('SW registration failed: ', error);
      });
  });
}

// sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/offline.html'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      });
    })
  );
});
```

### 9. 构建工具优化

#### Webpack 优化

- **Tree Shaking**：移除未使用的代码
- **代码分割**：按需加载代码
- **缓存**：使用持久化缓存提高构建速度

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single',
    moduleIds: 'deterministic'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

#### 使用现代构建工具

- **Vite**：基于 ESM 的快速开发服务器和构建工具
- **esbuild**：极速 JavaScript 打包器
- **SWC**：Rust 编写的快速 JavaScript/TypeScript 编译器

### 10. 监控与分析

#### 性能监控

- **Lighthouse**：综合性能分析工具
- **Web Vitals**：监控核心性能指标
- **Performance API**：获取详细性能数据

```javascript
// 使用 Performance API 测量
performance.mark('start');

// 执行需要测量的代码
doSomething();

performance.mark('end');
performance.measure('操作耗时', 'start', 'end');

const measures = performance.getEntriesByType('measure');
console.log(measures);
```

#### 错误监控

- 捕获并上报 JavaScript 错误
- 监控网络请求失败
- 跟踪用户行为

```javascript
// 全局错误捕获
window.addEventListener('error', function(event) {
  // 上报错误信息
  sendErrorToAnalytics({
    message: event.message,
    source: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

// Promise 错误捕获
window.addEventListener('unhandledrejection', function(event) {
  // 上报 Promise 错误
  sendErrorToAnalytics({
    message: 'Unhandled Promise Rejection',
    error: event.reason
  });
});
```

#### 用户体验监控

- 跟踪用户交互延迟
- 监控页面跳转性能
- 分析用户行为模式

```javascript
// 监控用户交互
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.interactionId) {
      console.log('交互延迟:', entry.duration, '毫秒');
      // 上报数据
      sendAnalytics({
        type: 'interaction',
        duration: entry.duration,
        name: entry.name
      });
    }
  }
});

observer.observe({ type: 'event', buffered: true });
```

## 性能优化清单

### 网络优化
- [ ] 减少 HTTP 请求数量
- [ ] 使用 HTTP/2 或 HTTP/3
- [ ] 启用服务器压缩（Gzip/Brotli）
- [ ] 优化图片（格式、大小、压缩）
- [ ] 使用 CDN 分发静态资源
- [ ] 实现有效的缓存策略

### 资源优化
- [ ] 压缩 CSS 和 JavaScript
- [ ] 移除未使用的 CSS 和 JavaScript
- [ ] 延迟加载非关键资源
- [ ] 预加载关键资源
- [ ] 内联关键 CSS
- [ ] 异步加载 JavaScript

### 渲染优化
- [ ] 减少重排和重绘
- [ ] 优化 CSS 选择器
- [ ] 使用 CSS 动画代替 JavaScript 动画
- [ ] 使用 transform 和 opacity 进行动画
- [ ] 避免大型、复杂的布局计算

### JavaScript 优化
- [ ] 避免长任务阻塞主线程
- [ ] 使用 Web Workers 处理耗时计算
- [ ] 实现代码分割和懒加载
- [ ] 使用防抖和节流优化事件处理
- [ ] 避免内存泄漏

### 字体优化
- [ ] 使用 font-display 控制字体加载行为
- [ ] 实现字体子集化
- [ ] 预加载关键字体

### 构建优化
- [ ] 实现 Tree Shaking
- [ ] 配置代码分割
- [ ] 使用现代构建工具
- [ ] 优化依赖管理

### 监控与分析
- [ ] 实现性能监控
- [ ] 跟踪核心 Web 指标
- [ ] 监控用户体验数据
- [ ] 定期进行性能审计

## 总结

前端性能优化是一个持续的过程，需要从多个维度进行综合考虑。通过网络传输优化、资源加载优化、渲染优化、JavaScript 优化等多方面的努力，可以显著提升网站的加载速度和用户体验。

性能优化没有一劳永逸的解决方案，需要根据具体项目的特点和用户需求，选择合适的优化策略。同时，建立有效的性能监控机制，持续跟踪和改进性能指标，是保持网站高性能的关键。