const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        countDownTimerID: setInterval(countDown, 1000),
        gameSpeed: 1000,
        hitposition: 0,
        result: 0,
        currentTime: 31,
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if(state.values.currentTime <= -1){
        clearInterval(state.values.countDownTimerID);
        clearInterval(state.values.timerId);
        alert("GAME OVER! Seu Resultado foi "+state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitposition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitposition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null;
                playSound("src_audios_hit");
            }
        })
    })
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();
