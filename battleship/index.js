const { checkbox, Separator } = require("@inquirer/prompts");
const { table } = require("table");
const EC = require("eight-colors");
const RS = require("readline-sync");

const type = "type";
const display = "display";
const sizes = [4, 5, 6];
let size = 0;
const board = [];

function getBoard(size) {
  for (let i = 0; i < size; i++) {
    let arr = [];
    for (let j = 0; j < size; j++) {
      let alphaArr = ["A", "B", "C", "D", "E", "F"];
      arr.push({
        id: `${alphaArr[i]}${j}`,
        type: "-",
        hit: false,
        display: "-",
      });
    }
    board.push(arr);
  }

  return board;
}

function addShipsToBoard(size) {
  let smallShips = 0;
  let largeShips = 0;
  let totalShips = 0;

  if (size === 4) {
    smallShips = 1;
    largeShips = 1;
    totalShips = 2;
  } else if (size === 5) {
    smallShips = 2;
    largeShips = 1;
    totalShips = 3;
  } else if (size === 6) {
    smallShips = 2;
    largeShips = 2;
    totalShips = 4;
  }

  let choice = rowOrCol();

  while (smallShips > 0) {
    placeShip(board, "small", choice);
    smallShips--;
  }

  while (largeShips > 0) {
    placeShip(board, "large", choice);
    largeShips--;
  }

  return board;
}

function getIndex(size) {
  return Math.floor(Math.random() * size) + 1;
}

function rowOrCol() {
  return Math.floor(Math.random() * 2) + 1;
}

function placeShip(board, shipType, rowOrCol) {
  let itemWidth = 0;
  let itemHeight = 0;
  const rows = board.length;
  const cols = board[0].length;
  let symbol = "";

  if (shipType === "small") {
    symbol += "🟠";
  } else {
    symbol += "🔵";
  }

  //determine the direction and size of the ship placement
  if (shipType == "small" && rowOrCol === 1) {
    itemWidth = 1;
    itemHeight = 2;
  } else if (shipType == "small" && rowOrCol === 2) {
    itemWidth = 2;
    itemHeight = 1;
  } else if (shipType == "large" && rowOrCol === 1) {
    itemWidth = 1;
    itemHeight = 3;
  } else if (shipType == "large" && rowOrCol === 2) {
    itemWidth = 3;
    itemHeight = 1;
  }

  while (true) {
    // Generate random coordinates within the grid
    const x = Math.floor(Math.random() * (cols - itemWidth));
    const y = Math.floor(Math.random() * (rows - itemHeight));

    // Check for overlap
    let overlap = false;
    for (let i = y; i < y + itemHeight; i++) {
      for (let j = x; j < x + itemWidth; j++) {
        if (board[i][j].type !== "-") {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }

    // If no overlap, place the item
    if (!overlap) {
      for (let i = y; i < y + itemHeight; i++) {
        for (let j = x; j < x + itemWidth; j++) {
          board[i][j].type = symbol; // Set type as occupied
        }
      }
      return board;
    }
  }
}

//Will return board object values based on key
function getValues(board, key) {
  let values = [];
  for (let i = 0; i < board.length; i++) {
    let val = [];
    for (let j = 0; j < board[i].length; j++) {
      val.push(board[i][j][key]);
    }
    values.push(val);
  }
  return values;
}

function printBoard(size, debug) {
  if (size === 4) {
    if (debug) {
      console.log(debug);
      let values = getValues(board, type);
      console.table({
        A: values[0],
        B: values[1],
        C: values[2],
        D: values[3],
      });
    } else {
      console.log(debug);
      let values = getValues(board, display);
      console.table({
        A: values[0],
        B: values[1],
        C: values[2],
        D: values[3],
      });
    }
  } else if (size === 5) {
    if (debug) {
      console.log(debug);
      let values = getValues(board, type);
      console.table({
        A: values[0],
        B: values[1],
        C: values[2],
        D: values[3],
        E: values[4],
      });
    } else {
      console.log(debug);
      let values = getValues(board, display);
      console.table({
        A: values[0],
        B: values[1],
        C: values[2],
        D: values[3],
        E: values[4],
      });
    }
  } else if (size === 6) {
    if (debug) {
      console.log(debug);
      let values = getValues(board, type);
      console.table({
        A: values[0],
        B: values[1],
        C: values[2],
        D: values[3],
        E: values[4],
        F: values[5],
      });
    } else {
      console.log(debug);
      let values = getValues(board, display);
      console.table({
        A: values[0],
        B: values[1],
        C: values[2],
        D: values[3],
        E: values[4],
        F: values[5],
      });
    }
  }
}

function getSize() {
  let choice = RS.keyInSelect(sizes, "Choose a board size)") + 1;
  if (choice === 1) {
    size = 4;
  } else if (choice === 2) {
    size = 5;
  } else if (choice === 3) {
    size = 6;
  } else if (choice === 0) {
    console.clear();
    getSize();
  }
  return size;
}

function guess(size) {
  let guessCoordinate = RS.question("Please guess a coordinate");
  console.log(`guessCoordinate = ${guessCoordinate}`);
  console.log("Size = " + size);
  let isValid = false;
  const regex4 = /[A-D)][0-3]/i;
  const regex5 = /[A-E][0-4]/i;
  const regex6 = /[A-F][0-5]/i;
  let correct = false;

  if(size === 4){
    isValid = regex4.test(guessCoordinate);
  }else if(size === 5) {
     isValid = regex5.test(guessCoordinate);
  }else if(size === 6) {
     isValid = regex6.test(guessCoordinate);
  }
  console.log("Is valid = " + isValid);
  console.log("Board = " + board);

  if(isValid){
    for (let row of board) {
      for (let obj of row) {
        if (obj.id === guessCoordinate && obj.hit === false && obj.type === "-") {
          console.log(guess);
          console.log(obj.id);
          console.log(obj.hit);
          console.log(obj.display);
          obj.display = "❌"; // Change the display value
          obj.hit = true;
          correct = false;
          break; // Exit the inner loop once the object is found and updated
        }else if (obj.id === guess && obj.hit === false) {
          console.log(obj.id);
          console.log(obj.hit);
          console.log(obj.display);
           obj.display = obj.type;
           obj.hit = true;
           correct = true;
           break;
        }
      }
    }
  }else{
    console.log("Sorry, that is not a valid guess.");
  }

  if (correct) {
    console.log("Hit!!!");
  } else {
    console.log("Miss!!!");
  }

  
  

}

console.log("How Many Ships per Board Size");
console.log("4x4: \n [] 1 large \n [] 1 small");
console.log("5x5: \n [] 1 large \n [] 2 small");
console.log("6x6: \n [] 2 large \n [] 2 small");
console.log("Welcome to Battleship 🚢");

size = getSize();
console.log("Size = " + size);
getBoard(size);
printBoard(size, false);
addShipsToBoard(size);
printBoard(size, true);
printBoard(size, false);
guess(size);
printBoard(size, false);
guess(size);
printBoard(size, false);
guess(size);
printBoard(size, false);
guess(size);
printBoard(size, false);
guess(size);
printBoard(size, false);