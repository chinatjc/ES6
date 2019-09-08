### Symbol

- ES6 引入了一个新的原始数据类型 `Symbol`
- 创建symbol类型的值：`symbolValue = Symbol(str)`
```javascript
    const s1 = Symbol('foo');

    typeof s1; // 'symbol'
```
- str不是String类型的数据时，通过 `String方法` 转化为 `String类型的数据`
- Symbol函数接收一个字符串作为参数，表示对 Symbol 实例的描述；当Symbol数据转为字符串时，易于区分
```javascript
    const s1 = Symbol('foo');
    const s2 = Symbol('bar');

    s1.toString(); // 'Symbol(foo)'
    s2.toString(); // 'Symbol(bar)'
```
- `Symbol创建的数据` 是 `独一无二` 的值；即使 `str` 相同，值也不同
```javascript
    const s1 = Symbol('foo');
    const s2 = Symbol('foo');

    s1 === s2; // false
```
- Symbol 值不能与其他类型的值进行运算，否则会 `报错`
```javascript
    const s1 = Symbol('foo');

    `Symbol('foo') -> ${s1}`; // Uncaught TypeError: Cannot convert a Symbol value to a string
```
- Symbol 值可以转为 String 值
```javascript
    const s1 = Symbol('foo');

    s1.toString(); // 'Symbol(foo)'
```
- Symbol 值可以转为 Boolean 值
```javascript
    const s1 = Symbol('foo');

    !s1; // false
    !!s1; // true
```

<br>

> Symbol.prototype.description
- 返回 Symbol值的 str
```javascript
    const s1 = Symbol('foo');

    s1.description; // 'foo'
```

<br>

> 作为属性名的Symbol
- 使用 Symbol值 作为对象属性名，可以防止对象属性名冲突的情况
- 读取 or 写入 Symbol值的属性，需要使用 `方括号[]`
```javascript
    const s1 = Symbol('customizeFn');

    const obj = {};
    obj[s1] = () => {};
```

<br>

> 遍历 Symbol值 的属性名
- 普通的属性名遍历方法 无法遍历到 Symbol值的属性名
- Object.getOwnPropertySymbols，遍历对象 Symbol值 的属性名
```javascript
    const s1 = Symbol('s1');
    const s2 = Symbol('s2');

    const obj = {
        [s1]: 's1',
        [s2]: 's2',
        name: 'obj'
    };

    Object.keys(obj); // ['name']
    Object.getOwnPropertySymbols(obj); // [Symbol(s1), Symbol(s2)]
```

> Symbol.for()
- Symbol.for方法
    - 接收一个字符串str作为参数
    - 在 `全局环境（iframe、sw都共享的全局环境）` 下查询有无该str作为名称的Symbol值
        - 如果有，返回该Symbol值
        - 如果没有，新建一个以str作为参数的Symbol值，在 `全局环境` 下注册：名称为str、值为新建的Symbol值，并且返回该Symbol值
- Symbol 方法新建的Symbol值，不会在 `全局环境` 下注册，因此每个Symbol方法新建的Symbol值，都不相等
```javascript
    const s1 = Symbol.for('s1'); // 新建Symbol('s1')，并且在全局环境下注册：名称为s1、值为该新建的Symbol值
    const s2 = Symbol.for('s1'); // 在全局环境下，可以查询到名称为s1的Symbol值，因此返回该Symbol值

    s1 === s2; // true



    const s3 = Symbol.for('s3');
    const s4 = Symbol.for('s3');

    s3 === s4; // false
```

<br>

> Symbol.hasInstance
- 当对象有[Symbol.hasInstance]方法时，执行 `value instanceof thisObj` 命令时，调用的是该方法，传入的参数为 `value`
```javascript
    const myObj = {
        [Symbol.hasInstance](value) {
            return value instanceof Array
        }
    };

    1 instanceof myObj; // true
```

<br>

> Symbol.isConcatSpreadable
- 设置的对象的Symbol.isConcatSpreadable属性值为true、false，以决定在使用Array.prototype.concat( )时，是否可以展开数组
```javascript
    const arr1 = ['c', 'd'];
    const arr2 = ['c', 'd'];
    arr2[Symbol.isConcatSpreadable] = false;

    ['a', 'b'].concat(arr1); // ['a', 'b', 'c', 'd']
    ['a', 'b'].concat(arr2); // ['a', 'b', ['c', 'd']]    因为Symbol.isConcatSpreadable为false，所以arr2不展开数组
```

<br>

> Symbol.match
- 当对象有[Symbol.match]方法时，执行 `value.match(thisObj)` 命令时，调用的是该方法，传入的参数为 `value`
```javascript
    const myObj = {
        [Symbol.match](value) {
            return 'hello world'.indexOf(value);
        }
    };

    'e'.match(myObj); // 1
```

<br>

> Symbol.replace
- 当对象有[Symbol.replace]方法时，执行 `value1.replace(thisObj, value2)` 命令时，调用的是该方法，传入的参数为 `value1, value2`
```javascript
    const myObj = {
        [Symbol.replace](value1, value2) {
            return 'hello world'.replace(value1, value2);
        }
    };

    'world'.replace(myObj, 'China'); // 'hello China'
```

<br>

> Symbol.search
- 当对象有[Symbol.search]方法时，执行 `value.search(thisObj)` 命令时，调用的是该方法，传入的参数为 `value`
```javascript
    const myObj = {
        [Symbol.search](value) {
            return 'hello world'.includes(value);
        }
    };

    'world'.search(myObj); // true
```


<br>

> Symbol.split
- 当对象有[Symbol.split]方法时，执行 `value.split(thisObj)` 命令时，调用的是该方法，传入的参数为 `value`
```javascript
    const myObj = {
        [Symbol.split](value) {
            return 'name=Mike&age=29'.split('&');
        }
    };

    '&'.split(myObj); // ['name=Mike', 'age=29']
```

<br>

> Symbol.toPrimitive
- 当对象需要转为原始类型的值时，调用该方法
- Symbol.toPrimitive被调用时，会接收一个字符串参数，表示当前运算的模式，一共有三种模式
    - Number：该场合下需要转成数值
    - String：该场合下需要转成字符串
    - Default：该场合下可以转成字符串，也可以转成数值
```javascript
    const obj = {
        [Symbol.toPrimitive](hint) {
            switch (hint) {
                case 'number':
                    return 123;
                case 'string':
                    return 'str';
                case 'default':
                    return 'default';
                default:
                    throw new Error();
            }
        }
    };

    2 * obj; // 236
    `${obj}`; // 'str'
    obj == 'default'; // true
```

<br>

> Symbol.toStringTag
- 该属性用于指定对象的类型，即[object ObjectType]中的ObjectType
```javascript
    class Collection {
        get [Symbol.toStringTag]() {
            return 'abc';
        }
    }

    Object.prototype.toString.call(new Collection()); // [object abc]
```
