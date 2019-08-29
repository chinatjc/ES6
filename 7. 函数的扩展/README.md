### 函数的扩展

<br>

> 函数参数的扩展
- 函数参数允许设置 `默认值` ,当参数为 `undefined` 时：1. `执行默认值`；2. `结果赋值给参数`
```javascript
    function fn(str = '默认值') {
        return str;
    }

    fn('hello world'); // 'hello world'
    fn(); //          '默认值'    变量str为undefined，参数被赋值默认值
    fn(undefined); // '默认值'    变量str为undefined，参数被赋值默认值




    function foo(t = new Date()) {
        return t;
    }

    var t1 = foo();
    var t2 = foo();

    t1 === t2; // false    默认值不相同，说明每次触发默认值时，都是先执行、后赋值
```
- 函数参数可以与解构赋值的默认值，结合使用
```javascript
    function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {}

    fetch('https://www.baidu.com'); // 函数fetch没有第二个参数，1. 引发函数参数默认值行为；2. 引发解构赋值行为；3. 引发解构赋值默认值行为
```
- 一旦设置了函数参数的默认值，函数参数就会形成一个单独的作用域
```javascript
    var x = 1;
    function foo(x, y = function() { x = 2 }) {
        var x = 3;
        y();
        console.log(x);
    }




    foo(); // 3
    // 函数参数作用域
    {
        x = 1; // 引用全局变量 x = 1
        y = function() { x =2 }
    }
    // 函数内部执行语句作用域
    {
        var x = 3;
        y(); // 函数作用域链生成于函数定义时，所以此处的 x 为函数参数中的 x
        console.log(x); // 在当前作用域链中查找 x -> 3
    }




    x; // 1    查找当前作用域链中的 x -> 1
```
- rest 参数
    - 用于收集函数多余的参数，可以 `取代` `arguments`
    - rest 参数必须是最后一个参数，否则会报错
    - rest 参数是一个 `真正的数组`
```javascript
    function sum(...numList) {
        return numList.reduce(function(count, n) {
            return count += n;
        }, 0);
    }

    sum(1, 2, 3, 4, 5); // 15



    function fn(...arg, lastArg) {} // Uncaught SyntaxError: Rest parameter must be last formal parameter




    function foo(...arg) {
        console.log('rest is real Array ? ' + Array.isArray(arg));
        console.log('arguments is real Array ? ' + Array.isArray(arguments));
    }

    foo(1, 2);
    // rest is real Array ?       true
    // arguments is real Array ?  false
```
- 应用
    - 函数参数不得省略，否则就抛出错误提示语句
```javascript
    function throwIfMissing() {
        throw new Error('missing parameter: url');
    }

    function fetch(url = throwIfMissing(), { body = '', method = 'GET', headers = {} } = {}) {}

    fetch(); // Uncaught Error: missing parameter: url
```

<br>

> 箭头函数
- `const fnName = () => {};`
    - 函数参数
        - 没有参数时，用 `圆括号()` 表示
        - 一个参数时，用 `参数名` 表示
        - 多个参数时，用 `圆括号 包含 参数名` 表示
    - 函数体
        - 一条语句时，直接暴露语句
            - 如果是对象，则需要用 `圆括号()` 对其进行包裹
        - 多条语句时，用 `花括号{}` 对其进行包裹
```javascript
    // 没有参数时
    const fn1Name = () => {};

    // 一个参数时
    const fn2Name = arg1 => {};

    // 多个参数时
    const fn3Name = (arg1, arg2) => {};

    // 一条执行语句
    const fn4Name = () => statement;

    // 一条执行语句，且是对象
    const fn5Name = () => ({ name: 'Mike', age: 29 });

    // 多条执行语句
    const fn6Name = () => { statements };
```
- 与 function 声明函数的不同点
    - 箭头函数 `没有内部的this` ，导致在调用 `this` 时，只能沿着作用域链查找this
        - 由于没有内部this，所以无法通过 `call` `apply` `bind` 改变箭头函数的this
    - 箭头函数 `不能当作构造函数`
    - 箭头函数 `不能使用arguments` ，只能使用 `rest参数` 代替
```javascript
    const obj = {
        name: 'obj',
        fn: () => {
            return this;
        }
    };

    obj.fn(); // window    obj.fn作用域链：1. obj.fn；2. window    return this时，由于箭头函数没有this，所以只能沿着作用域链向上查找，找到window

    obj.fn.call(obj); // window    通过call无法改变其this指向
```
