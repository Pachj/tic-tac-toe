/**
 * Created by Henry on 06.03.17.
 */
!function () {
    let symbol;
    let player1 = [];
    let player2 = [];

    $(document).ready(function () {
        $("#choose-symbol").css("display", "block");
        $("#cross, #circle").click(function () {
            chooseSymbol(this.id);
        });

        $("#first-row, #second-row, #third-row").children().click(function () {
            fillInInput(this.id);
        });
    });

    function chooseSymbol(selectedSymbol) {
        switch (selectedSymbol) {
            case "cross":
                symbol = "fa fa-times";
                break;

            case "circle":
                symbol = "fa fa-circle-o";
                break;
        }
        $("#choose-symbol").hide("slow");
    }

    function fillInInput(id) { // ToDo: add it to the player array
        id = "#" + id;

        if ($(id).html().length === 0) {
            $(id).html("<i class='" + symbol + "'></i>");
        }
    }

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
