# JavaScript 异步编程

JavaScript 是一种单线程语言，这意味着它一次只能执行一个任务。然而，在现代 Web 应用中，我们经常需要处理耗时的操作，如网络请求、文件读写等。异步编程允许 JavaScript 在执行这些耗时操作时不会阻塞主线程，从而保持应用的响应性。本文将系统介绍 JavaScript 异步编程的各种技术和最佳实践。

## 同步与异步

在深入异步编程之前，让我们先了解同步和异步的区别：

### 同步执行

同步执行意味着代码按照编写的顺序一行一行地执行，每一行代码执行完毕后才会执行下一行。如果某个操作耗时较长，那么后续代码必须等待该操作完成才能执行。

```javascript
console.log("开始");
const result = performLongOperation(); // 假设这是一个耗时操作
console.log(result);
console.log("结束");
```

在上面的例子中，"结束"只有在 `performLongOperation()` 完成后才会打印出来。

### 异步执行

异步执行允许程序在等待某个操作完成的同时继续执行其他代码。当异步操作完成时，会通过回调函数、Promise 或其他机制通知程序。

```javascript
console.log("开始");
performLongOperation(result => {
    console.log(result);
});
console.log("结束");
```

在这个例子中，"结束"会在 `performLongOperation()` 开始执行后立即打印出来，而不会等待它完成。当操作完成时，回调函数会被调用，打印结果。

## JavaScript 的事件循环

要理解 JavaScript 的异步编程，首先需要了解事件循环（Event Loop）机制。

### 事件循环的组成部分

1. **调用栈（Call Stack）**：用于跟踪当前正在执行的函数。当函数被调用时，它会被推入栈中；当函数执行完毕时，它会从栈中弹出。

2. **任务队列（Task Queue）**：也称为宏任务队列，存储待执行的任务（如定时器回调、事件处理函数等）。

3. **微任务队列（Microtask Queue）**：存储优先级更高的任务（如 Promise 回调）。

4. **Web API**：由浏览器提供的 API，如 DOM、AJAX、setTimeout 等。

### 事件循环的工作流程

1. 执行调用栈中的所有同步代码。
2. 检查微任务队列，如果有任务，则执行所有微任务。
3. 从任务队列中取出一个任务（如果有）并执行。
4. 再次检查微任务队列，执行所有微任务。
5. 重复步骤 3-4，直到任务队列和微任务队列都为空。

```javascript
console.log("1"); // 同步代码

setTimeout(() => {
    console.log("2"); // 宏任务
}, 0);

Promise.resolve().then(() => {
    console.log("3"); // 微任务
});

console.log("4"); // 同步代码
```

上面代码的执行顺序是：1, 4, 3, 2

1. 首先执行同步代码，打印 "1"。
2. 遇到 setTimeout，将回调函数放入任务队列。
3. 遇到 Promise.then，将回调函数放入微任务队列。
4. 执行同步代码，打印 "4"。
5. 同步代码执行完毕，检查微任务队列，执行微任务，打印 "3"。
6. 微任务队列为空，从任务队列取出一个任务执行，打印 "2"。

## 回调函数

回调函数是最早用于处理异步操作的方式，它是一个作为参数传递给另一个函数的函数，在特定事件发生时被调用。

### 基本用法

```javascript
function fetchData(callback) {
    // 模拟异步操作
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

console.log("请求已发送");
```

执行顺序：
1. 调用 `fetchData` 函数，传入回调函数。
2. 打印 "请求已发送"。
3. 1秒后，回调函数被调用，打印 "获取数据: { name: '张三', age: 25 }"。

### 回调地狱

当需要执行多个依赖于前一个操作结果的异步操作时，使用回调函数可能导致代码嵌套过深，形成所谓的"回调地狱"（Callback Hell）：

```javascript
fetchUserData(userId, (error, userData) => {
    if (error) {
        console.error("获取用户数据失败:", error);
        return;
    }
    
    fetchUserPosts(userData.id, (error, posts) => {
        if (error) {
            console.error("获取用户文章失败:", error);
            return;
        }
        
        fetchPostComments(posts[0].id, (error, comments) => {
            if (error) {
                console.error("获取评论失败:", error);
                return;
            }
            
            console.log("用户:", userData.name);
            console.log("第一篇文章:", posts[0].title);
            console.log("评论数:", comments.length);
        });
    });
});
```

这种嵌套结构使代码难以阅读和维护，也容易导致错误处理逻辑重复。

## Promise

Promise 是 ES6 引入的一种处理异步操作的对象，它代表一个异步操作的最终完成（或失败）及其结果值。Promise 可以帮助我们避免回调地狱，使异步代码更加清晰和易于管理。

### Promise 的状态

Promise 有三种状态：
- **pending（进行中）**：初始状态，既不是成功也不是失败。
- **fulfilled（已成功）**：操作成功完成。
- **rejected（已失败）**：操作失败。

Promise 的状态一旦改变（从 pending 到 fulfilled 或从 pending 到 rejected），就不会再变。

### 创建 Promise

```javascript
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
```

### 使用 Promise

```javascript
promise
    .then(result => {
        console.log(result); // "操作成功"
    })
    .catch(error => {
        console.error(error.message); // "操作失败"
    })
    .finally(() => {
        console.log("无论成功还是失败，都会执行");
    });
```

### Promise 链

Promise 的一个强大特性是可以链式调用，每个 `.then()` 方法返回一个新的 Promise，使我们可以顺序执行多个异步操作：

```javascript
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "用户" + userId });
            } else {
                reject(new Error("无效的用户ID"));
            }
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "文章1" },
                { id: 2, title: "文章2" }
            ]);
        }, 1000);
    });
}

fetchUserData(1)
    .then(user => {
        console.log("用户:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("文章:", posts);
    })
    .catch(error => {
        console.error("错误:", error.message);
    });
```

### Promise 并行执行

有时我们需要同时执行多个异步操作，并在所有操作完成后进行处理。Promise 提供了几种方法来处理这种情况：

#### Promise.all()

`Promise.all()` 接收一个 Promise 数组，返回一个新的 Promise，当所有 Promise 都成功时，返回的 Promise 成功，结果是所有 Promise 结果的数组；如果任何一个 Promise 失败，返回的 Promise 立即失败。

```javascript
const promise1 = fetchUserData(1);
const promise2 = fetchUserPosts(1);
const promise3 = fetchWeather("北京");

Promise.all([promise1, promise2, promise3])
    .then(([userData, posts, weather]) => {
        console.log("用户:", userData);
        console.log("文章:", posts);
        console.log("天气:", weather);
    })
    .catch(error => {
        console.error("至少有一个请求失败:", error);
    });
```

#### Promise.allSettled()

`Promise.allSettled()` 也接收一个 Promise 数组，但它会等待所有 Promise 完成（无论成功还是失败），然后返回一个包含每个 Promise 结果的对象数组。

```javascript
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Promise ${index + 1} 成功:`, result.value);
            } else {
                console.log(`Promise ${index + 1} 失败:`, result.reason);
            }
        });
    });
```

#### Promise.race()

`Promise.race()` 接收一个 Promise 数组，返回一个新的 Promise，一旦数组中的任何一个 Promise 完成（无论成功还是失败），返回的 Promise 就会完成。

```javascript
const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("请求超时")), 5000);
});

Promise.race([fetchUserData(1), timeout])
    .then(userData => {
        console.log("用户数据:", userData);
    })
    .catch(error => {
        console.error("错误:", error.message);
    });
```

#### Promise.any()

`Promise.any()` 接收一个 Promise 数组，返回一个新的 Promise，一旦数组中的任何一个 Promise 成功，返回的 Promise 就会成功；只有当所有 Promise 都失败时，返回的 Promise 才会失败。

```javascript
const server1 = fetchData("https://api1.example.com");
const server2 = fetchData("https://api2.example.com");
const server3 = fetchData("https://api3.example.com");

Promise.any([server1, server2, server3])
    .then(firstSuccess => {
        console.log("至少一个服务器响应成功:", firstSuccess);
    })
    .catch(error => {
        console.error("所有服务器都失败了:", error);
    });
```

## async/await

async/await 是 ES2017 引入的语法糖，它建立在 Promise 之上，使异步代码看起来更像同步代码，更易于理解和维护。

### async 函数

`async` 关键字用于声明一个异步函数，该函数会自动返回一个 Promise。

```javascript
async function fetchUserData(userId) {
    // 异步操作
    return { id: userId, name: "用户" + userId };
}

// 等价于
function fetchUserData(userId) {
    return Promise.resolve({ id: userId, name: "用户" + userId });
}
```

### await 表达式

`await` 关键字只能在 `async` 函数内部使用，它会暂停函数的执行，等待 Promise 完成，然后返回 Promise 的结果。

```javascript
async function getUserData(userId) {
    try {
        const user = await fetchUserData(userId);
        const posts = await fetchUserPosts(user.id);
        const comments = await fetchPostComments(posts[0].id);
        
        return {
            user,
            posts,
            comments
        };
    } catch (error) {
        console.error("获取数据失败:", error);
        throw error;
    }
}

getUserData(1)
    .then(data => {
        console.log("用户数据:", data.user);
        console.log("文章:", data.posts);
        console.log("评论:", data.comments);
    })
    .catch(error => {
        console.error("错误:", error);
    });
```

### 并行执行异步操作

虽然 `await` 会暂停函数的执行，但有时我们需要同时执行多个异步操作。可以结合 `Promise.all()` 等方法实现：

```javascript
async function getUserDataParallel(userId) {
    try {
        const user = await fetchUserData(userId);
        
        // 并行获取文章和天气
        const [posts, weather] = await Promise.all([
            fetchUserPosts(user.id),
            fetchWeather(user.city)
        ]);
        
        return {
            user,
            posts,
            weather
        };
    } catch (error) {
        console.error("获取数据失败:", error);
        throw error;
    }
}
```

### 错误处理

在 async/await 中，可以使用 try/catch 语句处理错误，这比 Promise 的 `.catch()` 方法更加直观：

```javascript
async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
            throw new Error("网络响应不正常");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("获取数据失败:", error);
        // 可以选择重新抛出错误或返回默认值
        return { error: true, message: error.message };
    }
}
```

## 生成器函数与异步迭代

生成器函数（Generator Functions）是 ES6 引入的一种特殊函数，它可以在执行过程中暂停和恢复，这使得它非常适合处理异步操作。

### 基本用法

```javascript
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
```

### 使用生成器处理异步操作

在 async/await 出现之前，生成器函数常被用来处理异步操作：

```javascript
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function* fetchUserFlow() {
    try {
        const user = yield fetchData("https://api.example.com/user");
        const posts = yield fetchData(`https://api.example.com/posts?userId=${user.id}`);
        const comments = yield fetchData(`https://api.example.com/comments?postId=${posts[0].id}`);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("获取数据失败:", error);
    }
}

function runGenerator(generator) {
    const iterator = generator();
    
    function run(arg) {
        const result = iterator.next(arg);
        
        if (result.done) {
            return result.value;
        }
        
        return Promise.resolve(result.value).then(
            value => run(value),
            error => iterator.throw(error)
        );
    }
    
    return run();
}

runGenerator(fetchUserFlow)
    .then(data => {
        console.log("用户数据:", data);
    })
    .catch(error => {
        console.error("错误:", error);
    });
```

### 异步迭代器

ES2018 引入了异步迭代器和 `for await...of` 循环，使得迭代异步数据源变得更加简单：

```javascript
async function* fetchPages() {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
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
        
        // 如果收集了足够的数据，可以提前退出
        if (allItems.length >= 100) {
            break;
        }
    }
    
    console.log("收集的项目:", allItems);
}

processPages().catch(error => {
    console.error("处理页面时出错:", error);
});
```

## 实际应用示例

### 使用 Fetch API 和 async/await

```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP 错误: ${response.status}`);
        }
        
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("获取用户数据失败:", error);
        throw error;
    }
}

async function displayUserProfile(userId) {
    try {
        const user = await fetchUserData(userId);
        
        document.getElementById("username").textContent = user.name;
        document.getElementById("email").textContent = user.email;
        document.getElementById("profile").style.display = "block";
    } catch (error) {
        document.getElementById("error-message").textContent = `加载用户资料失败: ${error.message}`;
        document.getElementById("error").style.display = "block";
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}

// 使用
document.getElementById("load-profile").addEventListener("click", () => {
    const userId = document.getElementById("user-id").value;
    
    document.getElementById("loading").style.display = "block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("error").style.display = "none";
    
    displayUserProfile(userId);
});
```

### 实现请求重试和超时

```javascript
async function fetchWithRetry(url, options = {}, retries = 3, timeout = 5000) {
    // 创建超时 Promise
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("请求超时")), timeout);
    });
    
    let lastError;
    
    for (let i = 0; i < retries; i++) {
        try {
            // 竞争：谁先完成就用谁的结果
            const response = await Promise.race([
                fetch(url, options),
                timeoutPromise
            ]);
            
            if (!response.ok) {
                throw new Error(`HTTP 错误: ${response.status}`);
            }
            
            return response;
        } catch (error) {
            console.warn(`尝试 ${i + 1}/${retries} 失败:`, error.message);
            lastError = error;
            
            // 如果不是最后一次尝试，等待一段时间再重试
            if (i < retries - 1) {
                // 指数退避策略
                const delay = Math.min(1000 * Math.pow(2, i), 10000);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw new Error(`在 ${retries} 次尝试后失败: ${lastError.message}`);
}

// 使用
async function loadData() {
    try {
        const response = await fetchWithRetry("https://api.example.com/data", {}, 3, 3000);
        const data = await response.json();
        console.log("数据加载成功:", data);
    } catch (error) {
        console.error("数据加载失败:", error);
    }
}
```

### 并发控制

在处理大量异步请求时，我们可能需要限制并发数量，以避免过度消耗资源或触发服务器限制：

```javascript
async function fetchWithConcurrencyLimit(urls, limit = 5) {
    const results = [];
    const inProgress = new Set();
    
    // 为每个 URL 创建一个异步函数
    const promises = urls.map(async (url, index) => {
        // 等待，直到正在进行的请求数量低于限制
        while (inProgress.size >= limit) {
            await Promise.race(inProgress);
        }
        
        // 创建请求 Promise
        const fetchPromise = fetch(url)
            .then(response => response.json())
            .finally(() => {
                // 请求完成后从进行中集合中移除
                inProgress.delete(fetchPromise);
            });
        
        // 添加到进行中集合
        inProgress.add(fetchPromise);
        
        // 等待结果并存储
        results[index] = await fetchPromise;
    });
    
    // 等待所有请求完成
    await Promise.all(promises);
    
    return results;
}

// 使用
const urls = Array.from({ length: 20 }, (_, i) => `https://api.example.com/item/${i + 1}`);

fetchWithConcurrencyLimit(urls, 3)
    .then(results => {
        console.log("所有数据加载完成:", results);
    })
    .catch(error => {
        console.error("加载数据时出错:", error);
    });
```

## 异步编程最佳实践

### 1. 优先使用 async/await

async/await 使异步代码更加清晰和易于理解，尽可能使用它而不是回调函数或直接使用 Promise。

```javascript
// 不推荐
function fetchData() {
    return fetch("https://api.example.com/data")
        .then(response => response.json())
        .then(data => {
            return processData(data);
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
}

// 推荐
async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        return await processData(data);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
```

### 2. 正确处理错误

始终使用 try/catch 块捕获异步操作中的错误，并提供有意义的错误信息。

```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`获取用户数据失败: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`获取用户 ${userId} 数据时出错:`, error);
        // 可以选择重新抛出错误或返回默认值
        throw new Error(`获取用户数据失败: ${error.message}`);
    }
}
```

### 3. 避免嵌套 await

尽量避免嵌套 await 调用，而是使用变量存储中间结果或使用 Promise.all() 并行执行独立的异步操作。

```javascript
// 不推荐
async function getFullData() {
    const user = await fetchUser();
    const posts = await fetchPosts(await user.id);
    const comments = await fetchComments(await posts[0].id);
    return { user, posts, comments };
}

// 推荐
async function getFullData() {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return { user, posts, comments };
}

// 更好的方式（并行执行独立操作）
async function getFullData() {
    const user = await fetchUser();
    const [posts, profile] = await Promise.all([
        fetchPosts(user.id),
        fetchProfile(user.id)
    ]);
    const comments = await fetchComments(posts[0].id);
    return { user, posts, profile, comments };
}
```

### 4. 使用 Promise.all() 并行执行独立操作

当多个异步操作之间没有依赖关系时，使用 Promise.all() 并行执行它们，以提高性能。

```javascript
async function loadDashboard() {
    try {
        const [userData, statsData, notificationsData] = await Promise.all([
            fetchUserData(),
            fetchStats(),
            fetchNotifications()
        ]);
        
        updateUI(userData, statsData, notificationsData);
    } catch (error) {
        showError("加载仪表板失败", error);
    }
}
```

### 5. 合理使用 Promise.allSettled()

当需要执行多个异步操作，并且希望即使部分操作失败也能获取所有可用结果时，使用 Promise.allSettled()。

```javascript
async function loadUserData(userId) {
    const results = await Promise.allSettled([
        fetchProfile(userId),
        fetchPosts(userId),
        fetchFriends(userId),
        fetchActivity(userId)
    ]);
    
    const data = {};
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            const keys = ["profile", "posts", "friends", "activity"];
            data[keys[index]] = result.value;
        } else {
            console.warn(`获取 ${keys[index]} 失败:`, result.reason);
            data[keys[index]] = null;
        }
    });
    
    return data;
}
```

### 6. 实现超时处理

为长时间运行的异步操作添加超时处理，避免无限等待。

```javascript
function timeout(ms, promise) {
    return new Promise((resolve, reject) => {
        // 设置超时
        const timer = setTimeout(() => {
            reject(new Error(`操作超时 (${ms}ms)`));
        }, ms);
        
        // 执行原始 Promise
        promise
            .then(value => {
                clearTimeout(timer);
                resolve(value);
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

// 使用
async function fetchWithTimeout(url, options = {}, ms = 5000) {
    try {
        const response = await timeout(ms, fetch(url, options));
        return await response.json();
    } catch (error) {
        if (error.message.includes("超时")) {
            console.error("请求超时:", url);
        } else {
            console.error("请求失败:", error);
        }
        throw error;
    }
}
```

### 7. 使用 AbortController 取消请求

使用 AbortController 取消不再需要的异步操作，例如当用户导航离开页面或取消操作时。

```javascript
function fetchWithAbort(url, options = {}) {
    const controller = new AbortController();
    const { signal } = controller;
    
    const promise = fetch(url, { ...options, signal })
        .then(response => response.json());
    
    return {
        promise,
        abort: () => controller.abort()
    };
}

// 使用
const { promise, abort } = fetchWithAbort("https://api.example.com/data");

// 设置超时
const timeoutId = setTimeout(() => {
    abort();
    console.log("请求已取消");
}, 5000);

promise
    .then(data => {
        clearTimeout(timeoutId);
        console.log("数据:", data);
    })
    .catch(error => {
        if (error.name === "AbortError") {
            console.log("请求被取消");
        } else {
            console.error("请求失败:", error);
        }
    });

// 用户取消操作
document.getElementById("cancel-button").addEventListener("click", () => {
    abort();
    clearTimeout(timeoutId);
    console.log("用户取消了请求");
});
```

### 8. 使用防抖和节流控制异步操作频率

当处理用户输入等频繁触发的事件时，使用防抖（debounce）和节流（throttle）技术控制异步操作的频率。

```javascript
// 防抖：等待用户停止操作一段时间后才执行
function debounce(func, wait) {
    let timeout;
    
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 节流：限制函数在一定时间内只能执行一次
function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// 使用防抖进行搜索
const searchInput = document.getElementById("search");
const debouncedSearch = debounce(async (query) => {
    try {
        const results = await fetchSearchResults(query);
        displayResults(results);
    } catch (error) {
        console.error("搜索失败:", error);
    }
}, 300);

searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    debouncedSearch(query);
});
```

## 结论

JavaScript 异步编程是现代 Web 开发的核心技能之一。从最早的回调函数，到 Promise，再到 async/await，JavaScript 的异步编程模式不断演进，变得更加强大和易用。

掌握异步编程技术可以帮助我们构建响应迅速、用户体验良好的 Web 应用。在实际开发中，应根据具体需求选择合适的异步编程模式，并遵循最佳实践，确保代码的可读性、可维护性和性能。

随着 JavaScript 和 Web 平台的不断发展，我们可以期待更多强大的异步编程特性出现，进一步简化复杂异步操作的处理。

## 参考资源

- [MDN Web 文档 - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Web 文档 - async 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN Web 文档 - await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)
- [JavaScript.info - Promise, async/await](https://zh.javascript.info/async)
- [Jake Archibald: 深入理解 JavaScript 事件循环](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
