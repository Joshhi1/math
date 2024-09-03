let level = 1;
let currentQuestion;
let correctAnswers = 0;
let timer;
let timeLeft = 60;

function startTest() {
    correctAnswers = 0;
    level = 1;
    document.getElementById('resultArea').style.display = 'none';
    document.getElementById('testArea').style.display = 'block';
    startTimer();
    generateQuestion();
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('timeLeft').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

function endTest() {
    document.getElementById('testArea').style.display = 'none';
    document.getElementById('resultArea').style.display = 'block';
    document.getElementById('resultMessage').textContent = `You answered ${correctAnswers} questions correctly out of 15 in level ${level - 1}.`;
}

function generateQuestion() {
    let num1, num2;
    switch(level) {
        case 1:
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            break;
        case 2:
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 90) + 10;
            break;
        default:
            num1 = Math.floor(Math.random() * 100);
            num2 = Math.floor(Math.random() * 100);
    }
    currentQuestion = num1 * num2;
    document.getElementById('question').textContent = `What is ${num1} x ${num2}?`;
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answerInput').value, 10);
    if (userAnswer === currentQuestion) {
        correctAnswers++;
        document.getElementById('feedback').textContent = 'Correct!';
        if (correctAnswers >= 15) {
            level++;
            correctAnswers = 0;
            if (level > 50) {
                endTest();
            } else {
                generateQuestion();
            }
        } else {
            generateQuestion();
        }
    } else {
        document.getElementById('feedback').textContent = 'Incorrect. Try again!';
    }
    document.getElementById('answerInput').value = '';
}

function restartTest() {
    startTest();
}

// Initialize the test
startTest();