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

var cube = {
    x: 320,
    y: 320
};