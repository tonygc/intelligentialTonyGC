const functionality = require('./matrix');

let matrixOne = [
  [1, 2],
  [8, 3],
  [7, 4],
  [6, 5],
];
console.log("<======First sample matrix 2X4======>");
console.log("\n");
for(let i=0;i<matrixOne.length;i++){
  console.log("\t"+matrixOne[i].join("\t"));
}
console.log("\n");
let response = functionality.caracol(matrixOne);
console.log("<-Response Array->", response);
console.log("\n");

matrixOne = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
console.log("<======First sample matrix 2X3======>");
console.log("\n");
for(let i=0;i<matrixOne.length;i++){
    console.log("\t"+matrixOne[i].join("\t"));
}
console.log("\n");
response = functionality.caracol(matrixOne);
console.log("<-Response Array->", response);
console.log("\n");

let matrixTwo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
console.log("<======Second sample matrix 3X3======>");
console.log("\n");
for(let i=0;i<matrixTwo.length;i++){
    console.log("\t"+matrixTwo[i].join("\t"));
}
console.log("\n");
response = functionality.caracol(matrixTwo);
console.log("<-Response Array->", response);
console.log("\n");

let matrixThree = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

console.log("<======Third sample matrix 4X4========>");
console.log("\n");
for(let i=0;i<matrixThree.length;i++){
    console.log("\t"+matrixThree[i].join("\t"));
}
console.log("\n");
response = functionality.caracol(matrixThree);
console.log("<-Response Array->", response);
console.log("\n");

let matrixFourth = [
    [-1, -2, 10, 11, 12],
    [6, 7, 8, 22, 54],
    [0, 81, 110, 230, 520],
    ['x', 'abc', 34, 54, 21],
  ];
  
console.log("<======Third sample matrix 5X4========>");
console.log("\n");
for(let i=0;i<matrixFourth.length;i++){
    console.log("\t"+matrixFourth[i].join("\t"));
}
console.log("\n");
response = functionality.caracol(matrixFourth);
console.log("<-Response Array->", response);
console.log("\n");

let matrixFifth = [
    [-1, -2, 10, 11, 12],
    [6, 7, 8, 22, 54],
    [0, 81, 110, 230, 520],
    ['x', 'abc', 34, 54, 21],
    [38, 39, 40, 41, 42],
  ];
  
console.log("<======Third sample matrix 5X5========>");
console.log("\n");
for(let i=0;i<matrixFifth.length;i++){
    console.log("\t"+matrixFifth[i].join("\t"));
}
console.log("\n");
response = functionality.caracol(matrixFifth);
console.log("<-Response Array->", response);
console.log("\n");