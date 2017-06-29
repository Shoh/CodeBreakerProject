let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' && attempt.value === '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        return false;
    }
    attempt.value++;

    let isWinner = getResults(input);
    if (isWinner) {
        setMessage('You Win! :)');
        showAnswer(isWinner);
        showReplay();
    } else if (!isWinner && attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(isWinner);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

//implement new functions here
function setHiddenFields() {
    let num = Math.floor(Math.random() * 9999);
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
    let result = '<div class="row"><span class="col-md-6">' + input.value + '</span><div class="col-md-6">';
    let chars = input.value.split('');
    let correct = 0;
    for (let i  = 0, len = chars.length; i < len; i++) {
        if (answer.value[i] === chars[i]) {
            result += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.value.indexOf(chars[i]) !== -1) {
            result += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            result += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    result += '</div>';
    document.getElementById('results').innerHTML = result;
    return correct === answer.value.length;
}

function showAnswer(isWinner) {
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (isWinner) {
        code.classList.add('success');
    } else {
        code.classList.add('failure');
    }
}

function showReplay() {
    let guessing = document.getElementById('guessing-div');
    let replay = document.getElementById('replay-div');
    if (guessing) guessing.style.display = 'none';
    if (replay) replay.style.display = 'block';
}
