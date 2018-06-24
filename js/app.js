!function(){
    let currentPlayer = "",
        winPatterns = [],
        userName = "Guangyu",
        gameStatus = "";
    const boxes = document.querySelector(".boxes");
          boxList = document.querySelectorAll(".boxes li"),
          board = document.querySelector("#board"),
          newGameDiv = document.querySelector("#start"),
          finishGameDiv = document.querySelector("#finish");


    function initGame(){
        const startButton = document.querySelector("#start a"),
              finishButton = document.querySelector("#finish a");

        /* init winning patterns
           image the board like
           | 0 | 1 | 2 |
           | 3 | 4 | 5 |
           | 6 | 7 | 8 |
           there are 8 patterns to win in this game
           I put all these patterns into a array for:
                1. check if someone is winning
                2. computer can pick from these patterns for winning (
         */
        winPatterns = [ [boxList[1], boxList[4], boxList[7]],
                        [boxList[3], boxList[4], boxList[5]],
                        [boxList[0], boxList[4], boxList[8]],
                        [boxList[2], boxList[4], boxList[6]],
                        [boxList[0], boxList[1], boxList[2]],
                        [boxList[6], boxList[7], boxList[8]],
                        [boxList[0], boxList[3], boxList[6]],
                        [boxList[2], boxList[5], boxList[8]]];

        // display new game div
        newGameDiv.hidden = false;

        // add start button listener
        startButton.addEventListener("click", startNewGame);

        // add finish button listener
        finishButton.addEventListener("click", startNewGame);

        // init square listener
        boxList.forEach(ele => {
            ele.addEventListener("mouseenter", e => {
                // empty square
                if(e.target.className === "box"){
                    e.target.style.backgroundImage = `url("img/${currentPlayer === "player1" ? "o":"x"}.svg")`;
                }
            });
            ele.addEventListener("mouseleave", e => {
                // empty square
                if(e.target.className === "box"){
                    e.target.style.backgroundImage = "";
                }
            });
        });

        // init board listener
        boxes.addEventListener("click", e => {
            if(e.target.className === "box"){
                newMove(e.target);
            }
        })
    }

    function newMove( box ){
        box.className += currentPlayer === "player1" ? " box-filled-1" : " box-filled-2";

        checkWin();
        if(gameStatus !== "play"){
            gameFinish();
        } else {
            // no one win, change player
            document.querySelector(`#${currentPlayer}`).className = "players";
            currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
            document.querySelector(`#${currentPlayer}`).className = "players active";
            // if it's computer's turn, set time out for 1s and take the move
            if(currentPlayer === "player2"){
                setTimeout(() => {
                    computerMove();
                }, 1000);
            }
        }
    }

    function startNewGame(){
        resetGame();
        board.hidden = false;
        newGameDiv.hidden = true;
        finishGameDiv.hidden = true;
    }

    // reset game board
    function resetGame() {
        currentPlayer = "player1";
        gameStatus = "play";
        document.querySelector("#player1").className = "players active";
        boxList.forEach(ele => {
            ele.className = "box";
            ele.style.backgroundImage = ""
        });
    }

    // finish the game and show the result page
    function gameFinish(){
        if(gameStatus === "tie"){
            document.querySelector("#finish").className += " screen-win-tie";
            document.querySelector(".message").textContent = "Tie"
        } else if(gameStatus === "win"){
            document.querySelector("#finish").className += ` screen-win-${currentPlayer === "player1" ? "one":"two"}`;
            document.querySelector(".message").textContent = `Winner: ${currentPlayer === "player1" ? (userName === "" ? "player1" : userName ):"Computer"}`

        }

        board.hidden = true;
        finishGameDiv.hidden = false;
    }


    // check if anyplayer is win
    function checkWin(){
        // todo
    }

    // computer move
    function computerMove(){
        // todo

        // prevent player from winning

        // try to win
        // winning point
        // pick a pattern
    }

    // export function
    window.tictoctoe = { initGame };
}();

document.addEventListener("DOMContentLoaded", e => {tictoctoe.initGame()});




