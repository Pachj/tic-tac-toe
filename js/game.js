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

  checkFieldEmpty(selectedField) {
    return this.board[selectedField] === 'e';
  }

  addNewField(newField, symbolOfTheActualPlayer) {
    this.board.splice(newField, 1, symbolOfTheActualPlayer);
  }
}
