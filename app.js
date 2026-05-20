let userScore = 0;
let compScore = 0;
let round = 1;
let streak = 0;

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const compMove = document.querySelector("#comp-move");

const roundPara = document.querySelector("#round");
const streakPara = document.querySelector("#streak");

const historyList = document.querySelector("#history-list");

const resetBtn = document.querySelector("#reset-btn");

/* COMPUTER CHOICE */

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];

  const randomIdx = Math.floor(Math.random() * 3);

  return options[randomIdx];
};

/* EMOJI */

const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

/* DRAW */

const drawGame = () => {
  msg.innerText = "🤝 Game Draw!";
  msg.style.backgroundColor = "#334155";

  streak = 0;
  streakPara.innerText = streak;
};

/* SHOW WINNER */

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;

    streak++;

    userScorePara.innerText = userScore;

    msg.innerText = `🎉 You Win! ${userChoice} beats ${compChoice}`;

    msg.style.backgroundColor = "green";
  } else {
    compScore++;

    streak = 0;

    compScorePara.innerText = compScore;

    msg.innerText = `😢 You Lost! ${compChoice} beats ${userChoice}`;

    msg.style.backgroundColor = "red";
  }

  streakPara.innerText = streak;

  /* HISTORY */

  const li = document.createElement("li");

  li.innerText = `You: ${userChoice} | Computer: ${compChoice}`;

  historyList.prepend(li);
};

/* PLAY GAME */

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  compMove.innerText = emojiMap[compChoice];

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }

  round++;

  roundPara.innerText = round;
};

/* CLICK EVENTS */

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");

    playGame(userChoice);
  });
});

/* RESET */

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  round = 1;
  streak = 0;

  userScorePara.innerText = 0;
  compScorePara.innerText = 0;

  roundPara.innerText = 1;
  streakPara.innerText = 0;

  compMove.innerText = "❔";

  msg.innerText = "Play your move";

  historyList.innerHTML = "";
});