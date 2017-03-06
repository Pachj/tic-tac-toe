/**
 * Created by Henry on 06.03.17.
 */
!function () {
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
            hasWon();
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

        isPlayer1 = true;
    }

    function hasWon(person) {
        const winningConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    }
}();
