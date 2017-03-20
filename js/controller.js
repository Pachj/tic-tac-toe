/**
 * Created by Henry on 13.03.17.
 */
let myApp;

$(document).ready(() => {
  // shows the symbol selecting panel
  $('#choose-symbol').css('display', 'block');

  $('#circle, #cross').click(function() {
    const symbolPlayer = $(this).attr('value');
    const symbolAi = symbolPlayer === 'x' ? 'o' : 'x';

    // create a new App object
    myApp = new App(symbolPlayer, symbolAi);

    // hides the symbol selecting panel
    Ui.showOrHideElement('choose-symbol');

    // deactivates the gamefields buttons
    $('.game-field').prop('disabled', true);
    myApp.actualGame.getNextMove();
  });
});
