/**
 * Created by Henry on 13.03.17.
 */
let myApp;

$(document).ready(() => {
  $('#choose-symbol').css('display', 'block');

  $('#circle, #cross').click(function() {
    const symbolPlayer = $(this).attr('value');
    const symbolAi = symbolPlayer === 'x' ? 'o' : 'x';

    myApp = new App(symbolPlayer, symbolAi);
    Ui.showOrHideElement('choose-symbol');
  });
});
