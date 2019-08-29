### 数组的扩展

> 数组扩展运算符
- `...array`
- 数组&nbsp;&nbsp;&nbsp;->&nbsp;&nbsp;&nbsp;参数序列
- 当数组为 `空数组[]` ，`不产生任何效果`
```javascript
    const list1 = [1, 2, 3];
    const list2 = [4, 5, 6];

    const newList = [...list1, ...list2, ...[]];
    newList; // [1, 2, 3, 4, 5, 6]    空数组[] 不产生任何效果
```
- 数组扩展运算符可以解决， `函数传入大量参数` 的问题，代码 `简洁` `明了`
```javascript
    const list = [2, 5, 1, 3, 8];

    Math.min(...list); // 1
    Math.max(...list); // 8
```
- `数组扩展运算符` 和 `解构赋值` 结合使用
    - `数组扩展运算符的变量` 在 `解构赋值` 中默认值为 `空数组[]`
    - `数组扩展运算符的变量` 在 `解构赋值` 中 `只能作为最后一个参数`
```javascript
    const [first, ...rest] = [1, 2, 3, 4, 5];

    first; // 1
    rest; // [2, 3, 4, 5]



    const [first, ...rest] = [];

    first; // undefined    在数组解构赋值中，变量的默认值为 undefined
    rest; // []    在数组解构赋值中，数组扩展运算符的变量的默认值为 空数组 []



    const [first, ... rest, last] = [1, 2, 3, 4, 5]; // Uncaught SyntaxError: Rest element must be last element
```
- `数组扩展运算符` 作用于 `字符串`
    - 可以正确识别 `unicode辅助平面字符`
```javascript
    [...'hello']; // ['h', 'e', 'l', 'l', 'o']

    [...'a𠮷b'].length; // 3    正确识别 unicode辅助平面字符的问题
```

<br>

> Array.of 方法
- `array = Array.of([arg1][, arg2][, arg3]...)`
- 用于将接收的参数转化数组； `Array.of 无参数` 时，返回 `空数组[]`
```javascript
    Array.of();          // []
    Array.of(undefined); // [undefined]
    Array.of(1, 2, 3);   // [1, 2, 3]
```

<br>

> 实例方法 find
- `result = array.find(fn[, thisArg])`
- fn函数的参数： `item` 、 `index` 、 `array`
- 通过fn函数查找array中符合要求的数组项
    - fn函数返回false时，表示不符合查找要求，继续查找下一数组项
    - fn函数返回true时，表示符合查找要求， `立即停止数组遍历` ，array.find函数返回该数组项
    - `未找到符合要求的数组项` ，则返回 `undefined`
- `thisArg` ，`可以修改fn函数的this指向` （箭头函数不支持）
```javascript
    const list = [1, 5, 10, 15];

    list.find((value, index, list) => value > 9); // 10
    list.find((value, index, list) => value > 20); // undefined    未找到符合要求的数组项，返回undefined
```

<br>

> 实例方法 findIndex
- `result = array.findIndex(fn[, thisArg])`
- fn函数的参数： `item` 、 `index` 、 `array`
- 通过fn函数查找array中符合要求的数组项
    - fn函数返回false时，表示不符合查找要求，继续查找下一数组项
    - fn函数返回true时，表示符合查找要求， `立即停止数组遍历` ，array.findIndex函数返回 `该数组项的索引值`
    - `未找到符合要求的数组项` ，则返回 `-1`
- `thisArg` ，`可以修改fn函数的this指向` （箭头函数不支持）
```javascript
    const list = [1, 5, 10, 15];

    list.findIndex((value, index, list) => value > 9); // 2
    list.findIndex((value, index, list) => value > 20); // -1    未找到符合要求的数组项，返回-1
```

<br>

> 实例方法 fill
- `array.fill(fillValue[, startIndex][, endIndex])`
- fillValue 填充 `[startIndex, endIndex)` 位置的数组项；`默认值填充全部数组项`
- `返回填充后的数组`，`且原数组被改动`
```javascript
    // 快速创建项数为n的数组
    Array(n).fill('');


    const list = [1, 2, 3, 4];
    const returnList = list.fill('-', 1, 3); // [1, '-', '-', 4]
    returnList === list; // true    原数组被改动
```

<br>

> 实例方法 includes
- `result = array.includes(value[, startIndex])`
- value 是否是array数组的某一项，返回结果：`true`、`false`
- `startIndex` 表示开始查找的位置，`默认为0`
- 相比较indexOf方法， `includes` 方法更加 `语义化`
- includes方法可以 `正确处理NaN`
```javascript
    [1, 2, NaN].includes(NaN); // true    可以正确处理NaN
    [1, 2, NaN].includes(1, 2); // false  从索引为2的位置，开始查找是否有1
    [1, 2, NaN].includes(-1); // false    未找到-1
```

<br>

> 实例方法 flat
- `flatArray = array.flat(n)`
- `array` 中数组项， `数组维度减少n` ，组成新的数组，并返回
- n 参数默认为 1
- 如果想把所有的数组项转成一维数组，可以传入 Infinity 关键字
```javascript
    [[1], [2], [3]].flat(); // [1， 2， 3]    数组各项的维度减少1，则组成新数组[1, 2, 3]

    [1, [2], [[3]], [[[4]]], [[[[5]]]]].flat(Infinity); // [1, 2, 3, 4, 5]
```
