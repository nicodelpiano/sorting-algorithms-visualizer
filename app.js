import {
  bubbleSort,
  selectionSort,
  quickSort,
  insertionSort
} from './sorting-algorithms.js'

// Constants
const MAX_RECT_WIDTH = 40
const DEFAULT_SPEED = 1
const MAX_SPEED = 500;
const DEFAULT_RECT_COLOR = '#FF0000'
const PIVOT_RECT_COLOR = '#FF00FF'
const SWAPPED_RECT_COLOR = '#FFFF00'
const CANVAS_BG_COLOR = '#FFF'
const CANVAS_WIDTH = 3000
const CANVAS_HEIGHT = 600
const MAX_VALUE = CANVAS_HEIGHT
const NUM_ELEMENTS = Math.floor(CANVAS_WIDTH / (MAX_RECT_WIDTH * 2))
let SPEED = null;

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
  let stepCount = 0
  for (const step of steps) {
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(drawStep(ctx, step)), speed)
    })
    stepCount++
    drawCurrentStep(stepCount, steps.length)    
  }
}

function drawCurrentStep(currentStep, totalSteps) {
  document.getElementById('currentStep').innerText = `Current Step: ${currentStep} / ${totalSteps}`
}

document.addEventListener('DOMContentLoaded', function(event) {
  const canvas = document.getElementById('myCanvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  const ctx = canvas.getContext('2d')

  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const menuItems = document.querySelectorAll('.menu li')
  let isExecuting = false
  let currentlyExecuting = ''
  const speedSlider = document.getElementById('speed');
  const speedControl = document.querySelector('#speed-input');
  let speedValue = MAX_SPEED + 1 - parseInt(speedSlider.value)
  speedSlider.oninput = function() {
    speedValue = MAX_SPEED + 1 - parseInt(this.value)
    speedControl.value = parseInt(this.value)
  }
  speedControl.oninput = function() {
    speedValue = MAX_SPEED + 1 - parseInt(this.value)
    speedSlider.value = parseInt(this.value)
  }

  menuItems.forEach((link, index) => {
    link.addEventListener('click', async () => {
      if (!isExecuting) {
        isExecuting = true
        const values = Array(NUM_ELEMENTS)
          .fill(0)
          .map(e => Math.floor(Math.random() * MAX_VALUE))

        // TODO: Improve this by having a dynamic list in Javascript to build the menu
        // in the html.
        let sortingAlgorithm

        switch (index) {
          case 0:
            sortingAlgorithm = quickSort
            currentlyExecuting = 'QuickSort'
            break
          case 1:
            sortingAlgorithm = bubbleSort
            currentlyExecuting = 'BubbleSort'
            break
          case 2:
            sortingAlgorithm = selectionSort
            currentlyExecuting = 'SelectionSort'
            break
          case 3:
            sortingAlgorithm = insertionSort
            currentlyExecuting = 'InsertionSort'
            break
          default:
            sortingAlgorithm = quickSort
            currentlyExecuting = 'QuickSort'
        }

        document.getElementById('myWarning').innerText = `Currently executing: ${currentlyExecuting}.`

        const [sortedValues, steps] = sortingAlgorithm(values)

        await drawSteps(ctx, steps, speedValue)
        isExecuting = false
        document.getElementById('myWarning').innerText = `Finished executing: ${currentlyExecuting}.`
        currentlyExecuting = ''
      } else {
        document.getElementById('myWarning').innerText = `Currently executing: ${currentlyExecuting}. Please wait.`
      }
    })
  })

  burger.addEventListener('click', () => {
    menu.classList.toggle('menu-active')
    burger.classList.toggle('toggle')
  })

  // prevent inputting invalid characters and typing in number higher than max speed
  speedControl.addEventListener("keydown", (e) => {
    const invalidChars = [ '-', '+', 'e', 'E', '.', ',' ];
    return (invalidChars.includes(e.key) || Number(`${e.target.value}${e.key}`) > MAX_SPEED) && e.preventDefault();
  });

  // prevent leaving number input empty
  speedControl.addEventListener("blur", (e) => !e.target.value && (e.target.value = 50));
  
  speedControl.addEventListener("input", (e) => e.target.value <= MAX_SPEED && (SPEED = e.target.value));
})
