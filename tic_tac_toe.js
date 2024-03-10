  /* Factory function example 
  instead of creating an object per player using new() you can utilize return*/
  function createPlayer(player, marker, score) {
    return {
      player: player,
      marker: marker,
      score: score
    }
   }
   //initialize board and player scores at page start/refresh
   let gameBoard = ["", "", "", "", "", "", "", "", ""];
   let player1 = createPlayer('p1', 'X', 0);
   let player2 = createPlayer('p2', 'O', 0);
   let winner = "";
   let roundOver = false; //to know when to start a round after a player wins
   let turn = 1; //if you want to turn-based/turn-like behavior always use digit instead of re-initializing string
 
   //get html elements needed
   const gameTiles = document.querySelectorAll(".board-floor");
   const playGame = document.getElementById("play-game");
   const resetGame = document.getElementById("reset");
   const roundResult = document.getElementById("round-result");
   const p1Score = document.getElementById("p1-score");
   const p2Score = document.getElementById("p2-score");
 
   //clear gameboard but not the score
   function clear() {
     gameBoard = ["", "", "", "", "", "", "", "", ""]; //no need to use 'let' when re-initializing
     turn = 1;
     roundOver = false;
     roundResult.textContent = "Please enjoy the game!";
     gameTiles.forEach(function(gameTile, index) {
       gameTile.textContent = "";
     });
   }
 
  //apply marker depending on the player in turn
   gameTiles.forEach(function(gameTile, index) {
    gameTile.addEventListener("click", function() {
      if ((roundOver === false) && (event.target.textContent === "")) {
        if (turn % 2 != 0) {
          console.log("This is player 1");
          event.target.textContent = player1.marker;
          gameBoard[index] = player1.marker;
          //console.log(gameBoard);
        } else {
          console.log("This is player 2");
          event.target.textContent = player2.marker;
          gameBoard[index] = player2.marker;
          //console.log(gameBoard);
        }
        turn++;
        check(gameBoard);
      }
    });
   });
  //winning conditions
  function check(gameboard) { //can go back to these method on utilizing list in a list
    const winConditions = [
      //rows
      [0,1,2],
      [3,4,5],
      [6,7,8],
      //columns
      [0,3,6],
      [1,4,7],
      [2,5,8],
      //diagonal
      [0,4,8],
      [2,4,6]
    ];
   for(let i=0; i<winConditions.length; i++) {
     if ((gameBoard[winConditions[i][0]] == 'X') && (gameBoard[winConditions[i][1]] == 'X') && (gameBoard[winConditions[i][2]] == 'X')) {
       player1.score++;
       p1Score.textContent = `Player 1  [X]: ${player1.score}`;
       roundOver = true;
       roundResult.textContent = "Player 1 wins the round!";
       console.log(player1.score);
     } else if ((gameBoard[winConditions[i][0]] == 'O') && (gameBoard[winConditions[i][1]] == 'O') && (gameBoard[winConditions[i][2]] == 'O')) {
       player2.score++;
       p2Score.textContent = `Player 2  [O]: ${player2.score}`;
       roundOver = true;
       roundResult.textContent = "Player 2 wins the round!";
       console.log(player2.score);
     } else if (roundOver === false && (gameBoard.every(tiles => tiles !== ""))) {
         //<list_name>.every(<declared var_name for element being processed> => <declared var_name for element being processed> (comparator) <value>)
             roundResult.textContent = "DRAW, no one wins the round!";
     }
   }
   if(roundOver === true) {
     console.log("Round is over");
   }
  }
  //clear board upon click of "Play Again"
  playGame.addEventListener("click", clear);
 
  //clear the board and resets the score of both players
  resetGame.addEventListener("click", function(){
   player1.score = 0;
   player2.score = 0;
   p1Score.textContent = `Player 1  [X]: ${player1.score}`;
   p2Score.textContent = `Player 2  [O]: ${player2.score}`;
   clear
  });