/**
 * Created by Henry on 06.03.17.
 */
//ToDo: add 2 player mode
//ToDo: change show()/hide() anchor
//ToDo: Change the player for the first move
!function gameBoard() { // ToDo: perhaps delete it again (name the function)
    let singlePlayer = true; // actual only a placeholder
    let isPlayer1 = true;
    let player1HasFirstMove = true;
    let notUsedFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];


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

        $(".game-field").click(function () { //ToDo: needs to be tested
            // jQuery selector for the game-field buttons
            let buttonSelector = $(".game-field");
            // disable click events on the game-fields
            buttonSelector.css("pointer-events", "none");

            gameController(this.id, parseInt($(this).attr("value")));

            // enable click events on the game-fields
            buttonSelector.css("pointer-events", "auto");
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

    function gameController(id, value) { //ToDo: change actual player // ToDo: new comments
        // the actual player
        let actualPlayer = selectActualPlayer();

        if (notUsedFields.indexOf(value) !== -1) {
            // fill in the input
            fillInInput(id, value, actualPlayer);

            // check if the actual player has won
            if (hasWon(actualPlayer)) {
                finishRound(actualPlayer);
                window.setTimeout(resetGame, 3000);
            }
            // if all fields are filled --> end the round
            else if (player1.selectedFields.length + player2.selectedFields.length === 9) {
                finishRound();
                window.setTimeout(resetGame, 3000);
            }
            // change the player for the next move
            else {
                isPlayer1 = !isPlayer1;
            }
        }

        // select the actual player
        function selectActualPlayer() {
            if (isPlayer1) {
                return player1;
            }
            return player2;
        }
    }

    /* add the value to the actualPlayers selectedFields Array and display the players symbol
     * @param the id of the selected button
     * @param the value of the selected button*/
    function fillInInput(id, value, actualPlayer) { // ToDo: new comments
        // push the value of the button to the selected field array of the actual player
        actualPlayer.selectedFields.push(value);
        // sort the selected fields array of the actual player
        actualPlayer.selectedFields.sort();

        id = "#" + id;
        // display the symbol of the actual player in the selected button
        if ($(id).html().length === 0) {
            $(id).html("<i class='" + actualPlayer.symbol + "'></i>");
        }

        removeFromNotUsed();

        function removeFromNotUsed() {
            let index = notUsedFields.indexOf(value);
            notUsedFields.splice(index, 1);
        }
    }

    /* checks if the actual player has won
     * @param the actual player*/
    function hasWon(actualPlayer) { //ToDo: new comments
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
                return true
            }
        }
        return false;
    }

    function finishRound() {
        // jQuery selector for the result screen
        let resultScreen = $("#result-screen");
        // shows the result screen
        resultScreen.show("slow");

        // if i have an argument
        if (arguments.length === 1) {
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

        player1HasFirstMove = !player1HasFirstMove;
        isPlayer1 = player1HasFirstMove;

        $("#result-screen").hide("slow");
    }
}();
