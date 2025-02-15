let randomNumber = Math.floor(100 + Math.random() * 900);
console.log("Secret Number:", randomNumber); // Debugging

const timeElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
const userGuess = document.getElementById("userGuess");
const cancelButton = document.getElementById("cancelButton");

let timeLeft = 30;
let timeInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    timeLeft--;
    timeElement.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 5) {
        timeElement.style.color = "red";
    }

    if (timeLeft === 0) {
        clearInterval(timeInterval);
        resultElement.innerText = "⏳ Time is up!";
        userGuess.disabled = true;

        cancelButton.style.display = "block";
        cancelButton.style.background="red"
        cancelButton.style.color="white"

        fetch('/shutdown')
        .then(response => response.text())
        .then(data => console.log(data));
    }
}

function checkGuess() {
    let guessedNumber = userGuess.value;

    if (guessedNumber.length !== 3 || isNaN(guessedNumber)) {
        resultElement.innerText = "⚠️ Enter a valid 3-digit number!";
        return;
    }

    let correctDigit = 0;
    let secretDigits = randomNumber.toString().split("");
    let guessedDigits = guessedNumber.split("");

    for (let i = 0; i < 3; i++) {
        if (secretDigits[i] === guessedDigits[i]) {
            correctDigit++;
        }
    }

    if (correctDigit === 3) {
        clearInterval(timeInterval);
        resultElement.innerText = "🎉 Congratulations! You guessed it!";
        userGuess.disabled = true;
    } else {
        resultElement.innerText = `You got ${correctDigit} digit(s) correct. Try again!`;
    }
}

function cancelShutdown() {
    fetch('/cancel-shutdown')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            resultElement.innerText = "🚫 Shutdown Canceled!";
            resultElement.style.animation = " ";
            cancelButton.style.display = "none"; // Hide the button after canceling
        });
}