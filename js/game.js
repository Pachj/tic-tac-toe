/**
 * Created by Henry on 06.03.17.
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
  // whether its a singleplayer game
  let isSinglePlayer = true;
  // whether player1 can make the first move
  let player1HasFirstMove = true;
  // the player who can make a move
  let actualPlayer = player1HasFirstMove === true ? player1 : player2;
  let board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];

  // displays the actual player
  function displayActualPlayer() {
    const activePlayerSelector = $('#actual-player-display').children('h4');
    let textForDisplay;
    if (isSinglePlayer) {
      textForDisplay = actualPlayer === player1 ? 'This is your move.'
          : 'The ai can make a move';
    } else {
      textForDisplay = 'The player with the ' +
          '<i class=\"' + actualPlayer.symbolForDisplay +
          '\" id="actual-player-symbol"></i>' + ' can make a move.';
    }
    activePlayerSelector.html(textForDisplay);
  }

  // selects the player with X as the player with the first move
  function choosePlayerForFirstMove() {
    player1HasFirstMove = player1.symbol === 'x';
    actualPlayer = player1HasFirstMove ? player1 : player2;
  }

  // disables the .game-field buttons
  function disableButtons() {
    const buttonsSelector = $('.game-field');
    buttonsSelector.prop('disabled', true);
  }

  // enables the .game-field buttons
  function enableButtons() {
    const buttonsSelector = $('.game-field');
    buttonsSelector.prop('disabled', false);
  }

  /** display the given move
   * @param {Number} field - the selected field
   */
  function displayMove(field) {
    const selector = '#' + field;
    $(selector).html('<i class=\"' + actualPlayer.symbolForDisplay +
        '\" id="game-icon"></i>');
  }

  /** ends the current game and starts a new one
   * @param {Boolean} hasWinner - whether someone has won
   */
  function endTheGame(hasWinner) {
    /* Self invoking function who changes the html content in the result-screen.
     Also displays it and hides.*/
    (function showEndScreen() {
      const endScreenSelector = $('#result');

      if (hasWinner) {
        if (isSinglePlayer) {
          if (actualPlayer === player1) {
            endScreenSelector.html('You are the winner!');
          } else {
            endScreenSelector.html('The ai is the winner.');
          }
        } else {
          if (actualPlayer.symbol === 'x') {
            endScreenSelector.
                html('The player with the ' + '<i class="fa fa-times"></i>' +
                    ' has won.');
          } else {
            endScreenSelector.
                html('The player with the ' + '<i class="fa fa-circle-o"></i>' +
                    ' has won.');
          }
        }
      } else {
        endScreenSelector.
            html('Nobody has won. Its a draw.');
      }

      $('#result-screen').show('slow');

      function hideEndScreen() {
        $('#result-screen').fadeOut('slow');
      }

      setTimeout(hideEndScreen, 3000);
    })();

    // self invoking function who clears the board
    function clearTheBoard() {
      $('.game-field').each(function(index, field) {
        $(field).html('');
      });
    }

    $('.game-field').children('i').fadeOut(3000);
    window.setTimeout(clearTheBoard, 3000);

    function resetAndRestart() {
      board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
      player1HasFirstMove = !player1HasFirstMove;
      actualPlayer = player1HasFirstMove === true ? player1 : player2;
      $('#actual-player').html('');

      // gets a new ai move if the ai is the player who can make a move
      if (isSinglePlayer && actualPlayer === player2) {
        disableButtons();
        const aiMove = newAiMove(board, player2.symbol);
        gameController(aiMove);
      } else {
        displayActualPlayer();
        enableButtons();
      }
    }

    window.setTimeout(resetAndRestart, 3000);
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

  /** creates a new ai move
   * @param {Array} board - the actual board
   * @param {String} symbol - the symbol of the ai
   * @return {String} the field who the ai has selected
   */
  function newAiMove(board, symbol) {
    let state = new GameState(board, symbol);
    return getMove(state);
  }

  /** controls the game functionality
   * @param {String} field - the selected field
   */
  function gameController(field) {
    const selectedField = parseInt(field);

    // checks if the field is empty --> add the selected field
    if (board[selectedField] === 'e') {
      disableButtons();
      board[selectedField] = actualPlayer.symbol;
      displayMove(selectedField);

      if (checkActualPlayerHasWon()) {
        endTheGame(true);
      } else if (checkGameFinished()) {
        endTheGame(false);
      } else {
        actualPlayer = actualPlayer === player1 ? player2 : player1;
        displayActualPlayer();

        // checks if the ai is the player who can make a move --> create a new move
        if (isSinglePlayer && actualPlayer === player2) {
          gameController(newAiMove(board, actualPlayer.symbol));
        } else {
          enableButtons();
        }
      }
    }
  }

  /** choose the selected symbol for player1 and the opposite for player2
   * @param {String} selectedSymbol - the id of the selected button
   */
  function applySymbol(selectedSymbol) {
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
  }

  $(document).ready(() => {
    disableButtons();
    $('#mode-selection').css('display', 'block');
    // click handler for the mode buttons
    $('#singleplayer, #multiplayer').click(function() {
      isSinglePlayer = this.id === 'singleplayer';
      $('#mode-selection').fadeOut('slow');
      $('#choose-symbol').fadeIn('slow');
    });

    // click handler for the symbol buttons
    $('#cross, #circle').click(function() {
      applySymbol(this.id);
      $('#choose-symbol').fadeOut('slow');
      choosePlayerForFirstMove();
      displayActualPlayer();

      // if the ai has the first move --> get an ai move
      if (isSinglePlayer && actualPlayer === player2) {
        let aiMove = newAiMove(board, actualPlayer.symbol);
        gameController(aiMove);
      } else {
        enableButtons();
      }
    });

    // click handler for the game-fields
    $('.game-field').click(function() {
      gameController(this.id);
    });
  });
}());
