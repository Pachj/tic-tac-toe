/**
 * Created by Henry on 13.03.17.
 */

class Ui {
  /** shows or hide the given HTML element
   * @param {String} elementSelector - the id of the element
   */
  static showOrHideElement(elementSelector) {
    const displayValue = elementSelector.css('display');
    if (displayValue === 'block') {
      elementSelector.hide('slow');
    } else {
      elementSelector.show('slow');
    }
  }

  /** shows the given action
   * @param {String} idOfTheNewField - the id of the selected field who has to be displayed
   * @param {String} symbol - the symbol of the player who had made the action
   */
  static showNewAction(idOfTheNewField, symbol) {
    const icon = (symbol === 'x' ? 'fa fa-times' : 'fa fa-circle-o');
    const id = '#' + idOfTheNewField;
    $(id).html('<i class="' + icon + '"></i>');
  }

  /** shows the given player as the winner
   * @param {Object} player - the player object who is the winner*/
  static showWinner(player) {
    const selector = $('#result-screen');
    const message = (player === myApp.player1 ?
        'You are the winner!' : 'The AI ist the winner.');

    selector.html(message);
    Ui.showOrHideElement(selector);
    window.setTimeout(Ui.showOrHideElement, 3000, selector);
  }
}
