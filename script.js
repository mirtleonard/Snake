var game, snake, food, notSet = true, highScore = 0;

function startGame() {
  game = new Game();
  food = new Food();
  snake = new Snake();
  game.createBoard();
  game.updateScore(0);
  food.change();
  if (notSet) {
    setInterval(snake.move, 100);
    notSet = false;
  }
}

class Game {
  #board; #score; #over;
  constructor() {
    this.#board = new Array(25);
    this.#over = false;
  }
  get getScore () {
    return this.#score;
  }
  get getOver() {
    return this.#over;
  }
  set setGameOver(state) {
    this.#over = state;
  }
  updateScore(score) {
    this.#score = score;
    if (this.#score > highScore) {
      highScore = this.#score;
    }
    $("#score").html("Score: " + this.#score + "<br/>" + "HighScore: " + highScore);
  }
  //game graphics :)
  createBoard() {
    $("#board").empty();
    for (var i = 0; i < 25; i++) {
      var line = $('<div>').attr({
        id : i,
        class : "d-flex justify-content-center",
      });
      this.#board[i] = new Array(25);
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
}

class Snake{
  #direction = ""; #column = []; #line = []; #size = 1;
  constructor() {
      this.#column[0] = 13;
      this.#line[0] = 13;
      $('#l' + this.#line[0] + 'c' + this.#column[0]).attr(
        'style', 'background-color:black');
  }
  set setDirection(direction) {
    this.#direction = direction;
  }
  set setSize(size) {
    this.#size = size;
  }
  get getSize() {
    return this.#size;
  }
  get getDirection() {
    return this.#direction;
  }
  get getLine() {
    return this.#line[0];
  }
  get getColumn() {
    return this.#column[0];
  }
  // update snake with one possition forward
  update(nextLine, nextColumn) {
    $('#l' + this.#line[this.#size - 1] + 'c' + this.#column[this.#size - 1]).attr(
      'style', 'background-color:springGreen');
    for (var i = this.#size - 1; i > 0; i--) {
      this.#line[i] = this.#line[i - 1];
      this.#column[i] = this.#column[i -1];
    }
    this.#line[0] = nextLine;
    this.#column[0] = nextColumn;
    $('#l' + this.#line[0] + 'c' + this.#column[0]).attr(
      'style', 'background-color:black');
    // here is updated food, to do not change it's colour
    $("#l" + food.getLine + "c" + food.getColumn).attr(
      'style', 'background-color: red');
  }
  move() {
    if (game.getOver) {
      return;
    }
    var line = snake.getLine;
    var column = snake.getColumn;
    if (snake.getDirection == "up") {
      line--;
    } else if (snake.getDirection == "down") {
      line++;
    } else if (snake.getDirection == "left") {
      column--;
    } else if (snake.getDirection == "right") {
      column++;
    }
    // if on the next move is food then snake will eat
    if (line == food.getLine && column == food.getColumn) {
      snake.setSize = snake.getSize + 1;
      game.updateScore(game.getScore + 50);
      food.change();
    }
    snake.verify(line, column);
    if (game.getOver) {
        $(".modal").modal();
    } else {
        snake.update(line, column);
    }
  }
  //it checks if the snake hits a wall or eats itself
  verify(line, column) {
    if ((line < 0 || line > 24) || (column < 0 || column > 24))
      game.setGameOver = true;
    for (var i = 1; i < this.#size; i++) {
      if (line == this.#line[i] && column == this.#column[i]) {
        game.setGameOver = true;
      }
    }
  }
}
class Food {
  #line; #column;
  constructor () {
    this.#line = 0;
    this.#column = 0;
  }
  //when food is eaten, it changes location random
  change() {
    $("#l" + this.#line + "c" + this.#column).attr(
      'style', 'background-color:springGreen');
    this.#line = Math.floor(Math.random() * 24);
    this.#column = Math.floor(Math.random() * 24);
  }
  get getLine () {
    return this.#line;
  }
  get getColumn() {
    return this.#column;
  }
}


// detects the key press and change direction
$(document).on("keydown", function (where) {
  if (where.which == 37 && snake.getDirection != "right") {
    snake.setDirection = "left";
  } else if (where.which == 38 && snake.getDirection != "down") {
    snake.setDirection = "up";
  } else if (where.which == 39 && snake.getDirection != "left") {
    snake.setDirection = "right";
  } else if (where.which == 40 && snake.getDirection != "up") {
    snake.setDirection = "down";
  }
});
