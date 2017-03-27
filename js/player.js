/**
 * Created by Henry on 20.03.17.
 */

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }

  getMove(gameState) { // ToDo: disable buttons
    const selector = $('.game-field');
    selector.prop('disabled', false);

    selector.click(function() {
      const selectedField = parseInt($(this).attr('value'));
      const selectedFieldId = '#' + this.id;
      gameState.processNewMove(selectedField, selectedFieldId);
    });
  }
}
