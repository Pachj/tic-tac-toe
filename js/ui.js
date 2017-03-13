/**
 * Created by Henry on 13.03.17.
 */

class Ui {
  static showOrHideElement(elementSelector) {
    const newProperty = (elementSelector.css('display') ===
    'block' ? 'none' : 'block');

    elementSelector.css('display', newProperty);
  }

  static showNewAction(idOfTheNewField, symbol) {
    const icon = (symbol === 'x' ? 'fa fa-times' : 'fa fa-circle-o');
    const id = '#' + idOfTheNewField;
    $(id).html('<i class="' + icon + '"></i>');
  }
}
