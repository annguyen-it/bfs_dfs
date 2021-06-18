const table = document.querySelector('#table')
const widthInput = document.querySelector('#width')
const heightInput = document.querySelector('#height')
const stepDiv = document.querySelector('#step-div')

let matrix
let step
let isFindingPath = true
let canFindPath = true
let found = false
let width = 10
let height = 10
let cannotReach

class Position {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

function generate() {
  width = +widthInput.value
  height = +heightInput.value

  if (width > 0 && height > 0) {
    table.innerHTML = ''
    matrix = []
    step = []
    isFindingPath = true
    canFindPath = true
    found = false

    for (let row = 0; row < height; row++) {
      const matrixRow = []
      const tr = document.createElement('tr')

      for (let column = 0; column < width; column++) {
        const td = document.createElement('td')
        if ((row > 0 || column > 0) && (row < height - 1 || column < width - 1) && Math.random() < 0.35) {
          td.classList.add('wall')
          matrixRow.push(1)
        } else {
          matrixRow.push(0)
        }

        tr.appendChild(td)
      }

      matrix.push(matrixRow)
      table.appendChild(tr)
    }

    console.table(matrix)

    table.children[0].children[0].innerHTML = '<i class="far fa-flag"></i>'
    table.children[height - 1].children[width - 1].innerHTML = '<i class="fas fa-flag-checkered"></i>'

    step.push(new Position(0, 0))
  }
}

function next() {
  if (found) {
    return
  }

  const currentPosition = step.pop()

  if (!currentPosition) {
    canFindPath = false
    return
  }

  const x = currentPosition.x
  const y = currentPosition.y

  matrix[y][x] = 1
  table.children[y].children[x].classList.add('travel')

  if (x == width - 1 && y == height - 1) {
    found = true
    return
  }

  // Left
  if (x - 1 >= 0 && matrix[y][x - 1] === 0) {
    matrix[y][x - 1] = 1
    step.unshift(new Position(x - 1, y))
  }
  // Up
  if (y - 1 >= 0 && matrix[y - 1][x] === 0) {
    matrix[y - 1][x] = 1
    step.unshift(new Position(x, y - 1))
  }
  // Right
  if (x < width && matrix[y][x + 1] === 0) {
    matrix[y][x + 1] = 1
    step.unshift(new Position(x + 1, y))
  }
  // Down
  if (y + 1 < height && matrix[y + 1][x] === 0) {
    matrix[y + 1][x] = 1
    step.unshift(new Position(x, y + 1))
  }

  stepDiv.innerHTML = JSON.stringify(step)
}

document.querySelector('.generate').addEventListener('click', generate)

generate()

setInterval(() => {
  if (canFindPath && !found) {
    next()
  }
}, 1500)
