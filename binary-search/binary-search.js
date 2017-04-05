'use strict'
function binarySearch(arr, item) {
  var i = 0;
  var j = arr.length - 1;
  var avg;
  while (i <= j) {
    avg = Math.floor(((i + j) / 2));
    if (item === arr[avg]) {
      return avg;
    } else if (item < arr[avg]) {
      j = avg - 1;
    } else {
      i = avg + 1;
    }
  }
  return -1;
}

function binarySearchWithLoop(arr, key, start, end) {
  start = start || 0;
  end = end || (arr.length - 1);
  var avg = Math.floor((start + end) / 2);

  if (start > end) {
    return -1;
  }

  if (key === arr[avg]) {
    return avg;
  } else if (key > arr[avg]) {
    return binarySearchWithLoop(arr, key, avg + 1, end);
  } else if (key < arr[avg]) {
    return binarySearchWithLoop(arr, key, start, avg - 1);
  }
}

var array = [1,22,5,7,8,88,96,578,54,1,2,3];

array.sort(function (a, b) {
  return a - b;
});

console.log(array);
console.log("Value " + array[9] + " in " + binarySearch(array, array[9]));
console.log("Value " + array[9] + " in " + binarySearchWithLoop(array, array[9]));
console.log("Value " + array[12] + " in " + binarySearch(array, array[12]));
console.log("Value " + 96 + " in " + binarySearchWithLoop(array, 96));
