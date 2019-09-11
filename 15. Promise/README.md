### Promise 对象

- Promise是一种异步编程的解决方案，解决了传统异步回调中 `嵌套层次深` 、`强耦合` 的问题
- Promise实例的状态：`pending`、`fulfilled`、`rejected`
- Promise实例的状态改变后，任何其他操作都无法改变
- Promise实例状态的变化情况：1. `pending -> fulfilled`；2. `pending -> rejected`

<br>

> 基本用法
- `p = new Promise((resolve, reject) => { statement })`
    - `Promise` 构造函数只接受一个函数作为参数，该函数的两个参数分别是 `resolve` 、 `reject`
    - 当调用 `resolve` 函数时，则表示 promise 状态为 fulfilled ，并回调 fulfilledCallback
    - 当调用 `reject` 函数时，则表示 promise 状态为 rejected ，并回调 rejectedCallback
-
- 原型方法：then(fulfilledCallback[, rejectedCallback])
    - `回调函数` ， `最多只能接受一个参数`
    - 该函数执行类型为 `微任务`
-
- 原型方法：catch(rejectedCallback)
    - catch是一个特殊版本的then方法：then(null, err => { statement })
    - 回调函数，最多只能接受一个参数，通常为Error实例
    - 该函数执行类型为 `微任务`
-
- 原型方法：finally(callback)
    - `回调函数无法接受任何参数`
    - 该函数执行类型为 `微任务`
```javascript
    Promise.prototype.finally = function(callback) {
        callback();
        return this.then(
            value => Promise.resolve(value),
            error => Promise.reject(error)
        );
    };
```

<br>

> promise的执行顺序
- `new Promsie -> then / catch -> ... -> then / catch -> finally`
- promise 状态为 `fulfilled` 时，执行 `fulfilledCallback()`
    - 如果没有 fulfilledCallback 时，则继续执行下一个 then
- promise 状态为 `rejected` 时，执行 `rejectedCallback()`
    - 如果没有 rejectedCallback 时，则继续执行下一个 then
- finally是一个兜底的回调函数，必定会执行
-
- callback 执行时 or 返回的值
    - 如果没有抛出错误异常，则被当作 Promise.resolve(returnValue) 处理
    - 如果有抛出错误异常，则被当作 Promise.reject(error) 处理
-

- Promise `内部的错误` `不会影响` 到 Promise `外部的代码`
```javascript
    Promise.resolve().then(() => x + 2); // Uncaught (in promise) ReferenceError: x is not defined
    console.log(2); // 2    不会影响到Promise外代码的执行




    throw new Error(); // Uncaught Error
    console.log(3); // 错误代码停止了后续代码的执行
```

<br>

> Promise实例嵌套问题
- resolve 函数参数
    - Promise实例， `外层Promise的状态` 由 `内层Promise的状态` 决定
    - 其他情况，只是普通参数
- reject 函数参数一般为 Error 实例
```javascript
    const p1 = Promise.reject('error');
    const p2 = new Promise((resolve, reject) => resolve(p1));

    p2.then(data => {
        console.log(`data: ${data}`);
    }, error => {
        console.log(`error: ${error}`);
    });

    // error: error    p2的状态由p1的状态决定
```

<br>

> Promise.all( )
- `p = Promise.all([p1, p2, p3 ... ])`
- 接受一个数组作为参数，数组成员为 Promise 实例，如果不是则通过 Promise.resolve 方法转换为 Promise 实例
- 返回值 p 为 Promise 实例
- p 的状态由 p1、p2、p3 决定
    - p1、p2、p3 的状态都为 fulfilled 时，p 的状态为 fulfilled，此时 p1, p2, p3 返回值组成一个数组，作为 fulfilledCallback 的参数
    - p1、p2、p3 的其中状态为 rejected 时，p 的状态为 rejected，此时 第一个 rejected 实例的返回值，作为 rejectedCallback 的参数
```javascript
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p1');
        }, 1000);
    });

    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p2');
        }, 2000);
    });

    Promise.all([p1, p2])
    .then(data => {
        console.log(data.join());
    });

    // 2s后 。。。 打印 'p1,p2'
```

<br>

> Promise.race( )
- Promise.race 和 Promise.all 比较相似
- `p = Promise.race([p1, p2, p3 ... ])`
- 只要 p1、p2、p3 中其中一个实例的状态改变了，p 就等于那个实例
```javascript
    // 5s之内请求未完成，则请求超时
    Promise.race([
        new Promsie((resolve, reject) => {
            fetch('http://www.baidu.com').then(data => {
                resolve(data);
            });
        }),
        new Promise((resolve, reject) => {
            setTimeout(reject, 5000);
        })
    ])
    .then(data => {
        console.log('请求成功');
    }, data => {
        console.log('请求超时');
    });
```

<br>

> Promise.resolve( )
- 生成一个 Promise 实例，并且执行 resolve
- `Promise.resolve(value) -> new Promise((resolve, reject) => resolve(value))`

<br>

> Promise.reject( )
- 生成一个 Promise 实例，并且执行 reject
- `Promise.reject(value) -> new Promise((resolve, reject) => reject(value))`
