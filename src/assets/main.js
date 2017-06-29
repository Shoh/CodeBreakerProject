let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        return false;
    }
    attempt.value++;

    let isWinner = getResults(input.value);
    if (isWinner) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

//implement new functions here
function setHiddenFields() {
    let num = Math.floor(Math.random() * 10000);
    attempt.value = 0;
    while (num.toString().length < 4) {
        num = '0' + num;
    }
    answer.value = num;
}

function setMessage(msg) {
    let label = document.getElementById('message');
    label.innerHTML = msg;
}

function validateInput(str) {
    if (str.toString().length === 4) return true;
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
}

function getResults(input) {
    if (!input) return false;
    let result = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    let correct = 0;
    for (let i  = 0, len = input.length; i < len; i++) {
        if (answer.value[i] === input.charAt(i)) {
            result += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.value.indexOf(input.charAt(i)) !== -1) {
            result += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            result += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    result += '</div></div>';
    document.getElementById('results').innerHTML += result;
    return input === answer.value;
}

function showAnswer(isWinner) {
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (isWinner) {
        code.className += ' success';
    } else {
        code.classList += ' failure';
    }
}

function showReplay() {
    let guessing = document.getElementById('guessing-div');
    let replay = document.getElementById('replay-div');
    if (guessing) guessing.style.display = 'none';
    if (replay) replay.style.display = 'block';
}
