/**
 * Created by Henry on 13.03.17.
 */

class App {
  constructor(symbols) {
    this.actualGame = new Game();
    this.player1 = new Player(symbols[0], this.player1);
    this.ai = new Ai(symbols[1]);
  }
}

class Game {
  constructor(playerWithFirstMove) {
    this.playerWithFirstMove = playerWithFirstMove;
    this.actualState = new State(
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'], playerWithFirstMove);
  }
}

class State {
  constructor(actualBoard, actualPlayer) {
    this.board = actualBoard;
    this.actualPlayer = actualPlayer;
  }
}

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}
