### 数值的扩展

<br>

> Math.trunc 方法
- 返回数字的整数部分，数据类型为 `Number`
- 对于 `非数值`， `Math.trunc` 在其内部通过 `Number方法` 将其转化为 `数值`
- 对于 `空值` or `NaN`，返回 `NaN`
```javascript
    Math.trunc(3.2); // 3
    Math.trunc(0.23); // 0
    Math.trunc(0); // 0
    Math.trunc(-0.23); // 0
    Math.trunc(-3.2); // -3
    Math.trunc(true); // 1    通过Number方法 true -> 1
    Math.trunc(); // NaN
    Math.trunc(NaN); // NaN
```

<br>

> Math.sign 方法
- 判断数值是 `正数` 、 `零` 、 `负数`，对应的返回 `1` 、 `0` 、 `-1`
- 对于 `非数值`， `Math.sign` 在其内部通过 `Number方法` 将其转化为 `数值`
- 对于 `空值` or `NaN`，返回 `NaN`
```javascript
    Math.sign(3.2); // 1
    Math.sign(0); // 0
    Math.sign(-3.2); // -1
    Math.sign(true); // 1    通过Number方法 true -> 1
    Math.sign(); // NaN
    Math.sign(NaN); // NaN
```

<br>

> 指数运算符
- `n1 ** n2 => n1 ^ n2`
- 从右向左计算指数运算符
```javascript
    3 ** 4; // 3 ^ 4 = 81
    2 ** 3 ** 2; // 2 ** (3 ** 2) = 2 ** 9 = 512    从右向左计算指数运算符



    let n = 3;
    n **= 3; // 3 ^ 3 = 27
```
