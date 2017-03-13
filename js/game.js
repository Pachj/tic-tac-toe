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

  addNewAction(field, idOfTheField) {
    this.actualState.createNewBoard(field);
    Ui.showNewAction(idOfTheField, this.actualState.actualPlayer.symbol);
    this.actualState.changePlayer();
  }
}

class State {
  constructor(actualBoard, actualPlayer) {
    this.board = actualBoard;
    this.actualPlayer = actualPlayer;
  }

  createNewBoard(newField) {
    this.board.splice(newField, 1, this.actualPlayer.symbol);
  }

  changePlayer() {
    this.actualPlayer =
        (this.actualPlayer === myApp.player1 ? myApp.ai : myApp.player1);
  }
}

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}
