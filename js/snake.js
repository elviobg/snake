let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = []
let backgroundColor = "#84a140"
let snakeColor = "#3e5bc2"
let direction = "left"

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
}

function updateGame()
{
    createBackGround();
    updateSnake();

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == 'right') 
        snakeX += box;
    else if(direction == 'left') 
        snakeX -= box;
    else if(direction == 'up') 
        snakeY += box;
    else if(direction == 'down') 
        snakeY -= box;

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    
}

start();
let game = setInterval(updateGame, 100)