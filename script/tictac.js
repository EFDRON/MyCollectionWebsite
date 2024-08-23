
const cells=document.querySelectorAll(".cell");
const resetButton=document.querySelector("#forTTT");
const statusText=document.querySelector(".status-text");
const againstComputer=document.querySelector('.against-computer');
const againstFriend=document.querySelector('.against-friend');
const againstMessage=document.querySelector('.with');

let options=['','','','','','','','',''];
const winCondtions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let currentPlayer="x";
let running=false;
let player="friend";
let random
againstMessage.textContent="Playing Against Friend";

againstComputer.addEventListener('click',function(){
    player="computer";
    againstMessage.textContent="Playing Against Computer";
    restartGame();
})
againstFriend.addEventListener('click',function(){
    player="friend";
    againstMessage.textContent="Playing Against Friend";
    restartGame();
})

initialize();
function initialize(){
    running=true;
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    resetButton.addEventListener("click",restartGame);
    
}

 
function cellClicked(event){
    const cellIndex=event.target.getAttribute("cellIndex");
    if(options[cellIndex]!="" || !running){
        return
    }
    updateCell(event.target,cellIndex);
    

    if(player==='friend'){
        checkWinner();
        changePlayer();     
    }

    else if(player=='computer'){
        checkWinner()

        setTimeout(()=>{
            changePlayer();
            let j=0;
            while(j<9){
                random=getRandomInt(9);
                if(options[random]==''){
                    console.log("found Empty box")
                    break;
                }
                j+=1;
    
            }
            for(let i=0;i<cells.length;i++){
                let myIndex =cells[i].getAttribute('cellIndex');
                if(myIndex==random && running==true){
                    updateCell(cells[i],random);
                    checkWinner();
                    changePlayer();
                    break;
                }
    
            }

        },500)
             
    }    
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function updateCell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
}

function changePlayer(){
    currentPlayer=(currentPlayer==="x")?"o":"x";
    
}
function checkWinner(){
    let roundWinner=false;
    for(let i=0;i<winCondtions.length;i++){
        const condition=winCondtions[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];
        if(cellA!="" && cellA==cellB && cellA==cellC){      
            
            roundWinner=true;
            break;
        }   
    }

    if(roundWinner){

        statusText.textContent=`${currentPlayer} Wins!!!`;
        running=false;    
    }
    else if(!options.includes('')){
        statusText.textContent=`Draw!!!`;
        running=false;

    }
    
}

function restartGame(){
    cells.forEach(cell=>cell.textContent='');
    options=['','','','','','','','',''];
    running=true;   
    statusText.textContent=''
}

