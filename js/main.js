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
            fillInInput(this.id);
        });
    });

    // choose the selected symbol
    function chooseSymbol(selectedSymbol) {
        const cross = "fa fa-times";
        const circle = "fa fa-circle-o";
        let isCross = false;

        switch (selectedSymbol) {
            case "cross":
                player1.symbol = cross;
                isCross = true;
                break;

            case "circle":
                player1.symbol = circle;
                break;
        }

        // choose the opposite symbol of player1 for player2
        if (cross) {
            player2.symbol = circle;
        }
        else {
            player2.symbol = cross;
        }

        // hide the symbol selecting screen
        $("#choose-symbol").hide("slow");
    }

    // fills the input into the selected button and //ToDo:
    function fillInInput(id) { // ToDo: add it to the player array
        id = "#" + id;

        if ($(id).html().length === 0) {
            $(id).html("<i class='" + symbol + "'></i>");
        }
    }

    // resets all fields and //ToDo:
    function resetGame() {
        const fields = ["#field-one", "#field-two", "#field-three", "#field-four", "#field-five",
            "#field-six", "#field-seven", "#field-eight", "#field-nine"];

        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            $(field).html("");
        }
    }

    function hasWon(person) {
        const winningConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    }
}();
