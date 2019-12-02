### async 函数

> 含义
- async 函数 配合 ``await`` 命令用来依次执行同步、异步语句，返回Promise
- 进一步说： ``async`` 函数完全可以看作多个异步操作，包装成的一个 ``Promise`` 对象，而 ``await`` 命令就是内部 ``then`` 命令的语法糖
```javascript
const handle = async () => {
    await asyncFn();
    syncFn();
};
```

<br>

> 基本用法
- 当 ``async`` 函数执行的时候，一旦遇到 ``await`` 就会等待该异步操作完成，再接着执行函数体内后面的语句。
```javascript
const timeout = ms => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

const handle = async (ms, str) => {
    await timeout(ms);
    console.log(str);
};

handle(1000, 'from async');
console.log('from sync');

// from sync
// wait a second
// from async
```

<br>

> 语法
- ``async`` 函数
    - 该函数内部将依次按照代码的顺序，执行同步代码/异步代码。
    - 该函数返回一个 ``Promise`` 对象，可以使用 ``then`` 方法添加回调函数。
    - 该函数内部 ``return`` 语句返回的值，会成为 ``then`` 方法回调函数的参数。
    - 该函数内部抛出错误，会导致返回的 ``Promise`` 对象状态变为 ``reject`` ，函数内部剩余代码将不再执行；抛出的错误对象会被 ``catch`` 方法回调函数接收到。

- ``await`` 命令
    - ``await`` 命令后面是一个 ``Promise`` 对象；``await`` 命令返回该对象的结果。如果不是 ``Promise`` 对象，则直接返回对应的值。
    - ``await`` 命令后面的 ``Promise`` 对象如果状态变为 ``reject`` ，则 ``reject`` 的参数会被 ``catch`` 方法的回调函数接收到。
        - ``async`` 函数将终止执行内部剩余代码。

- 将 ``await`` 放在 ``try...catch`` 结构里面，即时 ``await`` 命令后面的 ``Promise`` 对象的状态 ``reject`` 了，也不会终止其他代码的执行。

- 注意点：
    - ``await`` 命令只能用在 ``async`` 函数内，否则会报错。
    - ``async`` 函数可以保留运行堆栈。

```javascript
const getTitle = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
};

getTitle('https://tc39.github.io/ecma262/').then(console.log); // 只有执行完 fetch(url) response.text() 之后，才会执行then方法的回调函数




const handle = async () => {
    throw new Error('2222');
    const str = await Promise.resolve('resolve');
    return str;
};

handle()
    .then(str => {
        console.log(str);
    })
    .catch(e => {
        console.error(e);
    });

// handle函数的状态提前改变为reject，handle内部后面的代码没有执行
// Error: 2222




async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
    await Promise.resolve('then');
    return 'success';
}
// 由于await somethingThatReturnsAPromise()  放在 try...catch 结构里了，即时其状态为 reject 也不会对后续代码执行有任何影响




// await 命令只能用在 async 函数之中，否则会报错
async function dbFuc(db) {
    let docs = [{}, {}, {}];

    // 报错
    docs.forEach(function (doc) {
        await db.post(doc);
    });
}

async function dbFuc(db) {
    let docs = [{}, {}, {}];

    for (let doc of docs) {
      await db.post(doc);
    }
}




// async 函数可以保留运行堆栈
const handle = async () => {
    throw new Error('handle_error');
    await Promise.resolve('handle_resolve');
};

const fn0 = async () => {
    await handle();
};


const fn1 = () => {
    new Promise((resolve, reject) => {
        resolve();
    })
    .then(() => {
        throw new Error('promise_then_error');
    });
};

fn0();
// 可以保留fn函数的信息
// Uncaught (in promise) Error: handle_error
//   at handle (4.html:11)
//   at fn (4.html:16)
//   at 4.html:32 


fn1();
// 只能有Promise的错误信息
// Uncaught (in promise) Error: promise_then_error
//   at 4.html:28
```

