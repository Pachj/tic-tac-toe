/**
 * Created by Henry on 06.03.17.
 */
!function () {
    let symbol;

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

    function fillInInput(id) {
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
}();
