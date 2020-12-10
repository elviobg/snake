let context;
const box = 32;
const height = 512;
const width = 512;

let snake = []
let backgroundColor = "#84a140"
let snakeColor = "#3e5bc2"
let powerUPColor = "#e82330"
let powerUp;
let points;
let game = setInterval(updateGame, 100)

const directionKeyCodes = {
    LEFT: 37,
    DOWN: 38,
    RIGHT: 39,
    UP: 40
};

let currentDirection = directionKeyCodes.LEFT

function createBackGround()
{
    let canvas = document.getElementById('snake');
    canvas.width = width
    canvas.height = height
    context = canvas.getContext('2d');
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 16*box, 16*box)
}

function updateBackGround()
{
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 16*box, 16*box)
}

function createSnake()
{
    snake[0] = {
        x: 8*box,
        y: 8*box
    }
    updateSnake();
}

function updateSnake()
{
    for(i=0; i<snake.length; i++){
        context.fillStyle = snakeColor;
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function start()
{
    createBackGround();
    createSnake();
    createPowerUpPosition();
    points = 0;
    document.addEventListener('keydown', getDirections);
}

function getDirections(event){
    if(event.keyCode == directionKeyCodes.LEFT && currentDirection != directionKeyCodes.RIGHT)
        currentDirection = directionKeyCodes.LEFT
    if(event.keyCode == directionKeyCodes.RIGHT && currentDirection != directionKeyCodes.LEFT)
        currentDirection = directionKeyCodes.RIGHT
    if(event.keyCode == directionKeyCodes.UP && currentDirection != directionKeyCodes.DOWN)
        currentDirection = directionKeyCodes.UP
    if(event.keyCode == directionKeyCodes.DOWN && currentDirection != directionKeyCodes.UP)
        currentDirection = directionKeyCodes.DOWN
}

function endGame(){
    clearInterval(game);
    alert('perdeu playboy! =,D\nVc comeu '+points+' vezes\nÉ o comedor!')
}

function updateGame()
{
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    let die = false

    for(i=1; i<snake.length; i++)
    {
        if(snakeX == snake[i].x && snakeY == snake[i].y)
        {
            die = true;
            endGame()
        }
    }

    if(currentDirection == directionKeyCodes.RIGHT) 
    {
        snakeX += box;
        if(snakeX >= width)
            snakeX = 0
    }
    else if(currentDirection == directionKeyCodes.LEFT) 
    {
        snakeX -= box;
        if(snakeX < 0)
            snakeX = width - box
    }
    else if(currentDirection == directionKeyCodes.UP) 
    {
        snakeY += box;
        if(snakeY >= height)
            snakeY = 0
    }
    else if(currentDirection == directionKeyCodes.DOWN) 
    {
        snakeY -= box;
        if(snakeY < 0)
            snakeY = height - box
    }

    if(snakeX == powerUp.x && snakeY == powerUp.y)
    {
        createPowerUpPosition();
        points++;
    }        
    else
    {
        snake.pop();
    }

    snake.unshift({
        x: snakeX,
        y: snakeY
    });

    if(!die){
        updateBackGround();
        updateSnake();
        drawPowerUp();
    }  
}

function createPowerUpPosition()
{
    let possibleXs = width / box;
    let possibleYs = height / box;

    powerUp = {
        x: Math.floor(Math.random() * possibleXs) * box,
        y: Math.floor(Math.random() * possibleYs) * box
    }
}

function drawPowerUp()
{
    context.fillStyle = powerUPColor;
    context.fillRect(powerUp.x, powerUp.y, box, box);
}

createBackGround();
start(); 