// Brains game implementation in javascript

// new Brains(el)
// initialize Brains on a preferably empty div
function Brains (el) {

  // --- START: Board ---
  var Board = function (boardEl) {
    var board = [[]];
    var width = 0;
    var height = 0;

    var completed = new CustomEvent(
      "board_completed",
      {
        detail: {
          element: boardEl
        },
        bubbles: false,
        cancelable: false
      }
    );

    var isComplete = function () {
      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          if (board[x][y].value === " ") {
            return false;
          }
        }
      }

      return true;
    };

    var increase = function (button) {
      button.value = (button.value % 4) + 1;
    };

    // click a button and increment its neighbours
    var increment = function (x, y) {
      return function () {
        var button = board[x][y];

        // only when button hasn't been clicked
        if (button.value === " ") {
          button.value = "1";

          // button to the left
          if (x > 0 && board[x - 1][y].value !== " ") {
            increase(board[x - 1][y]);
          }

          // button to the right
          if (x < (width - 1) && board[x + 1][y].value !== " ") {
            increase(board[x + 1][y]);
          }

          // button above
          if (y > 0 && board[x][y - 1].value !== " ") {
            increase(board[x][y - 1]);
          }

          // button below
          if (y < (height - 1) && board[x][y + 1].value !== " ") {
            increase(board[x][y + 1]);
          }

          if (isComplete()) {
            boardEl.dispatchEvent(completed);
          }
        }
      };
    };

    return {

      completed: completed,

      getBoard: function () {
        return board;
      },

      // call with w: width, h: height
      create: function (w, h) {
        width = w;
        height = h;

        // init array
        board = new Array(width);
        for (var i = 0; i < width; i++) {
          board[i] = new Array(height);
        }

        boardEl.setAttribute('class', 'board width-' + width + '-' + height);

        // initialize the buttons
        for (var i = 0; i < height; i++) {
          for (var j = 0; j < width; j++) {
            board[j][i] = document.createElement('input');
            board[j][i].setAttribute('type', 'button');
            board[j][i].setAttribute('data-x', j);
            board[j][i].setAttribute('data-y', i);
            board[j][i].setAttribute('value', ' ');
            board[j][i].onclick = increment(j, i);
            boardEl.appendChild(board[j][i]);
          }
        }
      },

      // reset board to original state
      reset: function () {
        for (var x = 0; x < width; x++) {
          for (var y = 0; y < height; y++) {
            board[x][y].value = " ";
          }
        }

        boardEl.setAttribute('class', 'board width-' + width + '-' + height);
      },

      // generate a random board
      new: function () {
        while (!isComplete()) {
          var x = Math.floor(Math.random() * width);
          var y = Math.floor(Math.random() * height);

          increment(x, y)();
        }
      },

      // is this board same as other board?
      sameAs: function (other) {
        var otherBoard = other.getBoard();

        for (var x = 0; x < width; x++) {
          for (var y = 0; y < height; y++) {
            if (board[x][y].value !== otherBoard[x][y].value) {
              return false;
            }
          }
        }

        return true;
      }
    }
  }
  // --- END: Board ---

  var playEl = document.createElement('div');
  var originalEl = document.createElement('div');

  var play = [[]];
  var original = [[]];

  var markSuccessOrFailure = function (e) {
    var boardEl = e.detail.element;

    if (play.sameAs(original)) {
      boardEl.setAttribute('class', 'success ' + boardEl.getAttribute('class'));
    }
    else {
      boardEl.setAttribute('class', 'failure ' + boardEl.getAttribute('class'));
    }
  };

  return {

    // create boards of specific size
    create: function (width, height) {

      // create play board
      playEl = document.createElement('div');
      play = new Board(playEl);
      play.create(width, height);
      el.appendChild(playEl);

      // create original board
      originalEl = document.createElement('div');
      original = new Board(originalEl);
      original.create(width, height);
      el.appendChild(originalEl);

      playEl.addEventListener("board_completed", markSuccessOrFailure, false);

      original.new();
    },

    // create a new game
    new: function () {
      original.reset();
      play.reset();
      original.new();
    },

    // reset the current game
    reset: function () {
      play.reset();
    }
  };
}
