/**
 * Created by Henry on 13.03.17.
 */

class Ui {
  static showOrHideElement(elementId) {
    const selector = $('#' + elementId);
    if (selector.css('display') === 'block') {
      selector.hide('slow');
    } else {
      selector.show('slow');
    }
  }

  static showMove(symbol, newFieldId) {
    if (symbol === 'x') {
      $(newFieldId).html('<i class="fa fa-times"></i>');
    } else {
      $(newFieldId).html('<i class="fa fa-circle-o"></i>');
    }
  }

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
}
