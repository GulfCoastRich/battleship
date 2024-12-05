const { table } = require("table");
const EC = require("eight-colors");
const RS = require("readline-sync");

const size = 4;
const type = "type";
const display = "display";
const board = [];

function getBoard(size) {
  for (let i = 0; i < size; i++) {
    let arr = [];
    for (let j = 0; j < size; j++) {
      arr.push({ type: "-", hit: false, display: "-" });
    }
    board.push(arr);
  }

  return board;
}

function addShipsToBoard(size) {
  let smallShips = 0;
  let largeShips = 0;
  let totalShips = 0;

  console.log(`Size = ${size}`);
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
    console.log("Choice = " + choice);
    
    while(smallShips > 0){
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

  if(shipType === 'small'){
    symbol += "🟠";
  }else{
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
        if (board[i][j].type !== '-') {
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

getBoard(size);
printBoard(size, false);
addShipsToBoard(size);
printBoard(size, true);
