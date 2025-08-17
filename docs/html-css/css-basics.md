# CSS 基础

CSS（层叠样式表）是用于控制网页样式和布局的语言，是前端开发的三大核心技术之一。本文将系统介绍 CSS 的基础知识和最佳实践。

## CSS 引入方式

CSS 可以通过三种方式引入到 HTML 文档中：

### 1. 内联样式（Inline CSS）

直接在 HTML 元素的 `style` 属性中定义样式：

```html
<p style="color: blue; font-size: 16px;">这是一段蓝色的文字</p>
```

**优点**：对特定元素应用样式非常直接
**缺点**：样式与内容混合，难以维护，无法复用

### 2. 内部样式表（Internal CSS）

在 HTML 文档的 `<head>` 部分使用 `<style>` 标签定义样式：

```html
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
        
        .highlight {
            background-color: yellow;
        }
    </style>
</head>
```

**优点**：可以应用于整个页面的多个元素
**缺点**：无法在多个页面之间共享样式

### 3. 外部样式表（External CSS）

将 CSS 代码放在单独的 `.css` 文件中，然后通过 `<link>` 标签引入：

```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

**优点**：
- 样式与内容分离
- 可以在多个页面之间共享样式
- 便于维护和更新
- 浏览器可以缓存 CSS 文件，提高加载速度

**推荐使用**：在实际项目中，外部样式表是最推荐的引入方式。

## CSS 选择器

选择器用于选择要应用样式的 HTML 元素。

### 基本选择器

| 选择器 | 示例 | 描述 |
| --- | --- | --- |
| 元素选择器 | `p { }` | 选择所有 `<p>` 元素 |
| 类选择器 | `.info { }` | 选择所有 `class="info"` 的元素 |
| ID 选择器 | `#header { }` | 选择 `id="header"` 的元素 |
| 通用选择器 | `* { }` | 选择所有元素 |

### 组合选择器

| 选择器 | 示例 | 描述 |
| --- | --- | --- |
| 后代选择器 | `div p { }` | 选择 `<div>` 内的所有 `<p>` 元素 |
| 子元素选择器 | `div > p { }` | 选择 `<div>` 的直接子元素 `<p>` |
| 相邻兄弟选择器 | `h1 + p { }` | 选择紧接在 `<h1>` 后的第一个 `<p>` 元素 |
| 通用兄弟选择器 | `h1 ~ p { }` | 选择 `<h1>` 后的所有 `<p>` 元素 |

### 属性选择器

| 选择器 | 示例 | 描述 |
| --- | --- | --- |
| `[attr]` | `[type] { }` | 选择有 `type` 属性的元素 |
| `[attr=value]` | `[type="text"] { }` | 选择 `type="text"` 的元素 |
| `[attr^=value]` | `[href^="https"] { }` | 选择 `href` 以 "https" 开头的元素 |
| `[attr$=value]` | `[href$=".pdf"] { }` | 选择 `href` 以 ".pdf" 结尾的元素 |
| `[attr*=value]` | `[href*="example"] { }` | 选择 `href` 包含 "example" 的元素 |

### 伪类选择器

伪类用于定义元素的特殊状态：

```css
/* 未访问的链接 */
a:link {
    color: blue;
}

/* 已访问的链接 */
a:visited {
    color: purple;
}

/* 鼠标悬停状态 */
a:hover {
    color: red;
}

/* 激活状态（鼠标点击时） */
a:active {
    color: green;
}

/* 获得焦点的输入框 */
input:focus {
    border-color: blue;
}

/* 第一个子元素 */
li:first-child {
    font-weight: bold;
}

/* 最后一个子元素 */
li:last-child {
    border-bottom: none;
}

/* 奇数位置的元素 */
li:nth-child(odd) {
    background-color: #f2f2f2;
}

/* 偶数位置的元素 */
li:nth-child(even) {
    background-color: #e6e6e6;
}
```

### 伪元素选择器

伪元素用于创建不存在于 DOM 树中的元素：

```css
/* 在元素内容前插入 */
p::before {
    content: "»";
    color: red;
}

/* 在元素内容后插入 */
p::after {
    content: "«";
    color: red;
}

/* 选择元素的第一个字母 */
p::first-letter {
    font-size: 2em;
    font-weight: bold;
}

/* 选择元素的第一行 */
p::first-line {
    font-style: italic;
}

/* 选择用户选中的文本 */
::selection {
    background-color: yellow;
    color: black;
}
```

## CSS 优先级

当多个规则应用于同一元素时，CSS 使用优先级规则来确定哪个样式生效：

1. **!important** 声明 > 普通声明
2. 内联样式 > 内部/外部样式表
3. ID 选择器 > 类选择器 > 元素选择器
4. 相同优先级时，后定义的规则覆盖先定义的规则

优先级计算方式：

- 内联样式：1000 分
- ID 选择器：100 分
- 类选择器、属性选择器、伪类：10 分
- 元素选择器、伪元素：1 分

示例：

```css
/* 优先级: 1 (元素选择器) */
p {
    color: black;
}

/* 优先级: 10 (类选择器) */
.text {
    color: blue;
}

/* 优先级: 100 (ID 选择器) */
#content {
    color: red;
}

/* 优先级: 11 (类选择器 + 元素选择器) */
.text p {
    color: green;
}

/* 优先级: 10 + !important (最高) */
.highlight {
    color: yellow !important;
}
```

## CSS 盒模型

CSS 盒模型是网页布局的基础，每个 HTML 元素都被视为一个矩形盒子，由以下部分组成：

- **内容区域（Content）**：显示元素内容的区域
- **内边距（Padding）**：内容与边框之间的空间
- **边框（Border）**：围绕内容和内边距的线条
- **外边距（Margin）**：元素与其他元素之间的空间

### 标准盒模型与 IE 盒模型

CSS 有两种盒模型：

1. **标准盒模型（W3C 盒模型）**：
   - `width` 和 `height` 只包括内容区域
   - 总宽度 = width + padding-left + padding-right + border-left + border-right
   - 总高度 = height + padding-top + padding-bottom + border-top + border-bottom

2. **IE 盒模型（怪异盒模型）**：
   - `width` 和 `height` 包括内容区域、内边距和边框
   - 总宽度 = width
   - 总高度 = height

### 使用 box-sizing 属性

`box-sizing` 属性允许我们选择使用哪种盒模型：

```css
/* 标准盒模型（默认） */
.box-standard {
    box-sizing: content-box;
}

/* IE 盒模型 */
.box-border {
    box-sizing: border-box;
}
```

在现代 Web 开发中，通常会全局设置 `box-sizing: border-box`，使元素的宽高更加直观：

```css
* {
    box-sizing: border-box;
}
```

## CSS 颜色和背景

### 颜色值表示方法

CSS 提供多种表示颜色的方式：

```css
/* 颜色名称 */
color: red;

/* 十六进制 */
color: #ff0000;
color: #f00; /* 简写形式 */

/* RGB */
color: rgb(255, 0, 0);

/* RGBA（带透明度） */
color: rgba(255, 0, 0, 0.5);

/* HSL（色相、饱和度、亮度） */
color: hsl(0, 100%, 50%);

/* HSLA（带透明度） */
color: hsla(0, 100%, 50%, 0.5);
```

### 背景属性

```css
/* 背景颜色 */
background-color: #f0f0f0;

/* 背景图片 */
background-image: url('image.jpg');

/* 背景重复 */
background-repeat: no-repeat; /* 不重复 */
background-repeat: repeat-x;  /* 水平重复 */
background-repeat: repeat-y;  /* 垂直重复 */

/* 背景位置 */
background-position: center;
background-position: top left;
background-position: 50% 25%;

/* 背景大小 */
background-size: cover;    /* 覆盖整个容器 */
background-size: contain;  /* 确保图片完全显示 */
background-size: 100px 200px;

/* 背景固定 */
background-attachment: fixed;

/* 背景简写属性 */
background: #f0f0f0 url('image.jpg') no-repeat center / cover;
```

## CSS 字体和文本

### 字体属性

```css
/* 字体系列 */
font-family: 'Helvetica', Arial, sans-serif;

/* 字体大小 */
font-size: 16px;
font-size: 1.2em;
font-size: 1.2rem;

/* 字体粗细 */
font-weight: normal;
font-weight: bold;
font-weight: 700;

/* 字体样式 */
font-style: normal;
font-style: italic;

/* 字体变体 */
font-variant: small-caps;

/* 字体简写属性 */
font: italic bold 16px/1.5 'Helvetica', Arial, sans-serif;
/* 样式 粗细 大小/行高 字体系列 */
```

### 文本属性

```css
/* 文本颜色 */
color: #333;

/* 文本对齐 */
text-align: left;
text-align: center;
text-align: right;
text-align: justify;

/* 文本装饰 */
text-decoration: none;
text-decoration: underline;
text-decoration: line-through;

/* 文本转换 */
text-transform: uppercase;
text-transform: lowercase;
text-transform: capitalize;

/* 文本缩进 */
text-indent: 2em;

/* 字母间距 */
letter-spacing: 1px;

/* 单词间距 */
word-spacing: 2px;

/* 行高 */
line-height: 1.5;

/* 文本阴影 */
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

/* 文本溢出处理 */
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis; /* 显示省略号 */
```

## CSS 单位

CSS 提供多种测量单位，可分为绝对单位和相对单位：

### 绝对单位

- **px（像素）**：屏幕上的一个点
- **pt（点）**：1/72 英寸，主要用于打印
- **cm（厘米）**
- **mm（毫米）**
- **in（英寸）**

### 相对单位

- **%**：相对于父元素
- **em**：相对于元素的字体大小（1em = 当前元素的字体大小）
- **rem**：相对于根元素的字体大小
- **vw**：视口宽度的 1%
- **vh**：视口高度的 1%
- **vmin**：视口较小尺寸的 1%
- **vmax**：视口较大尺寸的 1%

### 单位选择建议

- 使用相对单位（rem、em、%）创建响应式设计
- 字体大小优先使用 rem 或 em
- 布局尺寸可以使用 rem、%、vw/vh
- 边框等小细节可以使用 px

## CSS 变量（自定义属性）

CSS 变量允许我们定义可重用的值，便于维护和主题切换：

```css
/* 定义全局变量 */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-base: 16px;
    --spacing-unit: 8px;
}

/* 使用变量 */
.button {
    background-color: var(--primary-color);
    padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
    font-size: var(--font-size-base);
}

.alert {
    border: 1px solid var(--primary-color);
    margin-bottom: calc(var(--spacing-unit) * 2);
}

/* 局部变量 */
.card {
    --card-padding: 16px;
    padding: var(--card-padding);
}

/* 变量回退值 */
.text {
    color: var(--text-color, #333);
}
```

## CSS 最佳实践

### 1. 使用 CSS 重置或标准化

为了确保跨浏览器一致性，使用 CSS 重置（如 Reset CSS）或标准化（如 Normalize.css）：

```css
/* 简单的 CSS 重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### 2. 组织 CSS 代码

- 使用注释分隔不同部分
- 按组件或功能组织样式
- 考虑使用 BEM、SMACSS 或 OOCSS 等命名约定

```css
/* 使用 BEM 命名约定 */
.block {}
.block__element {}
.block--modifier {}

/* 例如 */
.card {}
.card__title {}
.card__image {}
.card--featured {}
```

### 3. 避免过度嵌套选择器

过度嵌套会增加特异性和复杂性：

```css
/* 避免这样 */
header nav ul li a {
    color: red;
}

/* 更好的方式 */
.nav-link {
    color: red;
}
```

### 4. 使用简写属性

```css
/* 分开写 */
margin-top: 10px;
margin-right: 15px;
margin-bottom: 10px;
margin-left: 15px;

/* 简写形式 */
margin: 10px 15px;
```

### 5. 使用媒体查询创建响应式设计

```css
/* 基础样式 */
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
```

## 结论

CSS 是前端开发的核心技术之一，掌握 CSS 基础对于创建美观、响应式的网页至关重要。随着 CSS 标准的不断发展，新特性如 Grid、Flexbox、CSS 变量等使得样式设计变得更加强大和灵活。持续学习和实践是提升 CSS 技能的关键。

## 参考资源

- [MDN Web 文档 - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/) - 检查 CSS 特性的浏览器兼容性