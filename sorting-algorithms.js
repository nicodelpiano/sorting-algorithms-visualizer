export function bubbleSort(array) {
  let steps = []
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 1; j < array.length - i; j++) {
      if (array[j] < array[j - 1]) {
        swap(array, j, j - 1)
        steps.push({
          array: [...array],
          swapPositions: [j, j - 1]
        })
      }
    }
  }
  // Completed sort with no swap positions
  // to draw the final step
  steps.push({ array: [...array] })
  return [array, steps]
}

export function insertionSort(array) {
  let steps = []
  for (let i = 1; i < array.length; i++) {
    let j = i - 1
    while (j >= 0 && array[j + 1] < array[j]) {
      swap(array, j + 1, j)
      steps.push({
        array: [...array],
        swapPositions: [j, j + 1]
      })
      j--
    }
  }
  // Completed sort with no swap positions
  // to draw the final step
  steps.push({ array: [...array] })
  return [array, steps]
}

export function quickSort(array) {
  let steps = []
  quickSortHelper(array, 0, array.length - 1, steps)
  return [array, steps]
}

function quickSortHelper(array, startIndex, endIndex, steps = []) {
  if (startIndex >= endIndex) {
    return
  }
  const pivotIndex = startIndex
  let leftIndex = startIndex + 1
  let rightIndex = endIndex
  while (leftIndex <= rightIndex) {
    if (array[leftIndex] > array[rightIndex]) {
      swap(array, leftIndex, rightIndex)
      steps.push({
        array: [...array],
        swapPositions: [leftIndex, rightIndex]
      })
    }
    if (array[leftIndex] <= array[pivotIndex]) {
      leftIndex++
    }
    if (array[rightIndex] >= array[pivotIndex]) {
      rightIndex--
    }
  }
  swap(array, pivotIndex, rightIndex)
  steps.push({
    array: [...array],
    swapPositions: [pivotIndex, rightIndex]
  })
  const isLeftSubarraySmaller =
    rightIndex - 1 - startIndex < endIndex - leftIndex - 1
  if (isLeftSubarraySmaller) {
    quickSortHelper(array, startIndex, rightIndex - 1, steps)
    quickSortHelper(array, rightIndex + 1, endIndex, steps)
  } else {
    quickSortHelper(array, rightIndex + 1, endIndex, steps)
    quickSortHelper(array, startIndex, rightIndex - 1, steps)
  }
  steps.push({ array: [...array] })
}

export function selectionSort(array) {
  let steps = []
  for (var i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (var j = i; j < array.length; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j
      }
    }
    swap(array, i, minIndex)
    steps.push({
      array: [...array],
      swapPositions: [i, minIndex]
    })
  }
  // Completed sort with no swap positions
  // to draw the final step
  steps.push({ array: [...array] })
  return [array, steps]
}

function swap(array, i, j) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}
