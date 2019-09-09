### Set 数据结构

- ES6提供了新的数据结构 `Set`，类似于数组，但是 `成员值必须是唯一的，没有重复值`
- Set函数接收一个数组作为参数，用来初始化，`set = new Set([array])`
- Set值，可以正确识别出NaN，即 `NaN === NaN`
```javascript
    const set1 = new Set(); // Set(0) {}
    const set2 = new Set([1, 2, 3, 2, NaN, null, NaN]); // Set(5) {1, 2, 3, NaN, null}
```
- 由于 `Set` 结构 `没有键名` ， `只有键值` ，所以键名和键值完全一致

<br>

> Set.prototype.size 属性
- `setSize = set.size`
- 返回Set实例的成员总数
```javascript
    const set = new Set([1, 2, 3]);

    set.size; // 3
```

<br>

> Set.prototype.add 方法
- `set = set.add(value)`
- 添加某个值，返回 `Set实例`
```javascript
    const set = new Set();
    const setAdd = set.add(1);

    setAdd === set; // true
```

<br>

> Set.prototype.delete 方法
- `deleteResult = set.delete(value)`
- 删除某个值，返回 `true / false`，表示删除成功与否
```javascript
     const set = new Set([1, 2, 3, 4]);
     set.delete(1); // true
     set.delete(0); // false
```

<br>

> Set.prototype.has 方法
- `hasResult = set.has(value)`
- 查询该值是否为 Set 的成员，返回 `true / false`，表示是否查询到该值
```javascript
    const set = new Set([1, 2, 3, 4]);
    set.has(1); // true
    set.has(0); // false
```

<br>

> Set.prototype.clear 方法
- `set.clear()`
- 清除所有成员，返回值，始终为undefined
```javascript
    const set = new Set([1, 2, 3, 4]);
    set.clear(); // undefined
    set.size; // 0
```

<br>

> Set.prototype.forEach 方法
- `set.forEach((value, key, set) => {statement}[, thisArg])`
- 其用法和 Array.prototype.forEach 一样
```javascript
    const set = new Set([5, 6, 7, 8, 9]);

    set.forEach((value, key, set) => {
        console.log(`${key}, ${value}, ${set}`);
    });
    // 5, 5, [object Set]
    // 6, 6, [object Set]
    // 7, 7, [object Set]
    // 8, 8, [object Set]
    // 9, 9, [object Set]
```

<br>

> 扩展运算符
- `[...set]`
- 扩展运算符用于Set结构时，可以展开其成员
```javascript
    const set = new Set([3, 4, 5, 6, 7, 3, 4]);

    [...set]; // [3, 4, 5, 6, 7]    数组去重
```
