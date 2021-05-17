var board, snake, gameOver = false, food;

class Food {
    constructor () {
        this.line = 0;
        this.column = 0;
    }
    change() {
        $("#l" + this.line + "c" + this.column).attr(
          'style', 'background-color:springGreen');
        this.line = Math.floor(Math.random() * 24);
        this.column = Math.floor(Math.random() * 24);
        $("#l" + this.line + "c" + this.column).attr(
          'style', 'background-color: red');
    }
}

class Snake {
  constructor() {
    this.direction = "";
    this.line = [];
    this.column = [];
    this.size = 1;
    this.line[0] = 13;
    this.column[0] = 13;
    $('#l' + this.line[0] + 'c' + this.column[0]).attr(
      'style', 'background-color:black');
  }
  update(nextLine, nextColumn) {
      $('#l' + this.line[this.size - 1] + 'c' + this.column[this.size - 1]).attr(
        'style', 'background-color:springGreen');
    console.log(this.line[this.size - 1], this.column[this.size - 1]);
    for (var i = this.size - 1; i > 0; i--) {
      this.line[i] = this.line[i - 1];
      this.column[i] = this.column[i - 1];
    }
    this.line[0] = nextLine;
    this.column[0] = nextColumn;
    $('#l' + this.line[0] + 'c' + this.column[0]).attr(
      'style', 'background-color:black');
  }
  eat() {
    this.size++;
  }
  move() {
    if (gameOver) {
      return;
    }
    var line = snake.line[0];
    var column = snake.column[0];
    if (snake.direction == "up") {
      line--;
    } else if (snake.direction == "down") {
      line++;
    } else if (snake.direction == "left") {
      column--;
    } else if (snake.direction == "right") {
      column++;
    }
    if (line == food.line && column == food.column) {
      food.change();
      snake.eat();
    }
    verify(line, column);
    if (gameOver)  {
      alert("Ai pierdut");
    } else {
      snake.update(line, column);
    }
    $('#l' + line + 'c' + column).attr(
      'style', 'background-color:black');
    }
}

function startGame() {
  $("#board").empty();
  createBoard();
  gameOver = false;
  food = new Food();
  food.change();
  snake = new Snake();
  setInterval(snake.move, 100);
}

function verify(line, column) {
  gameOver = (line < 0 || line > 24) || gameOver;
  gameOver = (column < 0 || column > 24) || gameOver;
  for (var i = 1; i < snake.size; i++) {
    if (line == snake.line[i] && column == snake.column[i]) {
      gameOver = true;
    }
  }
}

$(document).on("keydown", function (where) {
  if (where.which == 37) {
    snake.direction = "left";
  } else if (where.which == 38) {
    snake.direction = "up";
  } else if (where.which == 39) {
    snake.direction = "right";
  } else if (where.which == 40) {
    snake.direction = "down";
  }
});

// the game border
function createBoard() {
  board = new Array(25);
  for (var i = 0; i < 25; i++) {
    var line = $('<div>').attr({
      id : i,
      class : "d-flex justify-content-center",
    });
    board[i] = new Array(25);
    $("#board").append(line);
    for (var j = 0; j < 25; j++) {
      var cell = $('<div>').attr({
        id : ('l' + i + 'c' + j),
        class : "cell",
      });
      $("#" + i).append(cell);
    }
  }
}
