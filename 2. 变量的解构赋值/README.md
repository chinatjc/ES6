### 解构赋值

> 解构赋值：将 `属性/值` 从 `对象/数组` 中取出，`赋值给其他变量`
```javascript
    let [x, y] = [1, 2];
    let { name } = { name: 'Mike' };

    console.log(x, y); // 1, 2
    console.log(name); // 'Mike'
```

<br>

> `等式左侧的变量` 没有对应 `等式右侧的属性/值` 并且 `变量没有默认值`，那么变量就会被 `赋值undefined`
```javascript
    let [x, y] = [1];

    console.log(x, y); // 1, undefined
```

<br>

> 解构赋值，支持 `不完全解构`，即 `属性/值` 只匹配了一部分 `变量`
```javascript
    let [x, y] = [1, 2, 3];

    console.log(x, y); // 1, 2    等式右侧的 3 没有匹配到变量，但是不影响解构赋值的正常进行
```

<br>

> 解构赋值，支持 `默认值`，即 `当等式右侧的值为undefined时，等式左侧变量的默认值才会生效`
- `等式左侧变量的默认值` 可以 `引用解构赋值的其他变量`，但是该 `变量必须已经声明`，否则会产生变量的 `暂时性死区`
- 当 `默认值是函数表达式` 时，那么函数表达式是 `惰性` 的，只有当该 `默认值被使用` 时，才会 `执行该函数表达式`
```javascript
    let [x=1, y=2] = ['x'];
    let [a=b, b=2] = [undefined, 'b']; // Uncaught ReferenceError: Cannot access 'b' before initialization    在b未声明之前，就引用b作为a的默认值
    let [c, d=c] = ['c'];

    console.log(x, y); // 'x', 2    根据解构赋值的规则，x='x'、y=undefined，变量为undefined时，变量的默认值会生效，所以最后返回：'x', 2
    console.log(c, d); // 'c', 'c'    d=c，在c作为变量d的默认值之前，c已经声明了



    // 默认值是函数表达式时，具有惰性
    const returnNow = () => new Date();
    let [e=returnNow()] = []; // 变量e被赋值undefined，此时默认值生效，执行returnNow函数，返回值赋值给变量e
```

<br>

> 解构赋值的两种模式
- 数组的解构赋值
    - 按照数组 `各个元素的位置` 进行解构赋值：`相同位置`，`等式右侧的属性/值` 赋值给 `等式左侧的变量`
- `对象的解构赋值`
    - 按照 `对象的属性名` 进行解构赋值：`对象结构、属性名都相同`，`等式右侧属性名对应的属性/值` 赋值给 `等式左侧相同属性名对应的变量`
    - `等式左侧` 有多个 `相同属性名`，则 `等式右侧` `依次` 对其进行 `解构赋值`
    - `对象的解构赋值`，可以取到 `对象 原型对象的属性`
    - 注意点
        - 对象的解构赋值 `未使用声明语句`，为了避免歧义，需要用 `括号对其进行包裹`
```javascript
    let [x, y] = [1, 2];

    let { name: firstName, age: age, valueOf: valueOf } = { name: 'Mike', age: 29 };

    ({ z } = { z: 1}); // 未使用声明语句，必须用 括号 对其进行包裹，避免歧义

    const {
        p,
        p: [a],
        p: [b, c],
        p: [
            d,
            {
                y: e
            }
        ]
    } = {
        p: [
            'Hello',
            {
                y: 'World'
            }
        ]
    };

    console.log(x, y); // 1, 2

    console.log(firstName, age); // 'Mike', 29
    console.log(valueOf); // "function valueOf() { [native code] }"    取到对象原型对象上的属性valueOf

    // 等式右侧 依次 对等式左侧相同属性名进行 解构赋值
    console.log(p); // [ 'Hello', { y: 'World' } ]
    console.log(a); // 'Hello'
    console.log(b); // 'Hello'
    console.log(c); // { y: 'World' }
    console.log(d); // 'Hello'
    console.log(e); // 'World'




    const obj = {};
    const arr = [];
    ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true }); // 123 -> {prop}    true -> arr[0]

    console.log(obj); // { prop: 123 }
    console.log(arr); // [true]
```

<br>

> 包装对象的解构赋值
- String、Boolean、Number，先转化为包装对象，再进行解构赋值
```javascript
    const { length } = '123';
    const { toString } = true;
    const { valueOf } = 1;

    console.log(length); // 3
    console.log(Boolean.prototype.toString === toString); // true
    console.log(Number.prototype.valueOf === valueOf); // true
```

<br>

> undefined, null 的解构赋值
- 无法转化为对象，无法进行解构赋值

<br>

> 函数参数的解构赋值
- 函数参数具有解构赋值的功能
```javascript
    function move({ x=0, y=0 } = {}) {
        return [x, y];
    }

    move({ x: 2, y: 3 }); // [2, 3]
    move({ x: 2 }); // [2, 0]
    move({}); // [0, 0]
    move(); // [0, 0]
```

<br>

> 圆括号的问题
- 尽量不要在 `解构赋值` 中添加 `不必要` 的 `圆括号`

<br>

> 用途
- 交换变量的值
```javascript
    let x = 1;
    let y = 2;

    [y, x] = [x, y];

    console.log(x, y); // 2, 1
```
- 从对象或者数组中，提取需要的值
```javascript
    const { parse, stringify } = JSON; // 从JSON对象中解构赋值出parse、stringify方法
```








