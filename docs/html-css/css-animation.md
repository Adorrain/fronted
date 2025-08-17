# CSS 动画

CSS 动画是现代网页设计中不可或缺的一部分，它可以增强用户体验、引导用户注意力并提供视觉反馈。本文将系统介绍 CSS 动画的各种技术和最佳实践。

## CSS 过渡（Transitions）

CSS 过渡允许元素的属性值在指定的时间内平滑地变化，而不是立即变化。

### 基本语法

```css
.element {
    transition-property: property;
    transition-duration: duration;
    transition-timing-function: timing-function;
    transition-delay: delay;
    
    /* 简写形式 */
    transition: property duration timing-function delay;
}
```

### 属性说明

- **transition-property**：指定要过渡的 CSS 属性名称
  - 可以是具体属性如 `width`、`color`
  - 可以是 `all`（所有可动画属性）
  - 可以是 `none`（无过渡效果）

- **transition-duration**：指定过渡效果持续的时间
  - 单位：秒（s）或毫秒（ms）
  - 默认值：0s（无过渡）

- **transition-timing-function**：指定过渡效果的速度曲线
  - `linear`：匀速
  - `ease`：慢-快-慢（默认值）
  - `ease-in`：慢-快
  - `ease-out`：快-慢
  - `ease-in-out`：慢-快-慢（比 ease 更强调）
  - `cubic-bezier(n,n,n,n)`：自定义贝塞尔曲线
  - `steps(n, start|end)`：阶梯式过渡

- **transition-delay**：指定过渡效果开始前的延迟时间
  - 单位：秒（s）或毫秒（ms）
  - 默认值：0s（无延迟）

### 示例

**基本过渡**：

```css
.button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #2980b9;
}
```

**多属性过渡**：

```css
.card {
    width: 300px;
    height: 200px;
    background-color: #f1c40f;
    border-radius: 5px;
    transform: scale(1);
    transition: transform 0.3s ease, background-color 0.5s ease-in-out;
}

.card:hover {
    transform: scale(1.05);
    background-color: #f39c12;
}
```

**所有属性过渡**：

```css
.element {
    width: 100px;
    height: 100px;
    background-color: #e74c3c;
    opacity: 1;
    transition: all 0.5s ease-in-out;
}

.element:hover {
    width: 150px;
    height: 150px;
    background-color: #c0392b;
    opacity: 0.8;
}
```

### 可动画的属性

并非所有 CSS 属性都可以过渡，常见的可动画属性包括：

- 颜色属性：`color`, `background-color`, `border-color` 等
- 位置属性：`top`, `right`, `bottom`, `left`
- 尺寸属性：`width`, `height`, `padding`, `margin`
- 透明度：`opacity`
- 变换：`transform`（包括 `scale`, `rotate`, `translate` 等）
- 阴影：`box-shadow`, `text-shadow`
- 边框：`border-width`, `border-radius`

## CSS 动画（Animations）

CSS 动画允许创建更复杂的动画序列，可以定义关键帧（keyframes）来控制动画的中间状态。

### 基本语法

```css
/* 定义动画 */
@keyframes animationName {
    from {
        /* 起始状态 */
    }
    to {
        /* 结束状态 */
    }
}

/* 或者使用百分比 */
@keyframes animationName {
    0% {
        /* 起始状态 */
    }
    50% {
        /* 中间状态 */
    }
    100% {
        /* 结束状态 */
    }
}

/* 应用动画 */
.element {
    animation-name: animationName;
    animation-duration: duration;
    animation-timing-function: timing-function;
    animation-delay: delay;
    animation-iteration-count: count;
    animation-direction: direction;
    animation-fill-mode: fill-mode;
    animation-play-state: play-state;
    
    /* 简写形式 */
    animation: name duration timing-function delay iteration-count direction fill-mode play-state;
}
```

### 属性说明

- **animation-name**：指定要绑定到选择器的关键帧的名称

- **animation-duration**：指定动画完成一个周期所需的时间
  - 单位：秒（s）或毫秒（ms）
  - 默认值：0s（无动画）

- **animation-timing-function**：指定动画的速度曲线
  - 与 transition-timing-function 相同

- **animation-delay**：指定动画开始前的延迟时间
  - 单位：秒（s）或毫秒（ms）
  - 默认值：0s（无延迟）

- **animation-iteration-count**：指定动画的播放次数
  - 具体数值
  - `infinite`：无限循环

- **animation-direction**：指定动画是否应该轮流反向播放
  - `normal`：正常播放（默认值）
  - `reverse`：反向播放
  - `alternate`：先正向后反向
  - `alternate-reverse`：先反向后正向

- **animation-fill-mode**：指定动画执行前后如何为目标元素应用样式
  - `none`：不改变默认行为（默认值）
  - `forwards`：保持最后一帧的样式
  - `backwards`：在 animation-delay 期间应用第一帧的样式
  - `both`：同时应用 forwards 和 backwards 的效果

- **animation-play-state**：指定动画是运行还是暂停
  - `running`：运行（默认值）
  - `paused`：暂停

### 示例

**简单动画**：

```css
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.element {
    animation: fadeIn 1s ease-in-out;
}
```

**多关键帧动画**：

```css
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.heart {
    animation: pulse 1.5s ease-in-out infinite;
}
```

**复杂动画**：

```css
@keyframes moveAround {
    0% {
        transform: translate(0, 0);
        background-color: red;
    }
    25% {
        transform: translate(100px, 0);
        background-color: yellow;
    }
    50% {
        transform: translate(100px, 100px);
        background-color: green;
    }
    75% {
        transform: translate(0, 100px);
        background-color: blue;
    }
    100% {
        transform: translate(0, 0);
        background-color: red;
    }
}

.box {
    width: 50px;
    height: 50px;
    background-color: red;
    animation: moveAround 4s ease-in-out infinite;
}
```

**多个动画**：

```css
.element {
    animation: 
        fadeIn 1s ease-in-out,
        slideUp 1.2s ease-out 0.3s;
}
```

## CSS 变换（Transforms）

CSS 变换允许你旋转、缩放、倾斜或平移元素，通常与过渡和动画结合使用。

### 2D 变换

```css
.element {
    /* 平移 */
    transform: translate(50px, 100px);
    transform: translateX(50px);
    transform: translateY(100px);
    
    /* 缩放 */
    transform: scale(1.5);
    transform: scaleX(1.5);
    transform: scaleY(0.5);
    
    /* 旋转 */
    transform: rotate(45deg);
    
    /* 倾斜 */
    transform: skew(10deg, 20deg);
    transform: skewX(10deg);
    transform: skewY(20deg);
    
    /* 组合变换（从右到左应用） */
    transform: rotate(45deg) scale(1.5) translate(50px, 100px);
}
```

### 3D 变换

```css
.element {
    /* 3D 平移 */
    transform: translate3d(50px, 100px, 200px);
    transform: translateZ(200px);
    
    /* 3D 缩放 */
    transform: scale3d(1.5, 0.5, 2);
    transform: scaleZ(2);
    
    /* 3D 旋转 */
    transform: rotateX(45deg);
    transform: rotateY(45deg);
    transform: rotateZ(45deg);
    transform: rotate3d(1, 1, 1, 45deg);
    
    /* 透视 */
    transform: perspective(1000px);
}
```

### 变换原点

```css
.element {
    transform-origin: center; /* 默认值 */
    transform-origin: top left;
    transform-origin: 50px 50px;
    transform-origin: 25% 75%;
}
```

### 3D 空间设置

```css
.container {
    /* 子元素是否位于 3D 空间 */
    transform-style: flat; /* 默认值 */
    transform-style: preserve-3d;
    
    /* 背面可见性 */
    backface-visibility: visible; /* 默认值 */
    backface-visibility: hidden;
    
    /* 透视 */
    perspective: 1000px;
    perspective-origin: center;
}
```

## 常用动画效果

### 1. 淡入淡出

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.fade-in {
    animation: fadeIn 0.5s ease-in-out forwards;
}

.fade-out {
    animation: fadeOut 0.5s ease-in-out forwards;
}
```

### 2. 滑动

```css
@keyframes slideInFromLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInFromTop {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-left {
    animation: slideInFromLeft 0.5s ease-out forwards;
}

.slide-top {
    animation: slideInFromTop 0.5s ease-out forwards;
}
```

### 3. 缩放

```css
@keyframes zoomIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes zoomOut {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(0);
        opacity: 0;
    }
}

.zoom-in {
    animation: zoomIn 0.5s ease-out forwards;
}

.zoom-out {
    animation: zoomOut 0.5s ease-in forwards;
}
```

### 4. 弹跳

```css
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.bounce {
    animation: bounce 1s ease infinite;
}
```

### 5. 旋转

```css
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.rotate {
    animation: rotate 2s linear infinite;
}
```

### 6. 闪烁

```css
@keyframes blink {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.blink {
    animation: blink 1s ease-in-out infinite;
}
```

### 7. 抖动

```css
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}

.shake {
    animation: shake 0.8s ease-in-out;
}
```

### 8. 脉冲

```css
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.pulse {
    animation: pulse 1.5s ease-in-out infinite;
}
```

## 高级动画技巧

### 1. 交错动画

为一组元素设置不同的动画延迟，创造出交错效果：

```css
.item:nth-child(1) { animation-delay: 0s; }
.item:nth-child(2) { animation-delay: 0.1s; }
.item:nth-child(3) { animation-delay: 0.2s; }
.item:nth-child(4) { animation-delay: 0.3s; }
.item:nth-child(5) { animation-delay: 0.4s; }
```

使用 SCSS 循环简化代码：

```scss
@for $i from 1 through 5 {
    .item:nth-child(#{$i}) {
        animation-delay: #{($i - 1) * 0.1}s;
    }
}
```

### 2. 动画状态切换

使用 CSS 类来控制动画状态：

```css
.box {
    width: 100px;
    height: 100px;
    background-color: blue;
    transition: all 0.3s ease;
}

.box.active {
    background-color: red;
    transform: scale(1.2);
}
```

JavaScript 控制：

```javascript
document.querySelector('.box').addEventListener('click', function() {
    this.classList.toggle('active');
});
```

### 3. 动画序列

使用 `animation-delay` 创建动画序列：

```css
.element {
    animation: fadeIn 1s ease forwards,
               slideUp 1s ease 1s forwards,
               pulse 1s ease 2s infinite;
}
```

### 4. 路径动画

使用 `@property` 和 `offset-path` 创建路径动画：

```css
@property --progress {
    syntax: '<number>';
    initial-value: 0;
    inherits: false;
}

@keyframes moveAlongPath {
    0% { --progress: 0; }
    100% { --progress: 1; }
}

.element {
    offset-path: path('M0,0 C50,50 100,0 150,50 S200,0 250,50');
    offset-distance: calc(var(--progress) * 100%);
    animation: moveAlongPath 3s linear infinite;
}
```

### 5. 视差滚动

```css
.parallax-container {
    height: 500px;
    overflow-y: scroll;
    perspective: 1px;
}

.parallax-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.parallax-layer-back {
    transform: translateZ(-1px) scale(2);
}

.parallax-layer-base {
    transform: translateZ(0);
}
```

### 6. 骨架屏动画

```css
@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}
```

## 性能优化

### 1. 使用 transform 和 opacity

尽可能使用 `transform` 和 `opacity` 属性进行动画，因为它们不会触发重排（reflow）：

```css
/* 好的做法 */
.element {
    transform: translateX(100px);
    opacity: 0.5;
}

/* 避免的做法 */
.element {
    left: 100px; /* 触发重排 */
    height: 200px; /* 触发重排 */
}
```

### 2. 使用 will-change

提前告知浏览器元素将要发生变化，以便浏览器进行优化：

```css
.element {
    will-change: transform, opacity;
}
```

注意：不要过度使用 `will-change`，只在真正需要的元素上使用。

### 3. 避免同时动画过多元素

同时动画过多元素会导致性能问题，考虑使用交错动画或批量处理。

### 4. 使用 CSS 而非 JavaScript

尽可能使用 CSS 动画而非 JavaScript 动画，因为 CSS 动画通常由浏览器的合成线程处理，不会阻塞主线程。

### 5. 使用 requestAnimationFrame

如果必须使用 JavaScript 动画，使用 `requestAnimationFrame` 而非 `setTimeout` 或 `setInterval`：

```javascript
function animate() {
    // 更新动画
    element.style.transform = `translateX(${position}px)`;
    
    // 请求下一帧
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

## 响应式动画

### 1. 基于媒体查询的动画调整

```css
.element {
    animation: fadeIn 1s ease;
}

@media (max-width: 768px) {
    .element {
        animation-duration: 0.5s; /* 移动设备上使用更短的动画时间 */
    }
}

@media (prefers-reduced-motion: reduce) {
    .element {
        animation: none; /* 尊重用户的减少动画设置 */
    }
}
```

### 2. 使用 CSS 变量控制动画

```css
:root {
    --animation-duration: 1s;
    --animation-distance: 100px;
}

@media (max-width: 768px) {
    :root {
        --animation-duration: 0.5s;
        --animation-distance: 50px;
    }
}

.element {
    animation: slideIn var(--animation-duration) ease;
}

@keyframes slideIn {
    from {
        transform: translateY(var(--animation-distance));
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
```

## 无障碍考虑

### 1. 尊重用户偏好

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

### 2. 避免闪烁内容

避免使用频率高于 2-3 Hz 的闪烁动画，以防止光敏性癫痫。

### 3. 提供暂停控制

为长时间运行的动画提供暂停控制：

```html
<button id="toggle-animation">暂停/播放动画</button>

<div class="animated-element"></div>
```

```css
.animated-element {
    animation: pulse 2s infinite;
}

.paused {
    animation-play-state: paused;
}
```

```javascript
document.getElementById('toggle-animation').addEventListener('click', function() {
    document.querySelector('.animated-element').classList.toggle('paused');
});
```

## 动画库推荐

虽然原生 CSS 动画功能强大，但有时使用动画库可以提高开发效率：

1. **Animate.css**：预定义的 CSS 动画集合
2. **GSAP (GreenSock Animation Platform)**：功能强大的 JavaScript 动画库
3. **Motion One**：基于 Web Animations API 的现代动画库
4. **Framer Motion**：React 动画库
5. **Lottie**：支持 After Effects 动画的库

## 结论

CSS 动画是提升用户体验的强大工具，从简单的过渡效果到复杂的关键帧动画，CSS 提供了丰富的动画功能。掌握这些技术可以帮助我们创建出更加生动、交互性强的网页界面。

在使用动画时，应当注意性能优化和无障碍性，确保动画增强而不是妨碍用户体验。随着 Web 标准的不断发展，CSS 动画的能力也在不断增强，持续学习和实践是提升动画技能的关键。

## 参考资源

- [MDN Web 文档 - CSS 动画](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations)
- [MDN Web 文档 - CSS 过渡](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions)
- [MDN Web 文档 - CSS 变换](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transforms)
- [CSS-Tricks - Animation](https://css-tricks.com/almanac/properties/a/animation/)
- [web.dev - 高性能动画](https://web.dev/animations-guide/)