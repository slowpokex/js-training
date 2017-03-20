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
    return Math.floor(a / b);
}

console.log("Without parameters:");
console.log(addition() + '\n');

console.log("With one parameter:");
console.log(addition(1) + '\n');

console.log("Additions:");
console.log(addition(10, 10));
console.log(addition(20, "ten"));
console.log(addition("twenty", true));
console.log(addition(false, true));
console.log(addition(true, 10));

console.log("Subtractions:");
console.log(subtraction(10, 10));
console.log(subtraction("twenty", true));
console.log(subtraction(true, 10));

console.log("Multiplications:");
console.log(multiple(10, 10));
console.log(multiple("twenty", true));
console.log(multiple(false, true));
console.log(multiple(true, 10));

console.log("Divisions:");
console.log(divide(100, 10));
console.log(divide(20, "ten"));
console.log(divide(false, true));

console.log("Integer divisions:");
console.log(integerDivide(104, 10));
console.log(integerDivide(20, "ten"));






