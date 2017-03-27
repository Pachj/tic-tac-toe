/**
 * Created by Henry on 06.03.17.
 */

/** ToDo: add 2 player mode
 * ToDo: change show()/hide() anchor
 * ToDo: change the h1's to p's
 */

(function() {
  // the player
  const player1 = {
    symbol: undefined,
    symbolForDisplay: undefined,
  };
  // the second player or the AI
  const player2 = {
    symbol: undefined,
    symbolForDisplay: undefined,
  };

  const isSinglePlayer = true;

  // which player can make the first move in the round
  let player1HasFirstMove = false;

  let actualPlayer = player1HasFirstMove === true ? player1 : player2;

  let board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];

  /** choose the selected symbol for player1 and the opposite for player2
   * @param {String} selectedSymbol - the id of the selected button*/
  function chooseSymbol(selectedSymbol) { //ToDo: rename
    const cross = 'fa fa-times';
    const circle = 'fa fa-circle-o';

    if (selectedSymbol === 'cross') {
      player1.symbol = 'x';
      player1.symbolForDisplay = cross;
      player2.symbol = 'o';
      player2.symbolForDisplay = circle;
    } else if (selectedSymbol === 'circle') {
      player1.symbol = 'o';
      player1.symbolForDisplay = circle;
      player2.symbol = 'x';
      player2.symbolForDisplay = cross;
    }

    // hide the symbol selecting screen
    $('#choose-symbol').hide('slow'); // ToDo: move to document.ready
  }

  $(document).ready(() => { // ToDo: move to the bottom
    $('#choose-symbol').css('display', 'block');
    $('#cross, #circle').click(function() {
      chooseSymbol(this.id);

      // if the ai has the first move --> get an ai move
      if (isSinglePlayer && actualPlayer === player2) {
        let aiMove = newAiMove(board, actualPlayer.symbol);
        gameController(aiMove);
      }
    });

    $('.game-field').click(function() {
      gameController(this.id);
    });
  });

  /** controls the game functionality
   * @param {String} field - the selected field
   */
  function gameController(field) {
    const selectedField = parseInt(field);

    // checks if the field is empty --> add the selected field
    if (board[selectedField] === 'e') {
      board[selectedField] = actualPlayer.symbol;
      displayMove(selectedField);
    }

    if (checkActualPlayerHasWon()) {
      endTheGame(true);
    } else if (checkGameFinished()) {
      endTheGame(false);
    } else {
      actualPlayer = actualPlayer === player1 ? player2 : player1;

      // checks if the ai is the player who can make a move --> create a new move
      if (isSinglePlayer && actualPlayer === player2) {
        gameController(newAiMove(board, actualPlayer.symbol));
      }
    }
  }

  /** display the given move
   * @param {Number} field - the selected field
   */
  function displayMove(field) {
    const selector = '#' + field;
    $(selector).html('<i class=\"' + actualPlayer.symbolForDisplay + '\"></i>');
  }

  function endTheGame(hasWinner) {
    (function showEndScreen() {
      const endScreenSelector = $('#result-screen');

      function changeTheResult() {
        if (hasWinner) {
          if (isSinglePlayer) {
            if (actualPlayer === player1) {
              endScreenSelector.children('h1').html('You are the winner!');
            } else {
              endScreenSelector.children('h1').html('The ai is the winner.');
            }
          } else {
            if (actualPlayer.symbol === 'x') {
              endScreenSelector.children('h1').
                  html('The player with the X has won.');
            } else {
              endScreenSelector.children('h1').
                  html('The player with the O has won.');
            }
          }
        } else {
          endScreenSelector.children('h1').
              html('Nobody has won. Its a draw.');
        }
      }

      changeTheResult();
      endScreenSelector.show('slow');

      function hideEndScreen() {
        endScreenSelector.hide('slow');
      }

      setTimeout(hideEndScreen, 3000);
    })();

    (function clearTheBoard() {
      $('.game-field').each(function(index, field) {
        $(field).html('');
      });
    })();

    board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
    player1HasFirstMove = !player1HasFirstMove;
    actualPlayer = player1HasFirstMove === true ? player1 : player2;

    if (isSinglePlayer && actualPlayer === player2) {
      const aiMove = newAiMove(board, player2.symbol);
      gameController(aiMove);
    }
  }

  /** checks if the actualPlayer has won
   * @return {Boolean} whether someone has won
   */
  function checkActualPlayerHasWon() {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let checkActualCondition = (condition) => {
      if (board[condition[0]] === actualPlayer.symbol) {
        if (board[condition[1]] === actualPlayer.symbol) {
          if (board[condition[2]] === actualPlayer.symbol) {
            return true;
          }
        }
        return false;
      }
    };

    for (let i = 0; i < winningConditions.length; i++) {
      if (checkActualCondition(winningConditions[i])) {
        console.log('WON!');
        return true;
      }
    }
    return false;
  }

  /** checks if the game is finished
   * @return {Boolean} whether the game is finished
   */
  function checkGameFinished() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === 'e') {
        return false;
      }
    }
    return true;
  }
}());

/** creates a new ai move
 * @param {Array} board - the actual board
 * @param {String} symbol - the symbol of the ai
 * @return {String} the field who the ai has selected
 */
function newAiMove(board, symbol) {
  let state = new GameState(board, symbol);
  return getMove(state);
}

/**
 * @param {Array} player1 - All fields of the player
 * @param {Array} player2 - All fields of the AI
 * @param {Array} notUsedFields - All fields who aren't used *
 */
/*function newAiMove(player1HasFirstMove, player1, player2, notUsedFields) { // ToDo: move to the module above
 let board = [];
 $('.game-field').each(function(ix, field) {
 if ($(field).children('.fa-circle-o').length > 0) {
 board.push('o');
 } else if ($(field).children('.fa-times').length > 0) {
 board.push('x');
 }
 else {
 board.push('e');
 }
 });
 console.log('Board read back: ' + board.toString());

 let state = new GameState(board, player2.symbol);
 const value = getMove(state) + 1;
 let id;

 switch (value) {
 case 1:
 id = 'field-one';
 break;
 case 2:
 id = 'field-two';
 break;
 case 3:
 id = 'field-three';
 break;
 case 4:
 id = 'field- four';
 break;
 case 5:
 id = 'field-five';
 break;
 case 6:
 id = 'field-six';
 break;
 case 7:
 id = 'field-seven';
 break;
 case 8:
 id = 'field-eight';
 break;
 case 9:
 id = 'field-nine';
 break;
 }
 return [id, value];
 }*/
