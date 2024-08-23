const buttonContainer=document.querySelector('.three-button-container')
const rockButton=document.querySelector('#rock');
const scissorsbutton=document.querySelector('#scissors');
const paperButton=document.querySelector('#paper');
const message=document.querySelector('.three-button-messageP');
const winningMessage=document.querySelector('.three-button-message');
const reset=document.querySelector('#forRPS')
let playerChoice='';
let win=0;
let draw=0;
let lose=0;

buttonContainer.addEventListener('click',playgame)
reset.addEventListener('click',resetGame)

function playgame(event){
    let status;
    
    computer=computerChoice()
    console.log(computer)
    const playerChoice=event.target.getAttribute('id')
    
    if(playerChoice=="rock"){
        if(playerChoice==computer){
            status='Draw'
        }
        else if(computer=='scissors'){
            status='You Won'
        }
        else if(computer=='paper'){
            status='You Lose'
        }  
    
    }

    else if(playerChoice=="paper"){

        if(playerChoice==computer){
            status='Draw'
        }
        else if(computer=='scissors'){
            status='You Lose'
        }
        else if(computer=='rock'){
            status='You Won'
        }   

    }
    else{
        if(computer=='scissors'){
            status='Draw'
        }
        else if(computer=='paper'){
            status='You Won'
        }
        else if(computer=='rock'){
            status='You Lose'
        }
       
       
    }
    updateStatus(computer,playerChoice,status);

}

function computerChoice(){
    const random=getRandomInt(3);
    if(random==0){
        return ('rock');
    }
    else if (random==1){
        return ('paper');
    }
    else{
        return('scissors');
    }


}
function updateStatus(computer,player,status){
    if(computer!=null||player!=null){
        if(status=="You Won"){
            win+=1;
        }
        else if (status=="You Lose"){
            lose+=1;
        }
        else{
            draw+=1
        }
        message.textContent=`You picked ${player}, computer picked ${computer}. ${status} `

    }
   
     
    winningMessage.innerHTML=`
        <p class="js-status">Win: ${win}</p>
        <p class="js-status">Lose: ${lose}</p>
        <p class="js-status">Draw: ${draw}</p>`
    }
function resetGame(){
    win=0;
    lose=0;
    draw=0;
    message.textContent=''
    winningMessage.innerHTML=`
    <p class="js-status">Win: ${win}</p>
    <p class="js-status">Lose: ${lose}</p>
    <p class="js-status">Draw: ${draw}</p>`
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



