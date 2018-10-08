// 对象的解构赋值，按照 变量名 和 属性名 对应关系，来给 变量 赋值 属性值
let {foo, bar} = {foo: 1, bar: 2};
foo // 1
bar // 2

// 对象解构赋值的内部机制：先找到 相同的属性名 然后再把 右边的属性值 赋予给 左边的变量，真正被赋值的是 变量 而不是 属性名
let { y: a } = { y: 2 };
y // ReferenceError: y is not defined
a // 2

// 解构赋值 可以用于 嵌套结构 的对象
let obj = {};
let arr = [];

({foo: obj.prop, bar: arr[0]} = {foo: {prop: 123}, bar: [456]});

obj // { prop: 123 }
arr // [ 456 ]

// 默认值，对象的 属性值 严格等于 undefined 时，变量赋于默认值
let {x, y = 5} = {x: 2};
x // 2
y // 5

let {x, y = 5} = {x: 2, y: null};
x // 2
y // null

// 对象的解构赋值的时候，避免将大括号 ({) 放置于行首，否则发生语法解析错误
var x;
{ x } = {x: 1}; // SyntaxError: Unexpected token =
