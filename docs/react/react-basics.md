# React 基础知识

React 是由 Facebook 开发的用于构建用户界面的 JavaScript 库，它已经成为前端开发中最流行的框架之一。本文将介绍 React 的核心概念和基础知识。

## React 的特点

1. **组件化**：React 应用由多个组件构成，每个组件负责渲染页面的一部分
2. **声明式编程**：你只需描述 UI 在不同状态下的样子，React 会负责更新 DOM
3. **虚拟 DOM**：React 通过虚拟 DOM 提高渲染性能
4. **单向数据流**：数据从父组件流向子组件，使应用状态可预测
5. **JSX 语法**：结合 HTML 和 JavaScript 的语法扩展

## 创建 React 应用

使用 Create React App 是开始 React 项目的最简单方式：

```bash
# 使用 npx (推荐)
npx create-react-app my-app

# 或使用 npm
npm init react-app my-app

# 或使用 Yarn
yarn create react-app my-app
```

## JSX 语法

JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码：

```jsx
const element = <h1>Hello, world!</h1>;
```

JSX 的特点：

1. **表达式嵌入**：使用花括号 `{}` 嵌入 JavaScript 表达式

```jsx
const name = 'React';
const element = <h1>Hello, {name}!</h1>;
```

2. **属性定义**：使用驼峰命名法定义属性

```jsx
const element = <div className="container" tabIndex="0"></div>;
```

3. **子元素**：可以包含多个子元素

```jsx
const element = (
  <div>
    <h1>标题</h1>
    <p>段落</p>
  </div>
);
```

## 组件

React 组件是可重用的代码块，它们返回要在页面上渲染的 React 元素。

### 函数组件

函数组件是最简单的组件形式，它是一个接收 props 并返回 React 元素的 JavaScript 函数：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 类组件

类组件使用 ES6 类语法定义：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 组件渲染

组件可以在其他组件中使用：

```jsx
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}
```

## Props

Props（属性）是从父组件传递到子组件的数据：

```jsx
// 父组件
function App() {
  return <Welcome name="Alice" age={25} isAdmin={true} />;
}

// 子组件
function Welcome(props) {
  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <p>Age: {props.age}</p>
      <p>Admin: {props.isAdmin ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

Props 的特点：

1. **只读性**：组件不能修改自己的 props
2. **可以是任何类型**：字符串、数字、布尔值、对象、数组、函数等
3. **可以设置默认值**：使用 `defaultProps`

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

Welcome.defaultProps = {
  name: 'Guest'
};
```

## State

State 是组件内部管理的数据，当 state 改变时，组件会重新渲染。

### 在类组件中使用 State

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}
```

### 在函数组件中使用 State (Hooks)

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

## 生命周期

React 组件有多个生命周期方法，它们在组件的不同阶段被调用。

### 类组件生命周期

1. **挂载阶段**：
   - `constructor()`：初始化 state 和绑定方法
   - `static getDerivedStateFromProps()`：在渲染前更新 state
   - `render()`：渲染组件
   - `componentDidMount()`：组件挂载后执行，适合进行 API 调用

2. **更新阶段**：
   - `static getDerivedStateFromProps()`
   - `shouldComponentUpdate()`：决定是否重新渲染
   - `render()`
   - `getSnapshotBeforeUpdate()`：在 DOM 更新前捕获信息
   - `componentDidUpdate()`：组件更新后执行

3. **卸载阶段**：
   - `componentWillUnmount()`：组件卸载前执行，适合清理工作

### 函数组件生命周期 (Hooks)

使用 `useEffect` Hook 可以在函数组件中模拟生命周期行为：

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 相当于 componentDidMount
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    // 相当于 componentWillUnmount
    return () => clearInterval(interval);
  }, []); // 空数组表示只在挂载和卸载时执行

  return <p>Timer: {seconds} seconds</p>;
}
```

## 事件处理

React 事件使用驼峰命名法，并传递函数作为事件处理器：

```jsx
function Button() {
  const handleClick = () => {
    console.log('按钮被点击了');
  };

  return <button onClick={handleClick}>点击我</button>;
}
```

在类组件中，需要绑定 `this`：

```jsx
class Button extends React.Component {
  constructor(props) {
    super(props);
    // 绑定方法
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('按钮被点击了');
  }

  render() {
    return <button onClick={this.handleClick}>点击我</button>;
  }
}
```

或使用箭头函数：

```jsx
class Button extends React.Component {
  // 使用箭头函数自动绑定 this
  handleClick = () => {
    console.log('按钮被点击了');
  }

  render() {
    return <button onClick={this.handleClick}>点击我</button>;
  }
}
```

## 条件渲染

在 React 中可以使用 JavaScript 的条件语句进行条件渲染：

### 使用 if 语句

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>欢迎回来！</h1>;
  }
  return <h1>请登录</h1>;
}
```

### 使用三元运算符

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <h1>
      {isLoggedIn ? '欢迎回来！' : '请登录'}
    </h1>
  );
}
```

### 使用逻辑与运算符

```jsx
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>你好！</h1>
      {unreadMessages.length > 0 && (
        <p>你有 {unreadMessages.length} 条未读消息</p>
      )}
    </div>
  );
}
```

## 列表渲染

使用 `map()` 方法渲染列表，并为每个项目提供唯一的 `key`：

```jsx
function NumberList({ numbers }) {
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>
      {number}
    </li>
  ));

  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
<NumberList numbers={numbers} />;
```

## 表单处理

React 中的表单元素通常是受控组件，其值由 React 的 state 控制：

```jsx
import React, { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    alert('提交的名字: ' + name);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名字:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">提交</button>
    </form>
  );
}
```

## 组合与继承

React 推荐使用组合而非继承来复用组件之间的代码：

### 包含关系

```jsx
function Border(props) {
  return (
    <div className="border">
      {props.children}
    </div>
  );
}

function App() {
  return (
    <Border>
      <h1>标题</h1>
      <p>内容</p>
    </Border>
  );
}
```

### 特殊情况

```jsx
function Dialog(props) {
  return (
    <div className="dialog">
      <div className="dialog-title">{props.title}</div>
      <div className="dialog-content">{props.content}</div>
      <div className="dialog-buttons">{props.buttons}</div>
    </div>
  );
}

function App() {
  return (
    <Dialog
      title={<h1>欢迎</h1>}
      content={<p>感谢访问我们的网站！</p>}
      buttons={<button>关闭</button>}
    />
  );
}
```

## 总结

React 的核心概念包括：

1. **组件**：函数组件和类组件
2. **JSX**：在 JavaScript 中编写类似 HTML 的代码
3. **Props**：从父组件传递到子组件的数据
4. **State**：组件内部管理的数据
5. **生命周期**：组件在不同阶段执行的方法
6. **事件处理**：处理用户交互
7. **条件渲染**：根据条件显示不同内容
8. **列表渲染**：渲染数据集合
9. **表单处理**：管理用户输入
10. **组合**：组件之间的代码复用方式

掌握这些基础知识后，你就可以开始构建 React 应用了。随着经验的积累，你可以进一步学习更高级的概念，如 Context、Refs、高阶组件、Hooks 等。