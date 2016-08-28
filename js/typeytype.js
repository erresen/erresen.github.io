function typeyType(element) {
    var theText = element.text();
    element.text('');
    element.show();
    flashCaret(element, theText, 2, 0);
};

function flashCaret(element, theText, count, current) {
    element.text('> _');
    setTimeout(function(){
        element.text('>');
        current++;
        if (current > count) {
            typeNextLetter(element, theText, 0);
        } else {
            setTimeout(flashCaret, 250, element, theText, count, current);
        }
    }, 250);
};

function typeNextLetter(element, theText, nextLetterIndex) {
    if (nextLetterIndex < theText.length) {
        var nextLetter = theText[nextLetterIndex];
        var text = theText.substring(0, nextLetterIndex);
        element.text('> ' + text);
        var timeout = getRandomInt(1, 100);
        if (nextLetter === ' '){
            timeout += 100;
        }
        console.log(timeout);
        setTimeout(typeNextLetter, timeout, element, theText, ++nextLetterIndex);
    } else {
        element.text('> ' + theText);
        console.log("Done!");
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}