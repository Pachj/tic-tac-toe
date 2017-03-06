/**
 * Created by Henry on 06.03.17.
 */
!function () {
    $(document).ready(function () {
        $("#choose-symbol").css("display", "block");
        $("#first-row, #second-row, #third-row").children().click(function () {
            fillInInput(this.id);
        });
    });

    function fillInInput(id) {
        id = "#" + id;

        if ($(id).html().length === 0) {
            $(id).html("<i class='fa fa-times'></i>");
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
