# CSS 布局

CSS 布局是前端开发中的核心技能，掌握各种布局技术可以帮助我们创建从简单到复杂的各种网页结构。本文将系统介绍 CSS 布局的各种技术和最佳实践。

## 传统布局方法

### 1. 标准文档流

在默认情况下，HTML 元素按照标准文档流进行排列：

- 块级元素（如 `div`、`p`、`h1`）独占一行，自上而下排列
- 行内元素（如 `span`、`a`、`strong`）从左到右排列，可以同行显示

```html
<div>这是一个块级元素，会独占一行</div>
<p>这是另一个块级元素</p>
<span>这是行内元素</span>
<a href="#">这是另一个行内元素</a>
```

### 2. 浮动布局（Float）

浮动最初是为了实现文字环绕图片的效果，后来被广泛用于创建多列布局：

```css
.left-column {
    float: left;
    width: 70%;
}

.right-column {
    float: right;
    width: 25%;
}

/* 清除浮动 */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

**浮动的特点**：

- 元素会脱离标准文档流
- 浮动元素会尽可能靠左或靠右
- 文本和行内元素会环绕浮动元素
- 可能导致父元素高度塌陷问题

**清除浮动的方法**：

```css
/* 方法一：使用 clear 属性 */
.clear {
    clear: both;
}

/* 方法二：使用伪元素 */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* 方法三：设置父元素 overflow */
.container {
    overflow: auto;
}
```

### 3. 定位（Position）

CSS 定位允许我们精确控制元素的位置：

```css
/* 静态定位（默认值） */
.static {
    position: static;
}

/* 相对定位（相对于元素原本位置） */
.relative {
    position: relative;
    top: 20px;
    left: 30px;
}

/* 绝对定位（相对于最近的定位祖先元素） */
.absolute {
    position: absolute;
    top: 50px;
    right: 10px;
}

/* 固定定位（相对于视口） */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

/* 粘性定位（结合相对定位和固定定位） */
.sticky {
    position: sticky;
    top: 0;
}
```

**定位的特点**：

- `relative`：元素仍占据原来的空间
- `absolute`：元素完全脱离文档流，不占据空间
- `fixed`：元素相对于视口定位，滚动时位置不变
- `sticky`：元素在滚动到阈值前为相对定位，之后为固定定位

### 4. 表格布局

使用 CSS 的 `display: table` 系列属性可以模拟表格布局：

```css
.table {
    display: table;
    width: 100%;
}

.table-row {
    display: table-row;
}

.table-cell {
    display: table-cell;
    padding: 10px;
    vertical-align: middle;
}
```

## 现代布局方法

### 1. Flexbox 布局

Flexbox（弹性盒子）是一种一维布局模型，特别适合于在行或列方向上分配空间：

```css
.container {
    display: flex;
    flex-direction: row; /* row | row-reverse | column | column-reverse */
    flex-wrap: wrap; /* nowrap | wrap | wrap-reverse */
    justify-content: space-between; /* 主轴对齐方式 */
    align-items: center; /* 交叉轴对齐方式 */
    gap: 20px; /* 项目之间的间隙 */
}

.item {
    flex: 1; /* 简写属性，表示 flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
}

.item-2 {
    flex: 2; /* 占据两倍空间 */
}
```

**Flexbox 的主要属性**：

**容器属性**：
- `display: flex`：定义一个 flex 容器
- `flex-direction`：设置主轴方向
- `flex-wrap`：控制项目是否换行
- `justify-content`：主轴对齐方式
  - `flex-start`：起点对齐
  - `flex-end`：终点对齐
  - `center`：居中对齐
  - `space-between`：两端对齐，项目之间间隔相等
  - `space-around`：每个项目两侧间隔相等
  - `space-evenly`：所有间隔相等
- `align-items`：交叉轴对齐方式
  - `flex-start`：起点对齐
  - `flex-end`：终点对齐
  - `center`：居中对齐
  - `baseline`：基线对齐
  - `stretch`：拉伸填满（默认值）
- `align-content`：多行内容对齐方式
- `gap`：项目之间的间隙

**项目属性**：
- `flex-grow`：放大比例（默认为 0）
- `flex-shrink`：缩小比例（默认为 1）
- `flex-basis`：初始大小（默认为 auto）
- `flex`：上述三个属性的简写
- `align-self`：单个项目的对齐方式
- `order`：项目排列顺序（默认为 0）

**Flexbox 常见布局示例**：

1. **居中对齐**：

```css
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
}
```

2. **导航栏**：

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.logo {
    flex: 0 0 auto;
}

.nav-links {
    display: flex;
    gap: 20px;
}
```

3. **卡片布局**：

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 0 0 calc(33.333% - 20px);
    padding: 20px;
    border: 1px solid #ddd;
}
```

### 2. Grid 布局

CSS Grid 是一种二维布局系统，可以同时处理行和列：

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3列，每列宽度相等 */
    grid-template-rows: 100px auto 100px; /* 3行，第一行和第三行高度为100px，第二行自适应 */
    gap: 20px; /* 行列间距 */
}

.header {
    grid-column: 1 / -1; /* 从第1列到最后一列 */
}

.sidebar {
    grid-row: 2 / 3; /* 从第2行到第3行 */
    grid-column: 1 / 2; /* 从第1列到第2列 */
}

.content {
    grid-row: 2 / 3;
    grid-column: 2 / -1; /* 从第2列到最后一列 */
}

.footer {
    grid-column: 1 / -1;
}
```

**Grid 的主要属性**：

**容器属性**：
- `display: grid`：定义一个网格容器
- `grid-template-columns`：定义列的大小和数量
- `grid-template-rows`：定义行的大小和数量
- `grid-template-areas`：通过命名网格区域定义布局
- `grid-column-gap`/`grid-row-gap`：列/行间距
- `gap`：行列间距的简写
- `justify-items`：水平方向上的对齐方式
- `align-items`：垂直方向上的对齐方式
- `place-items`：上述两个属性的简写
- `justify-content`：网格整体在容器中的水平对齐方式
- `align-content`：网格整体在容器中的垂直对齐方式
- `place-content`：上述两个属性的简写

**项目属性**：
- `grid-column-start`/`grid-column-end`：项目列起始/结束位置
- `grid-row-start`/`grid-row-end`：项目行起始/结束位置
- `grid-column`/`grid-row`：上述属性的简写
- `grid-area`：指定项目放在哪个命名区域
- `justify-self`：单个项目的水平对齐方式
- `align-self`：单个项目的垂直对齐方式
- `place-self`：上述两个属性的简写

**Grid 布局单位**：
- `fr`：剩余空间的比例单位
- `minmax(min, max)`：大小范围
- `auto`：自动大小
- `repeat(n, pattern)`：重复模式

**Grid 常见布局示例**：

1. **经典网页布局**：

```css
.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar content content"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

2. **响应式网格**：

```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
```

3. **叠加元素**：

```css
.stack {
    display: grid;
}

.stack > * {
    grid-area: 1 / 1; /* 所有子元素占据同一个网格单元 */
}
```

## 响应式布局技术

### 1. 媒体查询

媒体查询允许我们根据设备特性（如屏幕宽度）应用不同的样式：

```css
/* 基础样式（移动设备优先） */
.container {
    width: 100%;
    padding: 15px;
}

/* 平板设备 */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* 桌面设备 */
@media (min-width: 1024px) {
    .container {
        width: 970px;
    }
}

/* 大屏设备 */
@media (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}
```

### 2. 响应式图片

```css
/* 基本响应式图片 */
img {
    max-width: 100%;
    height: auto;
}

/* 使用 srcset 属性提供不同分辨率的图片 */
<img 
    srcset="small.jpg 500w, 
            medium.jpg 1000w, 
            large.jpg 1500w"
    sizes="(max-width: 600px) 100vw, 
           (max-width: 1200px) 50vw, 
           33vw"
    src="fallback.jpg" 
    alt="响应式图片示例">
```

### 3. 视口单位

视口单位可以帮助创建响应式布局：

```css
/* 视口宽度的 90% */
.container {
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
}

/* 视口高度的 100% */
.full-height {
    height: 100vh;
}

/* 响应式字体大小 */
h1 {
    font-size: calc(1.5rem + 2vw);
}
```

### 4. CSS 变量与响应式设计

```css
:root {
    --spacing-unit: 8px;
    --primary-color: #007bff;
}

@media (min-width: 768px) {
    :root {
        --spacing-unit: 16px;
    }
}

.card {
    padding: var(--spacing-unit);
    margin-bottom: calc(var(--spacing-unit) * 2);
    border: 1px solid var(--primary-color);
}
```

## 常见布局模式

### 1. 圣杯布局与双飞翼布局

这两种布局都是经典的三列布局，中间列内容优先加载：

**圣杯布局**：

```html
<div class="container">
    <div class="center">中间内容</div>
    <div class="left">左侧栏</div>
    <div class="right">右侧栏</div>
</div>
```

```css
.container {
    padding-left: 200px;
    padding-right: 150px;
}

.center, .left, .right {
    float: left;
    position: relative;
}

.center {
    width: 100%;
}

.left {
    width: 200px;
    margin-left: -100%;
    left: -200px;
}

.right {
    width: 150px;
    margin-left: -150px;
    right: -150px;
}
```

**使用 Flexbox 实现**：

```css
.container {
    display: flex;
}

.center {
    flex: 1;
    order: 2;
}

.left {
    flex: 0 0 200px;
    order: 1;
}

.right {
    flex: 0 0 150px;
    order: 3;
}
```

**使用 Grid 实现**：

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 150px;
}
```

### 2. 等高列布局

**使用 Flexbox**：

```css
.container {
    display: flex;
}

.column {
    flex: 1;
}
```

**使用 Grid**：

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```

### 3. 粘性页脚

确保页脚始终位于页面底部，即使内容不足以填满整个视口：

**使用 Flexbox**：

```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
}

main {
    flex: 1;
}
```

**使用 Grid**：

```css
body {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    margin: 0;
}
```

### 4. 卡片网格布局

**使用 Flexbox**：

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 0 0 calc(33.333% - 20px);
}

@media (max-width: 768px) {
    .card {
        flex: 0 0 calc(50% - 20px);
    }
}

@media (max-width: 480px) {
    .card {
        flex: 0 0 100%;
    }
}
```

**使用 Grid**：

```css
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}
```

### 5. 居中布局

**水平居中**：

```css
/* 块级元素 */
.center-block {
    margin-left: auto;
    margin-right: auto;
    width: 50%; /* 必须设置宽度 */
}

/* 行内元素 */
.center-inline {
    text-align: center;
}
```

**垂直居中**：

```css
/* 使用 Flexbox */
.center-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
}

/* 使用 Grid */
.center-grid {
    display: grid;
    place-items: center;
    height: 300px;
}

/* 使用绝对定位 */
.center-absolute {
    position: relative;
    height: 300px;
}

.center-absolute > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## CSS 布局最佳实践

### 1. 移动优先设计

从移动设备开始设计，然后逐步增强到大屏幕：

```css
/* 基础样式（移动设备） */
.container {
    /* 移动设备样式 */
}

/* 平板设备及以上 */
@media (min-width: 768px) {
    .container {
        /* 平板设备样式 */
    }
}

/* 桌面设备及以上 */
@media (min-width: 1024px) {
    .container {
        /* 桌面设备样式 */
    }
}
```

### 2. 使用容器查询

容器查询是一种新的 CSS 特性，允许基于容器大小而非视口大小应用样式：

```css
.card-container {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        display: flex;
    }
    
    .card-image {
        flex: 0 0 200px;
    }
}
```

### 3. 避免固定尺寸

尽量使用相对单位和百分比，而不是固定像素值：

```css
/* 避免这样 */
.container {
    width: 1200px;
}

/* 更好的方式 */
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
```

### 4. 使用 CSS 变量管理断点

```css
:root {
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
}

@media (min-width: var(--breakpoint-md)) {
    /* 样式 */
}
```

### 5. 组合使用布局技术

不同的布局技术有各自的优势，可以组合使用：

```css
/* 使用 Grid 进行整体页面布局 */
body {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    min-height: 100vh;
}

/* 使用 Flexbox 进行导航栏布局 */
header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* 使用 Grid 进行卡片布局 */
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
```

## 结论

CSS 布局技术在过去几年中有了显著的发展，从传统的浮动和定位，到现代的 Flexbox 和 Grid，为开发者提供了更强大、更灵活的布局工具。掌握这些技术可以帮助我们创建出响应式、灵活且易于维护的网页布局。

随着 CSS 标准的不断发展，我们可以期待更多创新的布局技术出现，如容器查询、子网格等。持续学习和实践是提升 CSS 布局技能的关键。

## 参考资源

- [MDN Web 文档 - CSS 布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout)
- [CSS-Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks - A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Every Layout](https://every-layout.dev/) - 响应式布局模式集合