const wordDisplay = document.getElementById("wordDisplay");
const inputField = document.getElementById("inputField");
const status = document.getElementById("status");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const highestScoreElement = document.getElementById("highestScore");

const words = ["사랑", "행복", "기쁨", "웃음", "미소"];
let currentWord = "";
let score = 0;
let timeLeft = 60;
let timer;

function startGame() {
    generateWord();
    score = 0;
    scoreElement.textContent = `점수: ${score}`;
    highestScoreElement.textContent = `최고 기록: ${localStorage.getItem("highestScore") || 0}`;
    timer = setInterval(updateTimer, 1000);
    inputField.addEventListener("input", checkInput);
}

function generateWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = currentWord;
}

function checkInput() {
    if (inputField.value === currentWord) {
        score++;
        scoreElement.textContent = `점수: ${score}`;
        inputField.value = "";
        generateWord();
    }
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `남은 시간: ${timeLeft}초`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        checkHighestScore();
        status.textContent = "시간 종료! 게임이 끝났습니다.";
    }
}

function checkHighestScore() {
    const highestScore = localStorage.getItem("highestScore") || 0;
    if (score > highestScore) {
        localStorage.setItem("highestScore", score);
        highestScoreElement.textContent = `최고 기록: ${score}`;
    }
}

// 로그인/회원가입
function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("회원가입 성공!");
    } else {
        alert("아이디와 비밀번호를 입력하세요.");
    }
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
        alert("로그인 성공!");
        document.querySelector(".auth-container").style.display = "none";
        document.querySelector(".game-container").style.display = "block";
        startGame();
    } else {
        alert("아이디나 비밀번호가 잘못되었습니다.");
    }
}