const startButton = document.getElementById("submit");
const gameBoard = document.querySelector(".game");
const gameDetails = document.querySelector(".details");
const gameMessage = document.querySelector(".message");

let player1Name = "";
let player2Name = "";
let isPlaying = true;
let activePlayer = 0;

function displayMessage(msg) {
  gameMessage.innerHTML = `<h3>${msg}</h3>`;
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function initializeGame() {
  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;

  activePlayer = 0;

  gameDetails.style.display = "none";
  gameBoard.style.display = "flex";

  displayMessage(`${player1Name}, you're up`);

  for (let i = 1; i <= 9; i++) {
    const slot = document.createElement("div");

    slot.id = i;
    slot.classList.add("game-slot");

    slot.addEventListener("click", function () {

      if(!slot.innerText && isPlaying){
        slot.innerText = activePlayer === 0 ? "x" : "o";
        const winner = checkWinner()

        if(!winner){
          switchPlayer();
          displayMessage(`${activePlayer === 0 ? player1Name : player2Name}, you're up`);
        }else{
          displayMessage(`${activePlayer===0 ? player1Name : player2Name} congratulations you won!.`);
        }
      }
    });

    gameBoard.appendChild(slot);
  }
}

const winningSequences = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner(){
    let hasWinner = false;

    for(let i=0;i<winningSequences.length;i++){
      const winningCombo = winningSequences[i];

      const cell1 = document.getElementById(winningCombo[0]+1);
      const cell2 = document.getElementById(winningCombo[1]+1);
      const cell3 = document.getElementById(winningCombo[2]+1);

      const val1 = cell1.innerText;
      const val2 = cell2.innerText;
      const val3 = cell3.innerText;

      if(val1===val2 && val2===val3 && val1!=''){
        hasWinner = true;
        isPlaying = false;
        cell1.style.backgroundColor="purple";
        cell2.style.backgroundColor="purple";
        cell3.style.backgroundColor="purple";
        break;
      }
    }
    return hasWinner;
}

startButton.addEventListener("click", initializeGame);