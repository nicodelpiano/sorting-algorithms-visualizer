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
let stop = false;
let lastCtx;
let laststeps;
let lastspeed;
let lastindex = -1;

setDisplay(false);

function setDisplay(stopping) {
  if (stopping) {
    let el = document.getElementById("start");
    el.style.display = 'unset';
    el = document.getElementById("stop");
    el.style.display = 'none';
    stop = true;
  }
  else {
    let el = document.getElementById("stop");
    el.style.display = 'unset';
    el = document.getElementById("start");
    el.style.display = 'none';
    stop = false;
  }
}

document.getElementById("start").addEventListener("click", function () {
  setDisplay(false);
  if (lastindex >= 0) {
    drawSteps(lastCtx, laststeps, lastindex, lastspeed).then(function (index) {
      console.log('index', index);
      lastindex = index;
    })
  }
});

document.getElementById("stop").addEventListener("click", function () {
  // document.getElementById("demo").innerHTML = "Hello World";
  setDisplay(true);
});





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
  
  //console.log('valuse', values.entries());
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



async function drawSteps(ctx, steps, index = 0, speed = DEFAULT_SPEED) {
  lastCtx = ctx;
  laststeps = steps;
  lastspeed = speed;
  let i;
  for (i = index; i < steps.length; i++) {
    if (stop) {
      return i;
    }
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(drawStep(ctx, steps[i])), speed)
    })
    
  }
  return -1;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const canvas = document.getElementById('myCanvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  const ctx = canvas.getContext('2d')
  
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const menuItems = document.querySelectorAll('.menu li')

  let isExecuting = false
  let currentlyExecuting = ''

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

        document.getElementById('myWarning').innerText = "Currently executing: " +  currentlyExecuting + "."

        const [sortedValues, steps] = sortingAlgorithm(values)
        await drawSteps(ctx, steps)

        isExecuting = false
        document.getElementById('myWarning').innerText = "Finished executing: " +  currentlyExecuting + "."
        currentlyExecuting = ''
      } else {
        document.getElementById('myWarning').innerText = "Currently executing: " +  currentlyExecuting + ". Please wait."
      }
    })
  })
  
  burger.addEventListener('click', () => {
    menu.classList.toggle('menu-active')
    burger.classList.toggle('toggle')
  })
})
