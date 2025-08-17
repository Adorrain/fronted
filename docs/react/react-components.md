# React 组件

组件是 React 的核心概念，它们是构建用户界面的基础构建块。本文将深入探讨 React 组件的类型、生命周期、设计模式和最佳实践。

## 组件类型

React 中有两种主要类型的组件：函数组件和类组件。

### 函数组件

函数组件是最简单的组件形式，它是一个接收 props 并返回 React 元素的 JavaScript 函数：

```jsx
function Welcome(props) {
  return <h1>你好，{props.name}</h1>;
}
```

使用箭头函数：

```jsx
const Welcome = (props) => {
  return <h1>你好，{props.name}</h1>;
};
```

简写形式（隐式返回）：

```jsx
const Welcome = (props) => <h1>你好，{props.name}</h1>;
```

#### 函数组件的特点

1. 语法简洁
2. 没有 `this` 关键字
3. 使用 Hooks 管理状态和副作用
4. 更容易测试和理解
5. 性能略优于类组件（在 React 优化后）

### 类组件

类组件使用 ES6 类语法定义，继承自 `React.Component`：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>你好，{this.props.name}</h1>;
  }
}
```

#### 类组件的特点

1. 可以使用生命周期方法
2. 可以有自己的状态（使用 `this.state`）
3. 可以使用 `this` 引用组件实例
4. 可以使用 refs 引用 DOM 元素

### 何时使用函数组件 vs 类组件

在现代 React 开发中（React 16.8+），推荐使用函数组件和 Hooks，因为：

1. 代码更简洁
2. 逻辑复用更容易（通过自定义 Hooks）
3. 更符合 React 团队的未来发展方向

类组件主要在以下情况下使用：

1. 维护旧代码
2. 使用某些只在类组件中可用的特性（如 `getSnapshotBeforeUpdate` 或 `componentDidCatch`）
3. 团队更熟悉类组件

## 组件通信

### 父组件向子组件传递数据

使用 props 从父组件向子组件传递数据：

```jsx
// 父组件
function Parent() {
  const data = "来自父组件的数据";
  return <Child message={data} />;
}

// 子组件
function Child(props) {
  return <p>{props.message}</p>;
}
```

### 子组件向父组件传递数据

通过回调函数从子组件向父组件传递数据：

```jsx
// 父组件
function Parent() {
  const handleChildData = (data) => {
    console.log("从子组件收到的数据:", data);
  };

  return <Child onSendData={handleChildData} />;
}

// 子组件
function Child(props) {
  const sendDataToParent = () => {
    props.onSendData("这是子组件的数据");
  };

  return <button onClick={sendDataToParent}>发送数据到父组件</button>;
}
```

### 兄弟组件之间的通信

兄弟组件之间的通信通常通过共同的父组件实现：

```jsx
function Parent() {
  const [sharedData, setSharedData] = useState("");

  return (
    <div>
      <SiblingA onUpdateData={setSharedData} />
      <SiblingB data={sharedData} />
    </div>
  );
}

function SiblingA({ onUpdateData }) {
  return <button onClick={() => onUpdateData("来自 A 的数据")}>更新数据</button>;
}

function SiblingB({ data }) {
  return <p>收到的数据: {data}</p>;
}
```

### 跨多层级组件通信

对于跨多层级的组件通信，可以使用 Context API：

```jsx
// 创建 Context
const DataContext = React.createContext();

// 提供者组件
function DataProvider({ children }) {
  const [data, setData] = useState("初始数据");

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

// 顶层组件
function App() {
  return (
    <DataProvider>
      <ParentComponent />
    </DataProvider>
  );
}

// 中间组件
function ParentComponent() {
  return <ChildComponent />;
}

// 深层子组件
function ChildComponent() {
  // 使用 Context 中的数据
  const { data, setData } = useContext(DataContext);

  return (
    <div>
      <p>数据: {data}</p>
      <button onClick={() => setData("更新后的数据")}>更新数据</button>
    </div>
  );
}
```

## 组件生命周期

### 类组件生命周期

类组件的生命周期可以分为三个阶段：挂载、更新和卸载。

#### 挂载阶段

1. `constructor(props)`：初始化 state 和绑定方法
2. `static getDerivedStateFromProps(props, state)`：根据 props 更新 state
3. `render()`：渲染组件
4. `componentDidMount()`：组件挂载后执行，适合进行 API 调用、订阅等

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    console.log("1. 构造函数执行");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("2. getDerivedStateFromProps 执行");
    return null; // 不更新 state
  }

  componentDidMount() {
    console.log("4. componentDidMount 执行");
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    console.log("3. render 执行");
    return <div>当前时间: {this.state.date.toLocaleTimeString()}</div>;
  }
}
```

#### 更新阶段

1. `static getDerivedStateFromProps(props, state)`
2. `shouldComponentUpdate(nextProps, nextState)`：决定是否重新渲染
3. `render()`
4. `getSnapshotBeforeUpdate(prevProps, prevState)`：在 DOM 更新前捕获信息
5. `componentDidUpdate(prevProps, prevState, snapshot)`：组件更新后执行

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("1. getDerivedStateFromProps 执行");
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("2. shouldComponentUpdate 执行");
    // 只有当 count 是偶数时才更新
    return nextState.count % 2 === 0;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("4. getSnapshotBeforeUpdate 执行");
    return { scrollPosition: window.scrollY };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("5. componentDidUpdate 执行");
    console.log("滚动位置:", snapshot.scrollPosition);
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log("3. render 执行");
    return (
      <div>
        <p>计数: {this.state.count}</p>
        <button onClick={this.increment}>增加</button>
      </div>
    );
  }
}
```

#### 卸载阶段

1. `componentWillUnmount()`：组件卸载前执行，适合清理工作

```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    console.log("组件即将卸载，清理定时器");
    clearInterval(this.intervalID);
  }

  render() {
    return <div>计时器: {this.state.seconds} 秒</div>;
  }
}
```

#### 错误处理

1. `static getDerivedStateFromError(error)`：渲染备用 UI
2. `componentDidCatch(error, info)`：记录错误信息

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染显示备用 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 记录错误信息
    console.error("错误边界捕获到错误:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // 渲染备用 UI
      return <h1>出错了，请稍后再试。</h1>;
    }

    return this.props.children;
  }
}

// 使用错误边界
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 函数组件生命周期（使用 Hooks）

函数组件使用 Hooks 模拟生命周期行为：

#### 挂载阶段

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  // 相当于 componentDidMount
  useEffect(() => {
    console.log("组件挂载");
    const intervalID = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // 相当于 componentWillUnmount
    return () => {
      console.log("组件卸载");
      clearInterval(intervalID);
    };
  }, []); // 空依赖数组表示只在挂载和卸载时执行

  return <div>计时器: {seconds} 秒</div>;
}
```

#### 更新阶段

```jsx
function Profile({ userId }) {
  const [user, setUser] = useState(null);

  // 相当于 componentDidUpdate
  useEffect(() => {
    console.log("userId 改变，获取新用户数据");
    
    async function fetchUser() {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }
    
    fetchUser();
  }, [userId]); // 依赖项数组包含 userId，当 userId 改变时执行

  if (!user) return <div>加载中...</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

#### 模拟 shouldComponentUpdate

```jsx
function Counter({ label }) {
  const [count, setCount] = useState(0);
  
  // 使用 React.memo 包装组件，实现类似 shouldComponentUpdate 的功能
  return (
    <div>
      <p>{label}: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

// 只有当 props 改变时才重新渲染
const MemoizedCounter = React.memo(Counter);

// 更精细的控制
const MemoizedCounterWithCustomCheck = React.memo(
  Counter,
  (prevProps, nextProps) => {
    // 返回 true 表示不需要重新渲染
    // 只有当 label 包含 "重要" 时才重新渲染
    return !nextProps.label.includes("重要");
  }
);
```

## 组件设计模式

### 容器组件与展示组件

将组件分为容器组件（处理逻辑）和展示组件（处理 UI）：

```jsx
// 展示组件 - 只关注 UI 渲染
function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// 容器组件 - 处理数据和逻辑
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // 获取用户数据
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    // 其他逻辑...
  };

  return <UserList users={users} onUserClick={handleUserClick} />;
}
```

### 高阶组件 (HOC)

高阶组件是一个函数，接收一个组件并返回一个新组件：

```jsx
// 高阶组件 - 添加日志功能
function withLogging(WrappedComponent) {
  return function WithLogging(props) {
    useEffect(() => {
      console.log(`组件 ${WrappedComponent.name} 已挂载`);
      return () => {
        console.log(`组件 ${WrappedComponent.name} 将卸载`);
      };
    }, []);

    console.log(`组件 ${WrappedComponent.name} 渲染，props:`, props);
    return <WrappedComponent {...props} />;
  };
}

// 使用高阶组件
function Button(props) {
  return <button {...props}>{props.children}</button>;
}

const ButtonWithLogging = withLogging(Button);

// 使用增强后的组件
function App() {
  return <ButtonWithLogging onClick={() => alert('点击')}>点击我</ButtonWithLogging>;
}
```

### Render Props

Render Props 是一种通过 props 传递渲染逻辑的技术：

```jsx
// 使用 render prop 的组件
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return render(position);
}

// 使用 MouseTracker
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          <h1>鼠标位置</h1>
          <p>X: {x}, Y: {y}</p>
        </div>
      )}
    />
  );
}
```

### 复合组件模式

复合组件模式使用 Context 在相关组件之间共享状态：

```jsx
// 创建 Context
const TabContext = React.createContext();

// 父组件
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

// 子组件 - 标签列表
function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

// 子组件 - 单个标签
function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  
  return (
    <div
      className={`tab ${activeIndex === index ? 'active' : ''}`}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </div>
  );
}

// 子组件 - 内容面板
function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

// 子组件 - 单个内容面板
function TabPanel({ index, children }) {
  const { activeIndex } = useContext(TabContext);
  
  if (activeIndex !== index) return null;
  
  return <div className="tab-panel">{children}</div>;
}

// 组合使用
function App() {
  return (
    <Tabs>
      <TabList>
        <Tab index={0}>标签 1</Tab>
        <Tab index={1}>标签 2</Tab>
        <Tab index={2}>标签 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0}>内容 1</TabPanel>
        <TabPanel index={1}>内容 2</TabPanel>
        <TabPanel index={2}>内容 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

// 为方便使用，可以将子组件作为父组件的属性
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
```

### 自定义 Hooks

自定义 Hooks 是一种复用状态逻辑的方式：

```jsx
// 自定义 Hook - 窗口尺寸
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}

// 使用自定义 Hook
function ResponsiveComponent() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <p>窗口宽度: {width}px</p>
      <p>窗口高度: {height}px</p>
      {width < 768 ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

## 组件性能优化

### React.memo

使用 `React.memo` 避免不必要的重新渲染：

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ value }) {
  console.log('ExpensiveComponent 渲染');
  
  // 假设这是一个计算密集型操作
  const result = Array(10000)
    .fill(value)
    .map((v, i) => v * i)
    .reduce((a, b) => a + b, 0);
  
  return <div>计算结果: {result}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <button onClick={() => setValue(value + 1)}>更改值</button>
      <ExpensiveComponent value={value} />
    </div>
  );
}
```

### useMemo

使用 `useMemo` 记忆计算结果：

```jsx
function SearchResults({ query, data }) {
  // 使用 useMemo 缓存过滤结果
  const filteredData = useMemo(() => {
    console.log('过滤数据...');
    return data.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]); // 只有当 data 或 query 改变时才重新计算
  
  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### useCallback

使用 `useCallback` 记忆回调函数：

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // 使用 useCallback 记忆回调函数
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
  }, []); // 空依赖数组表示回调函数不会改变
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// 使用 React.memo 优化子组件
const ChildComponent = React.memo(function ChildComponent({ onClick }) {
  console.log('ChildComponent 渲染');
  return <button onClick={onClick}>点击我</button>;
});
```

### 懒加载组件

使用 `React.lazy` 和 `Suspense` 实现组件懒加载：

```jsx
import React, { Suspense, lazy } from 'react';

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  const [showLazy, setShowLazy] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowLazy(!showLazy)}>
        {showLazy ? '隐藏' : '显示'}懒加载组件
      </button>
      
      {showLazy && (
        <Suspense fallback={<div>加载中...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

### 虚拟列表

对于长列表，使用虚拟列表只渲染可见项：

```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  // 渲染单个列表项
  const Row = ({ index, style }) => (
    <div style={style}>
      Item {index}: {items[index]}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}

// 使用虚拟列表
function App() {
  // 生成 10000 个项目的数组
  const items = Array(10000)
    .fill(null)
    .map((_, i) => `Item ${i}`);
  
  return <VirtualizedList items={items} />;
}
```

## 组件测试

### 使用 Jest 和 React Testing Library

```jsx
// Button.js
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('按钮渲染正确的文本', () => {
  render(<Button>点击我</Button>);
  expect(screen.getByText('点击我')).toBeInTheDocument();
});

test('点击按钮时调用 onClick 处理程序', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>点击我</Button>);
  fireEvent.click(screen.getByText('点击我'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 测试异步组件

```jsx
// UserList.js
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return <div>加载中...</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// UserList.test.js
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import UserList from './UserList';

// 模拟 fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: '张三' },
      { id: 2, name: '李四' }
    ])
  })
);

test('加载并显示用户列表', async () => {
  render(<UserList />);
  
  // 检查加载状态
  expect(screen.getByText('加载中...')).toBeInTheDocument();
  
  // 等待加载状态消失
  await waitForElementToBeRemoved(() => screen.queryByText('加载中...'));
  
  // 检查用户列表
  expect(screen.getByText('张三')).toBeInTheDocument();
  expect(screen.getByText('李四')).toBeInTheDocument();
});
```

## 组件最佳实践

1. **保持组件专注**：每个组件应该只做一件事
2. **提取可复用逻辑**：使用自定义 Hooks 或高阶组件
3. **避免过度优化**：只在性能确实有问题时才进行优化
4. **使用 PropTypes 或 TypeScript**：为组件添加类型检查
5. **合理命名**：使用清晰、一致的命名约定
6. **避免内联函数**：使用 `useCallback` 记忆回调函数
7. **避免过深的组件层次**：考虑使用 Context 或状态管理库
8. **编写测试**：确保组件行为符合预期

## 总结

React 组件是构建用户界面的基础构建块。通过掌握组件类型、生命周期、通信方式、设计模式和性能优化技术，你可以构建出高效、可维护的 React 应用。

在现代 React 开发中，函数组件和 Hooks 已经成为主流，但理解类组件和传统模式仍然很重要，特别是在维护旧代码时。选择合适的组件设计模式和优化技术，可以显著提高应用的性能和可维护性。