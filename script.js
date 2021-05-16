var board, line, column, direction, lose;

function startGame() {
  $("#board").empty();
  createBoard();
  lose = 0;
  line = column = 13;
  $('#l' + line + 'c' + column).attr(
    'style', 'background-color:black');
    setInterval(move, 100);
  }

function verify(number) {
  return (number < 0 || number > 24);
}

function move() {
  if (lose == 1)
    return;
  $('#l' + line + 'c' + column).attr(
    'style', 'background-color:springGreen');
  if (direction == "up") {
    line--;
  } else if (direction == "down") {
    line++;
  } else if (direction == "left") {
    column--;
  } else if (direction == "right")
  column++;
  if (verify(column) || verify(line)) {
      lose = 1;
      alert("Ai pierdut");
  }

  $('#l' + line + 'c' + column).attr(
    'style', 'background-color:black');
}


$(document).on("keydown", function (where) {
  if (where.which == 37) {
    direction = "left";
  } else if (where.which == 38) {
    direction = "up";
  } else if (where.which == 39) {
    direction = "right";
  } else if (where.which == 40) {
    direction = "down";
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
