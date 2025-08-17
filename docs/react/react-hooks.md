# React Hooks

React Hooks 是 React 16.8 版本引入的新特性，它允许你在不编写类组件的情况下使用状态和其他 React 特性。Hooks 使函数组件更加强大，代码更加简洁易读。

## 为什么需要 Hooks？

在 Hooks 出现之前，React 存在以下问题：

1. **组件之间难以复用状态逻辑**：虽然有高阶组件和 render props 模式，但这些模式会导致组件层级嵌套过深
2. **复杂组件变得难以理解**：生命周期方法中常常包含不相关的逻辑，而相关逻辑却分散在不同的生命周期方法中
3. **类组件难以理解**：需要理解 JavaScript 中 `this` 的工作方式，代码冗长

Hooks 解决了这些问题，使代码更加简洁、易于理解和测试。

## Hooks 规则

使用 Hooks 时必须遵循两条规则：

1. **只在最顶层使用 Hooks**：不要在循环、条件或嵌套函数中调用 Hooks
2. **只在 React 函数组件中调用 Hooks**：不要在普通 JavaScript 函数中调用 Hooks

## 基础 Hooks

### useState

`useState` 允许在函数组件中添加状态：

```jsx
import React, { useState } from 'react';

function Counter() {
  // 声明一个叫 count 的 state 变量，初始值为 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
```

`useState` 返回一个数组，包含：
1. 当前状态值
2. 更新状态的函数

你可以在一个组件中多次使用 `useState`：

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  // ...
}
```

#### 使用函数式更新

当新的状态依赖于之前的状态时，应该使用函数式更新：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      {/* 推荐：使用函数式更新 */}
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        点击我
      </button>
    </div>
  );
}
```

#### 使用对象状态

当状态是一个对象时，更新时需要合并之前的状态：

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com'
  });

  const updateEmail = (newEmail) => {
    // 需要手动合并之前的状态
    setUser({
      ...user,
      email: newEmail
    });
  };

  // ...
}
```

### useEffect

`useEffect` 允许在函数组件中执行副作用操作，如数据获取、订阅或手动修改 DOM 等：

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    // 更新文档标题
    document.title = `你点击了 ${count} 次`;
  });

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
```

#### 依赖数组

`useEffect` 接受第二个参数，一个依赖数组，用于控制 effect 的执行时机：

```jsx
// 仅在 count 改变时执行
useEffect(() => {
  document.title = `你点击了 ${count} 次`;
}, [count]);

// 仅在组件挂载时执行一次（类似 componentDidMount）
useEffect(() => {
  console.log('组件挂载');
}, []);

// 没有依赖数组，每次渲染后都会执行
useEffect(() => {
  console.log('每次渲染后执行');
});
```

#### 清除 Effect

有些 effects 需要清理，例如订阅外部数据源。为此，`useEffect` 函数可以返回一个清理函数：

```jsx
useEffect(() => {
  // 设置订阅
  const subscription = someExternalAPI.subscribe();
  
  // 清理函数
  return () => {
    // 清理订阅
    subscription.unsubscribe();
  };
}, [someExternalAPI]); // 仅当 someExternalAPI 改变时重新订阅
```

清理函数会在组件卸载前执行，也会在下一次 effect 执行前执行。

### useContext

`useContext` 接收一个 context 对象（从 `React.createContext` 返回的值）并返回该 context 的当前值：

```jsx
import React, { useContext } from 'react';

// 创建 Context
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  // 使用 useContext 获取当前主题
  const theme = useContext(ThemeContext);
  
  return <button className={theme}>按钮</button>;
}
```

当 Provider 的值更新时，使用该 context 的组件会重新渲染。

## 额外的 Hooks

### useReducer

`useReducer` 是 `useState` 的替代方案，适用于复杂的状态逻辑：

```jsx
import React, { useReducer } from 'react';

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  // 使用 useReducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

`useReducer` 返回当前状态和 dispatch 函数。

### useCallback

`useCallback` 返回一个记忆化的回调函数，只有当依赖项改变时才会更新：

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // 使用 useCallback 记忆化回调函数
  const handleClick = useCallback(() => {
    console.log(`Button clicked, count: ${count}`);
  }, [count]); // 只有当 count 改变时，handleClick 才会更新
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// 使用 React.memo 优化子组件
const ChildComponent = React.memo(function ChildComponent({ onClick }) {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

`useCallback` 常与 `React.memo` 一起使用，以防止不必要的子组件重新渲染。

### useMemo

`useMemo` 返回一个记忆化的值，只有当依赖项改变时才重新计算：

```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ a, b }) {
  const [count, setCount] = useState(0);
  
  // 使用 useMemo 记忆化计算结果
  const result = useMemo(() => {
    console.log('Computing result...');
    // 假设这是一个耗时的计算
    return a * b * 1000;
  }, [a, b]); // 只有当 a 或 b 改变时，才重新计算
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Result: {result}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

`useMemo` 适用于避免在每次渲染时进行昂贵的计算。

### useRef

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数：

```jsx
import React, { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  // 创建 ref
  const inputRef = useRef(null);
  
  // 点击按钮时聚焦输入框
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}
```

`useRef` 的常见用途：
1. 访问 DOM 元素
2. 保存任何可变值，类似于类中的实例属性

与 state 不同，更新 ref 的 `.current` 属性不会触发组件重新渲染。

### useLayoutEffect

`useLayoutEffect` 与 `useEffect` 相似，但它会在所有 DOM 变更之后同步调用：

```jsx
import React, { useState, useLayoutEffect } from 'react';

function Tooltip() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  
  useLayoutEffect(() => {
    // 获取元素尺寸和位置
    const { width, height } = tooltipRef.current.getBoundingClientRect();
    
    // 计算新位置
    setPosition({
      x: window.innerWidth / 2 - width / 2,
      y: window.innerHeight / 2 - height / 2
    });
  }, []); // 仅在挂载时执行
  
  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      工具提示
    </div>
  );
}
```

`useLayoutEffect` 适用于需要在浏览器绘制之前进行 DOM 测量或修改的场景。

### useImperativeHandle

`useImperativeHandle` 自定义使用 ref 时暴露给父组件的实例值：

```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// 使用 forwardRef 转发 ref
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  // 自定义暴露给父组件的实例值
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    // 只暴露需要的方法，隐藏其他内部实现
    getValue: () => {
      return inputRef.current.value;
    }
  }));
  
  return <input ref={inputRef} />;
});

function Parent() {
  const fancyInputRef = useRef(null);
  
  const handleClick = () => {
    // 可以调用子组件暴露的方法
    fancyInputRef.current.focus();
    console.log(fancyInputRef.current.getValue());
  };
  
  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </div>
  );
}
```

### useDebugValue

`useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签：

```jsx
import React, { useState, useEffect, useDebugValue } from 'react';

// 自定义 Hook
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // 在 React 开发者工具中显示标签
  useDebugValue(isOnline ? '在线' : '离线');
  
  return isOnline;
}

function StatusIndicator() {
  const isOnline = useOnlineStatus();
  
  return <div>{isOnline ? '✅ 在线' : '❌ 离线'}</div>;
}
```

## 自定义 Hooks

自定义 Hooks 是一种复用状态逻辑的机制，它不复用状态本身，而是复用状态逻辑。

自定义 Hook 是一个以 "use" 开头的函数，它可以调用其他 Hooks：

```jsx
import { useState, useEffect } from 'react';

// 自定义 Hook：获取窗口尺寸
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    // 处理窗口大小变化
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // 添加事件监听器
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组表示仅在挂载和卸载时执行
  
  return windowSize;
}

// 使用自定义 Hook
function ResponsiveComponent() {
  const windowSize = useWindowSize();
  
  return (
    <div>
      <p>窗口宽度: {windowSize.width}px</p>
      <p>窗口高度: {windowSize.height}px</p>
    </div>
  );
}
```

### 更多自定义 Hook 示例

#### useFetch - 数据获取

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: abortController.signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    return () => {
      abortController.abort();
    };
  }, [url]);
  
  return { data, loading, error };
}

// 使用示例
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`https://api.example.com/users/${userId}`);
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!data) return null;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
    </div>
  );
}
```

#### useLocalStorage - 本地存储

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // 更新本地存储
  const setValue = (value) => {
    try {
      // 允许值是一个函数
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// 使用示例
function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入你的名字"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          暗黑模式
        </label>
      </div>
    </div>
  );
}
```

## Hooks 最佳实践

1. **使用多个 State Hooks 而非单个对象**：将不相关的状态拆分为多个 state 变量
2. **依赖数组要包含所有依赖项**：确保 useEffect、useCallback 和 useMemo 的依赖数组包含所有使用的变量
3. **使用 ESLint 插件**：使用 `eslint-plugin-react-hooks` 帮助检查 Hooks 规则
4. **避免过度优化**：不要过早使用 useCallback 和 useMemo，只在性能确实有问题时使用
5. **保持自定义 Hooks 简单**：每个自定义 Hook 应该专注于单一功能
6. **命名约定**：自定义 Hooks 必须以 "use" 开头

## 总结

React Hooks 彻底改变了 React 组件的编写方式，使函数组件能够拥有状态和生命周期特性。通过 Hooks，我们可以：

1. 在函数组件中使用状态和其他 React 特性
2. 提取和复用组件逻辑，而不改变组件层次结构
3. 将相关逻辑放在一起，而不是分散在不同的生命周期方法中
4. 避免使用复杂的高阶组件和 render props 模式

掌握 Hooks 是现代 React 开发的必备技能，它能帮助你编写更简洁、更易于维护的代码。