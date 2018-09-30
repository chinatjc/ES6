// 不存在变量提升

// ******************* ES6 *******************

// 没有变量提升，let a 无法提升到 typeof a 之前
typeof a; // ReferenceError
let a = 1;


// ******************* ES5 *******************

typeof a; // undefined
var a = 14;

// 变量提升，相当于下面的代码

var a;
typeof a;
a = 14;
