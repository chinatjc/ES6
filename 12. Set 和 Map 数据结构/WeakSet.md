### WeakSet 数据结构

- WeakSet 与 Set 类似， `不会有重复的值` ；WeakSet `成员` `只能是对象`，不能是其他类型的值，否则会 `报错`
```javascript
    const ws1 = new WeakSet(); // WeakSet {}
    const ws2 = new WeakSet([[1], [2]]); // WeakSet {Array(1), Array(1)}
```
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对对象的引用；即使WeakSet唯一引用了该对象，垃圾回收机制也会回收该对象的内存
- WeakSet 成员会被垃圾回收机制回收，所以 `WeakSet不可遍历`

<br>

> WeakSet.prototype.add 方法
- `ws = ws.add(objValue)`
- 添加某个对象值，返回 `WeakSet实例`
```javascript
    const ws = new WeakSet();
    const wsAdd = ws.add(new Date());

    wsAdd === ws; // true
```

<br>

> WeakSet.prototype.delete 方法
- `deleteResult = ws.delete(objValue)`
- 删除某个对象值，返回 `true / false`，表示删除成功与否
```javascript
    const ws = new WeakSet(Date);
    ws.delete(Date); // true
    ws.delete(Array); // false
```

<br>

> WeakSet.prototype.has 方法
- `hasResult = ws.has(objValue)`
- 查询某个对象值，返回 `true / false`，表示是否查询到该对象值
```javascript
    const ws = new WeakSet(Date);
    ws.has(Date); // true
    ws.has(Array); // false
```

<br>

> 实例
- 由于 WeakSet的对象成员 都是弱引用，因此无需考虑 WeakSet 对象引用的问题
```javascript
    const ws = new WeakSet();

    class Instance {
        constructor() {
            ws.add(this);
        }
        method() {
            if (ws.has(this)) {
                throw new TypeError('Instance.prototype.method 只能在Instance实例上调用');
            }
            return 'running at new Instance()';
        }
    }

    const instance = new Instance();


    instance.method(); // 'running at new Instance()'

    const method = instance.method; // 'running at new Instance()'
    method(); // Uncaught TypeError: Instance.prototype.method 只能在Instance实例上调用
```
