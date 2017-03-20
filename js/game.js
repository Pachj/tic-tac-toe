/**
 * Created by Henry on 13.03.17.
 */

class App {
  constructor(symbolPlayer, symbolAi) {
    this.player = new Player(symbolPlayer);
    this.ai = new Ai(symbolAi);
    this.playerWithFirstMove = this.player;
    this.actualGame = new Game(this.playerWithFirstMove);
  }
}

class Game {
  constructor(playerWithFirstMove) {
    this.actualState = new GameState(playerWithFirstMove);
  }
}

class GameState {
  constructor(playerWithFirstMove) {
    this.aiMovesCounter = 0;
    this.actualPlayer = playerWithFirstMove;
    this.actualBoard = new Board();
  }
}

class Board {
  constructor() {
    this.board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
  }
}
