let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  // Check for the winner after each round
  if (userScore === 10) {
    msg.innerText = "Congratulations! You are the winner!";
    msg.style.backgroundColor = "green";
    disableChoices();
  } else if (compScore === 10) {
    msg.innerText = "Sorry, you lost the game. Better luck next time!";
    msg.style.backgroundColor = "#9b0a0a";
    disableChoices();
  }
};

const playGame = (userChoice) => {
  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // Scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // Rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // Rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const disableChoices = () => {
  // Disable click event for choices after a player reaches 10 points
  choices.forEach((choice) => {
    choice.removeEventListener("click", handleChoiceClick);
  });
};

const handleChoiceClick = (event) => {
  const userChoice = event.currentTarget.getAttribute("id");
  playGame(userChoice);
};

choices.forEach((choice) => {
  choice.addEventListener("click", handleChoiceClick);
});
