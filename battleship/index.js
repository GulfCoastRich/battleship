const { table } = require("table");
const EC = require("eight-colors");
const RS = require("readline-sync");

const rowLabelArr = ["A", "B", "C", "D", "E", "F"];
const columnLabelArr = [1, 2, 3, 4, 5, 6];
const smallBoard = "4x4";
const mediumBoard = "5x5";
const largeBoard = "6x6";
const sizes = [1, 2, 3];
const rowDefaultObj = { type: "empty", hit: false };
const smallShip = 2;
const largeShip = 3;
const type = "type";
const display = "display";

function setBoard(boardSize, board){
  let size = 0;
  if(boardSize === smallBoard ){
    size = 4;
  }else if(boardSize === mediumBoard){
    size = 5;
  }else if(boardSize === largeBoard){
    size = 6;
  }

  


}


const board = [
  [
    { type: "🔵", hit: false, display: "-" }, // A0
    { type: "🔵", hit: false, display: "-" }, // A1
    { type: "🔵", hit: false, display: "-" }, // A2
    { type: "-", hit: false, display: "-" }, // A3
    { type: "-", hit: false, display: "-" }, // A4
    { type: "-", hit: false, display: "-" }, // A5
  ],
  [
    { type: "-", hit: false, display: "-" }, // B0
    { type: "-", hit: false, display: "-" }, // B1
    { type: "-", hit: false, display: "-" }, // B2
    { type: "🟠", hit: false, display: "-" }, // B3
    { type: "🟠", hit: false, display: "-" }, // B4
    { type: "-", hit: false, display: "-" }, // B5
  ],
  [
    { type: "-", hit: false, display: "-" }, // C0
    { type: "-", hit: false, display: "-" }, // C1
    { type: "-", hit: false, display: "-" }, // C2
    { type: "-", hit: false, display: "-" }, // C3
    { type: "-", hit: false, display: "-" }, // C4
    { type: "🔵", hit: false, display: "-" }, // C5
  ],
  [
    { type: "🟠", hit: false, display: "-" }, // D0
    { type: "🟠", hit: false, display: "-" }, // D1
    { type: "-", hit: false, display: "-" }, // D2
    { type: "-", hit: false, display: "-" }, // D3
    { type: "-", hit: false, display: "-" }, // D4
    { type: "🔵", hit: false, display: "-" }, // D5
  ],
  [
    { type: "-", hit: false, display: "-" }, // E0
    { type: "-", hit: false, display: "-" }, // E1
    { type: "-", hit: false, display: "-" }, // E2
    { type: "-", hit: false, display: "-" }, // E3
    { type: "-", hit: false, display: "-" }, // E4
    { type: "🔵", hit: false, display: "-" }, // E5
  ],
  [
    { type: "🔵", hit: false, display: "-" }, // F0
    { type: "🔵", hit: false, display: "-" }, // F1
    { type: "🔵", hit: false, display: "-" }, // F2
    { type: "-", hit: false, display: "-" }, // F3
    { type: "-", hit: false, display: "-" }, // F4
    { type: "-", hit: false, display: "-" }, // F5
  ],
];

function getValues(board, key){
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

function printBoard(debug) {

  if(debug){
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

  }else{
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



printBoard(false);


 
  
 
