let level = 1;
let currentQuestion;
let correctAnswers = 0;
let timer;
let timeLeft = 60;
const answersNeeded = 15;
const levelScores = {}; // Object to store correct answers per level

function startTest() {
    correctAnswers = 0;
    level = 1;
    levelScores[level] = 0;
    document.getElementById('resultArea').style.display = 'none';
    document.getElementById('testArea').style.display = 'block';
    document.getElementById('level').textContent = level;
    startTimer(60); // Start with 60 seconds
    generateQuestion();
}

function startTimer(duration) {
    timeLeft = duration;
    document.getElementById('timeLeft').textContent = timeLeft;
    clearInterval(timer); // Clear any existing timer
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
    let resultMessage = '';
    for (let lvl in levelScores) {
        resultMessage += `Level ${lvl}: ${levelScores[lvl]} correct answers\n`;
    }
    document.getElementById('resultMessage').textContent = resultMessage;
}

function generateQuestion() {
    let num1, num2;

    // Difficulty adjustment for levels 1-20
    if (level <= 20) {
        if (level === 1) {
            num1 = Math.floor(Math.random() * 10); // 0 to 9
            num2 = Math.floor(Math.random() * 10); // 0 to 9
        } else if (level === 2) {
            num1 = Math.floor(Math.random() * 20); // 0 to 19
            num2 = Math.floor(Math.random() * 10); // 0 to 9
        } else if (level <= 5) {
            num1 = Math.floor(Math.random() * 20); // 0 to 19
            num2 = Math.floor(Math.random() * 20); // 0 to 19
        } else if (level <= 10) {
            num1 = Math.floor(Math.random() * 50); // 0 to 49
            num2 = Math.floor(Math.random() * 20); // 0 to 19
        } else if (level <= 15) {
            num1 = Math.floor(Math.random() * 50); // 0 to 49
            num2 = Math.floor(Math.random() * 50); // 0 to 49
        } else {
            num1 = Math.floor(Math.random() * 100); // 0 to 99
            num2 = Math.floor(Math.random() * 50); // 0 to 49
        }
    } else if (level <= 30) {
        num1 = Math.floor(Math.random() * 200); // 0 to 199
        num2 = Math.floor(Math.random() * 100); // 0 to 99
    } else if (level <= 40) {
        num1 = Math.floor(Math.random() * 500); // 0 to 499
        num2 = Math.floor(Math.random() * 200); // 0 to 199
    } else if (level <= 50) {
        num1 = Math.floor(Math.random() * 1000); // 0 to 999
        num2 = Math.floor(Math.random() * 500); // 0 to 499
    }

    currentQuestion = num1 * num2;
    document.getElementById('question').textContent = `What is ${num1} x ${num2}?`;
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answerInput').value, 10);
    if (userAnswer === currentQuestion) {
        correctAnswers++;
        levelScores[level] = (levelScores[level] || 0) + 1; // Update the score for the current level
        document.getElementById('feedback').textContent = 'Correct!';
        if (correctAnswers >= answersNeeded) {
            level++;
            correctAnswers = 0;
            levelScores[level] = 0; // Initialize score for the new level
            if (level > 50) {
                endTest();
            } else {
                startTimer(60); // Add another minute (60 seconds) when advancing to the next level
                generateQuestion();
                document.getElementById('level').textContent = level; // Update level display
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