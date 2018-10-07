// Array.of 方法用于将一组值转换为数组
Array.of(); // []
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]

// Array.of 方法 主要解决 Array()方法的不足
// Array()方法，传入的参数不同，返回结果的行为也不一致
Array(); // []
Array(3); // [,,,]
Array(1, 2, 3); // [1, 2, 3]
