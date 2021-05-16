var board, headLine, headColumn, direction;

function startGame() {
  $("#board").empty();
  createBoard();
  headLine = headColumn = 13;
  setInterval(move, 500);
}


$(document).on("keydown", function (where) {
  if (where.which == 37)
    direction = "left";
  else if (where.which == 38)
    direction = "up";
  else if (where.which == 39)
    direction = "right";
  else if (where.which == 40)
    direction = "down";
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
