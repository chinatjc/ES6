### WeakMap 数据结构

- WeakMap 与 Map 类似， `生成键值对的集合` ；WeakMap `键名` `只能是对象(null除外)`，不能是其他类型的值，否则会 `报错`
```javascript
    const wm1 = new WeakMap(); // WeakMap {}
    const wm2 = new WeakMap([[Date, 'time'], [RegExp, 'reg']]); // WeakMap {ƒ => 'reg', ƒ => 'time'}
```
- WeakMap 中的键名所引用的对象都是弱引用，即垃圾回收机制不考虑WeakMap对 `对象数据类型键名` 的引用；即使WeakMap键名唯一引用了该对象，垃圾回收机制也会回收该对象的内存
- WeakMap 键名对象会被垃圾回收机制回收，所以 `WeakMap不可遍历`

<br>

> WeakMap.prototype.set 方法
- `wm = wm.set([objectKey, value])`
- 添加键值对，返回 `WeakMap实例`
```javascript
    const wm = new WeakMap();
    const wmAdd = wm.set([Date, 'time']);

    wmAdd === wm; // true
```

<br>

> WeakMap.prototype.get 方法
- `wm = wm.get(objectKey)`
- 读取objectKey对应的value，返回 `value`
```javascript
    const wm = new WeakMap([[Date, 'time']]);
    wm.get(Date); // 'time'
```

<br>

> WeakMap.prototype.delete 方法
- `deleteResult = wm.delete(objValue)`
- 删除某个对象值，返回 `true / false`，表示删除成功与否
```javascript
    const wm = new WeakMap([[Date, 'time']]);
    wm.delete(Date); // true
    wm.delete(Array); // false
```

<br>

> WeakMap.prototype.has 方法
- `hasResult = wm.has(objValue)`
- 查询某个对象值，返回 `true / false`，表示是否查询到该对象值
```javascript
    const wm = new WeakMap([[Date, 'time']]);
    wm.has(Date); // true
    wm.has(Array); // false
```

<br>

> 实例
- 由于 WeakMap的键名对象 都是弱引用，因此无需考虑 WeakMap 对象引用的问题
```javascript
    const wm = new WeakMap();

    const ele = document.querySelector('.logo');

    wm.set(ele, {count: 0})

    ele.addEventListener('click', (e) => {
    	const ele = e.target;
    	wm.get(ele).count++;
    });
```
