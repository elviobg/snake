let context;
let game;
const box = 32;
const height = 512;
const width = 512;

let snake = []
let backgroundColor;
let snakeColor;
let powerUPColor;
let powerUp;
let points;
let gamePaused;
let gameRunning;

const keyCodesASCII = {
    SPACE: 32,
    LEFT: 37,
    DOWN: 38,
    RIGHT: 39,
    UP: 40
};
let currentDirection;

function randomColor()
{
    return "rgb("+ Math.floor(Math.random() * 255)
            + ","+Math.floor(Math.random() * 255) +","
            + Math.floor(Math.random() * 255) +")"
}

function updateColors()
{
    backgroundColor = randomColor()
    snakeColor = randomColor()
    powerUPColor = randomColor()
}

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
    snake = []
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

function createGame()
{
    document.addEventListener('keydown', pushButton);
    gameRunning = false;
}

function start()
{
    createBackGround();
    createSnake();
    createPowerUpPosition();
    clearInterval(game);
    game = setInterval(updateGame, 100)
    points = 0;
    currentDirection = keyCodesASCII.LEFT;
    gamePaused = false;
    gameRunning = true;
}

function pushButton()
{
    if (!gamePaused)
        getDirections(event.keyCode)
    if (event.keyCode == keyCodesASCII.SPACE)
        if (gameRunning)
            pauseButtonPushed()
        else
            start()
}

function getDirections(buttonKeyCode)
{
    if(buttonKeyCode == keyCodesASCII.LEFT && currentDirection != keyCodesASCII.RIGHT)
        currentDirection = keyCodesASCII.LEFT
    if(buttonKeyCode == keyCodesASCII.RIGHT && currentDirection != keyCodesASCII.LEFT)
        currentDirection = keyCodesASCII.RIGHT
    if(buttonKeyCode == keyCodesASCII.UP && currentDirection != keyCodesASCII.DOWN)
        currentDirection = keyCodesASCII.UP
    if(buttonKeyCode == keyCodesASCII.DOWN && currentDirection != keyCodesASCII.UP)
        currentDirection = keyCodesASCII.DOWN
}

function pauseButtonPushed()
{
    gamePaused = !gamePaused
    if(gamePaused)
        clearInterval(game);
    else
        game = setInterval(updateGame, 100)
}

function endGame()
{
    clearInterval(game);
    gameRunning = false
}

function updateGame()
{
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    for(i=1; i<snake.length; i++)
    {
        if(snakeX == snake[i].x && snakeY == snake[i].y)
        {
            endGame()
        }
    }

    if(currentDirection == keyCodesASCII.RIGHT) 
    {
        snakeX += box;
        if(snakeX >= width)
            snakeX = 0
    }
    else if(currentDirection == keyCodesASCII.LEFT) 
    {
        snakeX -= box;
        if(snakeX < 0)
            snakeX = width - box
    }
    else if(currentDirection == keyCodesASCII.UP) 
    {
        snakeY += box;
        if(snakeY >= height)
            snakeY = 0
    }
    else if(currentDirection == keyCodesASCII.DOWN) 
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

    if(gameRunning){
        updateColors();
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

updateColors();
createBackGround();
