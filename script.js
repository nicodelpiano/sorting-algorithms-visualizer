import {
  bubbleSort,
  selectionSort,
  quickSort,
  insertionSort
} from './sorting-algorithms.js'

// Constants
const NUM_ELEMENTS = 50
const MAX_VALUE = 100
const MAX_RECT_WIDTH = 10
const DEFAULT_SPEED = 100
const DEFAULT_RECT_COLOR = '#FF0000'
const PIVOT_RECT_COLOR = '#FF00FF'
const SWAPPED_RECT_COLOR = '#FFFF00'
const CANVAS_BG_COLOR = '#FFF'
const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 200

function drawRect(ctx, x, y, height, color = DEFAULT_RECT_COLOR) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, MAX_RECT_WIDTH, height)
}

function drawStep(ctx, step) {
  clearCanvas(ctx)
  let xPosition = 0
  let yPosition = 0

  const values = step.array
  const [i, j] = step.swapPositions || [-1, -1]

  for (const [index, value] of values.entries()) {
    const color =
      index === i
        ? PIVOT_RECT_COLOR
        : index === j
        ? SWAPPED_RECT_COLOR
        : DEFAULT_RECT_COLOR
    drawRect(ctx, xPosition, yPosition, value, color)
    xPosition += 2 * MAX_RECT_WIDTH
  }
}

// To be able to re-draw on canvas
function clearCanvas(ctx) {
  ctx.fillStyle = CANVAS_BG_COLOR
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

async function drawSteps(ctx, steps, speed = DEFAULT_SPEED) {
  for (const step of steps) {
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(drawStep(ctx, step)), speed)
    })
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
  const canvas = document.getElementById('myCanvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  const ctx = canvas.getContext('2d')

  const values = Array(NUM_ELEMENTS)
    .fill(0)
    .map(e => Math.floor(Math.random() * MAX_VALUE))

  const [sortedValues, steps] = quickSort(values)
  drawSteps(ctx, steps)
})
