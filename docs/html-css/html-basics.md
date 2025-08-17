# HTML 基础

HTML（超文本标记语言）是构建网页的基础，是每个前端工程师必须掌握的核心技能。本文将系统介绍 HTML 的基础知识和最佳实践。

## HTML 文档结构

一个标准的 HTML5 文档结构如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文档标题</title>
    <meta name="description" content="页面描述">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- 页面内容 -->
    <script src="script.js"></script>
</body>
</html>
```

## 语义化标签

HTML5 引入了一系列语义化标签，使代码结构更加清晰，同时有利于搜索引擎优化（SEO）和无障碍访问。

### 常用语义化标签

| 标签 | 描述 |
| --- | --- |
| `<header>` | 页面或区块的头部 |
| `<nav>` | 导航链接区域 |
| `<main>` | 文档的主要内容 |
| `<article>` | 独立的文章内容 |
| `<section>` | 文档中的区块或段落 |
| `<aside>` | 侧边栏内容 |
| `<footer>` | 页面或区块的底部 |

### 语义化标签示例

```html
<header>
    <h1>网站标题</h1>
    <nav>
        <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/about">关于</a></li>
            <li><a href="/contact">联系我们</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>文章标题</h2>
        <p>文章内容...</p>
        
        <section>
            <h3>文章小节</h3>
            <p>小节内容...</p>
        </section>
    </article>
    
    <aside>
        <h3>相关文章</h3>
        <ul>
            <li><a href="#">相关文章1</a></li>
            <li><a href="#">相关文章2</a></li>
        </ul>
    </aside>
</main>

<footer>
    <p>&copy; 2023 网站名称. 保留所有权利.</p>
</footer>
```

## 表单与用户输入

表单是收集用户输入的主要方式，HTML 提供了丰富的表单元素。

### 表单基本结构

```html
<form action="/submit" method="post">
    <div>
        <label for="username">用户名：</label>
        <input type="text" id="username" name="username" required>
    </div>
    
    <div>
        <label for="password">密码：</label>
        <input type="password" id="password" name="password" required>
    </div>
    
    <div>
        <label for="email">邮箱：</label>
        <input type="email" id="email" name="email" required>
    </div>
    
    <div>
        <label>性别：</label>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">男</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">女</label>
    </div>
    
    <div>
        <label for="country">国家：</label>
        <select id="country" name="country">
            <option value="china">中国</option>
            <option value="usa">美国</option>
            <option value="japan">日本</option>
        </select>
    </div>
    
    <div>
        <label for="message">留言：</label>
        <textarea id="message" name="message" rows="4"></textarea>
    </div>
    
    <div>
        <button type="submit">提交</button>
        <button type="reset">重置</button>
    </div>
</form>
```

### HTML5 新增表单元素和属性

HTML5 引入了多种新的表单元素和属性，提升了表单的功能和用户体验：

```html
<!-- 日期选择器 -->
<input type="date" name="birthday">

<!-- 颜色选择器 -->
<input type="color" name="favorite-color">

<!-- 范围滑块 -->
<input type="range" name="volume" min="0" max="100" step="1">

<!-- 数字输入 -->
<input type="number" name="quantity" min="1" max="10">

<!-- 自动完成 -->
<input type="text" name="city" list="cities">
<datalist id="cities">
    <option value="北京">
    <option value="上海">
    <option value="广州">
    <option value="深圳">
</datalist>

<!-- 表单验证属性 -->
<input type="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
```

## HTML 最佳实践

### 1. 始终声明文档类型和字符编码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <!-- 其他元素 -->
</head>
```

### 2. 使用语义化标签

选择合适的语义化标签来描述内容，而不是仅仅使用 `<div>` 和 `<span>`。

### 3. 确保无障碍访问

- 为图片添加 `alt` 属性
- 使用适当的表单标签和 ARIA 属性
- 确保键盘导航可用

```html
<!-- 图片替代文本 -->
<img src="logo.png" alt="公司标志">

<!-- ARIA 属性示例 -->
<div role="alert" aria-live="assertive">
    表单提交成功！
</div>
```

### 4. 优化性能

- 将脚本放在 body 结束前
- 使用异步加载脚本：`<script async src="script.js"></script>`
- 延迟加载非关键资源：`<script defer src="non-critical.js"></script>`

### 5. 使用适当的元数据

```html
<head>
    <!-- 基本元数据 -->
    <title>页面标题 - 网站名称</title>
    <meta name="description" content="页面的简短描述，通常显示在搜索结果中">
    <meta name="keywords" content="关键词1, 关键词2, 关键词3">
    
    <!-- 视口设置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Open Graph 协议（用于社交媒体分享） -->
    <meta property="og:title" content="页面标题">
    <meta property="og:description" content="页面描述">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
    
    <!-- Twitter 卡片 -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="页面标题">
    <meta name="twitter:description" content="页面描述">
    <meta name="twitter:image" content="https://example.com/image.jpg">
</head>
```

## 结论

掌握 HTML 基础是成为优秀前端工程师的第一步。通过使用语义化标签、遵循最佳实践，可以创建出结构清晰、易于维护且对搜索引擎友好的网页。随着 Web 标准的不断发展，持续学习和更新 HTML 知识也是非常必要的。

## 参考资源

- [MDN Web 文档 - HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [HTML5 规范](https://html.spec.whatwg.org/)
- [W3C HTML 验证服务](https://validator.w3.org/)