/**
 * Created by Henry on 13.03.17.
 */
let app;

$(document).ready(function() {
  $('#choose-symbol').css('display', 'block');

  $('#cross, #circle').click(function() {
    let symbols = [];
    symbols[0] = $(this).attr('value');
    symbols[1] = (symbols[0] === 'x' ? 'y' : 'x');
    app = new App(symbols);

    Ui.showOrHideElement($('#choose-symbol'));
  });
});
