function addition(a,b) {
    return a + b
}
function subtraction(a,b) {
    return a - b
}
function multiple(a,b) {
    return a * b
}
function divide(a,b) {
    return a / b
}
function integerDivide(a,b) {
    return (a / b).toFixed();
}

var obj = {};

console.log("Without parameters:");
console.log(addition());
console.log(subtraction());
console.log(multiple());
console.log(divide());
console.log(integerDivide() + '\n');

console.log("With one parameter:");
console.log(addition(1));
console.log(subtraction(1));
console.log(multiple(1));
console.log(divide(1));
console.log(integerDivide(1) + '\n');

console.log("Additions:");
console.log(addition(10, 10));
console.log(addition(20, "ten"));
console.log(addition("twenty", "ten"));
console.log(addition("twenty", true));
console.log(addition(false, true));
console.log(addition(true, 10));
console.log(addition(obj, 10));
console.log(addition(obj, "ten") + "\n");

console.log("Subtractions:");
console.log(subtraction(10, 10));
console.log(subtraction(20, "ten"));
console.log(subtraction("twenty", "ten"));
console.log(subtraction("twenty", true));
console.log(subtraction(false, true));
console.log(subtraction(true, 10));
console.log(subtraction(obj, 10));
console.log(subtraction(obj, "ten") + '\n');

console.log("Multiplications:");
console.log(multiple(10, 10));
console.log(multiple(20, "ten"));
console.log(multiple("twenty", "ten"));
console.log(multiple("twenty", true));
console.log(multiple(false, true));
console.log(multiple(true, 10));
console.log(multiple(obj, 10));
console.log(multiple(obj, "ten") + '\n');

console.log("Divisions:");
console.log(divide(100, 10));
console.log(divide(20, "ten"));
console.log(divide("twenty", "ten"));
console.log(divide("twenty", true));
console.log(divide(false, true));
console.log(divide(true, 10));
console.log(divide(obj, 10));
console.log(divide(obj, "ten") + '\n');

console.log("Integer divisions:");
console.log(integerDivide(104, 10));
console.log(integerDivide(20, "ten"));
console.log(integerDivide("twenty", "ten"));
console.log(integerDivide("twenty", true));
console.log(integerDivide(false, true));
console.log(integerDivide(true, 10));
console.log(integerDivide(obj, 10));
console.log(integerDivide(obj, "ten") + '\n');





