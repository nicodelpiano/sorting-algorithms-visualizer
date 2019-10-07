function bubbleSort(array) {
  let steps = [];
  let isSorted = false;
  let i = 0;
  while (!isSorted) {
    isSorted = true;
    for (let j = 1; j < array.length - i; j++) {
      if (array[j] < array[j - 1]) {
        swapAndTrackSteps(array, j, j - 1, steps);
        isSorted = false;
      }
    }
    i++;
  }
  // Completed sort with no swap positions
  // to draw the final step
  steps.push({ array: [...array] });
  return [array, steps];
}

function insertionSort(array) {
  let steps = [];
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    while (j >= 0 && array[j + 1] < array[j]) {
      swapAndTrackSteps(array, j + 1, j, steps);
      j--;
    }
  }
  // Completed sort with no swap positions
  // to draw the final step
  steps.push({ array: [...array] });
  return [array, steps];
}

function quickSort(array) {
  let steps = [];
  quickSortHelper(array, 0, array.length - 1, steps);
  steps.push({ array: [...array] });
  return [array, steps];
}

function quickSortHelper(array, startIndex, endIndex, steps = []) {
  if (startIndex >= endIndex) {
    return;
  }
  const pivotIndex = startIndex;
  let leftIndex = startIndex + 1;
  let rightIndex = endIndex;
  while (leftIndex <= rightIndex) {
    if (array[leftIndex] > array[rightIndex]) {
      swapAndTrackSteps(array, leftIndex, rightIndex, steps);
    }
    if (array[leftIndex] <= array[pivotIndex]) {
      leftIndex++;
    }
    if (array[rightIndex] >= array[pivotIndex]) {
      rightIndex--;
    }
  }
  swapAndTrackSteps(array, pivotIndex, rightIndex, steps);
  const isLeftSubarraySmaller =
    rightIndex - 1 - startIndex < endIndex - leftIndex - 1;
  if (isLeftSubarraySmaller) {
    quickSortHelper(array, startIndex, rightIndex - 1, steps);
    quickSortHelper(array, rightIndex + 1, endIndex, steps);
  } else {
    quickSortHelper(array, rightIndex + 1, endIndex, steps);
    quickSortHelper(array, startIndex, rightIndex - 1, steps);
  }
}

function selectionSort(array) {
  let steps = [];
  for (var i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (var j = i; j < array.length; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    swapAndTrackSteps(array, i, minIndex, steps);
  }
  // Completed sort with no swap positions
  // to draw the final step
  steps.push({ array: [...array] });
  return [array, steps];
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function swapAndTrackSteps(array, i, j, steps) {
  swap(array, i, j);
  steps.push({
    array: [...array],
    swapPositions: [i, j]
  });
}

function mergesort(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    var midpoint = parseInt(arr.length / 2);
    var leftArr = arr.slice(0, midpoint);
    var rightArr = arr.slice(midpoint, arr.length);
    return merge(mergesort(leftArr), mergesort(rightArr));
  }
}

function merge(leftArr, rightArr) {
  var sortedArr = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr[0]);
      leftArr = leftArr.slice(1);
    } else {
      sortedArr.push(rightArr[0]);
      rightArr = rightArr.slice(1);
    }
  }
  while (leftArr.length) sortedArr.push(leftArr.shift());
  while (rightArr.length) sortedArr.push(rightArr.shift());
  return sortedArr;
}

exports.mergeSort = function mergeSortWithoutSteps(array) {
  return mergesort(array)[0];
};
exports.bubbleSort = function bubbleSortWithoutSteps(array) {
  return bubbleSort(array)[0];
};
exports.insertionSort = function insertionSortWithoutSteps(array) {
  return insertionSort(array)[0];
};
exports.quickSort = function quickSortWithoutSteps(array) {
  return quickSort(array)[0];
};
exports.selectionSort = function selectionSortWithoutSteps(array) {
  return selectionSort(array)[0];
};
