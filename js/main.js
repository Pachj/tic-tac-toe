/**
 * Created by Henry on 06.03.17.
 */
//ToDo: add 2 player mode
//ToDo: change show()/hide() anchor
//ToDo: Change the player for the first move
!function gameBoard() { // ToDo: perhaps delete it again (name the function)
    let singlePlayer = true; // actual only a placeholder
    let isPlayer1 = true;

    let player1 = {
        symbol: undefined,
        selectedFields: []
    };
    let player2 = {
        symbol: undefined,
        selectedFields: []
    };

    $(document).ready(function () {
        $("#choose-symbol").css("display", "block");
        $("#cross, #circle").click(function () {
            chooseSymbol(this.id);
        });

        $("#first-row, #second-row, #third-row").children().click(function () {
            fillInInput(this.id, parseInt($(this).attr("value")));
        });
    });

    /* choose the selected symbol for player1 and the opposite for player2
     * @param the id of the selected button*/
    function chooseSymbol(selectedSymbol) {
        const cross = "fa fa-times";
        const circle = "fa fa-circle-o";
        let isCross = false;

        switch (selectedSymbol) {
            case "cross":
                player1.symbol = cross;
                player2.symbol = circle;
                isCross = true;
                break;

            case "circle":
                player1.symbol = circle;
                player2.symbol = cross;
                break;
        }

        // hide the symbol selecting screen
        $("#choose-symbol").hide("slow");
    }

    /* add the value to the actualPlayers selectedFields Array and display the players symbol
     * @param the id of the selected button
     * @param the value of the selected button*/
    function fillInInput(id, value) {
        // select the actual player
        function selectActualPlayer() {
            if (isPlayer1) {
                return player1;
            }
            return player2;
        }

        // the actual player
        let actualPlayer = selectActualPlayer();

        // push the value of the button to the selected field array of the actual player
        actualPlayer.selectedFields.push(value);
        // sort the selected fields array of the actual player
        actualPlayer.selectedFields.sort();

        id = "#" + id;
        // display the symbol of the actual player in the selected button
        if ($(id).html().length === 0) {
            $(id).html("<i class='" + actualPlayer.symbol + "'></i>");
        }

        // if the actual player already has selected 3 or more fields --> check if he has won
        if (actualPlayer.selectedFields.length >= 3) {
            hasWon(actualPlayer);
        }

        // change the player who make a move
        isPlayer1 = !isPlayer1;
    }

    /* checks if the actual player has won
     * @param the actual player*/
    function hasWon(actualPlayer) {
        // all winning conditions
        const winningConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

        // iterate over all winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            // build the regExp string with the values of the current winningConditions array
            let actualWinningCondition = "^.*" + winningConditions[i][0] + ".*" + winningConditions[i][1] + ".*" +
                winningConditions[i][2] + ".*$";
            // create the regExp object
            let regExp = new RegExp(actualWinningCondition, "g");

            // if the player has won --> finish the round
            if (regExp.test(actualPlayer.selectedFields.toString())) {
                finishRound(actualPlayer);
            }
        }
        // if all fields are filled --> end the round
        if (player1.selectedFields.length + player2.selectedFields.length === 9) {
            finishRound();
        }
    }

    function finishRound() {
        // jQuery selector for the result screen
        let resultScreen = $("#result-screen");
        // shows the result screen
        resultScreen.show("slow");

        // if i have an argument
        if (arguments) { //FixMe: is winning but should be a draw
            // if i play in singleplayer
            if (singlePlayer) {
                // if player1 has made the actual selection
                if (isPlayer1) {
                    resultScreen.children("h1").html("You are the Winner!");
                }
                // if the ai had made the actual selection
                else {
                    resultScreen("h1").html("You have lost!");
                }
            }
        }
        // if i don't have an argument --> display a draw
        else {
            resultScreen.children("h1").html("Nobody has won. It's a draw.")
        }

        // sets a timer until call resetGame so that the result screen is this duration long visible
        window.setTimeout(resetGame, 3000); //ToDo: change duration //ToDo: possibly change position in code, so that the player can see how the symbols are disappearing
    }

    // resets the whole game
    function resetGame() {
        // the id's of all game-buttons
        const fields = ["#field-one", "#field-two", "#field-three", "#field-four", "#field-five",
            "#field-six", "#field-seven", "#field-eight", "#field-nine"];

        // reset the game-buttons
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            $(field).html("");
        }

        // reset the selected fields //ToDo: needs to be tested
        player1.selectedFields = [];
        player2.selectedFields = [];

        isPlayer1 = true;

        $("#result-screen").hide("slow");
    }
}();
