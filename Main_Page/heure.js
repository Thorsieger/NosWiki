function compZero(e) {
    return e < 10 ? "0" + e : e
}

function date_heure() {
    var e = new Date;
    var heures = e.getHours();
    var minutes = e.getMinutes();
    document.getElementById("date_heure").innerHTML = compZero(heures) + " : " + compZero(minutes);

    var textaAfficher = [
        ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "00"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "2", "2", "2", "2", "3", "4", "5", "2", "2", "3", "4", "5", "1", "1"],
        ["02", "02", "02", "08", "08", "08", "08", "08", "08", "13", "13", "13", "13", "13", "14", "15", "16", "18", "18", "19", "20", "21", "02", "02"]
    ];

    document.getElementById("heure_message_next_ci").innerHTML = "Prochain CI : " + textaAfficher[0][parseInt(heures / 2)] + ":00";
    document.getElementById("heure_message_canal").innerHTML = "Canal LOD : " + textaAfficher[1][heures];
    document.getElementById("heure_message_lod").innerHTML = "Prochain LOD a " + textaAfficher[2][heures] + ":30";

    if ((heures % 2 == 0) && (minutes <= 15)) {
        document.getElementsByClassName("stats")[0].style.padding = "10px 0";
        document.getElementById("heure_message_ci").innerHTML = '<img src="img/CI.png"/>' + "CI en cours";
    } else {
        document.getElementsByClassName("stats")[0].style.padding = "0";
        document.getElementById("heure_message_ci").innerHTML = "";
    }
}


window.onload = function () {
    setInterval("date_heure()", 1e3)
}, $(document).ready(function () {
    $(".toggle").click(function () {
        $("#toggled").toggleClass("shown"), $(".toggle").is(function () {
            $(".toggle").text("moins"), $("#toggled").hasClass("shown") ? $(".toggle").text("moins") : $(".toggle").text("plus")
        })
    })
});