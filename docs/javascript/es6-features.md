# ES6+ 特性

ECMAScript 6（也称为 ES6 或 ES2015）是 JavaScript 语言的一个重要版本，引入了许多新特性和语法改进。自 ES6 发布以来，JavaScript 每年都会发布新版本（ES2016、ES2017 等），带来更多新特性。本文将系统介绍 ES6 及后续版本中的重要特性和最佳实践。

## ES6 (ES2015) 核心特性

### 1. let 和 const 声明

ES6 引入了 `let` 和 `const` 两种新的变量声明方式，它们提供了比 `var` 更好的作用域控制。

```javascript
// let - 块级作用域变量
let x = 10;
if (true) {
    let x = 20; // 不同的变量
    console.log(x); // 20
}
console.log(x); // 10

// const - 声明常量（不可重新赋值）
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

// const 对象的属性可以修改
const person = { name: "张三" };
person.name = "李四"; // 有效
// person = {}; // TypeError: Assignment to constant variable
```

**最佳实践**：
- 默认使用 `const`，只有在需要重新赋值时才使用 `let`
- 避免使用 `var`
- 常量名使用全大写，单词间用下划线分隔

### 2. 箭头函数

箭头函数提供了一种更简洁的函数语法，并且不绑定自己的 `this`、`arguments`、`super` 或 `new.target`。

```javascript
// 基本语法
const add = (a, b) => a + b;

// 等价于
const add2 = function(a, b) {
    return a + b;
};

// 单个参数可以省略括号
const double = n => n * 2;

// 无参数需要空括号
const sayHello = () => "你好";

// 多行函数体需要大括号和 return
const calculate = (a, b) => {
    const sum = a + b;
    return sum * 2;
};

// this 绑定
const counter = {
    count: 0,
    
    // 箭头函数不绑定自己的 this
    increment: () => {
        this.count++; // this 指向全局对象，而不是 counter
    },
    
    // 传统函数绑定自己的 this
    decrement: function() {
        this.count--; // this 指向 counter
    }
};
```

**最佳实践**：
- 使用箭头函数作为回调函数和匿名函数
- 避免在对象方法和构造函数中使用箭头函数
- 利用箭头函数简化代码，特别是在链式调用中

### 3. 模板字符串

模板字符串（使用反引号 `` ` `` 包裹）提供了更灵活的字符串拼接方式，支持多行字符串和字符串插值。

```javascript
// 字符串插值
const name = "张三";
const age = 25;
const greeting = `你好，我是${name}，今年${age}岁。`;

// 多行字符串
const multiLine = `这是第一行
这是第二行
这是第三行`;

// 表达式插值
const price = 19.99;
const tax = 0.07;
const total = `总价: ¥${(price * (1 + tax)).toFixed(2)}`;

// 带标签的模板字符串
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

const name2 = "李四";
const age2 = 30;
const highlightedText = highlight`我叫${name2}，今年${age2}岁。`;
// "我叫<strong>李四</strong>，今年<strong>30</strong>岁。"
```

**最佳实践**：
- 使用模板字符串替代字符串拼接
- 利用多行字符串功能提高代码可读性
- 在需要复杂字符串处理时使用标签模板

### 4. 解构赋值

解构赋值允许从数组或对象中提取值，并赋给变量，使代码更简洁。

```javascript
// 数组解构
const numbers = [1, 2, 3, 4, 5];

// 基本解构
const [first, second] = numbers;
console.log(first, second); // 1 2

// 跳过元素
const [a, , c] = numbers;
console.log(a, c); // 1 3

// 剩余模式
const [head, ...tail] = numbers;
console.log(head, tail); // 1 [2, 3, 4, 5]

// 默认值
const [x, y, z = 10] = [1, 2];
console.log(x, y, z); // 1 2 10

// 交换变量
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2 1

// 对象解构
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    address: {
        street: "朝阳区",
        zipCode: "100000"
    }
};

// 基本解构
const { name, age } = person;
console.log(name, age); // "张三" 25

// 重命名
const { name: fullName, age: years } = person;
console.log(fullName, years); // "张三" 25

// 默认值
const { country = "中国" } = person;
console.log(country); // "中国"

// 嵌套解构
const { address: { street } } = person;
console.log(street); // "朝阳区"

// 剩余模式
const { name: personName, ...rest } = person;
console.log(personName, rest); // "张三" { age: 25, city: "北京", address: {...} }
```

**最佳实践**：
- 使用解构简化函数参数处理
- 从导入的模块中解构需要的部分
- 使用解构返回多个值
- 使用默认值处理可能缺失的属性

### 5. 默认参数和剩余参数

ES6 允许为函数参数设置默认值，并使用剩余参数语法处理不定数量的参数。

```javascript
// 默认参数
function greet(name = "访客", greeting = "你好") {
    return `${greeting}，${name}！`;
}

console.log(greet()); // "你好，访客！"
console.log(greet("张三")); // "你好，张三！"
console.log(greet("李四", "欢迎")); // "欢迎，李四！"

// 剩余参数
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 结合使用
function createTeam(leader, deputy, ...members) {
    return {
        leader,
        deputy,
        members,
        size: members.length + 2
    };
}

const team = createTeam("张三", "李四", "王五", "赵六", "钱七");
console.log(team);
// { leader: "张三", deputy: "李四", members: ["王五", "赵六", "钱七"], size: 5 }
```

**最佳实践**：
- 为可选参数提供合理的默认值
- 使用剩余参数替代 arguments 对象
- 将必选参数放在前面，可选参数（带默认值）放在后面

### 6. 扩展运算符

扩展运算符（`...`）可以在函数调用、数组字面量或对象字面量中展开可迭代对象。

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 复制数组
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3]
console.log(copy); // [1, 2, 3, 4]

// 函数参数展开
function add(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6

// 对象展开 (ES2018)
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }

// 结合解构和展开
const { a, ...rest } = merged;
console.log(a, rest); // 1 { b: 3, c: 4 }
```

**最佳实践**：
- 使用扩展运算符合并数组和对象
- 使用扩展运算符创建对象或数组的浅拷贝
- 结合解构和扩展运算符提取和重组数据

### 7. 类语法

ES6 引入了类语法，使基于原型的面向对象编程更加直观和易用。

```javascript
// 基本类语法
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    sayHello() {
        return `你好，我是${this.name}，今年${this.age}岁。`;
    }
    
    // 静态方法
    static createAnonymous() {
        return new Person("匿名", 0);
    }
}

const person = new Person("张三", 25);
console.log(person.sayHello()); // "你好，我是张三，今年25岁。"

const anonymous = Person.createAnonymous();
console.log(anonymous.name); // "匿名"

// 继承
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // 调用父类构造函数
        this.grade = grade;
    }
    
    study() {
        return `${this.name}正在学习。`;
    }
    
    // 重写父类方法
    sayHello() {
        return `${super.sayHello()} 我是${this.grade}年级的学生。`;
    }
}

const student = new Student("李四", 15, "初三");
console.log(student.sayHello()); // "你好，我是李四，今年15岁。 我是初三年级的学生。"
console.log(student.study()); // "李四正在学习。"
```

**最佳实践**：
- 使用类语法替代传统的构造函数和原型
- 使用 `extends` 实现继承
- 使用 `super` 调用父类方法
- 使用静态方法实现工厂模式和辅助功能

### 8. 模块系统

ES6 引入了标准的模块系统，使用 `import` 和 `export` 关键字导入和导出模块。

```javascript
// math.js
// 命名导出
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export const PI = 3.14159;

// 默认导出
export default class Calculator {
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error("除数不能为零");
        return a / b;
    }
}
```

```javascript
// main.js
// 导入默认导出和命名导出
import Calculator, { add, subtract, PI } from './math.js';

console.log(add(5, 3));        // 8
console.log(subtract(5, 3));    // 2
console.log(PI);               // 3.14159

const calc = new Calculator();
console.log(calc.multiply(5, 3));  // 15
console.log(calc.divide(6, 2));    // 3

// 导入所有命名导出
import * as math from './math.js';
console.log(math.add(5, 3));    // 8
console.log(math.PI);           // 3.14159

// 重命名导入
import { add as sum, subtract as minus } from './math.js';
console.log(sum(5, 3));        // 8
console.log(minus(5, 3));      // 2

// 动态导入 (ES2020)
async function loadMath() {
    const math = await import('./math.js');
    return math.add(5, 3);
}
```

**最佳实践**：
- 每个文件作为一个模块，专注于单一功能
- 使用命名导出提供多个相关功能
- 使用默认导出提供主要功能
- 使用动态导入实现代码分割和按需加载

### 9. Promise

Promise 是异步编程的一种解决方案，比传统的回调函数更加强大和灵活。

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve("操作成功");
        } else {
            reject(new Error("操作失败"));
        }
    }, 1000);
});

// 使用 Promise
promise
    .then(result => {
        console.log(result); // "操作成功"
        return result.toUpperCase();
    })
    .then(upperResult => {
        console.log(upperResult); // "操作成功"
    })
    .catch(error => {
        console.error(error.message); // "操作失败"
    })
    .finally(() => {
        console.log("操作完成");
    });

// Promise.all - 所有 Promise 都成功时才成功
Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
])
.then(([usersResponse, postsResponse, commentsResponse]) => {
    // 处理所有响应
})
.catch(error => {
    // 任何一个请求失败都会执行
    console.error("至少有一个请求失败:", error);
});

// Promise.race - 返回最先完成的 Promise 结果
Promise.race([
    fetch('/api/data'),
    new Promise((_, reject) => setTimeout(() => reject(new Error("请求超时")), 5000))
])
.then(response => {
    // 处理响应
})
.catch(error => {
    console.error("请求失败或超时:", error);
});
```

**最佳实践**：
- 使用 Promise 替代回调函数处理异步操作
- 使用 Promise 链处理连续的异步操作
- 使用 `Promise.all` 并行处理多个异步操作
- 使用 `Promise.race` 实现超时处理

### 10. Symbol

Symbol 是一种新的原始数据类型，表示唯一的标识符。

```javascript
// 创建 Symbol
const sym1 = Symbol();
const sym2 = Symbol("描述");
const sym3 = Symbol("描述");

console.log(sym2 === sym3); // false，每个 Symbol 都是唯一的

// 作为对象属性
const obj = {
    [sym1]: "值1",
    [sym2]: "值2"
};

console.log(obj[sym1]); // "值1"
console.log(Object.keys(obj)); // []，Symbol 属性不会出现在这里

// 全局 Symbol
const globalSym1 = Symbol.for("全局键");
const globalSym2 = Symbol.for("全局键");

console.log(globalSym1 === globalSym2); // true，相同键的全局 Symbol 是相同的

// 内置 Symbol
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // 数组的迭代器方法

// 自定义迭代器
const range = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;
        
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}
```

**最佳实践**：
- 使用 Symbol 作为对象的唯一属性键
- 使用 Symbol 实现私有属性（虽然不是真正的私有）
- 使用内置 Symbol 自定义对象行为（如迭代器）
- 使用 `Symbol.for` 在代码不同部分共享 Symbol

### 11. Map 和 Set

ES6 引入了 Map 和 Set 两种新的数据结构，提供了比普通对象和数组更丰富的功能。

```javascript
// Map - 键值对集合，键可以是任何类型
const map = new Map();

// 添加键值对
map.set("name", "张三");
map.set(42, "数字键");
map.set(true, "布尔键");

const obj = { id: 1 };
map.set(obj, "对象键");

// 获取值
console.log(map.get("name")); // "张三"
console.log(map.get(obj)); // "对象键"

// 检查键是否存在
console.log(map.has(true)); // true
console.log(map.has("age")); // false

// 删除键值对
map.delete(42);

// 获取大小
console.log(map.size); // 3

// 遍历 Map
for (const [key, value] of map) {
    console.log(key, value);
}

// Map 构造函数可以接受键值对数组
const mapFromArray = new Map([
    ["name", "李四"],
    ["age", 25],
    ["city", "北京"]
]);

// Set - 唯一值的集合
const set = new Set();

// 添加值
set.add(1);
set.add("文本");
set.add({ id: 1 });
set.add(1); // 重复值会被忽略

// 检查值是否存在
console.log(set.has(1)); // true
console.log(set.has(2)); // false

// 删除值
set.delete("文本");

// 获取大小
console.log(set.size); // 2

// 遍历 Set
for (const value of set) {
    console.log(value);
}

// Set 构造函数可以接受可迭代对象
const setFromArray = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log([...setFromArray]); // [1, 2, 3, 4, 5]，自动去重
```

**最佳实践**：
- 使用 Map 替代对象，当键不是字符串或需要保持插入顺序时
- 使用 Set 存储唯一值集合和实现快速查找
- 利用 Set 去除数组中的重复元素
- 使用 Map 和 Set 的方法（如 `has`、`delete`）而不是自己实现

### 12. 迭代器和生成器

ES6 引入了迭代器和生成器，使遍历数据结构更加灵活和强大。

```javascript
// 迭代器 - 实现了 next() 方法的对象
function createIterator(array) {
    let index = 0;
    
    return {
        next() {
            if (index < array.length) {
                return { value: array[index++], done: false };
            } else {
                return { done: true };
            }
        }
    };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }

// 可迭代对象 - 实现了 Symbol.iterator 方法的对象
const iterable = {
    items: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        const items = this.items;
        
        return {
            next() {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (const item of iterable) {
    console.log(item); // 1, 2, 3
}

// 生成器函数 - 使用 function* 语法，可以使用 yield 暂停执行
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = simpleGenerator();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

// 生成器函数可以接收参数
function* twoWayGenerator() {
    const a = yield 1;
    const b = yield a + 2;
    yield b + 3;
}

const twoWay = twoWayGenerator();
console.log(twoWay.next()); // { value: 1, done: false }
console.log(twoWay.next(10)); // { value: 12, done: false }，a = 10
console.log(twoWay.next(20)); // { value: 23, done: false }，b = 20
console.log(twoWay.next()); // { value: undefined, done: true }

// 使用生成器实现无限序列
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
```

**最佳实践**：
- 使用生成器函数简化迭代器的创建
- 使用 `yield` 实现惰性计算和无限序列
- 使用生成器处理异步操作（结合 Promise）
- 实现自定义数据结构的迭代接口

## ES2016 (ES7) 特性

### 1. 指数运算符

```javascript
// 指数运算符 (**)
console.log(2 ** 3); // 8，等同于 Math.pow(2, 3)

// 可以与赋值运算符结合
let num = 2;
num **= 3;
console.log(num); // 8
```

### 2. Array.prototype.includes

```javascript
const array = [1, 2, 3, NaN, 4, 5];

// 检查数组是否包含某个元素
console.log(array.includes(3)); // true
console.log(array.includes(6)); // false

// 可以处理 NaN（而 indexOf 不行）
console.log(array.includes(NaN)); // true
console.log(array.indexOf(NaN) !== -1); // false

// 可以指定开始搜索的位置
console.log(array.includes(1, 2)); // false，从索引 2 开始搜索
```

## ES2017 (ES8) 特性

### 1. async/await

```javascript
// 使用 Promise
function fetchData() {
    return fetch('https://api.example.com/data')
        .then(response => response.json());
}

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// 使用 async/await
async function fetchDataAsync() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// async 函数总是返回 Promise
fetchDataAsync().then(data => {
    console.log('处理返回的数据:', data);
});
```

### 2. Object.values 和 Object.entries

```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京"
};

// Object.values 返回对象自身可枚举属性的值数组
console.log(Object.values(person)); // ["张三", 25, "北京"]

// Object.entries 返回对象自身可枚举属性的键值对数组
console.log(Object.entries(person)); // [["name", "张三"], ["age", 25], ["city", "北京"]]

// 结合 for...of 遍历对象
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// 将对象转换为 Map
const personMap = new Map(Object.entries(person));
console.log(personMap.get("name")); // "张三"
```

### 3. String padding

```javascript
// padStart - 在字符串开头填充
console.log("5".padStart(3, "0")); // "005"
console.log("hello".padStart(10, ".")); // ".....hello"

// padEnd - 在字符串结尾填充
console.log("5".padEnd(3, "0")); // "500"
console.log("hello".padEnd(10, ".")); // "hello....."

// 应用场景：格式化数字、对齐文本等
const numbers = [5, 42, 7, 123];
const formatted = numbers.map(num => num.toString().padStart(3, "0"));
console.log(formatted); // ["005", "042", "007", "123"]
```

### 4. Object.getOwnPropertyDescriptors

```javascript
const person = {
    name: "张三",
    get fullName() {
        return `${this.name}先生`;
    }
};

// 获取对象所有属性的描述符
const descriptors = Object.getOwnPropertyDescriptors(person);
console.log(descriptors.name);
// { value: "张三", writable: true, enumerable: true, configurable: true }

console.log(descriptors.fullName);
// { get: [Function: get fullName], set: undefined, enumerable: true, configurable: true }

// 用于创建对象的浅拷贝，包括 getter 和 setter
const personCopy = Object.defineProperties({}, Object.getOwnPropertyDescriptors(person));
console.log(personCopy.fullName); // "张三先生"
```

## ES2018 (ES9) 特性

### 1. 对象的扩展运算符

```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    country: "中国"
};

// 对象的扩展运算符（解构）
const { name, age, ...rest } = person;
console.log(name, age); // "张三" 25
console.log(rest); // { city: "北京", country: "中国" }

// 对象的扩展运算符（合并）
const personWithJob = {
    ...person,
    job: "工程师",
    city: "上海" // 覆盖原有属性
};

console.log(personWithJob);
// { name: "张三", age: 25, city: "上海", country: "中国", job: "工程师" }
```

### 2. Promise.finally

```javascript
function fetchData() {
    showLoadingIndicator();
    
    return fetch('https://api.example.com/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            console.log('获取的数据:', data);
            return data;
        })
        .catch(error => {
            console.error('获取数据失败:', error);
            throw error;
        })
        .finally(() => {
            // 无论成功还是失败，都会执行
            hideLoadingIndicator();
        });
}

// 使用 async/await 和 finally
async function fetchDataAsync() {
    showLoadingIndicator();
    
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        const data = await response.json();
        console.log('获取的数据:', data);
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
        throw error;
    } finally {
        // 无论成功还是失败，都会执行
        hideLoadingIndicator();
    }
}
```

### 3. 正则表达式增强

```javascript
// 命名捕获组
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = dateRegex.exec('2023-08-17');

console.log(match.groups); // { year: '2023', month: '08', day: '17' }
console.log(match.groups.year); // '2023'
console.log(match.groups.month); // '08'
console.log(match.groups.day); // '17'

// 反向断言
const priceRegex = /(?<=\$)\d+(\.\d+)?/;
console.log(priceRegex.exec('Price: $19.99')[0]); // '19.99'

const notDollarRegex = /(?<!\$)\d+(\.\d+)?/;
console.log(notDollarRegex.exec('Price: €19.99')[0]); // '19.99'

// dotAll 模式
const multilineRegex = /hello.world/s; // 's' 标志使 '.' 匹配换行符
console.log(multilineRegex.test('hello\nworld')); // true

// Unicode 属性转义
const emojiRegex = /\p{Emoji}/u;
console.log(emojiRegex.test('😊')); // true

const chineseRegex = /\p{Script=Han}/u;
console.log(chineseRegex.test('你好')); // true
```

### 4. 异步迭代

```javascript
// 异步迭代器
const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next() {
                if (i < 5) {
                    return Promise.resolve({ value: i++, done: false });
                }
                return Promise.resolve({ done: true });
            }
        };
    }
};

// for await...of 循环
async function iterateAsync() {
    for await (const value of asyncIterable) {
        console.log(value); // 0, 1, 2, 3, 4
    }
}

iterateAsync();

// 异步生成器
async function* fetchPages() {
    let page = 1;
    let hasMore = true;
    
    while (hasMore && page <= 3) {
        const response = await fetch(`https://api.example.com/data?page=${page}`);
        const data = await response.json();
        
        hasMore = data.hasMore;
        page++;
        
        yield data.items;
    }
}

async function processPages() {
    let allItems = [];
    
    for await (const items of fetchPages()) {
        allItems = allItems.concat(items);
        console.log('获取到新项目:', items.length);
    }
    
    console.log('总项目数:', allItems.length);
}

processPages();
```

## ES2019 (ES10) 特性

### 1. Array.prototype.flat 和 flatMap

```javascript
// flat - 扁平化嵌套数组
const nestedArray = [1, 2, [3, 4, [5, 6]]];
console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(nestedArray.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// flatMap - 映射每个元素，然后扁平化结果
const sentences = ["Hello world", "How are you"];
const words = sentences.flatMap(sentence => sentence.split(" "));
console.log(words); // ["Hello", "world", "How", "are", "you"]

// 使用 flatMap 过滤和转换
const numbers = [1, 2, 3, 4, 5];
const result = numbers.flatMap(num => {
    if (num % 2 === 0) {
        return [num, num * 2];
    } else {
        return [];
    }
});
console.log(result); // [2, 4, 4, 8]
```

### 2. Object.fromEntries

```javascript
// 将键值对数组转换为对象
const entries = [
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
];

const person = Object.fromEntries(entries);
console.log(person); // { name: '张三', age: 25, city: '北京' }

// 与 Object.entries 配合使用
const original = { a: 1, b: 2, c: 3 };
const transformed = Object.fromEntries(
    Object.entries(original).map(([key, value]) => [key, value * 2])
);
console.log(transformed); // { a: 2, b: 4, c: 6 }

// 将 Map 转换为对象
const map = new Map([
    ['name', '李四'],
    ['age', 30]
]);
const objFromMap = Object.fromEntries(map);
console.log(objFromMap); // { name: '李四', age: 30 }
```

### 3. String.prototype.trimStart 和 trimEnd

```javascript
const text = "   Hello, world!   ";

// trimStart (别名 trimLeft) - 去除字符串开头的空白
console.log(text.trimStart()); // "Hello, world!   "
console.log(text.trimLeft()); // "Hello, world!   "

// trimEnd (别名 trimRight) - 去除字符串结尾的空白
console.log(text.trimEnd()); // "   Hello, world!"
console.log(text.trimRight()); // "   Hello, world!"

// 与 trim 比较
console.log(text.trim()); // "Hello, world!"
```

### 4. Symbol.description

```javascript
// 获取 Symbol 的描述
const sym1 = Symbol('描述文本');
console.log(sym1.description); // "描述文本"

const sym2 = Symbol();
console.log(sym2.description); // undefined

// 之前的获取方式
console.log(sym1.toString()); // "Symbol(描述文本)"
console.log(String(sym1)); // "Symbol(描述文本)"
```

### 5. 可选的 catch 绑定

```javascript
// ES2019 之前
try {
    // 可能抛出错误的代码
    JSON.parse('{"name": "张三"');
} catch (error) {
    // 必须声明 error 变量，即使不使用
    console.log('解析 JSON 失败');
}

// ES2019 之后
try {
    JSON.parse('{"name": "张三"');
} catch {
    // 不需要声明未使用的错误变量
    console.log('解析 JSON 失败');
}
```

## ES2020 (ES11) 特性

### 1. 可选链操作符

```javascript
const user = {
    name: '张三',
    address: {
        city: '北京',
        street: '朝阳区'
    }
};

// 不使用可选链
const cityOld = user.address && user.address.city;
console.log(cityOld); // "北京"

// 使用可选链
const city = user.address?.city;
console.log(city); // "北京"

// 深层嵌套
const zipCode = user.address?.zipCode;
console.log(zipCode); // undefined

const country = user.address?.country?.name;
console.log(country); // undefined

// 与方法调用结合
const result = user.getDetails?.();
console.log(result); // undefined

// 与数组结合
const firstItem = user.items?.[0];
console.log(firstItem); // undefined
```

### 2. 空值合并运算符

```javascript
// 不使用空值合并运算符
const name1 = user.name !== undefined && user.name !== null ? user.name : '匿名';
console.log(name1); // "张三"

// 使用空值合并运算符
const name2 = user.name ?? '匿名';
console.log(name2); // "张三"

const zipCode = user.address?.zipCode ?? '未知';
console.log(zipCode); // "未知"

// 与逻辑或运算符的区别
const count = 0;
console.log(count || 10); // 10，因为 0 是假值
console.log(count ?? 10); // 0，因为 0 不是 null 或 undefined
```

### 3. BigInt

```javascript
// 表示超过 Number.MAX_SAFE_INTEGER 的整数
const max = Number.MAX_SAFE_INTEGER;
console.log(max); // 9007199254740991

// 不安全的整数计算
console.log(max + 1); // 9007199254740992
console.log(max + 2); // 9007199254740992 (错误，应该是 9007199254740993)

// 使用 BigInt
const bigInt = BigInt(9007199254740991);
console.log(bigInt); // 9007199254740991n
console.log(bigInt + 1n); // 9007199254740992n
console.log(bigInt + 2n); // 9007199254740993n

// 字面量表示法
const anotherBigInt = 9007199254740991n;

// 基本操作
console.log(10n + 20n); // 30n
console.log(10n * 20n); // 200n
console.log(20n / 10n); // 2n (整数除法，没有小数部分)

// 与普通数字不能直接混合运算
// console.log(10n + 20); // TypeError
console.log(10n + BigInt(20)); // 30n
console.log(Number(10n) + 20); // 30
```

### 4. globalThis

```javascript
// 在不同环境中获取全局对象
// 浏览器中: window
// Node.js 中: global
// Web Workers 中: self

// ES2020 之前的兼容写法
const getGlobalThis = function() {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('无法找到全局对象');
};

// ES2020 之后
console.log(globalThis); // 指向当前环境的全局对象
```

### 5. Promise.allSettled

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, '错误'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 50, '成功'));

// Promise.all 在任一 promise 被拒绝时就会立即拒绝
Promise.all([promise1, promise2, promise3])
  .then(results => console.log('全部成功:', results))
  .catch(error => console.log('至少一个失败:', error));
// 输出: "至少一个失败: 错误"

// Promise.allSettled 会等待所有 promise 完成，无论成功或失败
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log('所有 promise 已完成:');
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('成功:', result.value);
      } else {
        console.log('失败:', result.reason);
      }
    });
  });
// 输出:
// "所有 promise 已完成:"
// "成功: 3"
// "失败: 错误"
// "成功: 成功"
```

## ES2021 (ES12) 特性

### 1. String.prototype.replaceAll

```javascript
const text = 'JavaScript 是一门强大的语言，JavaScript 可以用于前端和后端开发。';

// 之前的替换方法 (只替换第一个匹配项)
console.log(text.replace('JavaScript', 'JS'));
// "JS 是一门强大的语言，JavaScript 可以用于前端和后端开发。"

// 使用正则表达式进行全局替换
console.log(text.replace(/JavaScript/g, 'JS'));
// "JS 是一门强大的语言，JS 可以用于前端和后端开发。"

// 使用 replaceAll (ES2021)
console.log(text.replaceAll('JavaScript', 'JS'));
// "JS 是一门强大的语言，JS 可以用于前端和后端开发。"
```

### 2. Promise.any

```javascript
const promise1 = new Promise((resolve, reject) => setTimeout(reject, 100, '错误 1'));
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 200, '成功 2'));
const promise3 = new Promise((resolve, reject) => setTimeout(reject, 300, '错误 3'));

// Promise.race 返回第一个完成的 promise，无论成功或失败
Promise.race([promise1, promise2, promise3])
  .then(value => console.log('race 成功:', value))
  .catch(error => console.log('race 失败:', error));
// 输出: "race 失败: 错误 1"

// Promise.any 返回第一个成功的 promise
Promise.any([promise1, promise2, promise3])
  .then(value => console.log('any 成功:', value))
  .catch(errors => console.log('any 失败:', errors));
// 输出: "any 成功: 成功 2"

// 如果所有 promise 都失败，Promise.any 会抛出 AggregateError
const allFailed = [
  Promise.reject('失败 1'),
  Promise.reject('失败 2'),
  Promise.reject('失败 3')
];

Promise.any(allFailed)
  .then(value => console.log('any 成功:', value))
  .catch(errors => {
    console.log('所有 promise 都失败');
    console.log(errors instanceof AggregateError); // true
    console.log(errors.errors); // ["失败 1", "失败 2", "失败 3"]
  });
```

### 3. 逻辑赋值运算符

```javascript
// 逻辑与赋值运算符 (&&=)
let x = 1;
x &&= 2; // 等同于 x = x && 2
console.log(x); // 2

let y = 0;
y &&= 2; // 等同于 y = y && 2
console.log(y); // 0，因为 0 是假值

// 逻辑或赋值运算符 (||=)
let a = null;
a ||= 'default'; // 等同于 a = a || 'default'
console.log(a); // "default"

let b = 'value';
b ||= 'default'; // 等同于 b = b || 'default'
console.log(b); // "value"

// 空值合并赋值运算符 (??=)
let c = null;
c ??= 'default'; // 等同于 c = c ?? 'default'
console.log(c); // "default"

let d = 0;
d ??= 'default'; // 等同于 d = d ?? 'default'
console.log(d); // 0，因为 0 不是 null 或 undefined
```

### 4. 数字分隔符

```javascript
// 大数值可读性差
const billion = 1000000000;

// 使用数字分隔符提高可读性
const billionReadable = 1_000_000_000;
console.log(billion === billionReadable); // true

// 在不同进制中使用
const hexValue = 0xFF_AA_BB; // 十六进制
const binaryValue = 0b1010_0001_1000_0101; // 二进制
const octalValue = 0o1234_5670; // 八进制

// 小数中使用
const pi = 3.141_592_653_589_793;
```

## ES2022 (ES13) 特性

### 1. 顶层 await

```javascript
// ES2022 之前，await 只能在 async 函数内部使用
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

// ES2022 允许在模块顶层使用 await，无需包装在 async 函数中
// 注意：这只在 ES 模块中有效，不在脚本或 CommonJS 模块中有效

// 示例 (假设这是一个 ES 模块)
const response = await fetch('https://api.example.com/data');
const data = await response.json();
console.log(data);

// 顶层 await 会阻塞模块的执行，直到 Promise 解决
```

### 2. Object.hasOwn

```javascript
const obj = {
  name: '张三',
  age: 30
};

// 检查对象自身是否具有指定属性
console.log(Object.hasOwn(obj, 'name')); // true
console.log(Object.hasOwn(obj, 'toString')); // false，toString 是继承的

// 与 Object.prototype.hasOwnProperty 比较
console.log(obj.hasOwnProperty('name')); // true
console.log(obj.hasOwnProperty('toString')); // false

// Object.hasOwn 的优势：更安全，不依赖于对象的原型链
const objWithoutProto = Object.create(null);
objWithoutProto.name = '李四';

// 这会抛出错误，因为 objWithoutProto 没有 hasOwnProperty 方法
// console.log(objWithoutProto.hasOwnProperty('name'));

// 这是安全的
console.log(Object.hasOwn(objWithoutProto, 'name')); // true
```

### 3. 类字段声明

```javascript
// ES2022 之前
class Person {
  constructor() {
    this.name = '张三';
    this.age = 30;
    this.#privateField = 'private'; // 语法错误
  }
}

// ES2022 类字段声明
class User {
  // 公共字段
  name = '张三';
  age = 30;
  
  // 私有字段 (以 # 开头)
  #privateField = 'private';
  #privateMethod() {
    return '这是私有方法';
  }
  
  // 静态字段
  static count = 0;
  
  // 静态私有字段
  static #instances = [];
  
  constructor() {
    User.count++;
    User.#instances.push(this);
  }
  
  getPrivateData() {
    return this.#privateField + ' - ' + this.#privateMethod();
  }
  
  static getInstanceCount() {
    return User.#instances.length;
  }
}

const user = new User();
console.log(user.name); // "张三"
console.log(user.getPrivateData()); // "private - 这是私有方法"
console.log(User.count); // 1

// 无法访问私有字段
// console.log(user.#privateField); // 语法错误
// console.log(User.#instances); // 语法错误
```

## ES2023 (ES14) 特性

### 1. Array.prototype.findLast 和 findLastIndex

```javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// 从前向后查找第一个偶数
const firstEven = numbers.find(n => n % 2 === 0);
console.log(firstEven); // 2

// 从后向前查找第一个偶数
const lastEven = numbers.findLast(n => n % 2 === 0);
console.log(lastEven); // 2

// 从前向后查找第一个偶数的索引
const firstEvenIndex = numbers.findIndex(n => n % 2 === 0);
console.log(firstEvenIndex); // 1

// 从后向前查找第一个偶数的索引
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // 7
```

### 2. Hashbang 语法

```javascript
#!/usr/bin/env node

// 在 Node.js 脚本中，Hashbang 允许将 JavaScript 文件作为可执行脚本运行
// 这行必须是文件的第一行，指定用于执行脚本的解释器

console.log('这是一个 Node.js 脚本');
```

## 总结

ES6 及后续版本为 JavaScript 带来了许多强大的新特性，使得代码更加简洁、可读性更强、功能更加丰富。这些特性包括：

1. **语法改进**：箭头函数、解构赋值、模板字符串、类语法等
2. **新的数据类型和结构**：Symbol、Map、Set、BigInt 等
3. **异步编程增强**：Promise、async/await、Promise 组合方法等
4. **对象和数组操作增强**：扩展运算符、对象字面量增强、数组新方法等
5. **模块化支持**：ES 模块系统
6. **迭代器和生成器**：for...of 循环、生成器函数等
7. **代理和反射**：Proxy、Reflect API
8. **安全性和便利性改进**：可选链、空值合并、私有字段等

掌握这些现代 JavaScript 特性对于前端开发者来说至关重要，它们不仅可以提高开发效率，还能编写出更加健壮、可维护的代码。

### 3. 正则表达式增强

```javascript
// 命名捕获组
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = dateRegex.exec('2023-08-17');

console.log(match.groups); // { year: '2023', month: '08', day: '17' }
console.log(match.groups.year); // '2023'
console.log(match.groups.month); // '08'
console.log(match.groups.day); // '17'

// 反向断言
const priceRegex = /(?<=\$)\d+(\.\d+)?/;
console.log(priceRegex.exec('Price: $19.99')[0]); // '19.99'

const notDollarRegex = /(?<!\$)\d+(\.\d+)?/;
console.log(notDollarRegex.exec('Price: €19.99')[0]); // '19.99'

// dotAll 模式
const multilineRegex = /hello.world/s; // 's' 标志使 '.' 匹配换行符
console.log(multilineRegex.test('hello\nworld')); // true

// Unicode 属性转义
const emojiRegex = /\p{Emoji}/u;
console.log(emojiRegex.test('😊')); // true

const chineseRegex = /\p{Script=Han}/u;
console.log(chineseRegex.test('你好')); // true
```

### 4. 异步迭代

```javascript
// 异步迭代器
const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next() {
                if (i < 5) {
                    return Promise.resolve({ value: i++, done: false });
                }
                return Promise.resolve({ done: true });
            }
        };
    }
};

// for await...of 循环
async function iterateAsync() {
    for await (const value of asyncIterable) {
        console.log(value); // 0, 1, 2, 3, 4
    }
}

iterateAsync();

// 异步生成器
async function* fetchPages() {
    let page = 1;
    let hasMore = true;
    
    while (hasMore && page <= 3) {
        const response = await fetch(`https://api.example.com/data?page=${page}`);
        const data = await response.json();
        
        hasMore = data.hasMore;
        page++;
        
        yield data.items;
    }
}

async function processPages() {
    let allItems = [];
    
    for await (const items of fetchPages()) {
        allItems = allItems.concat(items);
        console.log('获取到新项目:', items.length);
    }
    
    console.log('总项目数:', allItems.length);
}

processPages();
```

## ES2019 (ES10) 特性

### 1. Array.prototype.flat 和 flatMap

```javascript
// flat - 扁平化嵌套数组
const nestedArray = [1, 2, [3, 4, [5, 6]]];
console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(nestedArray.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// flatMap - 映射每个元素，然后扁平化结果
const sentences = ["Hello world", "How are you"];
const words = sentences.flatMap(sentence => sentence.split(" "));
console.log(words); // ["Hello", "world", "How", "are", "you"]

// 使用 flatMap 过滤和转换
const numbers = [1, 2, 3, 4, 5];
const result = numbers.flatMap(num => {
    if (num % 2 === 0) {
        return [num, num * 2];
    } else {
        return [];
    }
});
console.log(result); // [2, 4, 4, 8]
```

### 2. Object.fromEntries

```javascript
// 将键值对数组转换为对象
const entries = [
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
];

const person = Object.fromEntries(entries);
console.log(person); // { name: '张三', age: 25, city: '北京' }

// 与 Object.entries 配合使用
const original = { a: 1, b: 2, c: 3 };
const transformed = Object.fromEntries(
    Object.entries(original).map(([key, value]) => [key, value * 2])
);
console.log(transformed); // { a: 2, b: 4, c: 6 }

// 将 Map 转换为对象
const map = new Map([
    ['name', '李四'],
    ['age', 30]
]);
const objFromMap = Object.fromEntries(map);
console.log(objFromMap); // { name: '李四', age: 30 }
```

### 3. String.prototype.trimStart 和 trimEnd

```javascript
const text = "   Hello, world!   ";

// trimStart (别名 trimLeft) - 去除字符串开头的空白
console.log(text.trimStart()); // "Hello, world!   "
console.log(text.trimLeft()); // "Hello, world!   "

// trimEnd (别名 trimRight) - 去除字符串结尾的空白
console.log(text.trimEnd()); // "   Hello, world!"
console.log(text.trimRight()); // "   Hello, world!"

// 与 trim 比较
console.log(text.trim()); // "Hello, world!"
```

### 4. Symbol.description

```javascript
// 获取 Symbol 的描述
const sym1 = Symbol('描述文本');
console.log(sym1.description); // "描述文本"

const sym2 = Symbol();
console.log(sym2.description); // undefined

// 之前的获取方式
console.log(sym1.toString()); // "Symbol(描述文本)"
console.log(String(sym1)); // "Symbol(描述文本)"
```

### 5. 可选的 catch 绑定

```javascript
// ES2019 之前
try {
    // 可能抛出错误的代码
    JSON.parse('{"name": "张三"');
} catch (error) {
    // 必须声明 error 变量，即使不使用
    console.log('解析 JSON 失败');
}

// ES2019 之后
try {
    JSON.parse('{"name": "张三"');
} catch {
    // 不需要声明未使用的错误变量
    console.log('解析 JSON 失败');
}
```

## ES2020 (ES11) 特性

### 1. 可选链操作符

```javascript
const user = {
    name: '张三',
    address: {
        city: '北京',
        street: '朝阳区'
    }
};

// 不使用可选链
const cityOld = user.address && user.address.city;
console.log(cityOld); // "北京"

// 使用可选链
const city = user.address?.city;
console.log(city); // "北京"

// 深层嵌套
const zipCode = user.address?.zipCode;
console.log(zipCode); // undefined

const country = user.address?.country?.name;
console.log(country); // undefined

// 与方法调用结合
const result = user.getDetails?.();
console.log(result); // undefined

// 与数组结合
const firstItem = user.items?.[0];
console.log(firstItem); // undefined
```

### 2. 空值合并运算符

```javascript
// 不使用空值合并运算符
const name1 = user.name !== undefined && user.name !== null ? user.name : '匿名';
console.log(name1); // "张三"

// 使用空值合并运算符
const name2 = user.name ?? '匿名';
console.log(name2); // "张三"

const zipCode = user.address?.zipCode ?? '未知';
console.log(zipCode); // "未知"

// 与逻辑或运算符的区别
const count = 0;
console.log(count || 10); // 10，因为 0 是假值
console.log(count ?? 10); // 0，因为 0 不是 null 或 undefined
```

### 3. BigInt

```javascript
// 创建 BigInt
const bigInt1 = 9007199254740991n; // 使用 n 后缀
const bigInt2 = BigInt(9007199254740991); // 使用 BigInt() 函数

// 基本运算
console.log(bigInt1 + 1n); // 9007199254740992n
console.log(bigInt1 * 2n); // 18014398509481982n
console.log(bigInt1 / 3n); // 3002399751580330n（整数除法）

// 与普通数字比较
console.log(1n === 1); // false（不同类型）
console.log(1n == 1); // true（值相等）
console.log(1n < 2); // true
console.log(2n > 1); // true

// 转换
console.log(Number(123n)); // 123
console.log(String(123n)); // "123"

// 大数计算
const max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max); // 9007199254740991n
console.log(max + 1n); // 9007199254740992n
console.log(max + 2n); // 9007199254740993n

// 不支持的操作
// console.log(1n + 1); // TypeError: Cannot mix BigInt and other types
// console.log(Math.sqrt(4n)); // TypeError: Cannot convert a BigInt value to a number
```

### 4. Promise.allSettled

```javascript
const promises = [
    fetch('/api/user').then(response => response.json()),
    fetch('/api/posts').then(response => response.json()),
    Promise.reject(new Error('获取评论失败'))
];

// Promise.all 在任何一个 Promise 拒绝时就会拒绝
Promise.all(promises)
    .then(results => {
        console.log('所有请求成功:', results);
    })
    .catch(error => {
        console.error('至少有一个请求失败:', error);
    });

// Promise.allSettled 会等待所有 Promise 完成，无论成功还是失败
Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`请求 ${index + 1} 成功:`, result.value);
            } else {
                console.log(`请求 ${index + 1} 失败:`, result.reason);
            }
        });
        
        // 过滤出成功的结果
        const successfulResults = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
        
        console.log('成功的结果:', successfulResults);
    });
```

### 5. globalThis

```javascript
// 在不同环境中获取全局对象
// 浏览器: window
// Node.js: global
// Web Worker: self

// ES2020 之前
const getGlobalObject = function() {
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    if (typeof self !== 'undefined') return self;
    throw new Error('无法获取全局对象');
};

// ES2020
console.log(globalThis); // 在任何环境中都指向全局对象
```

### 6. 动态导入

```javascript
// 静态导入（始终加载）
import { add } from './math.js';
console.log(add(1, 2));

// 动态导入（按需加载）
async function loadMathModule() {
    if (needMath) {
        const math = await import('./math.js');
        console.log(math.add(1, 2));
        
        // 解构导入
        const { multiply } = await import('./math.js');
        console.log(multiply(3, 4));
    }
}

// 条件导入
const language = navigator.language;
if (language.startsWith('zh')) {
    import('./i18n/zh.js').then(module => {
        setTranslations(module.default);
    });
} else {
    import('./i18n/en.js').then(module => {
        setTranslations(module.default);
    });
}
```

## ES2021 (ES12) 特性

### 1. String.prototype.replaceAll

```javascript
const text = "hello world, hello universe";

// 之前的替换方法
console.log(text.replace("hello", "hi")); // "hi world, hello universe"（只替换第一个匹配）
console.log(text.replace(/hello/g, "hi")); // "hi world, hi universe"（使用正则表达式全局替换）

// 使用 replaceAll
console.log(text.replaceAll("hello", "hi")); // "hi world, hi universe"
console.log(text.replaceAll(",", ";")); // "hello world; hello universe"

// 也可以使用正则表达式
console.log(text.replaceAll(/h\w+/g, "hi")); // "hi world, hi universe"
// 注意：使用正则表达式时必须带有 g 标志
```

### 2. Promise.any

```javascript
const promises = [
    fetch('https://api1.example.com/data').then(response => response.json()),
    fetch('https://api2.example.com/data').then(response => response.json()),
    fetch('https://api3.example.com/data').then(response => response.json())
];

// Promise.any - 返回第一个成功的 Promise
Promise.any(promises)
    .then(firstSuccess => {
        console.log('至少一个 API 成功响应:', firstSuccess);
    })
    .catch(error => {
        // AggregateError 是一个包含所有拒绝原因的错误
        console.error('所有 API 都失败了:', error.errors);
    });

// 与 Promise.race 的区别
// Promise.race - 返回第一个完成的 Promise（无论成功还是失败）
Promise.race(promises)
    .then(firstResult => {
        console.log('第一个完成的 Promise 成功:', firstResult);
    })
    .catch(error => {
        console.error('第一个完成的 Promise 失败:', error);
    });
```

### 3. 逻辑赋值运算符

```javascript
// 逻辑与赋值
let x = 1;
x &&= 2; // 等同于 x = x && 2
console.log(x); // 2

let y = 0;
y &&= 2; // 等同于 y = y && 2
console.log(y); // 0

// 逻辑或赋值
let a = 1;
a ||= 2; // 等同于 a = a || 2
console.log(a); // 1

let b = 0;
b ||= 2; // 等同于 b = b || 2
console.log(b); // 2

// 空值合并赋值
let c = null;
c ??= 2; // 等同于 c = c ?? 2
console.log(c); // 2

let d = 0;
d ??= 2; // 等同于 d = d ?? 2
console.log(d); // 0
```

### 4. 数字分隔符

```javascript
// 使用下划线作为数字分隔符，提高可读性
const billion = 1_000_000_000;
console.log(billion); // 1000000000

const amount = 1_234_567.89;
console.log(amount); // 1234567.89

// 二进制、十六进制等也可以使用
const binary = 0b1010_0001_1000_0101;
console.log(binary); // 41349

const hex = 0xA1_B2_C3;
console.log(hex); // 10602179
```

### 5. WeakRef 和 FinalizationRegistry

```javascript
// WeakRef - 弱引用，不会阻止垃圾回收
let target = { name: "张三" };
const weakRef = new WeakRef(target);

// 获取目标对象（如果尚未被回收）
const obj = weakRef.deref();
if (obj) {
    console.log(obj.name); // "张三"
}

// 清除强引用，使对象可被回收
target = null;

// FinalizationRegistry - 当对象被垃圾回收时获得通知
const registry = new FinalizationRegistry(value => {
    console.log(`对象 ${value} 被回收了`);
});

let user = { name: "李四" };
registry.register(user, "用户对象");

// 清除强引用，使对象可被回收
user = null;
```

## ES2022 (ES13) 特性

### 1. 类字段声明

```javascript
class Person {
    // 公共字段
    name = "张三";
    age = 25;
    
    // 私有字段（使用 # 前缀）
    #ssn = "123-45-6789";
    #password;
    
    // 静态字段
    static count = 0;
    
    // 私有静态字段
    static #instances = [];
    
    constructor(name, password) {
        this.name = name || this.name;
        this.#password = password;
        Person.count++;
        Person.#instances.push(this);
    }
    
    // 公共方法
    getInfo() {
        return `${this.name}, ${this.age}`;
    }
    
    // 私有方法
    #validatePassword(input) {
        return this.#password === input;
    }
    
    // 使用私有方法和字段的公共方法
    checkPassword(input) {
        if (this.#validatePassword(input)) {
            return `密码正确，SSN: ${this.#ssn}`;
        }
        return "密码错误";
    }
    
    // 静态方法
    static getCount() {
        return `创建了 ${this.count} 个实例`;
    }
    
    // 私有静态方法
    static #resetInstances() {
        this.#instances = [];
        this.count = 0;
    }
    
    // 使用私有静态方法的公共静态方法
    static reset() {
        this.#resetInstances();
        return "已重置所有实例";
    }
}

const person = new Person("李四", "secret123");
console.log(person.name); // "李四"
console.log(person.getInfo()); // "李四, 25"
console.log(person.checkPassword("secret123")); // "密码正确，SSN: 123-45-6789"
console.log(Person.count); // 1
console.log(Person.getCount()); // "创建了 1 个实例"
console.log(Person.reset()); // "已重置所有实例"

// 错误：无法访问私有字段和方法
// console.log(person.#ssn); // SyntaxError
// console.log(person.#validatePassword("test")); // SyntaxError
// console.log(Person.#instances); // SyntaxError
// console.log(Person.#resetInstances()); // SyntaxError
```

### 2. 类静态初始化块

```javascript
class MyClass {
    static count = 0;
    static instances = [];
    
    // 静态初始化块
    static {
        console.log("类初始化");
        
        // 可以访问私有静态字段和方法
        this.#privateStaticMethod();
        
        // 可以执行一次性初始化逻辑
        const config = loadConfig();
        this.apiUrl = config.apiUrl;
    }
    
    static #privateValue = 42;
    
    static #privateStaticMethod() {
        console.log("私有静态方法被调用");
        console.log("私有值:", this.#privateValue);
    }
    
    constructor() {
        MyClass.count++;
        MyClass.instances.push(this);
    }
}

// 类定义时，静态初始化块会自动执行
// 输出:
// "类初始化"
// "私有静态方法被调用"
// "私有值: 42"
```

### 3. 顶层 await

```javascript
// ES2022 之前，await 只能在 async 函数内部使用
async function getData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}

// ES2022 允许在模块顶层使用 await（不在函数内部）
// 这段代码可以直接在模块中使用，不需要包装在 async 函数中
const response = await fetch('https://api.example.com/data');
const data = await response.json();
console.log(data);

// 导出前等待数据
const users = await fetchUsers();
export { users };

// 动态依赖
const languages = {
    en: () => import('./i18n/en.js'),
    zh: () => import('./i18n/zh.js')
};

const language = detectLanguage();
const i18n = await languages[language]();
export const translate = i18n.translate;
```

### 4. Object.hasOwn

```javascript
const person = {
    name: "张三",
    age: 25
};

// 检查对象自身是否有指定属性
console.log(Object.hasOwn(person, "name")); // true
console.log(Object.hasOwn(person, "toString")); // false（继承的属性）

// 与 Object.prototype.hasOwnProperty 比较
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("toString")); // false

// Object.hasOwn 更安全，因为它适用于以下情况：
// 1. 对象没有继承 Object.prototype
const obj = Object.create(null);
obj.name = "李四";

// console.log(obj.hasOwnProperty("name")); // 错误：obj.hasOwnProperty 不是函数
console.log(Object.hasOwn(obj, "name")); // true

// 2. hasOwnProperty 被覆盖
const weird = {
    hasOwnProperty: function() {
        return false;
    },
    name: "王五"
};

console.log(weird.hasOwnProperty("name")); // false（被覆盖了）
console.log(Object.hasOwn(weird, "name")); // true（正确结果）
```

### 5. at() 方法

```javascript
const array = [10, 20, 30, 40, 50];

// 使用正索引
console.log(array[0]); // 10
console.log(array.at(0)); // 10

// 使用负索引（从末尾开始计数）
console.log(array[array.length - 1]); // 50（传统方式）
console.log(array.at(-1)); // 50
console.log(array.at(-2)); // 40
console.log(array.at(-3)); // 30

// 字符串也支持 at 方法
const str = "Hello";
console.log(str.at(0)); // "H"
console.log(str.at(-1)); // "o"
```

### 6. 正则表达式匹配索引

```javascript
// 使用 d 标志获取匹配的起始和结束索引
const regex = /\b\w+\b/gd;
const text = "Hello, world!";
const matches = [...text.matchAll(regex)];

for (const match of matches) {
    console.log({
        matched: match[0],
        indices: match.indices[0] // [起始索引, 结束索引]
    });
}
// 输出:
// { matched: "Hello", indices: [0, 5] }
// { matched: "world", indices: [7, 12] }

// 命名捕获组的索引
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/d;
const dateMatch = dateRegex.exec("Date: 2023-08-17");

console.log(dateMatch.indices.groups.year); // [6, 10]
console.log(dateMatch.indices.groups.month); // [11, 13]
console.log(dateMatch.indices.groups.day); // [14, 16]
```

## ES2023 (ES14) 特性

### 1. Array 查找方法增强

```javascript
const array = [1, 2, 3, 4, 5];

// findLast - 从后向前查找满足条件的元素
const lastEven = array.findLast(num => num % 2 === 0);
console.log(lastEven); // 4

// findLastIndex - 从后向前查找满足条件的元素索引
const lastEvenIndex = array.findLastIndex(num => num % 2 === 0);
console.log(lastEvenIndex); // 3

// 与从前向后查找比较
const firstEven = array.find(num => num % 2 === 0);
console.log(firstEven); // 2

const firstEvenIndex = array.findIndex(num => num % 2 === 0);
console.log(firstEvenIndex); // 1
```

### 2. Hashbang 语法

```javascript
#!/usr/bin/env node

// 在 JavaScript 文件的第一行使用 Hashbang 语法
// 这使得 JavaScript 文件可以作为可执行脚本运行
console.log("Hello from executable JavaScript!");

// 在 Unix/Linux 系统中，可以通过以下方式使文件可执行：
// chmod +x script.js
// 然后直接运行：
// ./script.js
```

### 3. Symbols 作为 WeakMap 键

```javascript
// 在 ES2023 之前，WeakMap 只接受对象作为键
const objWeakMap = new WeakMap();
const key = {};
objWeakMap.set(key, "value");
console.log(objWeakMap.get(key)); // "value"

// ES2023 允许使用 Symbol 作为 WeakMap 键，前提是这些 Symbol 是通过 Symbol.for 创建的
const symWeakMap = new WeakMap();
const globalSymbol = Symbol.for("globalSymbol");
symWeakMap.set(globalSymbol, "symbol value");
console.log(symWeakMap.get(globalSymbol)); // "symbol value"

// 普通 Symbol 仍然不能用作 WeakMap 键
const regularSymbol = Symbol("regular");
// symWeakMap.set(regularSymbol, "won't work"); // TypeError
```

## 最佳实践

### 1. 使用现代语法

```javascript
// 使用解构赋值
const { name, age } = person;

// 使用扩展运算符
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProp: value };

// 使用箭头函数
const doubled = numbers.map(n => n * 2);

// 使用模板字符串
const greeting = `你好，${name}！`;

// 使用可选链和空值合并
const city = user?.address?.city ?? "未知";
```

### 2. 使用 const 和 let 替代 var

```javascript
// 不推荐
var x = 10;
var y = 20;

// 推荐
const x = 10; // 不会重新赋值的变量
let y = 20; // 可能会重新赋值的变量
```

### 3. 使用异步/等待替代回调和 Promise 链

```javascript
// 不推荐
fetchData()
    .then(data => processData(data))
    .then(result => saveResult(result))
    .catch(error => handleError(error));

// 推荐
async function handleData() {
    try {
        const data = await fetchData();
        const result = await processData(data);
        await saveResult(result);
# ES6+ 特性

ECMAScript 6（也称为 ES6 或 ES2015）是 JavaScript 语言的一个重要版本，引入了许多新特性和语法改进。自 ES6 发布以来，JavaScript 每年都会发布新版本（ES2016、ES2017 等），带来更多新特性。本文将系统介绍 ES6 及后续版本中的重要特性和最佳实践。

## ES6 (ES2015) 核心特性

### 1. let 和 const 声明

ES6 引入了 `let` 和 `const` 两种新的变量声明方式，它们提供了比 `var` 更好的作用域控制。

```javascript
// let - 块级作用域变量
let x = 10;
if (true) {
    let x = 20; // 不同的变量
    console.log(x); // 20
}
console.log(x); // 10

// const - 声明常量（不可重新赋值）
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

// const 对象的属性可以修改
const person = { name: "张三" };
person.name = "李四"; // 有效
// person = {}; // TypeError: Assignment to constant variable
```

**最佳实践**：
- 默认使用 `const`，只有在需要重新赋值时才使用 `let`
- 避免使用 `var`
- 常量名使用全大写，单词间用下划线分隔

### 2. 箭头函数

箭头函数提供了一种更简洁的函数语法，并且不绑定自己的 `this`、`arguments`、`super` 或 `new.target`。

```javascript
// 基本语法
const add = (a, b) => a + b;

// 等价于
const add2 = function(a, b) {
    return a + b;
};

// 单个参数可以省略括号
const double = n => n * 2;

// 无参数需要空括号
const sayHello = () => "你好";

// 多行函数体需要大括号和 return
const calculate = (a, b) => {
    const sum = a + b;
    return sum * 2;
};

// this 绑定
const counter = {
    count: 0,
    
    // 箭头函数不绑定自己的 this
    increment: () => {
        this.count++; // this 指向全局对象，而不是 counter
    },
    
    // 传统函数绑定自己的 this
    decrement: function() {
        this.count--; // this 指向 counter
    }
};
```

**最佳实践**：
- 使用箭头函数作为回调函数和匿名函数
- 避免在对象方法和构造函数中使用箭头函数
- 利用箭头函数简化代码，特别是在链式调用中

### 3. 模板字符串

模板字符串（使用反引号 `` ` `` 包裹）提供了更灵活的字符串拼接方式，支持多行字符串和字符串插值。

```javascript
// 字符串插值
const name = "张三";
const age = 25;
const greeting = `你好，我是${name}，今年${age}岁。`;

// 多行字符串
const multiLine = `这是第一行
这是第二行
这是第三行`;

// 表达式插值
const price = 19.99;
const tax = 0.07;
const total = `总价: ¥${(price * (1 + tax)).toFixed(2)}`;

// 带标签的模板字符串
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

const name2 = "李四";
const age2 = 30;
const highlightedText = highlight`我叫${name2}，今年${age2}岁。`;
// "我叫<strong>李四</strong>，今年<strong>30</strong>岁。"
```

**最佳实践**：
- 使用模板字符串替代字符串拼接
- 利用多行字符串功能提高代码可读性
- 在需要复杂字符串处理时使用标签模板

### 4. 解构赋值

解构赋值允许从数组或对象中提取值，并赋给变量，使代码更简洁。

```javascript
// 数组解构
const numbers = [1, 2, 3, 4, 5];

// 基本解构
const [first, second] = numbers;
console.log(first, second); // 1 2

// 跳过元素
const [a, , c] = numbers;
console.log(a, c); // 1 3

// 剩余模式
const [head, ...tail] = numbers;
console.log(head, tail); // 1 [2, 3, 4, 5]

// 默认值
const [x, y, z = 10] = [1, 2];
console.log(x, y, z); // 1 2 10

// 交换变量
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2 1

// 对象解构
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    address: {
        street: "朝阳区",
        zipCode: "100000"
    }
};

// 基本解构
const { name, age } = person;
console.log(name, age); // "张三" 25

// 重命名
const { name: fullName, age: years } = person;
console.log(fullName, years); // "张三" 25

// 默认值
const { country = "中国" } = person;
console.log(country); // "中国"

// 嵌套解构
const { address: { street } } = person;
console.log(street); // "朝阳区"

// 剩余模式
const { name: personName, ...rest } = person;
console.log(personName, rest); // "张三" { age: 25, city: "北京", address: {...} }
```

**最佳实践**：
- 使用解构简化函数参数处理
- 从导入的模块中解构需要的部分
- 使用解构返回多个值
- 使用默认值处理可能缺失的属性

### 5. 默认参数和剩余参数

ES6 允许为函数参数设置默认值，并使用剩余参数语法处理不定数量的参数。

```javascript
// 默认参数
function greet(name = "访客", greeting = "你好") {
    return `${greeting}，${name}！`;
}

console.log(greet()); // "你好，访客！"
console.log(greet("张三")); // "你好，张三！"
console.log(greet("李四", "欢迎")); // "欢迎，李四！"

// 剩余参数
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 结合使用
function createTeam(leader, deputy, ...members) {
    return {
        leader,
        deputy,
        members,
        size: members.length + 2
    };
}

const team = createTeam("张三", "李四", "王五", "赵六", "钱七");
console.log(team);
// { leader: "张三", deputy: "李四", members: ["王五", "赵六", "钱七"], size: 5 }
```

**最佳实践**：
- 为可选参数提供合理的默认值
- 使用剩余参数替代 arguments 对象
- 将必选参数放在前面，可选参数（带默认值）放在后面

### 6. 扩展运算符

扩展运算符（`...`）可以在函数调用、数组字面量或对象字面量中展开可迭代对象。

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 复制数组
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3]
console.log(copy); // [1, 2, 3, 4]

// 函数参数展开
function add(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6

// 对象展开 (ES2018)
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }

// 结合解构和展开
const { a, ...rest } = merged;
console.log(a, rest); // 1 { b: 3, c: 4 }
```

**最佳实践**：
- 使用扩展运算符合并数组和对象
- 使用扩展运算符创建对象或数组的浅拷贝
- 结合解构和扩展运算符提取和重组数据

### 7. 类语法

ES6 引入了类语法，使基于原型的面向对象编程更加直观和易用。

```javascript
// 基本类语法
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    sayHello() {
        return `你好，我是${this.name}，今年${this.age}岁。`;
    }
    
    // 静态方法
    static createAnonymous() {
        return new Person("匿名", 0);
    }
}

const person = new Person("张三", 25);
console.log(person.sayHello()); // "你好，我是张三，今年25岁。"

const anonymous = Person.createAnonymous();
console.log(anonymous.name); // "匿名"

// 继承
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // 调用父类构造函数
        this.grade = grade;
    }
    
    study() {
        return `${this.name}正在学习。`;
    }
    
    // 重写父类方法
    sayHello() {
        return `${super.sayHello()} 我是${this.grade}年级的学生。`;
    }
}

const student = new Student("李四", 15, "初三");
console.log(student.sayHello()); // "你好，我是李四，今年15岁。 我是初三年级的学生。"
console.log(student.study()); // "李四正在学习。"
```

**最佳实践**：
- 使用类语法替代传统的构造函数和原型
- 使用 `extends` 实现继承
- 使用 `super` 调用父类方法
- 使用静态方法实现工厂模式和辅助功能

### 8. 模块系统

ES6 引入了标准的模块系统，使用 `import` 和 `export` 关键字导入和导出模块。

```javascript
// math.js
// 命名导出
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export const PI = 3.14159;

// 默认导出
export default class Calculator {
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error("除数不能为零");
        return a / b;
    }
}
```

```javascript
// main.js
// 导入默认导出和命名导出
import Calculator, { add, subtract, PI } from './math.js';

console.log(add(5, 3));        // 8
console.log(subtract(5, 3));    // 2
console.log(PI);               // 3.14159

const calc = new Calculator();
console.log(calc.multiply(5, 3));  // 15
console.log(calc.divide(6, 2));    // 3

// 导入所有命名导出
import * as math from './math.js';
console.log(math.add(5, 3));    // 8
console.log(math.PI);           // 3.14159

// 重命名导入
import { add as sum, subtract as minus } from './math.js';
console.log(sum(5, 3));        // 8
console.log(minus(5, 3));      // 2

// 动态导入 (ES2020)
async function loadMath() {
    const math = await import('./math.js');
    return math.add(5, 3);
}
```

**最佳实践**：
- 每个文件作为一个模块，专注于单一功能
- 使用命名导出提供多个相关功能
- 使用默认导出提供主要功能
- 使用动态导入实现代码分割和按需加载

### 9. Promise

Promise 是异步编程的一种解决方案，比传统的回调函数更加强大和灵活。

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve("操作成功");
        } else {
            reject(new Error("操作失败"));
        }
    }, 1000);
});

// 使用 Promise
promise
    .then(result => {
        console.log(result); // "操作成功"
        return result.toUpperCase();
    })
    .then(upperResult => {
        console.log(upperResult); // "操作成功"
    })
    .catch(error => {
        console.error(error.message); // "操作失败"
    })
    .finally(() => {
        console.log("操作完成");
    });

// Promise.all - 所有 Promise 都成功时才成功
Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
])
.then(([usersResponse, postsResponse, commentsResponse]) => {
    // 处理所有响应
})
.catch(error => {
    // 任何一个请求失败都会执行
    console.error("至少有一个请求失败:", error);
});

// Promise.race - 返回最先完成的 Promise 结果
Promise.race([
    fetch('/api/data'),
    new Promise((_, reject) => setTimeout(() => reject(new Error("请求超时")), 5000))
])
.then(response => {
    // 处理响应
})
.catch(error => {
    console.error("请求失败或超时:", error);
});
```

**最佳实践**：
- 使用 Promise 替代回调函数处理异步操作
- 使用 Promise 链处理连续的异步操作
- 使用 `Promise.all` 并行处理多个异步操作
- 使用 `Promise.race` 实现超时处理

### 10. Symbol

Symbol 是一种新的原始数据类型，表示唯一的标识符。

```javascript
// 创建 Symbol
const sym1 = Symbol();
const sym2 = Symbol("描述");
const sym3 = Symbol("描述");

console.log(sym2 === sym3); // false，每个 Symbol 都是唯一的

// 作为对象属性
const obj = {
    [sym1]: "值1",
    [sym2]: "值2"
};

console.log(obj[sym1]); // "值1"
console.log(Object.keys(obj)); // []，Symbol 属性不会出现在这里

// 全局 Symbol
const globalSym1 = Symbol.for("全局键");
const globalSym2 = Symbol.for("全局键");

console.log(globalSym1 === globalSym2); // true，相同键的全局 Symbol 是相同的

// 内置 Symbol
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // 数组的迭代器方法

// 自定义迭代器
const range = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;
        
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}
```

**最佳实践**：
- 使用 Symbol 作为对象的唯一属性键
- 使用 Symbol 实现私有属性（虽然不是真正的私有）
- 使用内置 Symbol 自定义对象行为（如迭代器）
- 使用 `Symbol.for` 在代码不同部分共享 Symbol

### 11. Map 和 Set

ES6 引入了 Map 和 Set 两种新的数据结构，提供了比普通对象和数组更丰富的功能。

```javascript
// Map - 键值对集合，键可以是任何类型
const map = new Map();

// 添加键值对
map.set("name", "张三");
map.set(42, "数字键");
map.set(true, "布尔键");

const obj = { id: 1 };
map.set(obj, "对象键");

// 获取值
console.log(map.get("name")); // "张三"
console.log(map.get(obj)); // "对象键"

// 检查键是否存在
console.log(map.has(true)); // true
console.log(map.has("age")); // false

// 删除键值对
map.delete(42);

// 获取大小
console.log(map.size); // 3

// 遍历 Map
for (const [key, value] of map) {
    console.log(key, value);
}

// Map 构造函数可以接受键值对数组
const mapFromArray = new Map([
    ["name", "李四"],
    ["age", 25],
    ["city", "北京"]
]);

// Set - 唯一值的集合
const set = new Set();

// 添加值
set.add(1);
set.add("文本");
set.add({ id: 1 });
set.add(1); // 重复值会被忽略

// 检查值是否存在
console.log(set.has(1)); // true
console.log(set.has(2)); // false

// 删除值
set.delete("文本");

// 获取大小
console.log(set.size); // 2

// 遍历 Set
for (const value of set) {
    console.log(value);
}

// Set 构造函数可以接受可迭代对象
const setFromArray = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log([...setFromArray]); // [1, 2, 3, 4, 5]，自动去重
```

**最佳实践**：
- 使用 Map 替代对象，当键不是字符串或需要保持插入顺序时
- 使用 Set 存储唯一值集合和实现快速查找
- 利用 Set 去除数组中的重复元素
- 使用 Map 和 Set 的方法（如 `has`、`delete`）而不是自己实现

### 12. 迭代器和生成器

ES6 引入了迭代器和生成器，使遍历数据结构更加灵活和强大。

```javascript
// 迭代器 - 实现了 next() 方法的对象
function createIterator(array) {
    let index = 0;
    
    return {
        next() {
            if (index < array.length) {
                return { value: array[index++], done: false };
            } else {
                return { done: true };
            }
        }
    };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }

// 可迭代对象 - 实现了 Symbol.iterator 方法的对象
const iterable = {
    items: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        const items = this.items;
        
        return {
            next() {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (const item of iterable) {
    console.log(item); // 1, 2, 3
}

// 生成器函数 - 使用 function* 语法，可以使用 yield 暂停执行
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = simpleGenerator();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

// 生成器函数可以接收参数
function* twoWayGenerator() {
    const a = yield 1;
    const b = yield a + 2;
    yield b + 3;
}

const twoWay = twoWayGenerator();
console.log(twoWay.next()); // { value: 1, done: false }
console.log(twoWay.next(10)); // { value: 12, done: false }，a = 10
console.log(twoWay.next(20)); // { value: 23, done: false }，b = 20
console.log(twoWay.next()); // { value: undefined, done: true }

// 使用生成器实现无限序列
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
```

**最佳实践**：
- 使用生成器函数简化迭代器的创建
- 使用 `yield` 实现惰性计算和无限序列
- 使用生成器处理异步操作（结合 Promise）
- 实现自定义数据结构的迭代接口

## ES2016 (ES7) 特性

### 1. 指数运算符

```javascript
// 指数运算符 (**)
console.log(2 ** 3); // 8，等同于 Math.pow(2, 3)

// 可以与赋值运算符结合
let num = 2;
num **= 3;
console.log(num); // 8
```

### 2. Array.prototype.includes

```javascript
const array = [1, 2, 3, NaN, 4, 5];

// 检查数组是否包含某个元素
console.log(array.includes(3)); // true
console.log(array.includes(6)); // false

// 可以处理 NaN（而 indexOf 不行）
console.log(array.includes(NaN)); // true
console.log(array.indexOf(NaN) !== -1); // false

// 可以指定开始搜索的位置
console.log(array.includes(1, 2)); // false，从索引 2 开始搜索
```

## ES2017 (ES8) 特性

### 1. async/await

```javascript
// 使用 Promise
function fetchData() {
    return fetch('https://api.example.com/data')
        .then(response => response.json());
}

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// 使用 async/await
async function fetchDataAsync() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// async 函数总是返回 Promise
fetchDataAsync().then(data => {
    console.log('处理返回的数据:', data);
});
```

### 2. Object.values 和 Object.entries

```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京"
};

// Object.values 返回对象自身可枚举属性的值数组
console.log(Object.values(person)); // ["张三", 25, "北京"]

// Object.entries 返回对象自身可枚举属性的键值对数组
console.log(Object.entries(person)); // [["name", "张三"], ["age", 25], ["city", "北京"]]

// 结合 for...of 遍历对象
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// 将对象转换为 Map
const personMap = new Map(Object.entries(person));
console.log(personMap.get("name")); // "张三"
```

### 3. String padding

```javascript
// padStart - 在字符串开头填充
console.log("5".padStart(3, "0")); // "005"
console.log("hello".padStart(10, ".")); // ".....hello"

// padEnd - 在字符串结尾填充
console.log("5".padEnd(3, "0")); // "500"
console.log("hello".padEnd(10, ".")); // "hello....."

// 应用场景：格式化数字、对齐文本等
const numbers = [5, 42, 7, 123];
const formatted = numbers.map(num => num.toString().padStart(3, "0"));
console.log(formatted); // ["005", "042", "007", "123"]
```

### 4. Object.getOwnPropertyDescriptors

```javascript
const person = {
    name: "张三",
    get fullName() {
        return `${this.name}先生`;
    }
};

// 获取对象所有属性的描述符
const descriptors = Object.getOwnPropertyDescriptors(person);
console.log(descriptors.name);
// { value: "张三", writable: true, enumerable: true, configurable: true }

console.log(descriptors.fullName);
// { get: [Function: get fullName], set: undefined, enumerable: true, configurable: true }

// 用于创建对象的浅拷贝，包括 getter 和 setter
const personCopy = Object.defineProperties({}, Object.getOwnPropertyDescriptors(person));
console.log(personCopy.fullName); // "张三先生"
```

## ES2018 (ES9) 特性

### 1. 对象的扩展运算符

```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    country: "中国"
};

// 对象的扩展运算符（解构）
const { name, age, ...rest } = person;
console.log(name, age); // "张三" 25
console.log(rest); // { city: "北京", country: "中国" }

// 对象的扩展运算符（合并）
const personWithJob = {
    ...person,
    job: "工程师",
    city: "上海" // 覆盖原有属性
};

console.log(personWithJob);
// { name: "张三", age: 25, city: "上海", country: "中国", job: "工程师" }
```

### 2. Promise.finally

```javascript
function fetchData() {
    showLoadingIndicator();
    
    return fetch('https://api.example.com/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            console.log('获取的数据:', data);
            return data;
        })
        .catch(error => {
            console.error('获取数据失败:', error);
            throw error;
        })
        .finally(() => {
            // 无论成功还是失败，都会执行
            hideLoadingIndicator();
        });
}

// 使用 async/await 和 finally
async function fetchDataAsync() {
    showLoadingIndicator();
    
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        const data = await response.json();
        console.log('获取的数据:', data);
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
        throw error;
    } finally {
        // 无论成功还是失败，都会执行
        hideLoadingIndicator();
    }
}
```
