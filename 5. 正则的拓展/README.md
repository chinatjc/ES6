### 正则的扩展

<br>

> RegExp 构造函数
- `RegExp(reg | regStr[, flags])`
- 构造函数的第一个参数可以传入 `正则字符串(双重转义)` or `正则字面量`
- 构造函数的第一个参数传入 `正则字面量` 时，其flags会被忽略
```javascript
    const reg = RegExp(/^AbC$/m, 'i');
    reg.flags; // 'i'    'm'被忽略
```

<br>

> flags 属性
- 返回正则表达式的修饰符
```javascript
    /\d+/gim.flags; // 'gim'
```

<br>

> u 修饰符
- 正则添加 `u修饰符` 后可以正确处理 `正则表达式 & 匹配项` 中位于 `unicode辅助平面` 的字符
```javascript
    /^.$/.test('𠮷'); // false
    /^.$/u.test('𠮷'); // true




    /^\u{20bb7}$/.test('𠮷'); // false
    /^\u{20bb7}$/u.test('𠮷'); // true




    /^𠮷{2}$/.test('𠮷𠮷'); // false
    /^𠮷{2}$/u.test('𠮷𠮷'); // true
```

<br>

> y 修饰符 （ 粘连 修饰符）
- 每次匹配 `匹配项` 时，必须从 `匹配项` 的第一个位置匹配（`y修饰符隐含了头部匹配的标志 ^ `），否则 `匹配不成功`
```javascript
    'a1a2a3'.match(/a\d/gy) // ['a1', 'a2', 'a3']

    // 从字符串中提取token
    function tokenize(TOKEN_REGEX, str) {
        const list = [];
        let match = null;
        while(match = TOKEN_REGEX.exec(str)) {
            list.push(match[1]);
        }
        return list;
    }

    const TOKEN_Y = /\s*(\d+|\+)\s*/y;
    const TOKEN_G = /\s*(\d+|\+)\s*/g;

    tokenize(TOKEN_Y, '3 + 4'); // ['3', '+', '4']
    tokenize(TOKEN_G, '3 + 4'); // ['3', '+', '4']

    tokenize(TOKEN_Y, '3x + 4'); // ['3']              TOKEN_Y未忽略非法字符：1. 匹配'3x + 4'，得到匹配项'x'；2. 匹配'x + 4'，因为正则表达式未能匹配第一个位置，所以匹配停止
    tokenize(TOKEN_G, '3x + 4'); // ['3', '+', '4']    TOKEN_G忽略非法字符

```

<br>

> s 修饰符：dotAll 模式
- 解决 点（.）识别 `行终止符` 的问题
```javascript
    /^abc.def$/.test('abc\ndef'); // false    . 无法识别\n
    /^abc.def$/s.test('abc\ndef'); // true



    // 如果 . 要识别一切字符，则需要使用 u修饰符(识别辅助平面字符)、s(识别行终止符)
    /^.+$/us.test('𠮷\n\r'); // true
```

<br>

> 先行断言
- 只有 x 在 y 前面才匹配，必须写成 `/x(?=y)/`
```javascript
    /\w+(?=\.jpg)/g.exec('picture1.jpeg; picture2.jpg; picture3.gif'); // ['picture2']
```

<br>

> 先行否定断言
- 只有 x 不在 y 前面才匹配，必须写成 `/x(?!y)/`
```javascript
    /\w+(?!\.jpg)/g.exec('picture1.jpeg; picture2.jpg; picture3.gif'); // ['picture1']
```

<br>

> 后行断言
- 只有 x 在 y 后面才匹配，必须写成 `/(?<=y)x/`
```javascript
    /(?<=\$)\d+/g.exec('Benjamin Franklin is on the $100 bill'); // ['100']
```

<br>

> 后行否定断言
- 只有 x 不在 y 后面才匹配，必须写成 `/(?<!y)x/`
```javascript
    /(?<!\$)\d+/g.exec('it’s is worth about €90'); // ['90']
```

<br>

> 断言的特性
- 后行断言的执行顺序：`先右后左`
```javascript
    /^(\d+)(\d+)$/.exec('1053'); // ['1053', '105', '3']    从左往右：第一个(\d+)为贪婪模式，第二个(\d+)只能匹配一个字符
    /(?<=(\d+)(\d+))$/.exec('1053'); // ['', '1', '053']    从右往左：第二个(\d+)为贪婪模式，第一个(\d+)只能匹配一个字符




    // 回溯引用
    /(?<=\1_(O))!/.exec('O_O!'); // ['!', 'O']    从右往左：先匹配(O)，然后在通过 \1 回溯引用(O)
```
- 断言匹配模式中括号部分（例如：( ?=\$) ）不计入返回结果，除非其中有 `子表达式`
```javascript
    /(?<=(\d+)(\d+))$/.exec('1053'); // ['', '1', '053']    未返回匹配断言的最外层括号，但是返回了断言内部的子表达式
```

<br>

> 具名组匹配 & 引用
- 具名组匹配
	- 给 `子表达式` 指定 `名称` ，通过 `match.groups的属性名` 访问这些指定名称的 `子表达式`
	- `(?<name>)`
	- 字符串替换时，使用 `$<name>` 引用具名组
- 引用
	- 在正则表达式内部引用某个具名组匹配
	- `\k<name>`
```javascript
	const match = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec('2019-08-28');
	match.groups; // {year: '2019', month: '08', day: '28'}



	('2019-08-28').replace(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/, '$<day>/$<month>/$<year>'); // '28/08/2019'



	/^(?<word>\w+!)\k<word>{2}$/.test('abc!abc!abc!'); // true
```
