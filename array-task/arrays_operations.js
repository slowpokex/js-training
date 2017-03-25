'use strict';
function isArrayOne(arr) {
  return arr.constructor === Array;
}

function isArrayTwo(arr) {
  return arr instanceof Array;
}

function isArrayThree(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

function range() {
  var arr = [];
  switch (arguments.length){
    case 1 : {
      for (var i = 0; i < arguments[0]; i++) {
        arr.push(i);
      }
    } break;
    case 2 : {
      for (var i = arguments[0]; i < arguments[1]; i++) {
        arr.push(i);
      }
    } break;
    case 3 : {
      for (var i = arguments[0]; i < arguments[1]; i++) {
        if (i % (arguments[2]) !== 0) {
          arr.push(i)
        }
      }
    } break;
  }
  return arr;
}

function compact(x) {
  return x.filter(function (x) {
    return Boolean(x).valueOf() === true;
  });
}

function sumWithCycle(x) {
  var sum = 0;
  x.forEach(function (item) {
    sum += item;
  });
  return sum;
}

function sumWithoutCycle(x) {
  return x.reduce(function (prev, next) {
    return prev + next;
  })
}

function uniqueWithCycle(x){
  var arr = [];
  x.forEach(function (item) {
    if (arr.indexOf(item) === -1){
      arr.push(item)
    }
  });
  return arr;
}

function uniqueWithoutCycle(x) {
  return x.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
}

function last(x) {
  return x[(x.length - 1)];
}

function excludeLastWithCycle(arr, x) {
  if (x === undefined) {
    arr.pop();
  }
  for (var i = 0; i < x; i++) {
    arr.pop()
  }
  return arr;
}

function excludeLastWithoutCycle(arr, x) {
  if (x !== undefined) {
    arr.length -= x;
  } else {
    arr.length -= 1;
  }
  return arr;
}

console.log("isArray():");
console.log(isArrayOne([]));
console.log(isArrayOne({}));
console.log(isArrayTwo([]));
console.log(isArrayTwo({}));
console.log(isArrayThree([]));
console.log(isArrayThree({}));

console.log("\nrange():");
console.log(range(10));
console.log(range(5,10));
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

console.log('\nexcludeLast with array [1,1,1,1,2,1,1,2,3,6,5,4,4,4] and count 5');
console.log(excludeLastWithCycle([1,1,1,1,2,1,1,2,3,6,5,4,4,4], 5));
console.log(excludeLastWithCycle([1,1,1,1,2,1,1,2,3,6,5,4,4,4]));

console.log(excludeLastWithoutCycle([1,1,1,1,2,1,1,2,3,6,5,4,4,4], 5));
console.log(excludeLastWithoutCycle([1,1,1,1,2,1,1,2,3,6,5,4,4,4]));