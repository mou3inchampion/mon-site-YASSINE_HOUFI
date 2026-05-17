const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

const box = 20;
let snake, direction, food, game, score;

function init(){
  snake = [{x: 8*box, y:8*box}];
  direction = "RIGHT";
  food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
  score = 0;
  scoreEl.textContent = "Score: 0";
  if(game) clearInterval(game);
  game = setInterval(draw,100);
}

document.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", init);

function changeDirection(event){
    if(event.key === "ArrowUp" && direction !== "DOWN") direction="UP";
    if(event.key === "ArrowDown" && direction !== "UP") direction="DOWN";
    if(event.key === "ArrowLeft" && direction !== "RIGHT") direction="LEFT";
    if(event.key === "ArrowRight" && direction !== "LEFT") direction="RIGHT";
}

function draw(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = i===0?"#0f0":"#0a0";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle="#f00";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction==="LEFT") snakeX -= box;
    if(direction==="RIGHT") snakeX += box;
    if(direction==="UP") snakeY -= box;
    if(direction==="DOWN") snakeY += box;

    if(snakeX === food.x && snakeY === food.y){
        food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
        score++;
        scoreEl.textContent = "Score: " + score;
    } else {
        snake.pop();
    }

    let newHead = {x:snakeX, y:snakeY};

    if(snakeX<0 || snakeX>=canvas.width || snakeY<0 || snakeY>=canvas.height || collision(newHead,snake)){
        clearInterval(game);
        alert("Game Over! Score: "+score);
    }

    snake.unshift(newHead);
}

function collision(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

// lancer le jeu au chargement
init();