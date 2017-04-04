'use strict';
function isArrayOne(arr) {
  return arr.constructor === Array;
}

function isArrayTwo(arr) {
  return arr instanceof Array;
}

function range(x, y, z) {

  function hasSteps(x , y) {
    if (z > 0 && x < y) { return x < y }
    if (z < 0 && x > y) { return x > y }
  }

  var arr = [];
  if (y === undefined || y === null){ 
    y = x;
    x = 0;
  }
  if (z < 0) {
    if (x <= y) {
      return arr;
    }
  } else {
    z = z || 1;
  }

  while (hasSteps(x, y)) {
    arr.push(x);
    x += z;
  }
  return arr;
}

function compact(arr) {
  return arr.filter(function (item) {
    return item;
  });
}

function sumWithCycle(x) {
  var sum = 0;
  for (var i =0; i < x.length; i++) {
    sum += x[i];
  }
  return sum;
}

function sumWithoutCycle(x) {
  return x.reduce(function (prev, next) {
    return prev + next;
  })
}

function uniqueWithCycle(x){
  var arr = [];
  for (var i =0; i < x.length; i++) {
    if (arr.indexOf(x[i]) === -1){
      arr.push(x[i])
    }
  }
  return arr;
}

function uniqueWithoutCycle(x) {
  return x.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
}

function last(x) {
  return x[x.length - 1];
}

function excludeLast(arr, x) {
  if (x === undefined) { x = 1; }
  if (x < 0) { return arr.slice(Math.abs(x), arr.length);}
  return arr.slice(0, arr.length - x)
}

console.log("isArray():");
console.log(isArrayOne([]));
console.log(isArrayOne({}));
console.log(isArrayTwo([]));
console.log(isArrayTwo({}));
console.log("\nrange():");
console.log(range(5));
console.log(range(1,5));
console.log(range(1,12,4));
console.log(range(12,1,-3));
console.log("\ncompact()");
console.log(compact([{}, false, 1, 0]));
console.log("\nSum:");
console.log(sumWithCycle([1,2,3,4,5,6,7,8,9,10]));
console.log(sumWithoutCycle([1,2,3,4,5,6,7,8,9,10]));
console.log("\nUnique:");
console.log(uniqueWithCycle([1,1,1,1,2,1,1,2,3,6,5,4,4,4]));
console.log(uniqueWithoutCycle([1,1,1,1,2,1,1,2,3,6,5,4,4,4]));
console.log("\nLast:");
console.log(last([1,2,3,4,5,6]));
console.log('\nexcludeLast with array [1,1,1,1,2,1,1,2,3,6,5,4,4,4] and count 5');
console.log(excludeLast([1,1,1,1,2,1,1,2,3,6,5,4,4,4], 5));
console.log(excludeLast([1,1,1,1,2,1,1,2,3,6,5,4,4,4]));
console.log(excludeLast([1,1,1,1,2,1,1,2,3,6,5,4,4,4], -7));
console.log("Test ranges:");
console.log(range(10));
console.log(range(1, 10));
console.log(range(1, 10, 3));
console.log(range(10, null, 3));
console.log(range(10, null));
console.log(range(-2, -5));
console.log(range(-5, -2));
console.log(range(-5, -2, 2));
console.log(range(-5, -2, -2));
console.log(range(-5, null, 2));
console.log(range(-5, null, -2));
console.log(range(-10, -20, -5));
console.log(range(-20, -10, -5));

