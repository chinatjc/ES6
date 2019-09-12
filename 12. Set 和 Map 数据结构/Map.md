### Map 数据结构

- ES6提供了新的数据结构 `Map`，类似于对象，是键值对的集合；但是 `键` 的范围 `不限于字符串` ，任何数据类型都可以当作 `键`
- Map函数接收一个数组作为参数，用来初始化，`map = new Map([[key1, value1], [key1, value1] ... ])`
- Map值，可以正确识别出NaN，即 `NaN === NaN`
```javascript
    const map1 = new Map(); // Map(0) {}
    const map2 = new Map([[Date, 'time'], [RegExp, 'reg']]); // Map(2) {ƒ => 'time', ƒ => 'reg'}
```

<br>

> Map.prototype.size 属性
- `mapSize = map.size`
- 返回Map实例的成员总数
```javascript
    const map = new Map([['foo', true], ['bar', false]]);

    map.size; // 2
```

<br>

> Map.prototype.set 方法
- `map = map.set(key, value)`
- 添加键值对，返回 `Map实例`
```javascript
    const map = new Map();
    const mapAdd = map.set(1, 'one');

    mapAdd === map; // true
```

<br>

> Map.prototype.get 方法
- `value = map.get(key)`
- 读取key对应的value，返回 `value`
```javascript
    const map = new Map([[1, 'one']]);
    map.get(1); // 'one'
```

<br>

> Map.prototype.has 方法
- `hasResult = map.has(key)`
- 查询该键名是否在 Map 中，返回 `true / false`，表示是否查询到该键名
```javascript
    const map = new Map([[1, 'one'], [2, 'two']]);
    map.has(1); // true
    map.has(0); // false
```

<br>

> Map.prototype.delete 方法
- `deleteResult = map.delete(value)`
- 删除某个值，返回 `true / false`，表示删除成功与否
```javascript
     const map = new Map([[1, 'one'], [2, 'two']]);
     map.delete(1); // true
     map.delete(0); // false
```

<br>

> Map.prototype.clear 方法
- `map.clear()`
- 清除所有成员，返回值，始终为undefined
```javascript
    const map = new Map([[1, 'one'], [2, 'two']]);
    map.clear(); // undefined
    map.size; // 0
```

<br>

> Map.prototype.keys、Map.prototype.values、Map.prototype.entries
- `keys方法`、`values方法`、`entries方法`，返回的都是遍历器对象
- Map 结构 `默认的遍历器生成函数` 就是 `Map.prototype.entries`
```javascript
    const map = new Map([
        ['1', 'one'],
        ['2', 'two'],
        ['3', 'three']
    ]);

    for(let key of map.keys()) {
        console.log(key);
    }
    // '1', '2', '3'

    for(let value of map.values()) {
        console.log(value);
    }
    // 'one', 'two', 'three'

    for(let item of map.entries()) {
        console.log(item);
    }
    // ['1', 'one'], ['2', 'two'], ['3', 'three']





    // Map 结构 默认的遍历器生成函数 就是 Map.prototype.values

    Map.prototype[Symbol.iterator] === Map.prototype.entries; // true

    for(let value of map) {
        console.log(value);
    }
    // ['1', 'one'], ['2', 'two'], ['3', 'three']
```

<br>

> Map.prototype.forEach 方法
- `map.forEach((value, key, map) => {statement}[, thisArg])`
- 其用法和 Array.prototype.forEach 一样
```javascript
    const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

    map.forEach((value, key, map) => {
        console.log(`${key}, ${value}, ${map}`);
    });
    // 1, one, [object Map]
    // 2, two, [object Map]
    // 3, three, [object Map]
```

<br>

> 扩展运算符
- `[...map]`
- 扩展运算符用于Map结构时，可以展开其成员
```javascript
    const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

    [...map]; // [[1, 'one'], [2, 'two'], [3, 'three']]
```
