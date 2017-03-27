'use strict';
function isArrayOne(arr) {
  return arr.constructor === Array;
}

function isArrayTwo(arr) {
  return arr instanceof Array;
}

function range(x, y, z) {
  var arr = [];
  if (y === undefined && z === undefined){ y = x; x = 0;  }
  for (var i = x; i < y; i++) {
    if (i % (z) !== 0) { arr.push(i) }
  }
  return arr;
}

function compact(x) {
  return x.filter(function (x) {
    return x;
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

function lastSecond(x) {
  return x.reverse()[0]
}

function excludeLast(arr, x) {
  if (x !== undefined) {
    return arr.slice(0, arr.length - x)
  } else {
    return arr.slice(0, arr.length - 1)
  }
}

console.log("isArray():");
console.log(isArrayOne([]));
console.log(isArrayOne({}));
console.log(isArrayTwo([]));
console.log(isArrayTwo({}));
console.log("\nrange():");
console.log(range(5));
console.log(range(1,5));
console.log(range(1,10,2));
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
console.log(lastSecond([1,2,3,4,5,6]));
console.log('\nexcludeLast with array [1,1,1,1,2,1,1,2,3,6,5,4,4,4] and count 5');
console.log(excludeLast([1,1,1,1,2,1,1,2,3,6,5,4,4,4], 5));
console.log(excludeLast([1,1,1,1,2,1,1,2,3,6,5,4,4,4]));