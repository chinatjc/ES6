### 字符串的扩展

> unicode 字符集
- 17个平面
	- 一个基本平面(BMP)：U+0000～U+FFFF
	- 16个辅助平面(SMP)：U+010000～U+10FFFF

- utf-8 编码方法
	- 变长的编码方法
		- 字符长度从1个字节到4个字节不等

- utf-16 编码方法
	- 基本平面的字符，占用2个字节
		- U+0000～U+FFFF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2个字节
	- 辅助平面的字符，占用2个字节
		- U+010000～U+10FFFF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4个字节

- javascript 只能处理UCS-2(uft-16)编码
	- 造成所有字符在这门语言中都是 `2个字节`，如果是 `4个字节的字符`，会被当作 `2个双字节的字符处理`

<br>

> 字符的unicode表示法
- ES6加强了对unicode的支持：通过 `\u{codePoint}` ，可以显示所有的unicode字符
```javascript
	'\u{20BB7}'; // '𠮷'
```

<br>

> 模版字符串
- 增强版的字符串
	- 使用 反引号( ` ) 标识模版字符串的开始与结尾
	- 通过内嵌${single expression}，`引用变量`
	- 保留模版字符串定义时的空格换行等 `空白字符`
	- 在模版字符串中，使用 反引号( ` ) 需要使用 反斜杠( \ ) 转义
	- 非字符串的数据类型数据，通过String( ) 方法转化为String类型数据
```javascript
	const name = 'Mike';
	const age = 29;

	`姓名：${name}，年龄：${age}`; // '姓名：Mike，年龄：29'

	`姓名：${name}，
年龄：${age}`;

// 保留换行
// 姓名：Mike，
// 年龄：29

	`\` 这是一个反引号`; // '` 这是一个反引号'

	`${[1, 2, 3]}`; // '1,2,3'    通过[1, 2, 3].toString()方法转化为String
```