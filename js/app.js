!function(){
    let currentPlayer = "",
        winPatterns = [],
        userName = "",
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

        // get user name
        const name=prompt("Please enter your name");
        if(name.trim() !== ""){
            userName = name;
        }

        // add start button listener
        startButton.addEventListener("click", startNewGame);

        // add finish button listener
        finishButton.addEventListener("click", startNewGame);

        // init square listener
        boxList.forEach(ele => {
            ele.addEventListener("mouseenter", e => {
                // empty square
                if(e.target.className === "box"){
                    // the user will always be player1 when play with computer so i fix this background image to o.svg
                    // e.target.style.backgroundImage = `url("img/${currentPlayer === "player1" ? "o":"x"}.svg")`;
                    e.target.style.backgroundImage = `url("img/o.svg")`;
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
            e.target.style.backgroundImage = "";
            if(e.target.className === "box" && currentPlayer === "player1"){
                newMove(e.target);
            }
        })
    }

    function newMove( box ){
        box.className += currentPlayer === "player1" ? " box-filled-1" : " box-filled-2";

        gameStatus = checkWin();
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
                }, 500);
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
        document.querySelector("#finish").className = "screen screen-win";
        boxList.forEach(ele => {
            ele.className = "box";
            ele.style.backgroundImage = "";
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
        // check if all squares are taken
        let full = true;
        for(let i = 0; i < boxList.length; i++) {
            if (boxList[i].className === "box") {
                full = false;
                break;
            }
        }

        // check if any winPattern is matched
        let win = winPatterns.some(pattern => {
            if(pattern[0].className === pattern[1].className && pattern[1].className === pattern[2].className && pattern[0].className != "box"){
                return true;
            }
        });

        // if all squares are taken then is a tie, otherwise player will continue play
        if(win){
            return "win";
        }else if(full){
            return "tie";
        } else {
            return "play";
        }
    }

    // computer move, pretty dull ai
    function computerMove(){
        // try to win
        // if there are 2 squares in a row
        for(let i = 0; i < winPatterns.length; i++) {
            const pattern = winPatterns[i];
            if(pattern[0].className.indexOf("box-filled-2") > 0 && pattern[1].className.indexOf("box-filled-2") > 0 && pattern[2].className === "box"){
                newMove(pattern[2]);
                return;
            } else if (pattern[1].className.indexOf("box-filled-2") > 0 && pattern[2].className.indexOf("box-filled-2") > 0 && pattern[0].className === "box"){
                newMove(pattern[0]);
                return;
            } else if(pattern[0].className.indexOf("box-filled-2") > 0 && pattern[2].className.indexOf("box-filled-2") > 0 && pattern[1].className === "box"){
                newMove(pattern[1]);
                return;
            }
        }

        // prevent player from winning
        for(let i = 0; i < winPatterns.length; i++) {
            const pattern = winPatterns[i];
            if(pattern[0].className.indexOf("box-filled-1") > 0 && pattern[1].className.indexOf("box-filled-1") > 0 && pattern[2].className === "box"){
                newMove(pattern[2]);
                return;
            } else if (pattern[1].className.indexOf("box-filled-1") > 0 && pattern[2].className.indexOf("box-filled-1") > 0 && pattern[0].className === "box"){
                newMove(pattern[0]);
                return;
            } else if(pattern[0].className.indexOf("box-filled-1") > 0 && pattern[2].className.indexOf("box-filled-1") > 0 && pattern[1].className === "box"){
                newMove(pattern[1]);
                return;
            }
        }


        // if there are 1 square in a row
        for(let i = 0; i < winPatterns.length; i++) {
            const pattern = winPatterns[i];
            if(pattern[0].className.indexOf("box-filled-2") > 0 && pattern[1].className === "box" && pattern[2].className === "box"){
                newMove(pattern[1]);
                return;
            } else if (pattern[1].className.indexOf("box-filled-2") > 0 && pattern[0].className === "box" && pattern[2].className === "box"){
                newMove(pattern[0]);
                return;
            } else if(pattern[2].className.indexOf("box-filled-2") > 0 && pattern[0].className === "box" && pattern[1].className === "box"){
                newMove(pattern[1]);
                return;
            }
        }


        // find a blank pattern
        for(let i = 0; i < winPatterns.length; i++) {
            const pattern = winPatterns[i];
            if(pattern[0].className === "box" && pattern[1].className === "box" && pattern[2].className === "box"){
                newMove(pattern[0]);
                return;
            }
        }


        // find next blank
        for(let i = 0; i < boxList.length; i++) {
            if (boxList[i].className === "box") {
                newMove(boxList[i]);
                return;
            }
        }
    }

    // export function
    window.tictoctoe = { initGame };
}();

document.addEventListener("DOMContentLoaded", e => {tictoctoe.initGame()});




