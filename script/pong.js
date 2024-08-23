const pongSection=document.querySelector("#PingPong")
const pongCanvas=document.querySelector("#pongCanvas");
const pongRestart=document.querySelector("#pongReset");
const pongStartButton=document.querySelector("#pongStart");
const pongScore=document.querySelector("#pongScore")
const pongCtx=pongCanvas.getContext('2d');
const pongWidth=pongCanvas.width;
const pongHeight=pongCanvas.height;

const pongBackground="darkred";
const ballColor='white';
const ballBorder='white';
const paddle1Color="black";
const paddle2Color='black';
const paddleBorder="white";

const paddleSpeed=30;
const ballRadius=12.5;
let pongPaused=false;
let pongintervalID;
let ballSpeed=1;
let ballX=pongWidth/2;
let ballY=pongHeight/2;
let ballxDirection=0;
let ballyDirection=0;
let player1Score=0;
let player2Score=0;
let winner=false;
let paddle1={
    width:25,
    height:100,
    x:0,
    y:0
}

let paddle2={
    width:25,
    height:100,
    x:pongWidth-25,
    y:pongHeight-100,
}

pongCtx.font = '30px MV Boli';
pongCtx.fillStyle = "white";
pongCtx.textAlign = "center";
pongCtx.fillText("Press 'Start' Button to Begin", pongWidth / 2, pongHeight / 2-100);

pongCtx.font = '18px MV Boli';
pongCtx.fillText("Player 1: playes with 'w' and 's' Keys",pongWidth / 2, pongHeight / 2)
pongCtx.fillText("Player 2: playes with 'ArrowUp' and 'ArrowDown' Keys",pongWidth / 2, pongHeight / 2+30)

// Reset the start button
pongStartButton.textContent = 'Start'; 

pongStartButton.addEventListener('click',pongStart)
pongSection.addEventListener('keydown',changePongDirection);
pongRestart.addEventListener("click",pongReset);



function pongStart(){
    console.log(pongStartButton.textContent)
    if(pongStartButton.textContent=='Start'){
        player1Score=0;
        player2Score=0;
        paddle1={
            width:25,
            height:100,
            x:0,
            y:0
        }
        paddle2={
            width:25,
            height:100,
            x:pongWidth-25,
            y:pongHeight-100,
        }
        ballSpeed=1;
        ballX=0;
        ballY=0;
        ballxDirection=0;
        ballyDirection=0;
        updatePongScore();
        pongStartButton.textContent="Pause"        
        createBall();
        pongNextTick();
       

    }
    else if(pongStartButton.textContent=="Pause"){
        pongStartButton.textContent="Resume";
        clearInterval(pongintervalID)
    }
    else if(pongStartButton.textContent=="Resume"){
        pongStartButton.textContent="Pause"
        pongNextTick();
        

    }
    
}; 

function pongNextTick(){
    pongintervalID=setTimeout(()=>{
        clearPongBoard();
        drawPaddle();
        moveBall();
        drawBall(ballX,ballY);
        checkPongCollision();
        pongNextTick();

    },10 )

    declareWinner()

    
      
};

function clearPongBoard(){
    pongCtx.fillStyle=pongBackground;
    pongCtx.fillRect(0,0,pongWidth,pongHeight);
};

function drawPaddle(){
    pongCtx.strokeStyle=paddleBorder;
    pongCtx.fillStyle=paddle1Color;
    pongCtx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    pongCtx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)

    pongCtx.fillStyle=paddle2Color;
    pongCtx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    pongCtx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
};

function createBall(){
    ballSpeed=1;
    if(Math.round(Math.random())==1){
        ballxDirection=1;    
    }
    else{
        ballxDirection=-1;
    }
    if(Math.round(Math.random())==1){
        ballyDirection=1;      
    }
    else{
        ballyDirection=-1;   
    }
    ballX=pongWidth/2;
    ballY=pongHeight/2;
    drawBall(ballX,ballY);
};

function moveBall(){
    ballX+=(ballSpeed*ballxDirection);
    ballY+=(ballSpeed*ballyDirection);
};

function drawBall(ballX,ballY){
    pongCtx.fillStyle=ballColor;
    pongCtx.strokeStyle=ballBorder;
    pongCtx.lineWidth=2;
    pongCtx.beginPath();
    pongCtx.arc(ballX,ballY,ballRadius,0,2*Math.PI);
    pongCtx.fill();
};

function checkPongCollision(){
    if(ballY<=0+ballRadius){
        ballyDirection*=-1;
    }
    if(ballY>=pongHeight-ballRadius){
        ballyDirection*=-1
    }
    if(ballX<=0){
        player2Score+=1;
        updatePongScore();
        createBall()
        return;

    }
    if(ballX>=pongWidth){
        player1Score+=1;
        updatePongScore();
        createBall()
        return;    

    }
    if(ballX<=paddle1.x+paddle1.width+ballRadius){
        if(ballY>paddle1.y&&ballY<paddle1.y+paddle1.height){
            ballX=(paddle1.x+paddle1.width)+ballRadius;
            ballxDirection*=-1;
            if(ballSpeed<=2.5){
                ballSpeed+=0.2;

            }     
        }
    }
    if(ballX>=paddle2.x-ballRadius){
        if(ballY>paddle2.y&&ballY<paddle2.y+paddle2.height){
            ballX=paddle2.x-ballRadius
            ballxDirection*=-1;
            if(ballSpeed<=2.5){
                ballSpeed+=0.2;

            }
           
        }
    }


};

function changePongDirection(event){
    event.preventDefault();
    const keyPressed2=event.key;
    console.log(keyPressed2)
    const paddle1Up='w';
    const paddle1Down='s';
    const paddle2Up="ArrowUp";
    const paddle2Down="ArrowDown";

    switch(keyPressed2){
        case(paddle1Up):
            if(paddle1.y>0){
                paddle1.y-=paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddle1.y<pongHeight-paddle1.height){
                paddle1.y+=paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddle2.y>0){
                paddle2.y-=paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddle2.y<pongHeight-paddle2.height){
                paddle2.y+=paddleSpeed;
            }
            break;
            
    }



};

function updatePongScore(){
   

    pongScore.textContent=`Player1: ${player1Score} - ${player2Score} :Player2`;
  
};

function pongReset(){
    
    player1Score=0;
    player2Score=0;
    paddle1={
        width:25,
        height:100,
        x:0,
        y:0
    }
    paddle2={
        width:25,
        height:100,
        x:pongWidth-25,
        y:pongHeight-100,
    }
    ballSpeed=1;
    ballX=0;
    ballY=0;
    ballxDirection=0;
    ballyDirection=0;
    updatePongScore();
    clearInterval(pongintervalID);
    pongStartButton.textContent="Pause"
    createBall();
    pongNextTick(); 
    
    
};

function declareWinner(){
    if(player1Score + player2Score >= 10){ // Sum of scores reaching 10
        clearInterval(pongintervalID);  
        let winnerMessage = '';
        if(player1Score > player2Score){
            winnerMessage = 'Player 1 Wins!';
        } else if(player2Score > player1Score){
            winnerMessage = 'Player 2 Wins!';
        } else {
            winnerMessage = 'It\'s a Tie!';
        }
        // Clear the board and display the winner message
        pongCtx.fillStyle = pongBackground;
        pongCtx.fillRect(0, 0, pongWidth, pongHeight);
        pongCtx.font = '50px MV Boli';
        pongCtx.fillStyle = "white";
        pongCtx.textAlign = "center";
        pongCtx.fillText(winnerMessage, pongWidth / 2, pongHeight / 2);
        // Reset the start button
        pongStartButton.textContent = 'Start'; 
    }


    
}




