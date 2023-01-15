var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    dx: 0,
    dy: grid,

    cells: [],
    maxCells: 2
};

var food = { // food for snake
    x: 320,
    y: 320
};

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}


function loop(){

    requestAnimationFrame(loop);

    if(++count < 4){
        return;
    }

    count = 0;

    // Clear screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Add velocity to snake coords
    snake.x += snake.dx;
    snake.y += snake.dy;

    if(snake.x < 0){
        // If snake is out of left border
        snake.x = canvas.width - grid;
    }
    else if(snake.x >= canvas.width){
        // If snake is out of right border
        snake.x = 0;
    }
    if(snake.y < 0){
        // If snake is out of top border
        snake.y = canvas.height - grid;
    }
    else if(snake.y >= canvas.height){
        // If snake is out of bottom border
        snake.y = 0
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if(snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }

    // Create food on the field
    context.fillStyle = 'black';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);

    snake.cells.forEach((cell, index) => {

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if(cell.x === food.x && cell.y === food.y){
            // when snake eats the food
            snake.maxCells++;

            // Create new food at random place
            food.x = getRandomInt(0, 25) * grid;
            food.y = getRandomInt(0, 25) * grid;

        }

        for (var i = index + 1; i < snake.cells.length; i++){
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // If snake bump into itself create new one at random place
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 2;
                snake.dx = 0;
                snake.dy = grid;

                food.x = getRandomInt(0,25)*grid;
                food.y = getRandomInt(0,25)*grid;
            }
        }
    });
}

requestAnimationFrame(loop);

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft' && snake.dx === 0){
        snake.dx = -grid;
        snake.dy = 0;
    }

    else if (e.key === 'ArrowUp' && snake.dy === 0){
        snake.dy = -grid;
        snake.dx = 0;
    }

    else if(e.key === 'ArrowRight' && snake.dx === 0){
        snake.dx = grid;
        snake.dy = 0;
    }
    else if(e.key === 'ArrowDown' && snake.dy === 0){
        snake.dy = grid;
        snake.dx = 0;
    }
});
