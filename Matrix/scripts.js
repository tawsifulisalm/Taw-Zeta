var mat = {};
var col = {};
var row = {};

var addColBtn = {};
var subColBtn = {};
var addRowBtn = {};
var subRowBtn = {};

var entries = {};

const matsContainer = document.querySelector(".mat-wrapper");
const matSelect = document.getElementById("mat-select");
const mat_create = document.getElementById("mat-create");

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

var created_mats = ["A", "B"];

function lisMats() {
  for (let h = 0; h < mats_m.length; h++) {
    matSelect.innerHTML += `<option id="mat_${mats_m[h]}"class="mat-select" value="${mats_m[h]}">${mats_m[h]}</option>`;
  }
}

lisMats();

function createEntries() {
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

  for (let m = 0; m < created_mats.length; m++) {
    entries[mats[m]].innerHTML = "";
  }

  // Only proceed if the matrix elements were correctly assigned
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
      console.error(`Matrix ${mats[l]} elements were not properly initialized`);
    }
  }
}

createEntries();

for (let n = 0; n < mats.length; n++) {
  // let m_name = mats[n];

  addColBtn[mats[n]] = document.getElementById(`add-col-${mats[n]}`);
  subColBtn[mats[n]] = document.getElementById(`sub-col-${mats[n]}`);
  addRowBtn[mats[n]] = document.getElementById(`add-row-${mats[n]}`);
  subRowBtn[mats[n]] = document.getElementById(`sub-row-${mats[n]}`);

  if (
    addColBtn[mats[n]] !== null &&
    subColBtn[mats[n]] !== null &&
    addRowBtn[mats[n]] !== null &&
    subRowBtn[mats[n]] !== null
  ) {
    addColBtn[mats[n]].addEventListener("click", () => {
      console.log(col[mats[n]]);
      col[mats[n]] += 1;
      console.log(col[mats[n]]);
    });

    subColBtn[mats[n]].addEventListener("click", () => {
      col[mats[n]] -= 1;
    });

    addRowBtn[mats[n]].addEventListener("click", () => {
      row[mats[n]] += 1;
    });

    subRowBtn[mats[n]].addEventListener("click", () => {
      row[mats[n]] -= 1;
    });
  } else {
  }
}

mat_create.addEventListener("click", () => {
  //Removing the created element from mats_m array and from the create matrix options
  const m_name = matSelect.value;

  const index = mats_m.indexOf(m_name);
  mats_m.splice(index, 1);

  var element = document.getElementById(`mat_${m_name}`);
  element.parentNode.removeChild(element);

  //creating and visualizing the new matrix
  matsContainer.innerHTML += `
    <div class="mat" id="mat-${m_name}">
      <h2 class="heading">Matrix ${m_name}</h2>
      <div class="order">
        <label>Column:</label>
        <button>+</button>
        <label class="col-m">3</label>
        <button>-</button>

        <label for=""></label>
        <label for=""></label>
        <label for=""></label>
        <label for=""></label>
        <label for=""></label>

        <label>Row:</label>
        <button>+</button>
        <label class="row-m">3</label>
        <button>-</button>
      </div>
      <div class="entries">
      </div>
    </div>
  `;

  //What should I say here?
  created_mats.push(m_name);
  createEntries();
});
