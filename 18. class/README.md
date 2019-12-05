### Class

> 含义

- ES6 的 ``class`` 可以看作是 ES5 的一个语法糖
- ``class`` 必须使用 ``new`` 调用，否则会报错
- ``class`` 完全可以看作是构造函数的另一种写法
- ``class`` 内部定义的方法不需要用逗号(,)分隔
- ``class`` 的所有方法都定义在 ``class`` 的 ``prototype`` 属性上
- ``class`` 内部定义的方法，都是不可枚举的(non-enumerable)
```javascript

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

const point = new Point(3, 4);

typeof Point === 'function'; // true
Object.getPrototypeOf(point).constructor === Point; // true




class Point {}

const point = Point(); // Uncaught TypeError: Class constructor Point cannot be invoked without 'new'




class Point {
    constructor() {}
    toString() {}
    toValue() {}
}

// 相当于

Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {}
};




class Point {
    constructor() {}
    toString() {}
    toValue() {}
}

Object.keys(Point.prototype); // []
Object.getOwnPropertyDescriptor(Point.prototype, 'toValue'); // {writable: true, enumerable: false, configurable: true, value: ƒ}

```

<br>

> constructor 方法
- ``constructor`` 方法是类的默认方法，通过 ``new`` 命令生产对象实例时，自动调用该方法
- 若一个类中没有 ``constructor`` 方法，会自动添加一个空的 ``constructor`` 方法
- ``constructor`` 方法默认返回实例对象(即this)
```javascript
class Point {}

// 相当于

class Point {
    constructor() {}
}
```

<br>

> 取值函数（getter）和存值函数（setter）
- 在 ``类`` 内部可以使用 ``get`` 和 ``set`` 关键字，对某个属性设置 ``存值函数`` 和 ``取值函数`` ，拦截该属性的存取行为
```javascript

class Point {
    get prop() {}
    set prop(value) {}
}

Object.getOwnPropertyDescriptor(Point.prototype, 'prop'); // {enumerable: false, configurable: true, get: ƒ, set: ƒ}

```

<br>

> 属性表达式
- 类的属性的属性名，可以采用表达式
```javascript
const METHODNAME = 'getArea';

class Square {
    constructor() {}
    [METHODNAME]() {
        return 'METHODNAME';
    }
}

const square = new Square();

square.getArea(); // 'METHODNAME'

```

<br>

> class 表达式
- 类 的表达式的形式定义
```javascript
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};

const myclass = new MyClass();
myclass.getClassName(); // 'Me'
```
- 以上代码中，类的名字为 Me，但 Me 只能在 Class 内部使用，指代当前的类；在 Class 外部，只能通过 变量MyClass 引用
- 如果 ``类`` 内部没用使用内部名字，可以省略
```javascript

const MyClass = class {};

```
- 立即执行的 Class，Class不需要用括号包裹
```javascript
const person = new class {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}('张三');

person.sayName(); // '张三'
```

<br>

> class 方法内部的this指向
- 在单独使用实例方法时，会出现 this 指向问题
```javascript
class Logger {
    constructor() {
        this.msg = 'this is msg';
    }
    printMsg() {
        return this.msg;
    }
}

const logger = new Logger();
const {printMsg} = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
- 解决方案：通过 ``Proxy`` ，在获取方法时，自动绑定 ``this``
```javascript
const selfish = target => {
    const cache = new WeakMap();
    const handler = {
        get(target, key) {
            const value = target[key];
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy;
};

const logger = selfish(new Logger());
```

<br>

> 静态方法
- 在方法前添加 ``static`` 关键字，表示该方法只能通过 类 来调用
```javascript
class Foo {
    static classMethod() {
        return 'hello';
    }
}

Foo.classMethod(); // 'hello'

const foo = new Foo();
foo.classMethod; // undefined    实例对象上无法获取打静态方法
```
- 在 静态方法 中包含 ``this`` 关键字，``this`` 指向的是 类
```javascript
class Foo {
    static classMethod() {
        return this;
    }
}

Foo.classMethod() === Foo; // true
```
- 静态方法、非静态方法，为两个命名空间，可以重名
```javascript
class Foo {
    static classMethod() {
        return 'static classMethod';
    }
    classMethod() {
        return 'classMethod';
    }
}

Foo.classMethod(); // 'static classMethod'

const foo = new Foo();
foo.classMethod(); // 'classMethod'
```

<br>

> 实例属性的新写法
- 实例属性可以定义在 类 的最顶层，这样的写法比较便于识别实例属性
```javascript
class Foo {
    bar = 'hello';
    baz = 'world';
}

const foo = new Foo();
foo.bar; // 'hello'
foo.baz; // 'world'
```

<br>

> new.target 属性
- 通过 ``new`` 调用构造函数，那么在构造函数内，``new.target`` 返回当前 ``类``
```javascript
class Foo {
    constructor() {
        console.log(new.target === Foo);
    }
}

const foo = new Foo();
// true
```

<br>

> Class 的继承
- Class 可以通过 ``extends`` 关键字实现继承
- 子类构造函数内，必须先调用 ``super`` 方法生成自己的 ``this`` 对象
- 可以通过 ``super`` 对象调用父类的原型方法
```javascript
class Point {}

class ColorPoint extends Point {
    constructor() {
        super(); // 调用父类的constructor()
        this.color = 'yellow';
    }
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}

const colorPoint = new ColorPoint();

colorPoint instanceof ColorPoint; // true    colorPoint.__proto__.constructor === ColorPoint
colorPoint instanceof Point;      // true    colorPoint.__proto__.__proto__.constructor === Point
```
- 父类的静态方法也可以被子类继承
```javascript
class A {
    static hello() {
        return 'hello world';
    }
}

class B extends A {}

B.hello(); // 'hello world'
```

<br>

> super 关键字
- ``super`` 作为函数使用，``只能`` 在子类构造函数内，为子类生成 ``this`` 对象
- ``super`` 作为对象时：在普通方法中，指向父类的原型对象；在静态方法中，指向父类
```javascript
class A {
    x = 1;
    static print() {
        return this.name;
    }
    printX() {
        return this.x;
    }
}

class B extends A {
    x = 2;
    constructor() {
        super();
    }
    static printName() {
        return super.print();
    }
    printX() {
        return super.printX();
    }
}

const b = new B();

b.x; // 2
b.printX(); // 'x'
B.printName(); // 'B'
```

<br>

> 类 继承是按照下面的模式实现的
```javascript
class A {}

class B {}

// B的原型对象，继承 A的原型对象
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();
```

