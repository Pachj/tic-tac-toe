/**
 * Created by Henry on 13.03.17.
 */

class App {
  constructor(symbolPlayer, symbolAi) {
    this.player = new Player(symbolPlayer);
    this.ai = new Ai(symbolAi);
    this.playerWithFirstMove = this.player;
    this.actualGame = new Game(this.playerWithFirstMove, this.player, this.ai);
  }
}

class Game {
  constructor(playerWithFirstMove, player, ai) {
    this.actualState = new GameState(playerWithFirstMove);
    this.player = player;
    this.ai = ai;
  }

  // calls the player or the ai for the next move
  getNextMove() {
    if (this.actualState.actualPlayer === this.player) {
      this.player.getMove(this.actualState);
    }
  }
}

class GameState {
  constructor(playerWithFirstMove) {
    this.aiMovesCounter = 0;
    this.actualPlayer = playerWithFirstMove;
    this.actualBoard = new Board();
  }

  /** handles a new move from the player or the ai
   * @param {Number} selectedField - the selected field
   * @param {String} selectedFieldId - the id of the selected field
   */
  processNewMove(selectedField, selectedFieldId) {
    if (this.actualBoard.checkFieldEmpty(selectedField)) {
      this.actualBoard.addNewField(selectedField, this.actualPlayer.symbol);
      Ui.showMove(this.actualPlayer.symbol, selectedFieldId);
      if (this.checkSomeoneWon()) {
        console.log('bla');
      }
    }
  }

  checkSomeoneWon() { // ToDo: rename this function
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const symbolOfActualPlayer = this.actualPlayer.symbol;

    let checkActualCondition = (condition) => {
      if (condition[0] === symbolOfActualPlayer) {
        if (condition[1] === symbolOfActualPlayer) {
          if (condition[2] === symbolOfActualPlayer) {
            return true;
          }
        }
      }
      return false;
    };

    for (let i = 0; i < winningConditions.length; i++) {
      if (checkActualCondition(winningConditions[i])) {
        return true;
      }
    }
  }
}

class Board {
  constructor() {
    this.board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
  }

  /** checks if the given field is empty on the board
   * @param {Number} selectedField - the field to check
   * @return {Boolean} whether the field is empty
   */
  checkFieldEmpty(selectedField) {
    return this.board[selectedField] === 'e';
  }

  /** adds the given symbol to the given field
   * @param {Number} newField - the given field
   * @param {String} symbolOfTheActualPlayer - the given symbol
   */
  addNewField(newField, symbolOfTheActualPlayer) {
    this.board.splice(newField, 1, symbolOfTheActualPlayer);
  }
}
