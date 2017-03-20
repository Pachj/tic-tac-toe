/**
 * Created by Henry on 13.03.17.
 */

class Ui {
  static showOrHideElement(elementId) {
    const newProperty = $('#' + elementId).css('display') === 'none' ? 'block' : 'none';
    $('#' + elementId).css('display', newProperty);
  }
}