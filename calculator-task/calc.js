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
    return a / b >> 0;
}
console.log(addition() + '\n');
console.log(addition(1) + '\n');
console.log(addition(10, 10));
console.log(addition("twenty", true));
console.log(subtraction(10, 10));
console.log(subtraction(true, 10));
console.log(multiple(10, 10));
console.log(multiple("twenty", true));
console.log(divide(100, 10));
console.log(divide(20, "ten"));
console.log(integerDivide(104, 10));