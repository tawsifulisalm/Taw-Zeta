var matCon = {};
var col = {};
var row = {};
var entries = {};

const matSelect = document.getElementById("mat-select");

var mats = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

var mats_m = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

for (let h = 0; h < mats_m.length; h++) {
  matSelect.innerHTML += `<option class="mat-select" value="${mats_m[h]}">${mats_m[h]}</option>`;
}

// Check if entries, col-m, and row-m exist before trying to access them
for (let i = 0; i < mats.length; i++) {
  let entriesList = document.querySelectorAll(".entries");
  let colList = document.querySelectorAll(".col-m");
  let rowList = document.querySelectorAll(".row-m");

  if (entriesList.length > i && colList.length > i && rowList.length > i) {
    entries[mats[i]] = entriesList[i];
    col[mats[i]] = parseInt(colList[i].innerHTML, 10);
    row[mats[i]] = parseInt(rowList[i].innerHTML, 10);
  } else {
    console.error(`Element for matrix ${mats[i]} not found`);
  }
}

// Only proceed if matrix A elements were correctly assigned

for (let l = 0; l < mats.length; l++) {
  if (
    row[mats[l]] !== undefined &&
    col[mats[l]] !== undefined &&
    entries[mats[l]] !== undefined
  ) {
    for (let j = 0; j < row[mats[l]]; j++) {
      for (let k = 0; k < col[mats[l]]; k++) {
        entries[mats[l]].innerHTML += `
        <input type="number">
        `;
      }
      entries[mats[l]].innerHTML += `<br>`;
    }
  } else {
    console.error(`Matrix ${l} elements were not properly initialized`);
  }
}
