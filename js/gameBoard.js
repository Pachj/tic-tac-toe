/**
 * Created by Henry on 06.03.17.
 */

/** ToDo: add 2 player mode
 * ToDo: change show()/hide() anchor *
 */

(function() {
  const singlePlayer = true;
  // which player can make the first move in the round
  let player1HasFirstMove = false;

  // the player
  const player1 = {
    symbol: undefined
  };
  // the second player or the AI
  const player2 = {
    symbol: undefined
  };

  /** choose the selected symbol for player1 and the opposite for player2
   * @param {String} selectedSymbol - the id of the selected button*/
  function chooseSymbol(selectedSymbol) {
    const cross = 'fa fa-times';
    const circle = 'fa fa-circle-o';

    if (selectedSymbol === 'cross') {
      player1.symbol = cross;
      player2.symbol = circle;
    } else if (selectedSymbol === 'circle') {
      player1.symbol = circle;
      player2.symbol = cross;
    }

    // hide the symbol selecting screen
    $('#choose-symbol').hide('slow');
  }

  $(document).ready(() => {
    $('#choose-symbol').css('display', 'block');
    $('#cross, #circle').click(function() {
      chooseSymbol(this.id);

      // if the ai can make the first move --> make first move
      if (singlePlayer && notUsedFields.length === 9 && !isPlayer1) {
        inputController();
      }
    });

    $('.game-field').click(function() {
      inputController(this.id, parseInt($(this).attr('value'), 10));
    });
  });
}());

/**
 * @param {Array} player1 - All fields of the player
 * @param {Array} player2 - All fields of the AI
 * @param {Array} notUsedFields - All fields who aren't used *
 */
function newAiMove(player1HasFirstMove, player1, player2, notUsedFields) {
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
}
