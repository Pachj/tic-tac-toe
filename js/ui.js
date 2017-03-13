/**
 * Created by Henry on 13.03.17.
 */

class Ui {
  static showOrHideElement(elementSelector) {
    const newPropertie = (elementSelector.css('display') ===
      'block' ? 'none' : 'block');

    elementSelector.css('display', newPropertie);
  }
}
