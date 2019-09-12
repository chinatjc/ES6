### Iterator 和 for...of 循环

- Iterator接口（遍历器），统一、简便访问 `各种数据结构`
- Iterator接口，返回遍历器对象，通过不断调用遍历器对象的next方法，直到数据结构的结束位置
- 一个数据结构具有 `Symbol.iterator` 属性，就可以认为是 `iterator（可遍历的）`
- `for of` 是ES6的一种新的遍历命令
- Iterator接口，主要供 `for of` 消费
- 原生具备 Iterator 接口的数据结构：
	- Array
	- Set
	- Map
	- String
	- function arguments 对象
	- NodeList 对象
- `Symbol.iterator` 接口返回的 `不是遍历器生成函数` ，解释引擎会 `报错`
```javascript
    // 一个类自定义了遍历器对象
    class RangeIterator {
        constructor(start, stop) {
            this.start = start;
            this.stop = stop;
        }
        [Symbol.iterator]() {
            let count = 0;
            const next = () => {
                const value = this.start + count++;
                return value > this.stop ? { value: undefined, done: true } : { value, done: false };
            };

            return { next };
        }
    }


    function range(start, stop) {
        return new RangeIterator(start, stop);
    }

    const { next } = range[0, 3];
    next(); // { value: 0, done: false }
    next(); // { value: 1, done: false }
    next(); // { value: 2, done: false }
    next(); // { value: 3, done: false }
    next(); // { value: undefined, done: true }

    for(let value of range(3, 5)) {
        console.log(value);
    }
    // 3, 4, 5
```
