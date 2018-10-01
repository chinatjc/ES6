// 模版字符串

const num1 = 1;
const num2 = 2;
`${num1} + ${num2} = ${num1 + num2}`; // 1 + 2 = 3

// 反引号 (`) 在模版字符串中需要做转义处理，否则会报错
`这是一个反引号\``; // 这是一个反引号`

// 模版字符串里引入的变量必须在此之前声明该变量，否则会报错
`今天是${date}号`; // ReferenceError: date is not defined
