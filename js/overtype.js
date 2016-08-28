function overType(element) {
    var text = element.text();
    flashCaret(element, text, 2, 0);
}

function flashCaret(element, text, count, current) {
    element.html('> _<span class="white-out">' + text + '</span>')
    setTimeout(function(){
        element.html('> <span class="white-out">_' + text + '</span>')
        current++;
        if (current > count) {
            typeNextLetter(element, text, 0);
        } else {
            setTimeout(flashCaret, 250, element, text, count, current);
        }
    }, 250);
};

function typeNextLetter(element, text, nextLetterIndex) {
    if (nextLetterIndex < text.length) {

        var pretext = text.substring(0, nextLetterIndex);
        var posttext = text.substring(nextLetterIndex);
        var html = '> ' + pretext + '<span class="white-out">' + posttext + '</span>';
        
        element.html(html);

        var nextLetter = text[nextLetterIndex];
        var timeout = getRandomInt(1, 100);
        if (nextLetter === ' '){
            timeout += 100;
        }
        setTimeout(typeNextLetter, timeout, element, text, ++nextLetterIndex);
    } else {
        element.text('> ' + text);
        console.log("Done!");
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}