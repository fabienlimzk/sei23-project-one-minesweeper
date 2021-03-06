let boardContainer = document.getElementById('board-container');

let board = document.createElement('div');
board.id = "board";
boardContainer.appendChild(board);

let selectAllGrid = document.querySelectorAll(".grid");

let gameOver = true;
let currentLevel = "";
let size = 10;
let mineArray = [];
let numberOfMines = 10;
var data = generateGridData(size);

let displayNumberOfMines= document.getElementById("display_mines_number");
displayNumberOfMines.textContent = "Number of mines: " + numberOfMines;

function generateGrid(size) {
    let id = 0;
    for (let row = 0; row < size; row ++) {
        const rowElement = document.createElement("div");
        rowElement.className = "row";
        rowElement.id = `row_number${id}`; // template literal - string with interpolated JS
        for (let col = 0; col < size; col ++) {
            const grid = document.createElement("div");
            grid.className = "grid";
            grid.id = `grid_number${id}`; // template literal - string with interpolated JS
            rowElement.appendChild(grid);
            grid.dataset.row = row;
            grid.dataset.col = col;
            grid.addEventListener("click", clicked);
            grid.addEventListener("contextmenu", toggleFlag);
            id += 1;
        }
        board.appendChild(rowElement);
    }
}

// 2D Array data
function generateGridData(size) {
    const gridData = new Array(size).fill('').map(element => new Array(size).fill('').map(el => ''));
    return gridData;
}

function createMine() {
    return {
        isMine: true,
        isOpened: false,
        isFlagged: false
    };
}

function createSpace(minesAround) {
    return {
        minesAround,
        isMine: false,
        isOpened: false,
        isFlagged: false
    };
}

function setMine(numberOfMines) {
    while (mineArray.length < numberOfMines) {
        let mineGrid = Math.floor(Math.random() * (size * size));
        // if mineGrid already exists
        if (mineArray.includes(mineGrid)) {
            // continue running the loop again
            continue;
        } else {
            mineArray.push(mineGrid);
        }
    }
}

function setMineInGrid() {
    // Get the mines into the data
    for (let i = 0; i < data.length; i++) {
        let id = i * size;
        for (let j = 0; j < data[0].length; j++) {
            if (mineArray.includes(id)) {
                data[i][j] = createMine();
            }
            id += 1;
        }
    }
}

function getTopLeft(grid, row, col) {
    return grid[row - 1][col - 1];
}

function getTopMiddle(grid, row, col) {
    return grid[row - 1][col];
}

function getTopRight(grid, row, col) {
    return grid[row - 1][col + 1];
}

function getMiddleLeft(grid, row, col) {
    return grid[row][col - 1];
}

function getMiddleRight(grid, row, col) {
    return grid[row][col + 1];
}

function getBottomLeft(grid, row, col) {
    return grid[row + 1][col - 1];
}

function getBottomMiddle(grid, row, col) {
    return grid[row + 1][col];
}

function getBottomRight(grid, row, col) {
    return grid[row + 1][col + 1];
}

function hasRowTop(grid, row) {
    return !!(grid[row - 1]);
}

function hasRowBottom(grid, row) {
    return !!(grid[row + 1]);
}

function hasColumnLeft(grid, col) {
    return !!(grid[col - 1]);
}

function hasColumnRight(grid, col) {
    return !!(grid[col + 1]);
}

function getNeighbourMines(grid, row, col) {
    let mines = 0;
    if (hasRowTop(grid, row) && hasRowBottom(grid, row)){
        if (hasColumnLeft(grid, col) && hasColumnRight(grid, col)) {
            if (getTopLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomRight(grid, row, col).isMine) {
                mines += 1;
            }
        } else if (hasColumnLeft(grid, col)) {
            if (getTopLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomMiddle(grid, row, col).isMine) {
                mines += 1;
            }
        } else {
            if (getTopMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomRight(grid, row, col).isMine) {
                mines += 1;
            }
        }
    } else if (hasRowTop(grid, row)) {
        if (hasColumnLeft(grid, col) && hasColumnRight(grid, col)) {
            if (getTopLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleRight(grid, row, col).isMine) {
                mines += 1;
            }
        } else if (hasColumnLeft(grid, col)) {
            if (getTopLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleLeft(grid, row, col).isMine) {
                mines += 1;
            }
        } else {
            if (getTopMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getTopRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleRight(grid, row, col).isMine) {
                mines += 1;
            }
        }
    } else {
        if (hasColumnLeft(grid, col) && hasColumnRight(grid, col)) {
            if (getMiddleLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getMiddleRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomRight(grid, row, col).isMine) {
                mines += 1;
            }
        } else if (hasColumnLeft(grid, col)) {
            if (getMiddleLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomLeft(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomMiddle(grid, row, col).isMine) {
                mines += 1;
            }
        } else {
            if (getMiddleRight(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomMiddle(grid, row, col).isMine) {
                mines += 1;
            }
            if (getBottomRight(grid, row, col).isMine) {
                mines += 1;
            }
        }
    }
    return mines;
}

function setMinesAroundInGrid() {
    // Get the minesAround placed in the data
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (data[i][j] === '') {
                data[i][j] = createSpace(getNeighbourMines(data, i, j));
            }
        }
    }
}

// left click function
function clicked(e) {
    let row = e.target.dataset.row;
    let col = e.target.dataset.col;

    if (!gameOver) {
        if (data[row][col].minesAround != 0 && !data[row][col].isMine && !data[row][col].isFlagged) {
            data[row][col].isOpened = true;
            e.target.style.backgroundImage = "url('./image/grid-open.png')";
            e.target.innerText = data[row][col].minesAround;
            if (gameWin()) {
                document.getElementById("display_mines_number").style.color = "blue";
                document.querySelector('#display_mines_number').innerText = "Game Won!";
                gameOver = true;
                revealAllMines();
            } 
        } else if (data[row][col].minesAround == 0 && !data[row][col].isMine && !data[row][col].isFlagged) {
            data[row][col].isOpened = true;
            e.target.style.backgroundImage = "url('./image/grid-open.png')";
            revealNeighbours();
            if (gameWin()) {
                document.getElementById("display_mines_number").style.color = "blue";
                document.querySelector('#display_mines_number').innerText = "Game Won!";
                gameOver = true;
                revealAllMines();
            } 
        } else if (data[row][col].isMine && !data[row][col].isFlagged) {
            data[row][col].isOpened = true;
            e.target.style.backgroundColor = "red";
            e.target.style.backgroundImage = "url('./image/mine.png')";
            revealAllMines();
            gameOver = true;
            document.getElementById("display_mines_number").style.color = "red";
            document.querySelector('#display_mines_number').innerText = "Game Over!";
        } 
    }
    
}

// right click
function toggleFlag(e) {
    let allowFlag = true;

    // prevent the right click menu to show
    e.preventDefault();

    let row = e.target.dataset.row;
    let col = e.target.dataset.col;

    if (!gameOver) {
        if (data[row][col].isOpened) {
            return;
        }
        if (allowFlag) {
            if (data[row][col].isFlagged) {
                // if isFlagged is true, change to false
                e.target.style.backgroundImage = "url('./image/grid.png')";
                numberOfMines += 1;
                data[row][col].isFlagged = false;
            } else if (!data[row][col].isFlagged && numberOfMines > 0) {
                // if isFlagged is false and numberOfMines more than 0, change to true
                e.target.style.backgroundImage = "url('./image/flag.png')";
                numberOfMines -= 1; 
                data[row][col].isFlagged = true;
            } else if (numberOfMines === 0) {
                allowFlag = false;
            }
        } 
        // else {
        //     if (data[row][col].isFlagged) {
        //         e.target.textContent = "";
        //         // numberOfMines += 1;
        //         allowFlag = true;
        //     }
        // }

        displayNumberOfMines.textContent = "Number of mines: " + numberOfMines;
    }
}

function revealAllMines() {
    let selectAllRows = document.querySelectorAll('.row');
    for (let i = 0; i < data.length; i++) {
        let currentRow = selectAllRows[i];
        for (let j = 0; j < data[i].length; j++) {
            let currentGrid = currentRow.childNodes[j];
            if (data[i][j].isMine) {
                data[i][j].isOpened = true;
                currentGrid.style.backgroundImage = "url('./image/mine.png')";
            }
        }
    }
}

function revealNeighbours() {
    let selectAllRows = document.querySelectorAll('.row');
    for (let i = 0; i < data.length; i++) {
        let currentRow = selectAllRows[i];
        for (let j = 0; j < data[i].length; j++) {
            let currentGrid = currentRow.childNodes[j];
            if (data[i][j].minesAround === 0) {
                data[i][j].isOpened = true;
                currentGrid.style.backgroundImage = "url('./image/grid-open.png')";
            } 
        }
    }
}

function gameWin() {
    let win = true;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (!data[i][j].isOpened && !data[i][j].isMine) {
                win = false;
            }
        }
    }
    return win;
}

// button functions
function setLevel(newSize, newNumberOfMines, value) {
    let buttons = document.querySelectorAll(".level-button");
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.visibility = "hidden";
    }

    if (value == 'beginner') {
        currentLevel = "beginner";
        document.querySelector('#choose-level').innerText = "Level: Beginner";
    } else if (value == 'intermediate') {
        currentLevel = "intermediate";
        document.querySelector('#choose-level').innerText = "Level: Intermediate";
    } else if (value == 'expert') {
        currentLevel = "expert";
        document.querySelector('#choose-level').innerText = "Level: Expert";
    }

    document.getElementById("display_mines_number").style.visibility = "visible";
    document.getElementById("display_mines_number").style.color = "black";
    document.querySelector(".reset-button").style.visibility = "visible";
    mineArray.splice(0, mineArray.length);
    board.innerHTML = "";
    gameOver = false;
    size = newSize;
    numberOfMines = newNumberOfMines;
    data = generateGridData(size);
    generateGrid(size);
    setMine(numberOfMines);
    setMineInGrid();
    setMinesAroundInGrid();
    displayNumberOfMines.textContent = "Number of mines: " + numberOfMines;
    // console.log(data);
}

function resetButton() {
    let buttons = document.querySelectorAll(".level-button");
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.visibility = "visible";
    }

    document.querySelector('#choose-level').innerText = "Pick a level to start:";
    document.querySelector(".reset-button").style.visibility = "hidden";
    document.getElementById("display_mines_number").style.visibility = "hidden";
    if (currentLevel == "beginner") {
        numberOfMines = 10;
    } else if (currentLevel == "intermediate") {
        numberOfMines = 40;
    } else if (currentLevel == "expert") {
        numberOfMines = 69;
    }
    mineArray.splice(0, mineArray.length);
    gameOver = true;
    board.innerHTML = "";
    data = generateGridData(size);
    generateGrid(size);
    setMine(numberOfMines);
    setMineInGrid();
    setMinesAroundInGrid();
    displayNumberOfMines.textContent = "Number of mines: " + numberOfMines;
}

generateGrid(size);
setMine(numberOfMines);
setMineInGrid();
setMinesAroundInGrid();