# JavaScript 基础

JavaScript 是一种轻量级的、解释型的、面向对象的编程语言，是 Web 开发的三大核心技术之一（HTML、CSS 和 JavaScript）。本文将系统介绍 JavaScript 的基础知识和最佳实践。

## JavaScript 简介

JavaScript 最初由 Netscape 的 Brendan Eich 在 1995 年开发，目的是为网页添加交互性。如今，JavaScript 已经发展成为一种功能强大的编程语言，不仅可以在浏览器中运行，还可以在服务器端（Node.js）和其他环境中运行。

### JavaScript 的特点

- **解释型语言**：不需要编译，直接由浏览器解释执行
- **动态类型**：变量的类型在运行时确定
- **面向对象**：基于原型的面向对象编程
- **函数式编程**：函数是一等公民
- **事件驱动**：通过事件处理用户交互
- **单线程执行**：JavaScript 在浏览器中是单线程执行的

## JavaScript 基本语法

### 1. 变量声明

JavaScript 提供三种声明变量的方式：`var`、`let` 和 `const`。

```javascript
// var - 函数作用域，可以重复声明，可以在声明前使用（变量提升）
var name = "张三";
var age = 25;

// let - 块级作用域，不可重复声明，不可在声明前使用
let city = "北京";
let country = "中国";

// const - 块级作用域，声明常量，必须初始化，不可重新赋值
const PI = 3.14159;
const MAX_SIZE = 100;
```

**最佳实践**：
- 优先使用 `const`，其次是 `let`，避免使用 `var`
- 变量名使用驼峰命名法（camelCase）
- 常量名使用全大写，单词间用下划线分隔（SNAKE_CASE）

### 2. 数据类型

JavaScript 有七种基本数据类型：

```javascript
// 原始类型
let name = "张三";       // String
let age = 25;           // Number
let isStudent = true;   // Boolean
let nothing = null;     // Null
let notDefined;         // Undefined
let uniqueId = Symbol("id"); // Symbol (ES6)
let bigNumber = 9007199254740991n; // BigInt (ES2020)

// 引用类型
let person = { name: "张三", age: 25 }; // Object
let numbers = [1, 2, 3, 4, 5];         // Array (特殊的对象)
let sayHello = function() { console.log("你好"); }; // Function (特殊的对象)
```

**类型检查**：

```javascript
// typeof 操作符
typeof "张三";    // "string"
typeof 25;       // "number"
typeof true;     // "boolean"
typeof undefined; // "undefined"
typeof null;     // "object" (这是一个历史遗留的错误)
typeof Symbol("id"); // "symbol"
typeof 9007199254740991n; // "bigint"
typeof {};       // "object"
typeof [];       // "object"
typeof function(){}; // "function"

// instanceof 操作符 (检查对象是否是某个构造函数的实例)
[] instanceof Array;  // true
{} instanceof Object; // true

// Array.isArray() (专门用于检查数组)
Array.isArray([]);    // true
Array.isArray({});    // false
```

### 3. 运算符

**算术运算符**：

```javascript
let a = 10;
let b = 3;

console.log(a + b);  // 13 (加法)
console.log(a - b);  // 7 (减法)
console.log(a * b);  // 30 (乘法)
console.log(a / b);  // 3.3333... (除法)
console.log(a % b);  // 1 (取余)
console.log(a ** b); // 1000 (幂运算，ES2016)

// 自增和自减
let c = 5;
console.log(c++);    // 5 (后置自增，先返回再加1)
console.log(++c);    // 7 (前置自增，先加1再返回)
console.log(c--);    // 7 (后置自减，先返回再减1)
console.log(--c);    // 5 (前置自减，先减1再返回)
```

**比较运算符**：

```javascript
let a = 10;
let b = "10";

console.log(a == b);   // true (相等，会进行类型转换)
console.log(a === b);  // false (严格相等，不进行类型转换)
console.log(a != b);   // false (不相等)
console.log(a !== b);  // true (严格不相等)
console.log(a > 5);    // true (大于)
console.log(a < 20);   // true (小于)
console.log(a >= 10);  // true (大于等于)
console.log(a <= 10);  // true (小于等于)
```

**逻辑运算符**：

```javascript
let a = true;
let b = false;

console.log(a && b);  // false (逻辑与)
console.log(a || b);  // true (逻辑或)
console.log(!a);      // false (逻辑非)

// 短路求值
console.log(true && "Hello");  // "Hello"
console.log(false && "Hello"); // false
console.log(true || "Hello");  // true
console.log(false || "Hello"); // "Hello"

// 空值合并运算符 (??) - ES2020
let name = null;
console.log(name ?? "未知");  // "未知"
```

**赋值运算符**：

```javascript
let a = 10;

a += 5;  // 等同于 a = a + 5
a -= 3;  // 等同于 a = a - 3
a *= 2;  // 等同于 a = a * 2
a /= 4;  // 等同于 a = a / 4
a %= 3;  // 等同于 a = a % 3
a **= 2; // 等同于 a = a ** 2
```

**条件（三元）运算符**：

```javascript
let age = 20;
let status = age >= 18 ? "成年" : "未成年";
console.log(status);  // "成年"
```

**位运算符**：

```javascript
let a = 5;  // 二进制: 101
let b = 3;  // 二进制: 011

console.log(a & b);   // 1 (按位与)
console.log(a | b);   // 7 (按位或)
console.log(a ^ b);   // 6 (按位异或)
console.log(~a);      // -6 (按位非)
console.log(a << 1);  // 10 (左移)
console.log(a >> 1);  // 2 (右移)
console.log(a >>> 1); // 2 (无符号右移)
```

### 4. 控制流

**条件语句**：

```javascript
// if 语句
let age = 20;

if (age >= 18) {
    console.log("成年人");
} else if (age >= 12) {
    console.log("青少年");
} else {
    console.log("儿童");
}

// switch 语句
let day = 2;
let dayName;

switch (day) {
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    case 3:
        dayName = "星期三";
        break;
    default:
        dayName = "其他日子";
}

console.log(dayName);  // "星期二"
```

**循环语句**：

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// while 循环
let i = 0;
while (i < 5) {
    console.log(i);  // 0, 1, 2, 3, 4
    i++;
}

// do-while 循环
let j = 0;
do {
    console.log(j);  // 0, 1, 2, 3, 4
    j++;
} while (j < 5);

// for...in 循环 (遍历对象的可枚举属性)
let person = { name: "张三", age: 25, city: "北京" };
for (let key in person) {
    console.log(key + ": " + person[key]);
}

// for...of 循环 (遍历可迭代对象)
let numbers = [1, 2, 3, 4, 5];
for (let num of numbers) {
    console.log(num);  // 1, 2, 3, 4, 5
}
```

**跳转语句**：

```javascript
// break 语句 (跳出循环)
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;
    }
    console.log(i);  // 0, 1, 2, 3, 4
}

// continue 语句 (跳过当前迭代)
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue;
    }
    console.log(i);  // 0, 1, 3, 4
}
```

### 5. 函数

**函数声明**：

```javascript
// 函数声明
function greet(name) {
    return "你好，" + name + "！";
}

console.log(greet("张三"));  // "你好，张三！"

// 函数表达式
const sayHello = function(name) {
    return "你好，" + name + "！";
};

console.log(sayHello("李四"));  // "你好，李四！"

// 箭头函数 (ES6)
const welcome = (name) => {
    return "欢迎，" + name + "！";
};

// 简化的箭头函数 (单一表达式)
const welcome2 = name => "欢迎，" + name + "！";

console.log(welcome("王五"));   // "欢迎，王五！"
console.log(welcome2("赵六"));  // "欢迎，赵六！"
```

**参数处理**：

```javascript
// 默认参数 (ES6)
function greet(name = "访客") {
    return "你好，" + name + "！";
}

console.log(greet());        // "你好，访客！"
console.log(greet("张三"));  // "你好，张三！"

// 剩余参数 (ES6)
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15

// 参数解构 (ES6)
function printPerson({ name, age }) {
    console.log(`${name} 今年 ${age} 岁`);
}

printPerson({ name: "张三", age: 25 });  // "张三 今年 25 岁"
```

**作用域和闭包**：

```javascript
// 全局作用域
let globalVar = "我是全局变量";

function outerFunction() {
    // 函数作用域
    let outerVar = "我是外部函数变量";
    
    function innerFunction() {
        // 内部函数作用域
        let innerVar = "我是内部函数变量";
        console.log(globalVar);  // 可以访问全局变量
        console.log(outerVar);   // 可以访问外部函数变量
        console.log(innerVar);   // 可以访问内部函数变量
    }
    
    innerFunction();
    // console.log(innerVar);  // 错误：无法访问内部函数变量
}

outerFunction();
// console.log(outerVar);  // 错误：无法访问函数内部变量

// 闭包示例
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
```

**立即执行函数表达式 (IIFE)**：

```javascript
(function() {
    let privateVar = "私有变量";
    console.log("IIFE 执行了");
})();

// console.log(privateVar);  // 错误：无法访问 IIFE 内部变量
```

### 6. 对象

**对象字面量**：

```javascript
// 创建对象
let person = {
    name: "张三",
    age: 25,
    city: "北京",
    greet: function() {
        return "你好，我是" + this.name;
    }
};

// 访问属性
console.log(person.name);      // "张三"
console.log(person["age"]);    // 25

// 修改属性
person.age = 26;
person["city"] = "上海";

// 添加属性
person.job = "工程师";

// 删除属性
delete person.city;

// 方法简写 (ES6)
let person2 = {
    name: "李四",
    greet() {
        return "你好，我是" + this.name;
    }
};

console.log(person2.greet());  // "你好，我是李四"

// 计算属性名 (ES6)
const propName = "job";
let person3 = {
    name: "王五",
    [propName]: "医生"
};

console.log(person3.job);  // "医生"
```

**对象解构**：

```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    job: "工程师"
};

// 基本解构
const { name, age } = person;
console.log(name, age);  // "张三" 25

// 重命名
const { name: fullName, job: profession } = person;
console.log(fullName, profession);  // "张三" "工程师"

// 默认值
const { country = "中国" } = person;
console.log(country);  // "中国"

// 嵌套解构
const user = {
    id: 1,
    name: "张三",
    address: {
        city: "北京",
        street: "朝阳区"
    }
};

const { address: { city } } = user;
console.log(city);  // "北京"
```

**对象方法**：

```javascript
// Object.keys() - 返回对象自身可枚举属性的键名数组
const person = { name: "张三", age: 25, city: "北京" };
console.log(Object.keys(person));  // ["name", "age", "city"]

// Object.values() - 返回对象自身可枚举属性的值数组
console.log(Object.values(person));  // ["张三", 25, "北京"]

// Object.entries() - 返回对象自身可枚举属性的键值对数组
console.log(Object.entries(person));  // [["name", "张三"], ["age", 25], ["city", "北京"]]

// Object.assign() - 合并对象
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log(result);  // { a: 1, b: 3, c: 4 }
console.log(target);  // { a: 1, b: 3, c: 4 } (target 被修改)

// 对象展开运算符 (ES9)
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged);  // { a: 1, b: 3, c: 4 }
```

### 7. 数组

**数组创建和访问**：

```javascript
// 创建数组
let fruits = ["苹果", "香蕉", "橙子"];
let numbers = new Array(1, 2, 3, 4, 5);

// 访问元素
console.log(fruits[0]);  // "苹果"
console.log(fruits[1]);  // "香蕉"

// 修改元素
fruits[1] = "梨子";
console.log(fruits);  // ["苹果", "梨子", "橙子"]

// 数组长度
console.log(fruits.length);  // 3

// 添加元素
fruits.push("葡萄");         // 在末尾添加
fruits.unshift("草莓");      // 在开头添加
console.log(fruits);  // ["草莓", "苹果", "梨子", "橙子", "葡萄"]

// 删除元素
fruits.pop();               // 删除末尾元素
fruits.shift();             // 删除开头元素
console.log(fruits);  // ["苹果", "梨子", "橙子"]

// 在指定位置添加/删除元素
fruits.splice(1, 1, "香蕉", "芒果");  // 从索引1开始，删除1个元素，然后添加"香蕉"和"芒果"
console.log(fruits);  // ["苹果", "香蕉", "芒果", "橙子"]
```

**数组解构**：

```javascript
const numbers = [1, 2, 3, 4, 5];

// 基本解构
const [first, second] = numbers;
console.log(first, second);  // 1 2

// 跳过元素
const [a, , c] = numbers;
console.log(a, c);  // 1 3

// 剩余模式
const [head, ...tail] = numbers;
console.log(head, tail);  // 1 [2, 3, 4, 5]

// 默认值
const [x, y, z = 10] = [1, 2];
console.log(x, y, z);  // 1 2 10

// 交换变量
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n);  // 2 1
```

**数组方法**：

```javascript
const numbers = [1, 2, 3, 4, 5];
const fruits = ["苹果", "香蕉", "橙子"];

// forEach - 遍历数组
numbers.forEach((num, index) => {
    console.log(`索引 ${index}: ${num}`);
});

// map - 映射数组
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter - 过滤数组
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4]

// find - 查找元素
const found = numbers.find(num => num > 3);
console.log(found);  // 4

// findIndex - 查找元素索引
const foundIndex = numbers.findIndex(num => num > 3);
console.log(foundIndex);  // 3

// some - 检查是否至少有一个元素满足条件
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);  // true

// every - 检查是否所有元素都满足条件
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven);  // false

// reduce - 累加器
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // 15

// sort - 排序
const sorted = [...numbers].sort((a, b) => b - a);  // 降序
console.log(sorted);  // [5, 4, 3, 2, 1]

// join - 连接数组元素
const joined = fruits.join(", ");
console.log(joined);  // "苹果, 香蕉, 橙子"

// includes - 检查数组是否包含某个元素
console.log(fruits.includes("香蕉"));  // true
console.log(fruits.includes("葡萄"));  // false

// flat - 扁平化嵌套数组
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());      // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));     // [1, 2, 3, 4, 5, 6]

// flatMap - 映射并扁平化
const sentences = ["Hello world", "How are you"];
const words = sentences.flatMap(sentence => sentence.split(" "));
console.log(words);  // ["Hello", "world", "How", "are", "you"]
```

### 8. 字符串

**字符串创建和访问**：

```javascript
// 创建字符串
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello World`;  // 模板字符串 (ES6)

// 访问字符
console.log(str1[0]);      // "H"
console.log(str1.charAt(1));  // "e"

// 字符串长度
console.log(str1.length);  // 5
```

**字符串方法**：

```javascript
const str = "Hello, World!";

// 查找子字符串
console.log(str.indexOf("World"));    // 7
console.log(str.includes("Hello"));   // true
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!"));       // true

// 提取子字符串
console.log(str.slice(7, 12));        // "World"
console.log(str.substring(7, 12));    // "World"
console.log(str.substr(7, 5));        // "World" (不推荐使用)

// 大小写转换
console.log(str.toUpperCase());       // "HELLO, WORLD!"
console.log(str.toLowerCase());       // "hello, world!"

// 去除空白
const padded = "  Hello  ";
console.log(padded.trim());           // "Hello"
console.log(padded.trimStart());      // "Hello  "
console.log(padded.trimEnd());        // "  Hello"

// 替换
console.log(str.replace("World", "JavaScript"));  // "Hello, JavaScript!"
console.log(str.replaceAll("l", "L"));           // "HeLLo, WorLd!"

// 分割
console.log(str.split(", "));         // ["Hello", "World!"]

// 重复
console.log("abc".repeat(3));         // "abcabcabc"

// 填充
console.log("5".padStart(3, "0"));    // "005"
console.log("5".padEnd(3, "0"));      // "500"
```

**模板字符串**：

```javascript
const name = "张三";
const age = 25;

// 字符串插值
const greeting = `你好，我是${name}，今年${age}岁。`;
console.log(greeting);  // "你好，我是张三，今年25岁。"

// 多行字符串
const multiLine = `这是第一行
这是第二行
这是第三行`;
console.log(multiLine);

// 带表达式的模板字符串
const price = 19.99;
const tax = 0.07;
const total = `总价: $${(price * (1 + tax)).toFixed(2)}`;
console.log(total);  // "总价: $21.39"

// 带标签的模板字符串
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

const name2 = "李四";
const age2 = 30;
const highlightedText = highlight`我叫${name2}，今年${age2}岁。`;
console.log(highlightedText);  // "我叫<strong>李四</strong>，今年<strong>30</strong>岁。"
```

## 错误处理

### try...catch 语句

```javascript
try {
    // 可能会抛出错误的代码
    const result = someUndefinedFunction();
    console.log(result);
} catch (error) {
    // 处理错误
    console.error("发生错误:", error.message);
} finally {
    // 无论是否发生错误都会执行
    console.log("清理工作");
}
```

### 抛出自定义错误

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("除数不能为零");
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (error) {
    console.error(error.message);  // "除数不能为零"
}
```

### 错误类型

```javascript
// 常见的错误类型
try {
    // ReferenceError
    console.log(undefinedVariable);
} catch (error) {
    console.log(error instanceof ReferenceError);  // true
    console.log(error.message);  // "undefinedVariable is not defined"
}

try {
    // TypeError
    null.toString();
} catch (error) {
    console.log(error instanceof TypeError);  // true
    console.log(error.message);  // "Cannot read property 'toString' of null"
}

try {
    // SyntaxError
    eval("if (true) {");
} catch (error) {
    console.log(error instanceof SyntaxError);  // true
    console.log(error.message);  // "Unexpected end of input"
}
```

## JavaScript 中的异步编程

### 回调函数

```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "张三", age: 25 };
        callback(null, data);
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error("发生错误:", error);
    } else {
        console.log("获取数据:", data);
    }
});
```

### Promise

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                const data = { name: "张三", age: 25 };
                resolve(data);
            } else {
                reject(new Error("获取数据失败"));
            }
        }, 1000);
    });
}

fetchData()
    .then(data => {
        console.log("获取数据:", data);
        return data.name;
    })
    .then(name => {
        console.log("用户名:", name);
    })
    .catch(error => {
        console.error("发生错误:", error.message);
    })
    .finally(() => {
        console.log("操作完成");
    });
```

### async/await

```javascript
async function getData() {
    try {
        const data = await fetchData();
        console.log("获取数据:", data);
        
        const name = data.name;
        console.log("用户名:", name);
        
        return name;
    } catch (error) {
        console.error("发生错误:", error.message);
    } finally {
        console.log("操作完成");
    }
}

getData().then(result => {
    console.log("最终结果:", result);
});
```

## JavaScript 模块化

### ES6 模块

```javascript
// math.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export const PI = 3.14159;

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
import Calculator, { add, subtract, PI } from './math.js';

console.log(add(5, 3));        // 8
console.log(subtract(5, 3));    // 2
console.log(PI);               // 3.14159

const calc = new Calculator();
console.log(calc.multiply(5, 3));  // 15
console.log(calc.divide(6, 2));    // 3
```

### CommonJS 模块 (Node.js)

```javascript
// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

const PI = 3.14159;

class Calculator {
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error("除数不能为零");
        return a / b;
    }
}

module.exports = {
    add,
    subtract,
    PI,
    Calculator
};
```

```javascript
// main.js
const math = require('./math.js');

console.log(math.add(5, 3));        // 8
console.log(math.subtract(5, 3));    // 2
console.log(math.PI);               // 3.14159

const calc = new math.Calculator();
console.log(calc.multiply(5, 3));  // 15
console.log(calc.divide(6, 2));    // 3
```

## DOM 操作

DOM（文档对象模型）是 HTML 和 XML 文档的编程接口，它将网页表示为节点和对象的树形结构。

### 选择元素

```javascript
// 通过 ID 选择元素
const element = document.getElementById('myId');

// 通过类名选择元素
const elements = document.getElementsByClassName('myClass');

// 通过标签名选择元素
const paragraphs = document.getElementsByTagName('p');

// 使用 CSS 选择器选择元素
const element2 = document.querySelector('.myClass');
const elements2 = document.querySelectorAll('div.item');
```

### 修改元素内容和属性

```javascript
// 修改元素内容
element.textContent = '新文本内容';
element.innerHTML = '<strong>新 HTML 内容</strong>';

// 修改元素属性
element.setAttribute('href', 'https://example.com');
element.id = 'newId';
element.className = 'newClass';

// 修改样式
element.style.color = 'red';
element.style.fontSize = '16px';
element.style.display = 'none';
```

### 创建和删除元素

```javascript
// 创建新元素
const newElement = document.createElement('div');
newElement.textContent = '新元素';
newElement.className = 'new-class';

// 添加元素到 DOM
document.body.appendChild(newElement);
parentElement.insertBefore(newElement, referenceElement);

// 删除元素
element.remove();
parentElement.removeChild(childElement);
```

### 事件处理

```javascript
// 添加事件监听器
element.addEventListener('click', function(event) {
    console.log('元素被点击了');
    console.log(event.target);
});

// 移除事件监听器
function handleClick(event) {
    console.log('处理点击事件');
}

element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);

// 阻止默认行为
document.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault();
    console.log('链接点击被阻止');
});

// 阻止事件冒泡
childElement.addEventListener('click', function(event) {
    event.stopPropagation();
    console.log('子元素点击事件不会冒泡到父元素');
});
```

### 事件委托

```javascript
// 使用事件委托处理多个子元素的事件
document.getElementById('parent-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        console.log('点击了列表项:', event.target.textContent);
    }
});
```

## BOM 操作

BOM（浏览器对象模型）提供了与浏览器窗口交互的对象。

### Window 对象

```javascript
// 窗口尺寸
console.log(window.innerWidth);
console.log(window.innerHeight);

// 打开新窗口
const newWindow = window.open('https://example.com', '_blank');

// 关闭窗口
newWindow.close();

// 定时器
const timeoutId = setTimeout(() => {
    console.log('3秒后执行');
}, 3000);

const intervalId = setInterval(() => {
    console.log('每2秒执行一次');
}, 2000);

// 清除定时器
clearTimeout(timeoutId);
clearInterval(intervalId);

// 弹出对话框
alert('提示信息');
const result = confirm('确定要继续吗？');
const name = prompt('请输入您的姓名', '默认值');
```

### Location 对象

```javascript
// 当前 URL 信息
console.log(window.location.href);     // 完整 URL
console.log(window.location.protocol); // 协议
console.log(window.location.host);     // 主机名和端口
console.log(window.location.hostname); // 主机名
console.log(window.location.port);     // 端口
console.log(window.location.pathname); // 路径
console.log(window.location.search);   // 查询字符串
console.log(window.location.hash);     // 锚点

// 导航
window.location.href = 'https://example.com';
window.location.assign('https://example.com');
window.location.replace('https://example.com'); // 不会在历史记录中创建新条目
window.location.reload();                      // 重新加载页面
```

### History 对象

```javascript
// 导航历史
window.history.back();       // 后退
window.history.forward();    // 前进
window.history.go(-2);       // 后退两页
window.history.go(1);        // 前进一页

// HTML5 History API
window.history.pushState({ page: 1 }, "Title 1", "/page1");
window.history.replaceState({ page: 2 }, "Title 2", "/page2");

// 监听 popstate 事件
window.addEventListener('popstate', function(event) {
    console.log('导航到:', document.location.pathname, '状态:', event.state);
});
```

### Navigator 对象

```javascript
// 浏览器信息
console.log(navigator.userAgent);       // 用户代理字符串
console.log(navigator.platform);        // 操作系统平台
console.log(navigator.language);        // 首选语言
console.log(navigator.languages);       // 语言列表
console.log(navigator.onLine);          // 是否在线
console.log(navigator.cookieEnabled);   // 是否启用 cookie

// 地理位置 API
navigator.geolocation.getCurrentPosition(
    position => {
        console.log('纬度:', position.coords.latitude);
        console.log('经度:', position.coords.longitude);
    },
    error => {
        console.error('获取位置失败:', error.message);
    }
);
```

## Web Storage API

### localStorage 和 sessionStorage

```javascript
// localStorage (持久存储)
localStorage.setItem('username', '张三');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark', fontSize: 16 }));

const username = localStorage.getItem('username');
const preferences = JSON.parse(localStorage.getItem('preferences'));

localStorage.removeItem('username');
localStorage.clear(); // 清除所有数据

// sessionStorage (会话存储，关闭标签页后清除)
sessionStorage.setItem('tempData', '临时数据');
const tempData = sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

## Fetch API

```javascript
// 基本用法
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return response.json();
    })
    .then(data => {
        console.log('获取的数据:', data);
    })
    .catch(error => {
        console.error('获取数据失败:', error);
    });

// 配置选项
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({
        name: '张三',
        email: 'zhangsan@example.com'
    })
})
.then(response => response.json())
.then(data => console.log('创建用户:', data))
.catch(error => console.error('错误:', error));

// 使用 async/await
async function fetchData() {
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
    }
}

fetchData();
```

## JSON 处理

```javascript
// 对象转 JSON 字符串
const person = {
    name: '张三',
    age: 25,
    hobbies: ['阅读', '游泳'],
    address: {
        city: '北京',
        street: '朝阳区'
    }
};

const jsonString = JSON.stringify(person);
console.log(jsonString);

// 格式化 JSON 输出
const formattedJson = JSON.stringify(person, null, 2);
console.log(formattedJson);

// 选择性转换
const partialJson = JSON.stringify(person, ['name', 'age']);
console.log(partialJson);

// 自定义转换
const customJson = JSON.stringify(person, (key, value) => {
    if (key === 'age') return value + 1;
    return value;
});
console.log(customJson);

// JSON 字符串转对象
const jsonStr = '{"name":"李四","age":30,"isStudent":false}';
const obj = JSON.parse(jsonStr);
console.log(obj.name, obj.age);

// 自定义解析
const customObj = JSON.parse(jsonStr, (key, value) => {
    if (key === 'age') return value * 2;
    return value;
});
console.log(customObj.age); // 60
```

## JavaScript 最佳实践

### 1. 使用严格模式

```javascript
'use strict';

// 在严格模式下，未声明的变量赋值会抛出错误
x = 10; // ReferenceError: x is not defined
```

### 2. 避免全局变量

```javascript
// 不好的做法
function badFunction() {
    globalVar = 'I am global';
}

// 好的做法
function goodFunction() {
    let localVar = 'I am local';
}

// 使用 IIFE 创建私有作用域
(function() {
    let privateVar = 'I am private';
    // 其他代码
})();
```

### 3. 使用 === 而不是 ==

```javascript
// == 会进行类型转换
console.log(5 == '5');     // true
console.log(0 == false);   // true
console.log('' == false);  // true

// === 不会进行类型转换
console.log(5 === '5');    // false
console.log(0 === false);  // false
console.log('' === false); // false
```

### 4. 使用解构赋值

```javascript
// 对象解构
const person = { name: '张三', age: 25, city: '北京' };
const { name, age } = person;

// 数组解构
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
```

### 5. 使用模板字符串

```javascript
const name = '张三';
const age = 25;

// 不好的做法
const greeting1 = '你好，我是' + name + '，今年' + age + '岁。';

// 好的做法
const greeting2 = `你好，我是${name}，今年${age}岁。`;
```

### 6. 使用箭头函数

```javascript
// 传统函数表达式
const traditionalFunc = function(x, y) {
    return x + y;
};

// 箭头函数
const arrowFunc = (x, y) => x + y;

// 箭头函数不绑定自己的 this
const person = {
    name: '张三',
    hobbies: ['阅读', '游泳'],
    printHobbies: function() {
        this.hobbies.forEach(hobby => {
            console.log(`${this.name} 喜欢 ${hobby}`);
        });
    }
};
```

### 7. 使用 Promise 或 async/await 处理异步

```javascript
// 使用 Promise
function fetchData() {
    return fetch('https://api.example.com/data')
        .then(response => response.json());
}

// 使用 async/await
async function fetchData2() {
    const response = await fetch('https://api.example.com/data');
    return await response.json();
}
```

### 8. 使用默认参数和剩余参数

```javascript
// 默认参数
function greet(name = '访客', greeting = '你好') {
    return `${greeting}，${name}！`;
}

// 剩余参数
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
```

### 9. 使用对象和数组的扩展运算符

```javascript
// 对象扩展
const defaults = { theme: 'light', fontSize: 16 };
const userPrefs = { fontSize: 18 };
const settings = { ...defaults, ...userPrefs };

// 数组扩展
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
```

### 10. 使用模块化组织代码

```javascript
// math.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// main.js
import { add, subtract } from './math.js';

console.log(add(5, 3));
console.log(subtract(5, 3));
```

## 结论

JavaScript 是一门功能强大且灵活的编程语言，掌握其基础知识对于前端开发至关重要。随着 ECMAScript 标准的不断发展，JavaScript 也在不断增加新特性，使得代码更加简洁、可读和高效。

持续学习和实践是提升 JavaScript 技能的关键。建议深入学习 JavaScript 的高级特性，如原型继承、闭包、异步编程等，以及熟悉常用的设计模式和最佳实践。

## 参考资源

- [MDN Web 文档 - JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://zh.javascript.info/)
- [ECMAScript 规范](https://tc39.es/ecma262/)
- [现代 JavaScript 教程](https://zh.javascript.info/)
