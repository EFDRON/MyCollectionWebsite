const watchElement=document.querySelector("#watchContent");
const timeStart=document.querySelector("#time-start-button");
const timePause=document.querySelector("#time-pause-button");
const timeReset=document.querySelector("#time-reset-button");
timeStart.addEventListener('click',updateTime)
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
timePause.addEventListener('click',pauseTime)

function updateTime(){
    paused=false;
    startTime = Date.now() - elapsedTime;
    intervalId=setInterval(
    ()=>{
            elapsedTime = Date.now() - startTime;
            secs = Math.floor((elapsedTime / 1000) % 60);
            mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
            hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
            secs=pad(secs)
            mins=pad(mins)
            hrs=pad(hrs)
            watchElement.textContent=`${hrs}:${mins}:${secs}`;

        }, 1000);
    timeReset.addEventListener('click',resetTime)
    

}
function pad(value){
    return((('0')+value).length>2 ?value:'0'+value )
}


function pauseTime(){  
    if(paused){
        timePause.textContent="Pause"
        updateTime()

    }
    else{
        timePause.textContent="Resume";
        paused=true;
        clearInterval(intervalId);
    } 
}

function resetTime(){
    paused = true;
    clearInterval(intervalId);
    startTime=0;
    elapsedTime=0; 
    currentTime=0;
    watchElement.textContent=`00:00:00`;

}
