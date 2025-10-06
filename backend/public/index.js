console.debug("Loading canvas");

const GAMES_LIST_UPDATE_INTERVALL = 2000;
const GAMES_UPDATE_INTERVALL = 2000;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gameList = document.getElementById("games");
const gameId = document.getElementById("gameid");
const gameName = document.getElementById("gamename");
const userId = document.getElementById("userid");
const userName = document.getElementById("username");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const round = document.getElementById("round");
const cols = document.getElementById("cols");
const rows = document.getElementById("rows");
const doBtn = document.getElementById("do");

let black = new Image();
black.onload = function() {
    console.log("black loaded!");
};
black.onerror = function() {
    console.error("black failed to load!");
};
black.src = "/img/black.png";

running = false;
let user = localStorage.getItem('username');
if (user) {
    console.log(`User is ${user}`);
    userId.value = user.id;
    userName.value = user.name;
} else {
    console.log('User not found in local storage');
    fetch("/api/gomoku/player/create")
        .then((response) => response.json())
        .then((aUser) => {
            console.log(aUser);
            user = aUser;
            localStorage.setItem('user', user);
            userId.value = user.id;
            userName.value = user.name;
        })
        .catch(err => console.error('Request Failed', err));
    ;
}

let white = new Image();
white.onload = function() {
    console.log("white loaded!");
};
white.onerror = function() {
    console.error("white failed to load!");
};
white.src = "/img/white.png";


canvas.addEventListener('click', (event) => {
    const id = gameId.value;
    const player = player1.value;
    
    const tile = toRowAndCol(event);
    console.log("/api/gomoku/player/play/" + id + "/" + id + "/" + tile.col + "/" + tile.row);
    fetch("/api/gomoku/player/play/" + id + "/" + id + "/" + tile.col + "/" + tile.row)
        .then((response) => response.json())
        .then((game) => {
            console.log(game.name + ", round = " + game.round);
        })
        .catch(err => console.error('Request Failed', err));
        ;
}, false);

const toRowAndCol = (event) => {
    const rect = event.target.getBoundingClientRect()

    const height = Math.trunc(canvas.width / (parseInt(cols.value) + 1));
    const width = Math.trunc(canvas.height / (parseInt(rows.value) + 1));

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const row = Math.trunc((y +(height/2)) / height);
    const col = Math.trunc((x +(width/2)) / width);

    console.log("DRAWING")
    if(round.value % 2 == 0){
        ctx.drawImage(
            white,width * col - height/2,
            height * row - height/2,
            height,
            width);
    }else{
        ctx.drawImage(
            black,width * col - height/2,
            height * row - height/2,
            height,
            width);
    }
    console.log("DRAWN")
    return {col :col, row : row};
}

const toPixels = (row, col) => {
    const height = Math.trunc(canvas.width / (parseInt(cols.value) + 1));
    const width = Math.trunc(canvas.height / (parseInt(rows.value) + 1));

    return {x :x * row, y : y * col};
}

const updateGamesList = () => {
    fetch("/api/gomoku/games")
        .then((response) => response.json())
        .then((games) => {
            gameList.innerHTML = '';
            for(const game of games){
                const li = document.createElement("li");
                li.classList.add("game-item");
                li.appendChild(document.createTextNode(game.name));
                gameList.appendChild(li);
                li.setAttribute("id", game.id);
                li.setAttribute("onClick", "setGameId('" + game.id + "')");
            }
        })
        .catch(err => console.error('Request Failed', err));
        ;

    setTimeout(updateGamesList, GAMES_LIST_UPDATE_INTERVALL);
}

const updateGames = () => {
    fetch("/api/gomoku/games/" + gameId.value)
        .then((response) => response.json())
        .then((game) => {
            gameName.value = game.name;
            userId.value = user.id;
            userName.value = user.name;
            player1.value = game.player[0];
            player2.value = game.player[1];
            round.value = game.round;
            cols.value = game.board.cols;
            rows.value = game.board.rows;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const incX = Math.trunc(canvas.width / (parseInt(cols.value) + 1));
            ctx.beginPath();
            for(let i = 1; i <= game.board.cols; i++){
                ctx.moveTo(i * incX, 0);
                ctx.lineTo(i * incX, canvas.height);
            }

            const incY = Math.trunc(canvas.height / (parseInt(rows.value) + 1));
            for(let i = 1; i <= game.board.rows; i++){
                ctx.moveTo(0, i * incY);
                ctx.lineTo(canvas.width, i * incY);
            }
            ctx.lineWidth = 0.25;
            ctx.stroke();
            const height = Math.trunc(canvas.width / (parseInt(cols.value) + 1));
            const width = Math.trunc(canvas.height / (parseInt(rows.value) + 1));
            for(let row = 1; row < game.board.tiles.length; row++){
                for(let col = 1; col < game.board.tiles[row].length; col++){
                    if(game.board.tiles[row][col]===1){
                        ctx.drawImage(
                            black, width * row - height / 2,
                            height * col - height / 2,
                            height,
                            width
                        );
                    }else if(game.board.tiles[row][col]===2){
                        ctx.drawImage(
                            white, width * row - height / 2,
                            height * col - height / 2,
                            height,
                            width
                        );
                    }
                }
            }

            doBtn.setAttribute("onClick", "doIt('" + game.id + "')");
            running = false;
            setTimeout(updateGames, GAMES_UPDATE_INTERVALL);
        })
        .catch(err => {
            console.error('Request Failed', err)
            running = false;
        });
}

const drawStone = (round, height, width, row, col) => {
    let image = black;
    if(round % 2 == 0) {
        image = white;
    }
    ctx.drawImage(
        image, width * row - height / 2,
        height * col - height / 2,
        height,
        width
    );
}

const setGameId = (id) => {
    if(running) return;
    running = true;
    gameId.value = id;
    updateGames();
}

const doIt = (id) => {
    ctx.fillStyle = 'yellow';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const loadImage = (path) => {

}

updateGamesList();