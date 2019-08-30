### 对象的新增方法

<br>

> Object.is
- `boolean = Object.is(value1, value2)`
- 判断两个值是否严格相等
- 注意点：`0 不等于 -0`、`NaN 等于 NaN`
```javascript
    Object.is(0, -0); // false
    Object.is(NaN, NaN); // true
```

<br>

> Object.assign
- `target = Object.assign(target[, source1][, source2]...)`
- 将source对象 `自身（非原型）` 、 `可遍历（enumerable为true）` 的属性， `浅拷贝` 到 `target` 对象上
```javascript
    const target = { a: 1 };

    const source1 = { b: 2 };
    const source2 = { c: 3 };

    Object.assign(target, source1, source2);
    target; // {a:1, b:2, c:3}
```
- 使用Object.assign会存在 `同名属性替换的问题`
```javascript
    const target = { a: { b: 'c', d: 'e' } };
    const source = { a: { b: 'hello' } };
    Object.assign(target, source);
    target; // { a: { b: 'hello' } }    target.a 被后面的 source.a替换了
```
- Object.assign 只进行值的复制，如果是复制的是一个 `取值器（getter）` ，那么将 `先求值再复制`
```javascript
    const source = {
      get foo() { return 1 }
    };
    const target = {};

    Object.assign(target, source); // { foo: 1 }
```

<br>

> Object.getOwnPropertyDescriptors()
- `descriptorsObj = Object.getOwnPropertyDescriptors(obj)`
- 返回对象 `自身（非原型）` 的所有属性的描述对象
```javascript
    const obj = {
      foo: 123,
      get bar() { return 'abc' }
    };

    Object.getOwnPropertyDescriptors(obj);
    // {
    //     foo: {
    //         value: 123,
    //         writable: true,
    //         enumerable: true,
    //         configurable: true
    //     },
    //     bar: {
    //         get: [Function: get bar],
    //         set: undefined,
    //         enumerable: true,
    //         configurable: true
    //     }
    // }
```

<br>

> Object.setPrototypeOf()
- `object = Object.setPrototypeOf(object, prototypeObject)`
- 设置对象的原型对象，并且返回该对象
- `修改对象的构造函数`
```javascript
    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    obj.x // 10
    obj.y // 20
    obj.z // 40
```

<br>

> Object.values()
- `valuesList = Object.values(obj)`
- 返回对象 `自身（非原型）` 、 `可遍历（enumerable为true）` 的属性的键值数组
```javascript
    const obj = { foo: 'bar', baz: 42 };
    Object.values(obj); // ['bar', 42]
```

<br>

> Object.entries()
- `keysValuesList = Object.entries(obj)`
- 返回对象 `自身（非原型）` 、 `可遍历（enumerable为true）` 的属性的键值对数组
```javascript
    const obj = { foo: 'bar', baz: 42 };
    Object.entries(obj); // [['foo', 'bar'], ['baz', 42]]
```

<br>

> Object.fromEntries()
- `obj = Object.fromEntries(keysValuesList)`
- 将 `键值对数组` 转换为 `对象`
```javascript
    const keysValuesList = [['foo', 'bar'], ['baz', 42]];
    Object.fromEntries(keysValuesList); // {foo: 'bar', baz: 42}
```


