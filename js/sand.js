let root = document.documentElement;
const buttons = document.getElementsByTagName("button");
const mainscene = document.querySelector("#mainscene");
const wallBtn = document.querySelector("#addWall");
const sandBtn = document.querySelector("#addSand");

let gridxgrid = 10;

root.style.setProperty("--row-columns", gridxgrid);

let addState = "";

for (let btn of buttons) {
  btn.addEventListener("click", (e) => {
    let myState = e.target.name;
    addState = myState;
    btn.textContent = `In ${myState} State`;
    for (let i of buttons) {
      if (i.name !== myState) {
        i.textContent = `Add ${i.name}`;
      }
    }
  });
}

function createGrid(nxn) {
  for (let i = 0; i < nxn * nxn; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-cellid", i + 1);
    mainscene.appendChild(cell);

    cell.addEventListener("mouseover", () => {
      if (addState.length > 0) {
        cellListener(cell);
      }
    });
  }
}
var sandInterval ;
var sandIdSet = new Set()
var sandIdArr=[]
createGrid(gridxgrid);

function cellListener(cell) {
  switch (addState) {
    case "wall":
      cell.classList.add("wallIn");
      cell.setAttribute("data-is-wall", true);
      break;

    case "sand":
      cell.classList.add("sandIn");
      cell.setAttribute("data-issand", true);
      sandIdArr = [...document.querySelectorAll(`[data-issand="${true}"]`)].map(i=>{
        return parseInt(i.dataset.cellid)
      });
      console.log(sandIdArr)
     
      sandInterval = setInterval(moveSandDown, 1000);
      break;

    case "water":
      cell.classList.add("waterIn");
      cell.setAttribute("data-is-water", true);
      break;

    default:
      break;
  }
}
mainscene.addEventListener("mouseleave",()=>{
  if(sandInterval){
    clearInterval(sandInterval)
  }
})
var currNum = gridxgrid / 2;

function arrayRemove(array, value) {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
}

function draw(id) {
  const currentCell = document.querySelector(`[data-cellid="${id}"]`);
  currentCell.classList.add("sandIn");
}

function unDraw(lastnum) {
  const currentCell = document.querySelector(`[data-cellid="${lastnum}"]`);
  if (currentCell) {
    currentCell.classList.remove("sandIn");
  }
}

function moveSandDown() {
  
  for (let i = 0; i < sandIdArr.length; i++) {
    if (sandIdArr[i] <= Math.pow(gridxgrid, 2)) {
      draw(sandIdArr[i]);
      sandIdArr[i] += gridxgrid;
      unDraw(sandIdArr[i] - gridxgrid - gridxgrid);
      clearInterval(sandInterval)
    }
    else{
        arrayRemove(sandIdArr, sandIdArr[i]);
      }
  }

  
  console.log(sandIdArr)
}
