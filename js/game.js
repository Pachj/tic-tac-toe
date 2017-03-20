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
