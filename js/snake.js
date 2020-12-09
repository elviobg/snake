let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = []
let backgroundColor = "#84a140"
let snakeColor = "#3e5bc2"


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

start();