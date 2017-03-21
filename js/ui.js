/**
 * Created by Henry on 13.03.17.
 */

class Ui {
  /** shows or hides the given HTML element
   * @param {String} elementId - the id of the element without #
   */
  static showOrHideElement(elementId) {
    const selector = $('#' + elementId);
    if (selector.css('display') === 'block') {
      selector.hide('slow');
    } else {
      selector.show('slow');
    }
  }

  /** shows the symbol of the player who has selected a field
   * @param {String} symbol - the symbol of the player
   * @param {String} newFieldId - the id of the selected field
   */
  static showMove(symbol, newFieldId) {
    if (symbol === 'x') {
      $(newFieldId).html('<i class="fa fa-times"></i>');
    } else {
      $(newFieldId).html('<i class="fa fa-circle-o"></i>');
    }
  }

  /** shows the result screen
   * @param {Object} winner - the player object of the winner if someone has won
   */
  static showEndScreen(winner) {
    const selector = $('#result-screen');
    if (arguments) {
      if (winner === myApp.player) {
        selector.children('h1').html('You are the winner!');
      } else {
        selector.children('h1').html('The ai is the winner.');
      }
    } else {
      selector.children('h1').html('Nobody has won. Its a draw.');
    }
    this.showOrHideElement('result-screen');
    setTimeout(this.showOrHideElement, 3000, 'result-screen');
  }

  // clears all fields
  static resetBoard() { // ToDo: needs to be tested
    $('.game-field').html('');
  }
}
