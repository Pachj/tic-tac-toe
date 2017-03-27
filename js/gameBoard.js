/**
 * Created by Henry on 06.03.17.
 */

/** ToDo: add 2 player mode
 * ToDo: change show()/hide() anchor *
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
  function chooseSymbol(selectedSymbol) {
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
    $('#choose-symbol').hide('slow');
  }

  $(document).ready(() => {
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

    // checks if the field is empty
    if (board[selectedField] === 'e') {
      board[selectedField] = actualPlayer.symbol;
      displayMove(selectedField);
      actualPlayer = actualPlayer === player1 ? player2 : player1;
    }

    // checks if the ai is the player who can make a move --> create a new move
    if (isSinglePlayer && actualPlayer === player2) {
      gameController(newAiMove(board, actualPlayer.symbol));
    }
  }

  function displayMove(field) {
    const selector = '#' + field;
    $(selector).html('<i class=\"' + actualPlayer.symbolForDisplay + '\"></i>');
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
