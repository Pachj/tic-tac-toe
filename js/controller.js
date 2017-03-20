/**
 * Created by Henry on 13.03.17.
 */
let myApp;

$(document).ready(() => {
  Ui.showOrHideElement('choose-symbol');

  $('#circle, #cross').click(() => {
    const symbolPlayer = this.attr('value');
    const symbolAi = symbolPlayer === 'x' ? 'o' : 'x';

    myApp = new App(symbolPlayer, symbolAi);
  });
});
