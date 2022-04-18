let root = document.documentElement;
const buttons= document.getElementsByTagName("button")
const mainscene = document.querySelector("#mainscene");
const wallBtn = document.querySelector("#addWall");
const sandBtn = document.querySelector("#addSand");

let gridxgrid = 30;


root.style.setProperty("--row-columns", gridxgrid);

let addState = "";




function checkaddState(btn,myState) {
    addState = myState
    btn.textContent = `In ${myState} State`; 
    for (let i of buttons){
        if(i.name!==myState){
            i.textContent=`Add ${i.name}`
        }
    }
}



for (let btn of buttons){
    btn.addEventListener("click", (e) => {
        const id =e.target.id
        switch (id) {
            case "addWall":
                checkaddState(btn,"wall");
                break;
            case "addSand":
                checkaddState(btn,"sand");
                break
            case "addWater":
                checkaddState(btn,"water");
                break
        
            default:
                break;
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
      if (addState.length >0) {
        cellListener(cell)
      }
    });
  }
}

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
            const sanddata = new Set([...document.querySelectorAll(`[data-issand="${true}"]`)])
            moveSand(sanddata)
            

            break;
        
        case "water":
            cell.classList.add("waterIn");
            cell.setAttribute("data-is-water", true);
            break;
      
          default:
              break;
      }
}

function moveSand(sanddata) {
    for(let i of sanddata){

        setInterval(()=>{
            moveDown(i)
        }, 1000);
    }
}

var currNum = gridxgrid / 2;


function draw(i) {
  i.classList.add("sandIn");
}

function unDraw(lastnum) {
    const currentCell = document.querySelector(`[data-cellid="${lastnum}"]`)
    if(currentCell){
        currentCell.classList.remove("sandIn");
    }
}

function moveDown(i) {
  let sandDataId=i.dataset.cellid
  if (sandDataId < Math.pow(gridxgrid, 2)) {
    draw(i);
    sandDataId += gridxgrid;
    unDraw(sandDataId-gridxgrid-gridxgrid)
  }
}
