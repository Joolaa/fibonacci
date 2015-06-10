function fibonacci(n) {
    if(n <= 0) {
        return 0;
    }

    var current = 1;
    var previous = 0;

    for(var i = 2; i <= n; i++) {
        var helper = current;
        current += previous;
        previous = helper;
    }

    return current;
}

function fibonacciArray(n) {
    if(n <= 0) {
        return [0];
    }

    var fibsArray = [0, 1];

    for(var i = 2; i <= n; i++) {
        fibsArray.push(fibsArray[i - 1] + fibsArray[i - 2]);
    }

    return fibsArray;
}

function generalFibonacciArray(n, zeroth, first) {
    if(n <= 0) {
        return [zeroth];
    }

    var fibsArray = [zeroth, first];

    for(var i = 2; i <= n; i++) {
        fibsArray.push(fibsArray[i - 1] + fibsArray[i - 2]);
    }

    return fibsArray;
}

function generalestFibonacciArray(n, seed) {

    var termsToSum = seed.length;
    var fibsArray = seed;

    if(n < 0) {
        return [];
    } else if(n < seed.length - 1) {
        return seed.slice(0, n + 1);
    }

    for(var i = termsToSum; i <= n; i++) {

        var accum = 0;

        for(var j = 1; j <= termsToSum; j++) {
            accum += fibsArray[i - j];
        }
        fibsArray.push(accum);
    }

    return fibsArray;
}

function generalestHowMany(howMany, seed) {
    return generalestFibonacciArray(howMany - 1, seed);
}

var PageControls = (function() {

    var getSeedValues = function() {
        var valuesString = $("#seedValues")[0].value;

        var splitString = valuesString.split(/[^0-9]+/);

        return splitString;
    }

    var purifiedSequence = function() {

        var sequenceStart = [];

        var stringSequence = getSeedValues();

        if(stringSequence.length == 0) {
            return [0];
        }

        for(var i = 0; i < stringSequence.length; i++) {
            var current = stringSequence[i];
            if(current !== "") {
                var parsed = parseInt(current);
                if(parsed !== NaN) {
                    sequenceStart.push(parsed);
                }
            }
        }

        return sequenceStart;
    }

    var calculateSequence = function() {
        var amount = $("#amount")[0].value;
        var parsedAmount = parseInt(amount);

        if(!parsedAmount) {
            return
        }

        return generalestHowMany(parsedAmount, purifiedSequence());
    }

    var resultToString = function(resultArray) {

        var resultString = "";
        var separator = ", ";

        for(var i = 0; i < resultArray.length; i++) {

            resultString += resultArray[i];

            if(i !== resultArray.length - 1) {
                resultString += separator;
            }

            if(i > 0 && i % 20 === 0) {
                resultString += "\n";
            }
        }

        return resultString;
    }

    var displayResult = function() {
        $("#result").text(resultToString(calculateSequence()));
    }

    return {displayResult: displayResult};

})();

$(document).ready(function() {
    $("#calculate:first").click(function() {
        PageControls.displayResult();
    });
    $("#amount").val("20");
    $("#seedValues").val("0, 1");
    PageControls.displayResult();
});
