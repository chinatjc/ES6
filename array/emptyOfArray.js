// 数组的空位

// 在ES5中，数组存在空位的现象，导致一些方法的行为不一致
Array(3).map(index => console.log(index));
// 没有打印。。。 map方法直接忽略空位



// 在ES6中，明确将空位转换为undefined
Array.from({length: 3}).map(index => console.log(index));
// undefined
// undefined
// undefined
