### 字符串的新增方法

> codePointAt 实例方法
- 返回unicode字符的码点
- 能够准确处理4个字节的字符
```javascript
	const str = '𠮷a';

	strList = Array.from(str); // 将字符转为数组，解决索引不能准确识别4字节字符的问题

	strList[0].codePointAt(0).toString(16); // 20bb7
	strList[1].codePointAt(0).toString(16); // 61

	'\u{20bb7}'; // '𠮷'
	'\u{61}'; // 'a'
```

<br>

> String.fromCodePoint 方法
- 返回unicode码点对应的字符
- 能够准确处理4个字节的字符
```javascript
	String.fromCodePoint(0x20bb7, 0x61); // 𠮷a
```

<br>

> includes 方法
```javascript
	string.includes(str[, index]);
```
- 在字符串中，是否包含 `参数字符串` ，可以选择传入 `开始查找位置` 参数，返回 `布尔值`
	- 传入 `开始查找位置` 参数后，相当于从 `string.slice(index)` 返回的字符串里查找
```javascript
	'hello world'.includes('hello'); // true
	'hello world'.includes('hello', 6); // false      从'hello world'.slice(6) -> 'world'里查找是否包含'hello'，结果返回false
```

<br>

> startsWith 方法
```javascript
	string.startsWith(str[, index]);
```
- `参数字符串` 是否在字符串的头部位置 ，可以选择传入 `开始查找位置` 参数，返回 `布尔值`
	- 传入 `开始查找位置` 参数后，相当于从 `string.slice(index)` 返回的字符串里查找
```javascript
	'hello world'.startsWith('hello'); // true
	'hello world'.startsWith('world', 6); // true      从'hello world'.slice(6) -> 'world'里查找参数字符串'hello'是否在其头部位置，结果返回true
```

<br>

> endsWith 方法
```javascript
	string.endsWith(str[, index]);
```
- `参数字符串` 是否在字符串的结尾位置 ，可以选择传入 `开始查找位置` 参数，返回 `布尔值`
	- 传入 `开始查找位置` 参数后，相当于从 `string.slice(0, index)` 返回的字符串里查找
```javascript
	'hello world'.endsWith('world'); // true
	'hello world'.endsWith('world', 5); // true      从'hello world'.slice(0, 5) -> 'hello'里查找参数字符串'hello'是否在其尾部位置，结果返回true
```

<br>

> repeat 方法
```javascript
	string.repeat(count);
```
- 将 `原字符串重复count次` 返回， `不改变原字符串`
	- count为 `正数` 时， `向下取整`
	- count为 `零` 时， `重复零次`
	- count为 `(-1, 0)` 时， `重复零次`
```javascript
	'abc'.repeat(3); // 'abcabcabc'
	'abc'.repeat(2.8); // 'abcabc'
	'abc'.repeat(0.5); // ''    重复了零次，返回空字符串
	'abc'.repeat(-0.5); // ''    重复了零次，返回空字符串
```

<br>

> padStart 方法
```javascript
	string.padStart(length[, str]);
```
- `string.length < length` ，`str在其头部补全` ，`直到 string.length === length`
	- 不传str时，默认用空格( )，来补全
```javascript
	'abc'.padStart(5, '_'); // '__abc'
	'abc'.padStart(5); // '  abc'     缺省str时，默认用空格补全
```

<br>

> padEnd 方法
```javascript
	string.padEnd(length[, str]);
```
- `string.length < length` ，`str在其尾部补全` ，`直到 string.length === length`
	- 不传str时，默认用空格( )，来补全
```javascript
	'abc'.padEnd(5, '_'); // 'abc__'
	'abc'.padEnd(5); // 'abc  '     缺省str时，默认用空格补全
```

<br>

> trimStart 方法
```javascript
	string.trimStart();
```
- 删除string头部的所有的空白字符
```javascript
	const a = `


   111

`;

    a.trimStart(); // '111   ↵↵'
```

<br>


> trimEnd 方法
```javascript
	string.trimEnd();
```
- 删除string头部的所有的空白字符
```javascript
	const a = `


   111

`;

    a.trimEnd(); // '↵↵↵   111'
```
