const wordDisplay = document.getElementById("wordDisplay");
const inputField = document.getElementById("inputField");
const status = document.getElementById("status");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const highestScoreElement = document.getElementById("highestScore");

const words = ["에드거의 목도리", "타라의 붕대","진의 그랩","모티스의 삽","맨디의 캔디", "팽의 신발","엠즈의 스프레이","키트의 종이상자","더그의 핫도그","행크의 세우껍질","쉘리의 더블배럴","콜트의 리볼버","스파이크의 선인장","레온의 사탕","크로우의 단검","거스의 풍선","로사의 글로브","루미의 철퇴","핑크스의 시간은 느리게간다","뉴보잘생김","비의 독침","루의 아이스크림","게일의 게이","스퀴크의 침","러프스의 털뭉치","대릴의 대굴대굴","제시의 터렛","페니의 포탑","니타의 곰","메이지의 지진","찰리의 고치","코델리우스의 버섯","펄의 쿠키","보의 활","버즈의 호루라기","리코의 통통탄"];
let currentWord = "";
let score = 0;
let timeLeft = 30;
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
    timerElement.textContent = `남은 시간: ${timeLeft}`;

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