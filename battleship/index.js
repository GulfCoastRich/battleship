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

const board = [
  [
    { type: "large", id: 1, hit: false, display: "-" }, // A0
    { type: "small", hit: true, display: "🟠" }, // A1
    { type: "small", hit: false, display: "-" }, // A2
    { type: "large", id: 1, hit: false, display: "-" }, // A3
    { type: "small", hit: true, display: "-" }, // A4
    { type: "small", hit: false, display: "-" }, // A5
  ],
  [
    { type: "large", id: 1, hit: false, display: "-" }, // B0
    { type: "empty", hit: false, display: "🟠" }, // B1
    { type: "empty", hit: false, display: "-" }, // B2
    { type: "large", id: 1, hit: false, display: "🟠" }, // B3
    { type: "empty", hit: false, display: "🟠" }, // B4
    { type: "empty", hit: false, display: "-" }, // B5
  ],
  [
    { type: "large", id: 1, hit: false, display: "-" }, // C0
    { type: "empty", hit: false, display: "-" }, // C1
    { type: "empty", hit: false, display: "-" }, // C2
    { type: "large", id: 1, hit: false, display: "-" }, // C3
    { type: "empty", hit: false, display: "-" }, // C4
    { type: "empty", hit: false, display: "🔵" }, // C5
  ],
  [
    { type: "large", id: 1, hit: false, display: "🟠" }, // D0
    { type: "empty", hit: false, display: "🟠" }, // D1
    { type: "empty", hit: false, display: "" }, // D2
    { type: "large", id: 1, hit: false, display: "-" }, // D3
    { type: "empty", hit: false, display: "-" }, // D4
    { type: "empty", hit: false, display: "🔵" }, // D5
  ],
  [
    { type: "large", id: 1, hit: false, display: "-" }, // E0
    { type: "empty", hit: false, display: "-" }, // E1
    { type: "empty", hit: false, display: "-" }, // E2
    { type: "large", id: 1, hit: false, display: "-" }, // E3
    { type: "empty", hit: false, display: "-" }, // E4
    { type: "empty", hit: false, display: "🔵" }, // E5
  ],
  [
    { type: "large", id: 1, hit: false, display: "🔵" }, // F0
    { type: "empty", hit: false, display: "🔵" }, // F1
    { type: "empty", hit: false, display: "🔵" }, // F2
    { type: "large", id: 1, hit: false, display: "-" }, // F3
    { type: "empty", hit: false, display: "-" }, // F4
    { type: "empty", hit: false, display: "-" }, // F5
  ],
];



function printBoard(board, debug) {
 let values = [];
  for(let i = 0; i < board.length; i++){
    let val = [];
      for(let j = 0; j < board[i].length; j++){
        val.push(board[i][j].display);
      }
       values.push(val);
       //console.log(values);
  }
 
  //console.log(`Values array = ${values}`);
  console.table({
    A: values[0],
    B: values[1],
    C: values[2],
    D: values[3],
    E: values[4],
    F: values[5],
  });
}



printBoard(board, true);


 
  
 
