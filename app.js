import {
  bubbleSort,
  selectionSort,
  quickSort,
  insertionSort
} from './sorting-algorithms.js'

// Constants
const MAX_RECT_WIDTH = 40
const DEFAULT_SPEED = 1
const DEFAULT_RECT_COLOR = '#FF0000'
const PIVOT_RECT_COLOR = '#FF00FF'
const SWAPPED_RECT_COLOR = '#FFFF00'
const CANVAS_BG_COLOR = '#FFF'
const CANVAS_WIDTH = 3000
const CANVAS_HEIGHT = 600
const MAX_VALUE = CANVAS_HEIGHT
const NUM_ELEMENTS = Math.floor(CANVAS_WIDTH / (MAX_RECT_WIDTH * 2))

function drawRect(ctx, x, y, height, color = DEFAULT_RECT_COLOR) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, MAX_RECT_WIDTH, height)
}

function drawStep(ctx, step) {
  clearCanvas(ctx)
  let xPosition = 0
  let yPosition = CANVAS_HEIGHT

  const values = step.array
  const [i, j] = step.swapPositions || [-1, -1]

  for (const [index, value] of values.entries()) {
    const color =
      index === i
        ? PIVOT_RECT_COLOR
        : index === j
        ? SWAPPED_RECT_COLOR
        : DEFAULT_RECT_COLOR
    drawRect(ctx, xPosition, yPosition, -value, color)
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

  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const menuItems = document.querySelectorAll('.menu li')

  menuItems.forEach((link, index) => {
    link.addEventListener('click', () => {
      const values = Array(NUM_ELEMENTS)
        .fill(0)
        .map(e => Math.floor(Math.random() * MAX_VALUE))

      // TODO: Improve this by having a dynamic list in Javascript to build the menu
      // in the html.
      let sortingAlgorithm

      switch (index) {
        case 0:
          sortingAlgorithm = quickSort
          break
        case 1:
          sortingAlgorithm = bubbleSort
          break
        case 2:
          sortingAlgorithm = selectionSort
          break
        case 3:
          sortingAlgorithm = insertionSort
          break
        default:
          sortingAlgorithm = quickSort
      }

      const [sortedValues, steps] = sortingAlgorithm(values)
      drawSteps(ctx, steps)
    })
  })

  burger.addEventListener('click', () => {
    menu.classList.toggle('menu-active')
    burger.classList.toggle('toggle')
  })
})
