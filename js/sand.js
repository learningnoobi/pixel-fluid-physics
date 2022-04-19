let root = document.documentElement;
const buttons = document.getElementsByTagName("button");
const mainscene = document.querySelector("#mainscene");
const wallBtn = document.querySelector("#addWall");
const sandBtn = document.querySelector("#addSand");

let gridxgrid = 100

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
var sandInterval=null ;
var sandIdSet = new Set()
var sandIdArr=[]
createGrid(gridxgrid);

function cellListener(cell) {
  switch (addState) {
    case "wall":
      cell.classList.add("wallIn");
      cell.setAttribute("data-iswall", true);
      cell.setAttribute("data-cannotmove",true);
      break;

    case "sand":
      cell.classList.add("sandIn");
      cell.setAttribute("data-issand", true);
      sandIdArr = [...document.querySelectorAll(`[data-issand="${true}"]`)].map(i=>{
        return parseInt(i.dataset.cellid)
      });
     if(!sandInterval)
      {
        sandInterval = setInterval(moveSandDown, 10)
      }
      break;

    case "water":
      cell.classList.add("waterIn");
      cell.setAttribute("data-iswater", true);
      break;

    default:
      break;
  }
}
// mainscene.addEventListener("mouseleave",()=>{
//   if(sandInterval){
//     clearInterval(sandInterval)
//   }
// })

function arrayRemove(array, value) {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
}

function draw(id) {
  const currentCell = document.querySelector(`[data-cellid="${id}"]`);
  //  console.log(currentCell)
    currentCell.classList.add("sandIn");
    currentCell.setAttribute("data-issand", true);
 
  
}

function unDraw(lastnum) {
  const currentCell = document.querySelector(`[data-cellid="${lastnum}"]`);
    if (!currentCell) return
    currentCell.classList.remove("sandIn");
    currentCell.removeAttribute("data-issand");
   
    
  
}

function moveSandDown() {

  if(sandIdArr.length===0){
    console.log('clearing  timeout as length is ',sandIdArr.length)
     clearInterval(sandInterval)
        clearInterval(sandInterval);
      while (sandInterval!== null){
          sandInterval=null;
      }
     return;

  }
  console.log('sand length is ',sandIdArr.length)
  for (let i = 0; i < sandIdArr.length; i++) {
    // const currCell = document.querySelector(`[data-cellid="${sandIdArr[i]+gridxgrid}"]`);

    if(sandIdArr[i] >Math.pow(gridxgrid, 2)) {
      
      const currCell = document.querySelector(`[data-cellid="${sandIdArr[i]-gridxgrid}"]`);
      currCell.removeAttribute("data-issand");
      currCell.setAttribute("data-cannotmove",true);
      arrayRemove(sandIdArr, sandIdArr[i]);
     

    }
    else{
      draw(sandIdArr[i]);
      sandIdArr[i] += gridxgrid;
      const nextCell = document.querySelector(`[data-cellid="${sandIdArr[i]}"]`);
      //check if next down cell is not movalble (i.e wall or last row)
      if(nextCell && nextCell.dataset.cannotmove){
        let leftdown = document.querySelector(`[data-cellid="${sandIdArr[i]-1}"]`);
        let rightdown = document.querySelector(`[data-cellid="${sandIdArr[i] +1}"]`);
        
        //if left down and right down and next down is not movalble stay where it is
        if(leftdown.dataset.cannotmove && rightdown.dataset.cannotmove){
          sandIdArr[i] -= gridxgrid;
          const currCell = document.querySelector(`[data-cellid="${sandIdArr[i]}"]`);
          unDraw(sandIdArr[i] - gridxgrid);
          arrayRemove(sandIdArr, sandIdArr[i]);
          currCell.removeAttribute("data-issand");
          currCell.setAttribute("data-cannotmove",true);
        }

        else if(!leftdown.dataset.cannotmove ){
          sandIdArr[i]-=1;
          unDraw(sandIdArr[i] + 1-gridxgrid  );
          unDraw(sandIdArr[i] + 1-gridxgrid -gridxgrid );
        }

        else{
          sandIdArr[i]+=1;

          unDraw(sandIdArr[i] - 1-gridxgrid  );
          unDraw(sandIdArr[i] - 1-gridxgrid -gridxgrid );
        }
   

      }

      else{
        unDraw(sandIdArr[i] - gridxgrid -gridxgrid );
         
      }

    }
  
  }

}
