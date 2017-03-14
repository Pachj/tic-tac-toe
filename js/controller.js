/**
 * Created by Henry on 13.03.17.
 */
let myApp;

$(document).ready(function() {
  $('#choose-symbol').css('display', 'block');

  $('#cross, #circle').click(function() {
    let symbols = [];
    symbols[0] = $(this).attr('value');
    symbols[1] = (symbols[0] === 'x' ? 'o' : 'x');
    myApp = new App(symbols);

    Ui.showOrHideElement($('#choose-symbol'));
  });

  $('.game-field').click(function() {
    const id = this.id;
    const value = parseInt($(this).attr('value'));
    myApp.actualGame.actionHandler(value, id);
  });
});
