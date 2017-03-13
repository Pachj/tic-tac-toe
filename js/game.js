/**
 * Created by Henry on 13.03.17.
 */

class App {
  constructor(symbols) {
    this.player1 = new Player(symbols[0], this.player1);
    this.ai = new Ai(symbols[1]);
    this.actualGame = new Game(this.player1);
  }
}

class Game {
  constructor(playerWithFirstMove) {
    this.playerWithFirstMove = playerWithFirstMove;
    this.actualState = new State(
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'], playerWithFirstMove);
    this.running = true;
  }

  /** handles the the new action
   * @param {Number} field - the index of the selected field
   * @param {String} idOfTheField - the id of the selected field
   */
  actionController(field, idOfTheField) {
    if (this.actualState.checkIfFieldIsEmpty(field)) {
      this.actualState.addFieldToBoard(field);
      Ui.showNewAction(idOfTheField, this.actualState.getActualPlayer().symbol);
      this.actualState.changePlayer();
    }
  }
}

class State {
  constructor(actualBoard, actualPlayer) {
    this.board = actualBoard;
    this.actualPlayer = actualPlayer;
  }

  /** adds the given field to the board
   * @param {Number} field - the index of the field who has to be added
   */
  addFieldToBoard(field) {
    this.board.splice(field, 1, this.actualPlayer.symbol);
  }

  /** checks if the given field is empty
   * @param {Number} field - the index of the field who has to be checked
   * @return {Boolean} whether the field is empty
   */
  checkIfFieldIsEmpty(field) {
    return this.board[field] === 'e';
  }

  //changes the player who can make an action
  changePlayer() {
    this.actualPlayer =
        (this.actualPlayer === myApp.player1 ? myApp.ai : myApp.player1);
  }

  /** return the player who actually can make an action
   * @return {Object} the player object
   */
  getActualPlayer() {
    return this.actualPlayer;
  }
}

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}
