/**
 * Created by Henry on 13.03.17.
 */

class App {
  constructor(symbols) {
    this.player1 = new Player(symbols[0], this.player1);
    this.ai = new Ai(symbols[1]);
    this.actualGame = new Game(this.player1);
  }

  terminateGame() {
    const playerWithFirstMove = this.actualGame.playerWithFirstMove ===
        this.player1 ? this.ai : this.player1;
    this.actualGame = new Game(playerWithFirstMove);
  }
}

class Game {
  constructor(playerWithFirstMove) {
    this.playerWithFirstMove = playerWithFirstMove;
    this.actualState = new State(
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'], playerWithFirstMove);
  }

  /** handles the the new action and checks whether the game is finished
   * @param {Number} field - the index of the selected field
   * @param {String} idOfTheField - the id of the selected field
   */
  actionHandler(field, idOfTheField) {
    if (this.actualState.checkIfFieldIsEmpty(field)) {
      this.actualState.addFieldToBoard(field);
      Ui.showNewAction(idOfTheField, this.actualState.getActualPlayer().symbol);

      if (this.actualState.checkWinner()) {
        Ui.showEndScreen(this.actualState.getActualPlayer());
        myApp.terminateGame();
      } else if (this.actualState.isFinished()) {
        Ui.showEndScreen(undefined);
        myApp.terminateGame();
      } else {
        this.actualState.changePlayer();
      }
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

  /** checks if the player who had made a move has won now
   * @return {Boolean} whether the player has won*/
  checkWinner() {
    const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    // checks if the actual winning condition is "true"
    let checkActualCondition = (actualCondition, symbol) => {
      for (let j = 0; j < actualCondition.length; j++) {
        if (this.board[actualCondition[0]] === symbol) {
          if (this.board[actualCondition[1]] === symbol) {
            if (this.board[actualCondition[2]] === symbol) {
              return true;
            }
          }
        }
      }
      return false;
    };

    // iterates over all sub arrays in winningConditions
    for (let i = 0; i < winningConditions.length; i++) {
      const actualCondition = winningConditions[i];
      if (checkActualCondition(actualCondition, 'x')) {
        return true;
      } else if (checkActualCondition(actualCondition, 'o')) {
        return true;
      }
    }
  }

  /** checks if all fields are filled
   * @return {Boolean} - whether the field has any 'e' left*/
  isFinished() {
    return (this.board.indexOf('e') === -1);
  }
}

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}
