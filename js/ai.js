/**
 * Created by Henry on 07.03.17.
 */
class gameState {
  constructor(board, actualPlayer) {
    this.board = board;
    this.actualPlayer = actualPlayer;
    this.currentDepth = 0;
  }

  clone() {
    let newGameState = new gameState(this.board.slice(0), this.actualPlayer);
    newGameState.currentDepth = this.currentDepth + 1;
    return newGameState;
  }

  getEmptyFields() {
    let emptyFields = [];
    this.board.forEach((field, index) => {
      if (field === 'e') {
        emptyFields.push(index);
      }
    });
    return emptyFields;
  }

  applyTo(field) {
    this.board[field] = this.actualPlayer;
  }

  switchPlayer() {
    this.actualPlayer = this.actualPlayer === 'x' ? 'o' : 'x';
  }

  /** checks if the player who had made the new move has won
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

function getMinimax(gameState) {
  let minimaxValueOfActualState;
  /*console.log('#' + gameState.currentDepth + ' actualState: ' +
   gameState.board.toString() + ' actualPlayer: ' +
   gameState.actualPlayer.toString());*/

  // checks if the actualPlayer has won
  if (gameState.checkActualPlayerHasWon()) {
    /*console.log('#' + gameState.currentDepth + ' player has won: ' +
     gameState.actualPlayer);*/

    minimaxValueOfActualState = gameState.actualPlayer === 'x' ? 10 : -10;
  } else {
    // the empty fields
    const emptyFields = gameState.getEmptyFields();

    // checks if no empty fields are left
    if (emptyFields.length === 0) {
      /*console.log('#' + gameState.currentDepth + ' patt!');*/
      minimaxValueOfActualState = 0;
    } else {

      // gehe in Rekursion

      // switches the player
      gameState.switchPlayer();

      let badestMinMaxValueForActualPlayer = gameState.actualPlayer === 'x' ?
          -10 :
          10;
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
      /*console.log('#' + gameState.currentDepth + ' actualPlayer: ' +
       gameState.actualPlayer + ' BestMove: ' + bestMove + ' minmaxValue: ' +
       badestMinMaxValueForActualPlayer);*/
      minimaxValueOfActualState = badestMinMaxValueForActualPlayer;
    }
  }
  return minimaxValueOfActualState;
}

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
  console.log('#' + gameState.currentDepth + ' actualPlayer: ' +
      gameState.actualPlayer + ' BestMove: ' + bestMove + ' minmaxValue: ' +
      badestMinMaxValueForActualPlayer);

  return bestMove;
}
