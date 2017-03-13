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
}
