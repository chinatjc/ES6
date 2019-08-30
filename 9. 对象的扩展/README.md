### 对象的扩展

<br>

> 对象属性的简洁表示法
- 在对象属性中，可以直接写变量： `变量名` 作为 `对象属性名` ， `变量值` 作为 `对象属性值`
```javascript
    const name = 'Mike';
    const age = 29;

    const person = {name, age}; // {name: 'Mike', age: 29}
```
- 在对象中方法也可以简写
```javascript
    const obj = {
        age: 29,
        sayhello() {
            console.log('hello world');
        }
    };

    // 相当于 =》

    const obj = {
        age: 29,
        sayhello: function() {
            console.log('hello world');
        }
    };
```
- 对象中可以简写属性的取值器（getter）、赋值器（setter）
    - 只能以 `对象方法简写的形式` 设置属性的 get、set
```javascript
    const obj = {
        _year: 2018
    };

    Object.defineProperty(obj, 'year', {
        configurable: true,
        enumerable: true,
        get: function() {
            return this._year;
        },
        set: function(value) {
            this._year = value;
        }
    });

    // 简写 等价于 =》

    const obj = {
        _year: 2018,
        get year() {
            return this._year;
        },
        set year(value) {
            this._year = value;
        }
    };

    obj.year; // 2018
    obj.year = 2019;
    obj.year; // 2019

    Object.getOwnPropertyDescriptor(obj, 'year'); // {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

<br>

> 属性名表达式
- 在对象字面量中定义属性名，可以通过 `[ 表达式 ]` 的形式，`表达式` 最后都会通过 `String` 转换为 `string类型的数据`
```javascript
    const key1 = 'h';
    const key2 = 'ello';

    const obj = {
        [key1 + key2]: 'hi'
    }; // {hello: 'hi'}
```

<br>

> 对象扩展运算符
- 用于取出对象 `自身（非原型）` 、 `可遍历（enumerable为true）` 的属性， `浅拷贝` 到当前对象中
    - 对象扩展运算符作用于 `非对象数据类型的数据` 时，通过 `Object` 转化为 `对象` ，再进行 `对象扩展运算`
```javascript
    function Person() {
        this.name = 'person';
    }

    Person.prototype.job = 'fe';

    const person = new Person();

    Object.defineProperty(person, 'age', {
        enumerable: false,
        value: 29
    });


    const newPerson = {...person};
    newPerson.name; // 'person'
    newPerson.job; // undefined    原型对象的属性 无法通过 对象扩展运算符 取出
    newPerson.age; // undefined      属性不可遍历 无法通过 对象扩展运算符 取出




    {...true};      // {}    Object(true) -> Boolean {true}
    {...undefined}; // {}    Object(undefined) -> {}



    const obj1 = {name: 'Mike'};
    const obj2 = {age: 29};
    {...obj1, ...obj2}; // {name: 'Mike', age: 29}    对象扩展运算符可以用于合并n个对象
```

<br>

> 对象扩展运算符 应用于 解构赋值
- 用于将 `赋值命令右侧` 对象 `自身（非原型）` 、 `可遍历（enumerable为true）` 的但 `尚未被读取` 的属性分配到 `对象扩展运算变量上`
```javascript
    const {name, ...info} = {name: 'Mike', age: 29, job: 'fe'};

    name; // 'Mike'
    info; // {age: 29, job: 'fe'}
```
- 在解构赋值中，`对象扩展运算符对应的变量` 必须是 `最后一个变量` ，否则会报错
```javascript
    const {name, ...info, job} = {name: 'Mike', age: 29, job: 'fe'}; // Uncaught SyntaxError: Rest element must be last element
```
