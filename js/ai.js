/**
 * Created by Henry on 13.03.17.
 */
// represents a certain state in the game
class GameState {
  /**
   * @param {Array} board - the board as array
   * @param {String} actualPlayer - the symbol of the actual player
   */
  constructor(board, actualPlayer) {
    this.board = board;
    this.actualPlayer = actualPlayer;
    this.currentDepth = 0;
  }

  /**
   * clones a GameState
   * @return {Object} a new GameState object
   */
  clone() {
    let newGameState = new GameState(this.board.slice(0), this.actualPlayer);
    newGameState.currentDepth = this.currentDepth + 1;
    return newGameState;
  }

  /**
   * returns all empty fields on the board
   * @return {Array} all empty fields
   */
  getEmptyFields() {
    let emptyFields = [];
    this.board.forEach((field, index) => {
      if (field === 'e') {
        emptyFields.push(index);
      }
    });
    return emptyFields;
  }

  /**
   * adds the given field to the board
   * @param  {Number} field - the field who needs to be added
   */
  applyTo(field) {
    this.board[field] = this.actualPlayer;
  }

  // changes the actualPlayer to the other player
  switchPlayer() {
    this.actualPlayer = this.actualPlayer === 'x' ? 'o' : 'x';
  }

  /**
   * checks if the player who had made the new move has won
   * @return {Boolean} whether the player has won
   */
  checkActualPlayerHasWon() {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let checkActualCondition = (condition) => {
      if (this.board[condition[0]] === this.actualPlayer) {
        if (this.board[condition[1]] === this.actualPlayer) {
          if (this.board[condition[2]] === this.actualPlayer) {
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
  };
}

/**
 * returns the minimax value for all possible moves, its  a recursive function
 * @param  {Object} gameState - the GameState of which the minimax Value should be calculated
 * @return {Number} the minimax value
 */
function getMinimax(gameState) {
  let minimaxValueOfActualState;

  // checks if the actualPlayer has won
  if (gameState.checkActualPlayerHasWon()) {
    minimaxValueOfActualState = gameState.actualPlayer === 'x' ? (10 -
    gameState.currentDepth) : (-10 + gameState.currentDepth);
  } else {
    // the empty fields
    const emptyFields = gameState.getEmptyFields();

    // checks if no empty fields are left
    if (emptyFields.length === 0) {
      minimaxValueOfActualState = 0;
    } else {

      // go into recursion

      // switches the player
      gameState.switchPlayer();

      let badestMinMaxValueForActualPlayer = gameState.actualPlayer === 'x' ?
          -10 : 10;
      let bestMove = undefined;

      // iterates over all empty fields
      emptyFields.forEach((field) => {
        let newGameState = gameState.clone();
        newGameState.applyTo(field);

        const choosenMoveValue = getMinimax(newGameState);
        if (gameState.actualPlayer === 'x') {
          if (badestMinMaxValueForActualPlayer < choosenMoveValue) {
            bestMove = field;
            badestMinMaxValueForActualPlayer = choosenMoveValue;
          }
        } else {
          if (badestMinMaxValueForActualPlayer > choosenMoveValue) {
            bestMove = field;
            badestMinMaxValueForActualPlayer = choosenMoveValue;
          }
        }
      });
      minimaxValueOfActualState = badestMinMaxValueForActualPlayer;
    }
  }
  return minimaxValueOfActualState;
}

/**
 * returns the best move who the ai can make
 * @param  {Object} gameState - the state of the actual game
 * @return {Number} the best move who the ai can make
 */
function getMove(gameState) {
  const emptyFields = gameState.getEmptyFields();
  let bestMove;

  // switches the player
  gameState.switchPlayer();

  let badestMinMaxValueForActualPlayer = gameState.actualPlayer === 'x' ?
      -10 : 10;

  emptyFields.forEach((field) => {
    let newGameState = gameState.clone();
    newGameState.applyTo(field);

    const choosenMoveValue = getMinimax(newGameState);
    if (gameState.actualPlayer === 'x') {
      if (badestMinMaxValueForActualPlayer < choosenMoveValue) {
        bestMove = field;
        badestMinMaxValueForActualPlayer = choosenMoveValue;
      }
    } else {
      if (badestMinMaxValueForActualPlayer > choosenMoveValue) {
        bestMove = field;
        badestMinMaxValueForActualPlayer = choosenMoveValue;
      }
    }
  });
  return bestMove;
}
