/**
 * Created by Henry on 06.03.17.
 */

/** ToDo: add 2 player mode
 * ToDo: change show()/hide() anchor
 * ToDo: import from ai.js
 * ToDo: add Babel File Watcher
 */

/* import newAiMove from './ai';*/ // ToDo: other way for import
(function () {
  const singlePlayer = true; // actual only a placeholder
// which player can make a move
  let isPlayer1 = true;
// which player can make the first move in the round
  let player1HasFirstMove = true;
// all fields who not already has been selected
  let notUsedFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// the player
  const player1 = {
    symbol: undefined,
    selectedFields: [],
  };
// the second player or the AI
  const player2 = {
    symbol: undefined,
    selectedFields: [],
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

  /** add the value to the actualPlayers selectedFields Array and display the players symbol
   * @param {String} id - the id of the selected field
   * @param {Number} value - the value of the selected field
   * @param {Object} actualPlayer - the actual player*/
  function fillInInput(id, value, actualPlayer) {
    // push the value of the button to the selected field array of the actual player
    actualPlayer.selectedFields.push(value);
    // sort the selected fields array of the actual player
    actualPlayer.selectedFields.sort();

    const actualId = `#${id}`;
    // display the symbol of the actual player in the selected button
    if ($(actualId).html().length === 0) { // ToDo: needs to be refactored
      $(actualId).html(`<i class='${actualPlayer.symbol}'></i>`);
    }

    // removes the actual input from the not used fields
    function removeFromNotUsed() {
      const index = notUsedFields.indexOf(value);
      notUsedFields.splice(index, 1);
    }

    removeFromNotUsed();
  }

  function getNewAiMove() { // ToDo: comments
    newAiMove(player1.selectedFields, player2.selectedFields, notUsedFields);
  }

  /** checks if the actual player has won
   * @param {Object} actualPlayer - the actual player
   * @return {Boolean} - if the player has won*/
  function hasWon(actualPlayer) {
    // all winning conditions
    const winningConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [3, 5, 7]];

    // iterate over all winning conditions
    for (let i = 0; i < winningConditions.length; i += 1) {
      // build the regExp string with the values of the current winningConditions array
      const actualWinningCondition = `^.*${winningConditions[i][0]}.*${winningConditions[i][1]}.*${
        winningConditions[i][2]}.*$`;
      // create the regExp object
      const regExp = new RegExp(actualWinningCondition, 'g');

      // if the player has won --> finish the round
      if (regExp.test(actualPlayer.selectedFields.toString())) {
        return true;
      }
    }
    return false;
  }

  function finishRound() {
    // jQuery selector for the result screen
    const resultScreen = $('#result-screen');
    // shows the result screen
    resultScreen.show('slow');

    /** if i have a winner
     * else --> it's a draw*/
    if (arguments.length === 1) {
      // if i play in singleplayer
      if (singlePlayer) {
        // if player1 has made the actual selection
        if (isPlayer1) {
          resultScreen.children('h1').html('You are the Winner!');
        } else {
          resultScreen.children('h1').html('You have lost!');
        }
      }
    } else {
      // display a draw
      resultScreen.children('h1').html("Nobody has won. It's a draw.");
    }
  }

// resets the whole game
  function resetGame() {
    // the id's of all game-buttons
    const fields = ['#field-one', '#field-two', '#field-three', '#field-four', '#field-five',
      '#field-six', '#field-seven', '#field-eight', '#field-nine'];

    // reset the game-buttons
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      $(field).html('');
    }

    // reset the selected fields
    player1.selectedFields = [];
    player2.selectedFields = [];

    // reset the not used fields
    notUsedFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // change the player with the first move for the next round
    player1HasFirstMove = !player1HasFirstMove;
    isPlayer1 = player1HasFirstMove;

    // hide the result screen
    $('#result-screen').hide('slow');
  }

  /**
   * controls the whole game functionality
   * @param {String} id - the id of the field who has been selected
   * @param {Number} value - the value of the field who has been selected
   */
  function gameController(id, value) {
    /**
     * selects the actual player
     * @return {Object} - the actual player*/
    function selectActualPlayer() {
      if (isPlayer1) {
        return player1;
      }
      return player2;
    }

    // the actual player
    const actualPlayer = selectActualPlayer();

    /** if the field isn't already used --> fill in the input
     * else --> change the player for the next move*/
    if (notUsedFields.indexOf(value) !== -1) {
      // fill in the input
      fillInInput(id, value, actualPlayer);

      /** if the actual player has won --> end the round
       * else if all fields are filled --> end the round*/
      if (hasWon(actualPlayer)) {
        finishRound(actualPlayer);
        window.setTimeout(resetGame, 3000);
      } else if (player1.selectedFields.length + player2.selectedFields.length === 9) {
        finishRound();
        window.setTimeout(resetGame, 3000);
      } else {
        isPlayer1 = !isPlayer1;
      }
      if (singlePlayer) { // ToDo: comments //ToDo: needs other position
        if (!isPlayer1) {
          getNewAiMove();
        }
      }
    }
  }

  $(document).ready(() => {
    $('#choose-symbol').css('display', 'block');
    $('#cross, #circle').click(function () {
      chooseSymbol(this.id);
    });

    $('.game-field').click(function () { // ToDo: needs to be tested
      // block input if it is a singleplayer game and the AI can make a move
      if (singlePlayer) {
        if (isPlayer1) {
          gameController(this.id, parseInt($(this).attr('value'), 10)); // ToDo: gameController must in an other way been called because if not the player has the first move, the AI cant move first.
        }
      }
    });
  });
}());

function triggerNextMove(selectedField) {
  let trigger;
  switch (selectedField) {
    case 1: {
      trigger = '#field-one';
      break;
    }
    case 2: {
      trigger = '#field-two';
      break;
    }
    case 3: {
      trigger = '#field-three';
      break;
    }
    case 4: {
      trigger = '#field-four';
      break;
    }
    case 5: {
      trigger = '#field-five';
      break;
    }
    case 6: {
      trigger = '#field-six';
      break;
    }
    case 7: {
      trigger = '#field-seven';
      break;
    }
    case 8: {
      trigger = '#field-eight';
      break;
    }
    case 9: {
      trigger = '#field-nine';
      break;
    }
    default: {
      console.log('ERROR! A NON EXPECTED VALUE HAS BEEN SELECTED!');
      break;
    }
  }
  $(trigger).trigger('click');
}

/**
 * @param {Array} player1 - All fields of the player
 * @param {Array} player2 - All fields of the AI
 * @param {Array} notUsedFields - All fields who aren't used *
 */
function newAiMove(player1, player2, notUsedFields) { // ToDo: comments
  const cornersAndCenter = [1, 3, 5, 7, 9];
  const edges = [2, 4, 6, 8];
  const remainingFields = notUsedFields.length;

  if (remainingFields === 9) {
    triggerNextMove(Math.floor(Math.random() * cornersAndCenter.length));
  }
}
