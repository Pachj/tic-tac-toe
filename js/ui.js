/**
 * Created by Henry on 13.03.17.
 */

class Ui {
  static showOrHideElement(elementId) { // ToDo: animation
    const selector = $('#' + elementId);
    const newProperty = selector.css('display') === 'none' ?
        'block' : 'none';
    selector.css('display', newProperty);
  }
}
