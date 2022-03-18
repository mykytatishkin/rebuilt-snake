
function goldfactory(){
    requestAnimationFrame(goldfactory);
    if(++count < 4){
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if(snake.x < 0){
        snake.x = canvas.width - grid;
    }
    else if(snake.x >= canvas.width){
            snake.x = 0;
        }
    if(snake.y < 0){
        snake.y = canvas.height - grid;
    }
    else if(snake.y >= canvas.height){
        snake.y = 0
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if(snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }
}

context.fillStyle = 'black';
context.fillRect(cube.x, cube.y, grid - 1, grid - 1);

context.fillStyle = 'black';

snake.cells.forEach(function (cell,index){

    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if(cell.x === cube.x && cell.y === cube.y){
        snake.maxCells++;

        cube.x = getRandomInt(0, 25) * grid;
        cube.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index +1; i < snake.cells.length; i++){
        if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 2;
            snake.dx = 0;
            snake.dy = grid;

            cube.x = getRandomInt(0,25)*grid;
            cube.y = getRandomInt(0,25)*grid;
        }
    }
  });
requestAnimationFrame(goldfactory);
