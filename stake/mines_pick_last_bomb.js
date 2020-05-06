if (typeof jQuery === typeof undefined) {
    var jq = document.createElement('script');
    jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
}

var gamesCount = 0;
var lastBombPosition = null;
var lastBombPosition2 = null;
var currentPosition = null;
var gameStatus = null;
var run = true;

var jqueryInterval = setInterval(function () {
    if (typeof jQuery !== 'undefined') {
        jQuery.noConflict();
        clearInterval(jqueryInterval);

        bet();
    }
}, 500);

function stopIt() {
    run = false;
}

function bet() {
    if (!run) {
        jQuery("button#stopButton").remove();
        return;
    }

    jQuery("[data-test=bet-button]").click();

    if (true) {
        if (jQuery("button#stopButton").length <= 0) {
            jQuery(".cqEQQv").prepend("<button id='stopButton' class='Button__StyledButton-sc-8bd3dp-0 fbjzSA styles__Button-fc7ea4-0' onclick='stopIt();'>Stop Auto</button>");
        }

        var picked = false;

        var pickPromise = new Promise(function (resolve, reject) {
            var pickInterval = setInterval(function () {
                if (lastBombPosition === null) {
                    if (jQuery("button.cvZAjo").length > 0) {
                        jQuery("button.cvZAjo").click();
                        picked = true;
                    }
                } else {
                    jQuery(".eJeYQq > button")[lastBombPosition].click();
                    if (jQuery(jQuery(".eJeYQq > button")[lastBombPosition]).attr("data-revealed") == "true") {
                        picked = true;
                    }
                }

                if (picked) {
                    resolve(true);
                    clearInterval(pickInterval);
                }
            }, 1);
        });

        var cashoutPromise = new Promise(function (resolve, reject) {
            var betCloseInterval = setInterval(function () {
                if (typeof jQuery("[data-test=bet-button]").attr("disabled") !== typeof undefined && jQuery("[data-test=bet-button]").attr("disabled") !== false) {
                } else {
                    if (jQuery("button.cvZAjo").length > 0) {
                        jQuery("[data-test=bet-button]").click();
                    }

                    clearInterval(betCloseInterval);
                    resolve(true);
                }
            }, 1);
        });


        var detectPromise = new Promise(function (resolve, reject) {
            var detectionInterval = setInterval(function () {
                if (jQuery(".eJeYQq > button.kffmzG").length <= 0) {
                    jQuery(".eJeYQq > button").each(function (index, elem) {
                        if (jQuery(elem).hasClass('gTbxeG')) {
                            if (jQuery(elem).attr("data-revealed") == "true") {
                                if (lastBombPosition2 === index && lastBombPosition === index) {
                                    run = false;
                                    alert('Lost');
                                }
                            }
                            
                            lastBombPosition2 = lastBombPosition;
                            lastBombPosition = index;
                        }
                    });

                    jQuery(".eJeYQq > button").each(function (index, elem) {
                        if (jQuery(elem).attr("data-revealed") == "true") {

                            currentPosition = index;
                            if (jQuery(elem).hasClass("jJIbpd")) {
                                gameStatus = true;
                            } else {
                                gameStatus = false;
                            }

                            if (lastBombPosition !== null) {
                                clearInterval(detectionInterval);
                                resolve(true);
                            }
                        }
                    });
                }
            }, 1);
        });



        pickPromise.then(function () {
            cashoutPromise.then(function () {
                detectPromise.then(function () {
                    setTimeout(bet, 50);
                });
            });
        });

        gamesCount += 1;
    }
}
