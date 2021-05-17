var game, snake, food, notSet = true, highScore = 0;

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
    for (var i = this.size - 1; i > 0; i--) {
      this.line[i] = this.line[i - 1];
      this.column[i] = this.column[i - 1];
    }
    this.line[0] = nextLine;
    this.column[0] = nextColumn;
    $('#l' + this.line[0] + 'c' + this.column[0]).attr(
      'style', 'background-color:black');

    $("#l" + food.line + "c" + food.column).attr(
      'style', 'background-color: red');
  }
  eat() {
    this.size++;
    game.updateScore();
  }
  move() {
    if (game.over) {
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
    game.verify(line, column);
    if (game.over)  {
      alert("Ai pierdut");
    } else {
      snake.update(line, column);
    }
    $('#l' + line + 'c' + column).attr(
      'style', 'background-color:black');
    }
}

function startGame() {
  game = new Game();
  food = new Food();
  snake = new Snake();
  game.createBoard();
  game.updateScore();
  food.change();
  if (notSet) {
    setInterval(snake.move, 100);
    notSet = false;
  }
}



$(document).on("keydown", function (where) {
  if (where.which == 37 && snake.direction != "right") {
    snake.direction = "left";
  } else if (where.which == 38 && snake.direction != "down") {
    snake.direction = "up";
  } else if (where.which == 39 && snake.direction != "left") {
    snake.direction = "right";
  } else if (where.which == 40 && snake.direction != "up") {
    snake.direction = "down";
  }
});

// the game border
class Game {
  constructor() {
    this.board = new Array(25);
    this.score = -50;
    this.over = false;
  }
  updateScore() {
      this.score += 50;
      if (this.score > highScore)
        highScore = this.score;
      $("#score").html("Score: " + this.score + "<br/>" + "HighScore: " + highScore);
  }
  createBoard() {
    $("#board").empty();
    for (var i = 0; i < 25; i++) {
      var line = $('<div>').attr({
        id : i,
        class : "d-flex justify-content-center",
      });
      this.board[i] = new Array(25);
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
  verify(line, column) {
    game.over = (line < 0 || line > 24) || game.over;
    game.over = (column < 0 || column > 24) || game.over;
    for (var i = 1; i < snake.size; i++) {
      if (line == snake.line[i] && column == snake.column[i]) {
        game.over = true;
      }
    }
  }
}
