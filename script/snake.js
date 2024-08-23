const theSnakeSection=document.querySelector("#snake");
const scoreText=document.querySelector("#scoreText");
const gameBoard=document.querySelector('#myCanvas'); 
const ctx=gameBoard.getContext("2d");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const restartSnake=document.querySelector("#snakeReset");
const startButton=document.querySelector("#gameStart")
const snakeColor='green';
const snakeBorder='black';
const foodColor='black';
const unitSize=25;
const boardBackground="darkred";
let gameRunnning=true;
let xVelocity=unitSize;
let yVelocity=0;
let foodX;
let foodY;
let score=0;
let Paused=false;
let snake=[
    {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
]
ctx.font='50px MV Boli';
ctx.fillStyle="white";
ctx.textAlign="center";
ctx.fillText("Press 'Start' To Beign!",gameWidth/2,gameHeight/2);

theSnakeSection.addEventListener("keydown",changeDirection);
restartSnake.addEventListener('click',restartGame);
startButton.addEventListener('click',startButtonHandler)

function startButtonHandler(event){
    if(event.target.textContent=="Start")
        {
            event.target.textContent="Pause"   
            if(snake.length>5){
                score=0;
                xVelocity=unitSize;
                yVelocity=0;
                snake=[
                    {x:unitSize*4,y:0},
                    {x:unitSize*3,y:0},
                    {x:unitSize*2,y:0},
                    {x:unitSize,y:0},
                    {x:0,y:0} ];
                    gameStart();
                }
            else{
                gameStart();
            }           
        } 
    else if(event.target.textContent=="Pause"){
        Paused=true;
        gameRunnning=false;
        event.target.textContent="Resume";

    }
    else if(event.target.textContent="Resume"){
        Paused=false;
        gameRunnning=true;
        nextTick();
        event.target.textContent="Pause"
    }
    
 

}


function gameStart(){
    

    gameRunnning=true;
    scoreText.textContent=`SCORE: ${score}`;
    createFood();
    drawFood();
    nextTick();
    
    
    
}

function nextTick(){
    if(gameRunnning){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            drawSnake();
            moveSnake();  
            checkGameOver();
            nextTick();
        },75)
    }
    else{
        displayGameOver();   
    }    
}

function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);  
}

function createFood(){
    function randomFood(min,max){
        const randNum=Math.round((Math.random()*(max-min)+min)/25)*25;
        return randNum;
    }

    foodX=randomFood(0,gameWidth-unitSize);
    foodY=randomFood(0,gameHeight-unitSize);   
    console.log(foodX)
}

function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
    
}

function drawSnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokeStyle=snakeBorder;

    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x ,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)
    })

}

function moveSnake(){
    const head={
        x:snake[0].x+xVelocity,
        y:snake[0].y+yVelocity
    }

    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1;
        scoreText.textContent=`SCORE: ${score}`;
        createFood()



    }
    else{
        snake.pop();
    }
        
    
}

function changeDirection(event){
    event.preventDefault();
    const keyPressed=event.key;
    event.preventDefault();
    
    const Up="ArrowUp";
    const Down="ArrowDown";
    const Left="ArrowLeft";
    const Right="ArrowRight";

    const goingUp=(yVelocity==-unitSize);
    const goingDown=(yVelocity==unitSize);
    const goingLeft=(xVelocity==-unitSize);
    const goingRight=(xVelocity==unitSize);

    switch(true){
        case (keyPressed==Up&&!goingDown):
            yVelocity=-unitSize;
            xVelocity=0;
            break;

        case (keyPressed==Down&&!goingUp):
            yVelocity=unitSize;
            xVelocity=0;
            break;

        case (keyPressed==Right&&!goingLeft):
            xVelocity=unitSize;
            yVelocity=0;
            break;
        
        case (keyPressed==Left && !goingRight):
            xVelocity=-unitSize;
            yVelocity=0;
            break;

    }

    
    
}

function restartGame(){
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
            gameRunnning=false;
            break;
        case (snake[0].x>gameWidth):
            gameRunnning=false;
            break;
        case (snake[0].y<0):
            gameRunnning=false;
            break;
        case (snake[0].y>gameHeight):
            gameRunnning=false;
            break;
    }

    for(let i=1;i<snake.length;i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            gameRunnning=false;
        }
    }
}

function displayGameOver(){
    if(!Paused){
        startButton.textContent="Start"
        
        ctx.font='50px MV Boli';
        ctx.fillStyle="white";
        ctx.textAlign="center";
        ctx.fillText("GAME OVER!!!",gameWidth/2,gameHeight/2);

    }
    
    
}

function restartGame(){
    startButton.textContent="Pause"; 
    score=0;
    xVelocity=unitSize;
    yVelocity=0;
    snake=[
        {x:unitSize*4,y:0},
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
    ];
    Paused=false;
    gameStart()
}






