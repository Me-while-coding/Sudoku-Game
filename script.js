

const container = document.querySelector(".sudoku");
for (let i = 1; i <= 81; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.classList.add(`cell-${i}`);
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 1;
  cell.appendChild(input);
  container.appendChild(cell);
}

// Create empty 9x9 board
let board = Array.from({ length: 9 }, () => Array(9).fill(0));

// Check if a number can be placed at board[row][col]
function isValid(board, row, col, num) { // understood the logic
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}

// Helper to shuffle numbers 1-9
function shuffledOptions() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Real backtracking solver
function fillSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        let options = shuffledOptions();
        for (let num of options) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillSudoku(board)) return true; // success
            board[row][col] = 0; // backtrack
          }
        }
        return false; // no valid number found
      }
    }
  }
  return true; // solved
}

fillSudoku(board);
let i=1;
let cell;
for(let row=0;row<9;row++){
    for(let col=0;col<9;col++){
        cell = document.querySelector(`.cell-${i} input`);
        cell.value = board[row][col];
        cell.disabled = true;
        i++;
    }
}


makePuzzle(30);
console.log(board);

function makePuzzle(emptyCount){
  let idx=[];
  for(let j=1;j<=81;j++){
    idx.push(j);
  }
  for(let i=1;i<=emptyCount;i++){
    let choice = Math.floor(Math.random()*idx.length)
    let cell = document.querySelector(`.cell-${idx[choice]} input`);
    cell.dataset.answer=cell.value;
    cell.value="";
    cell.disabled=false;
    cell.parentElement.style.backgroundColor="white";
    idx.splice(choice,1);
  }
}

let selectedCell = null;
document.querySelectorAll(".cell input").forEach((cell)=>{
  cell.addEventListener("click",()=>{
    if(selectedCell !== null){
      selectedCell.parentElement.classList.remove("selected")}
      selectedCell = cell;
      selectedCell.parentElement.classList.add("selected");
  })
})
function checkWin(solvedCellCount){
  if(solvedCellCount === 30){
    setTimeout(() => {
      alert("congrats! you win")
    }, 50);
  }
}
let solvedCellCount = 0;
let buttons= document.querySelectorAll(".btn");
buttons.forEach((button)=>{
  button.addEventListener("click",()=>{
    if(selectedCell !== null){
      if(selectedCell.dataset.answer === button.innerText){
        selectedCell.value = button.innerText;
        selectedCell.disabled = true;
        solvedCellCount++;
        checkWin(solvedCellCount);
      }
      else{
        alert("wrong choice! Try again");
      }
    }
  })
})

document.addEventListener("keydown",(e)=>{
  if(selectedCell === null) return;
  let key = e.key;
  if(key<"1" || key>"9"){
    e.preventDefault();
    return;
  }
  if(key >="1" && key<="9"){
    e.preventDefault();
    let correct = selectedCell.dataset.answer;
    if(key === correct){
      selectedCell.value = key;
      selectedCell.disabled = true;
      selectedCell.parentElement.classList.remove("selected");
      selectedCell=null;
      solvedCellCount++;
      checkWin();
    }
    else{
      alert("Wrong choice! Try again");
      selectedCell.value="";
    }
  }

})


