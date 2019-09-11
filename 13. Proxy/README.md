### Proxy

- `proxy = new Proxy(target, handler)`
- 对 `target` 的各种操作做了一层代理：`before: target --->>> after: handler -> target`
- `proxy` 是代理后的对象，`target`是原先的对象

<br>

> 拦截方法：get(target, property[, proxy])
- 拦截某个属性的 `读取操作`
- 属性 `不可配置（configurable）` 且 `不可写（writable）`，则Proxy不能代理该属性，proxy对象访问该属性时会 `报错`
```javascript
    // 对象嵌套形式，生成dom节点
    const dom = new Proxy({}, {
        get(target, property) {
            return (attrs = {}, ...childNodeList) => {
                const ele = document.createElement(property);

                // 装载dom元素属性
                Object.keys(attrs).map(key => {
                    const value = attrs[key];
                    ele.setAttribute(key, value);
                });

                // 装载子元素
                childNodeList.map(childNode => {
                    childNode = childNode.constructor === String
                        ? document.createTextNode(childNode)
                        : childNode;
                    ele.appendChild(childNode);
                });

                return ele;
            };
        }
    });

    const el = dom.div({},
        'Hello, my name is ',
        dom.a({href: '//example.com'}, 'Mark'),
        '. I like:',
        dom.ul({},
            dom.li({}, 'The web'),
            dom.li({}, 'Food'),
            dom.li({}, '…actually that\'s it')
        )
    );

    document.body.appendChild(el);




    // 不可配置（configurable） 且 不可写（writable）的属性，不可通过proxy访问，否则会 报错
    const target = Object.defineProperties({}, {
        foo: {
            value: 123,
            writable: false,
            configurable: false
        }
    });

    const proxy = new Proxy(target, {});

    proxy.foo; // TypeError: Invariant check failed
```

<br>

> 拦截方法：set(target, property, value[, proxy])
- 拦截某个属性的 `写入操作`
- 属性 `不可配置（configurable）` 且 `不可写（writable）`，则proxy对象 `写入该属性` 时 `没有任何效果`
```javascript
    // 防止对象的内部属性被外部读写
    const checkProperty = (key, action) => key.startsWith('_') ? throw new Error(`Invalid attempt to ${action} private "${key}" property`) : '';

    const person = {_age: 29};

    const proxy = new Proxy(person, {
        get(target, property) {
            checkProperty(property, 'get');
            return target[property];
        },
        set(target, property, value) {
            checkProperty(property, 'set');
            target[property] = value;
        }
    });

    proxy._age; // Uncaught Error: Invalid attempt to get private "_age" property
    proxy._age = 30; // Uncaught Error: Invalid attempt to set private "_age" property





    // 不可配置（configurable） 且 不可写（writable）的属性，通过proxy写入没有任何效果
    const target = Object.defineProperties({}, {
        foo: {
            value: 123,
            writable: false,
            configurable: false
        }
    });

    const proxy = new Proxy(target, {});

    proxy.foo = 456;
    proxy.foo; // 123      属性 set 没有任何效果
```

<br>

> 拦截方法：apply(target, ctx, args)
- 参数以依次为：`目标函数`、`目标函数被调用时的上下文环境（this）`、`目标函数被调用时传入的参数`
- 拦截函数的 `调用`
```javascript
    // 拦截目标函数的调用
    const fn = (...arg) => arg.reduce((sum, n) => sum + n);

    const proxy = new Proxy(fn, {
        apply(target, ctx, arg) {
            return `${ctx.name}.fn() -> ${target(...arg)}`;
        }
    });

    const obj = {
        name: 'obj',
        fn: proxy
    };

    obj.fn(1, 2, 3, 4, 5); // obj.fn() -> 15





    // 不可配置（configurable） 且 不可写（writable）的属性，通过proxy写入没有任何效果
    const target = Object.defineProperties({}, {
        foo: {
            value: 123,
            writable: false,
            configurable: false
        }
    });

    const proxy = new Proxy(target, {});

    proxy.foo = 456;
    proxy.foo; // 123      属性 set 没有任何效果
```

<br>

> 拦截方法：construct(target, args, proxyTarget)
- 参数以依次为：`目标函数`、`传入的参数`、`目标函数的代理函数`
- 拦截 `new命令`
- construct方法返回必须是对象（不包括null），否则会 `报错`
```javascript
    function Person() {}

    const P = new Proxy(Person, {
        construct(target, args, proxyTarget) {
            return {target, args, proxyTarget};
        }
    });

    const p = new P(1, 2, 3, 4, 5);

    p.target === Person; // true
    p.args;              // [1, 2, 3, 4, 5]
    p.proxyTarget === P; // true




    var p = new Proxy(function() {}, {
        construct: function(target, argumentsList) {
            return 1;
        }
    });

    new p(); // Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
```

<br>

> Proxy.revocable()
- `{proxy, revocable} = Proxy.revocable(target, handler)`
- 返回一个 `proxy实例` 、 `取消proxy的方法`
```javascript
    const {proxy, revoke} = Proxy.revocable({}, {});

    proxy.name = 'proxy';
    proxy.name; // 'proxy'

    revocable();

    proxy.name; // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```
