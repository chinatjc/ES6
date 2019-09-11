### Reflect

- 为了操作对象而提供的新API
- 让操作对象的内部方法，部署到Reflect对象上，对象的指责更加明确
- 命令式操作 -> 函数式操作

<br>

> Reflect.get(target, name, receiver)
- 参数以依次为：`目标对象`、`查找的属性名`、`读取函数（getter）的this`
- 返回 `target[name]`
- `target` 参数不是对象，Reflect.get方法会 `报错`
```javascript
    const myObject = {
        foo: 1,
        bar: 2,
        get baz() {
            return this.foo + this.bar;
        }
    };

    const myReceiverObject = {
        foo: 4,
        bar: 4,
    };

    Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

<br>

> Reflect.set(target, key, value, receiver)
- 参数以依次为：`目标对象`、`set的属性名`、`set的属性值`、`写入函数（setter）的this`
- 设置对象属性的属性值
- `target` 参数不是对象，Reflect.set方法会 `报错`
```javascript
    const myObject = {
        foo: 4,
        set bar(value) {
            return this.foo = value;
        }
    };

    const myReceiverObject = {
        foo: 0
    };

    Reflect.set(myObject, 'bar', 1, myReceiverObject);

    myObject.foo // 4
    myReceiverObject.foo // 1
```

<br>

> Reflect.has(target, key)
- 参数以依次为：`目标对象`、`查询的属性名`
- 对应name in obj里面的in运算符
- `target` 参数不是对象，Reflect.has方法会 `报错`
```javascript
    const myObject = {
        foo: 1
    };

    // 旧写法
    'foo' in myObject; // true

    // 新写法
    Reflect.has(myObject, 'foo'); // true
```

<br>

> Reflect.apply(func, thisArg, args)
- 参数以依次为：`目标函数`、`目标函数的this`、`以数组形式传入参数`
- 调用函数func，并且设置其作用域的this对象，和传入的参数args
```javascript
    function fn(...args) {
        return `${this.name}: ${args.reduce((sum, n) => sum + n)}`;
    }

    Reflect.apply(fn, {name: 'sum'}, [1, 2, 3, 4]); // sum: 10
```

<br>

> Reflect.ownKeys(target)
- 参数以依次为：`目标函数`
- 返回目标对象target的所有属性名，包括Symbol数据类型
- `target` 参数不是对象，Reflect.ownKeys方法会 `报错`
```javascript
    const myObject = {
        foo: 1,
        bar: 2,
        [Symbol.for('baz')]: 3,
        [Symbol.for('bing')]: 4
    };

    Reflect.ownKeys(myObject); // ['foo', 'bar', Symbol(baz), Symbol(bing)]
```
