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
}
