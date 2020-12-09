let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = []
let backgroundColor = "#84a140"
let snakeColor = "#3e5bc2"
let directionKeyCodes = {
    LEFT: 37,
    UP: 40,
    RIGHT: 39,
    DOWN: 38
  };
  let currentDirection = directionKeyCodes.LEFT

function createBackGround()
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

function updateGame()
{
    createBackGround();
    updateSnake();

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(currentDirection == directionKeyCodes.RIGHT) 
        snakeX += box;
    else if(currentDirection == directionKeyCodes.LEFT) 
        snakeX -= box;
    else if(currentDirection == directionKeyCodes.UP) 
        snakeY += box;
    else if(currentDirection == directionKeyCodes.DOWN) 
        snakeY -= box;

    snake.pop();
    snake.unshift({
        x: snakeX,
        y: snakeY
    });
}

start();
let game = setInterval(updateGame, 500)