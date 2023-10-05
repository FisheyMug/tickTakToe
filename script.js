function createPlayer(number, mark, isHuman) {
    return {number, mark, isHuman}
};

const gameBoard = (() => {
    const gameBoard = document.getElementById("gameBoard");

    const infoScreen = document.getElementById("info");

    const board = [" ", " ", " ", " ", " ", " ", " ", " ", " ",]

    for (let i =0; i< board.length; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("data-tile", i);
        gameBoard.appendChild(tile);
    };

    function updateUI () {
        let tiles = document.getElementsByClassName("tile")
        for (let j=0; j< board.length; j++) {
            console.log(board[j])
            for (let i = 0; i< tiles.length; i++) {
                if (board[j] != " " && tiles[i].getAttribute("data-tile") ==j) {
                    tiles[i].classList.add(board[j])
                    tiles[i].innerHTML = (board[j]);
                }
                
            }
        }
    }

    window.addEventListener("click", function(e){
        let isGameOver = gameController.updateGameState().gameOver;
        if(e.target.innerHTML) {
            return
        }   else if(!isGameOver){
            gameController.placeMark(e.target.getAttribute("data-tile"), board);
            updateUI()
        } 
        
    });

    function updateInfo(info) {
        infoScreen.innerHTML=(info)
    }
    return {board, updateInfo, updateUI}

})();

const gameController = (() =>{
    let turnsLeft = 9;
    let gameOver = true;
    let player1 = createPlayer(1, "X", true);
    let player2 = createPlayer(2, "O", true);
    
    const selectBtn = document.getElementById("select");
    selectBtn.addEventListener("click", function(){
        gameOver = false;
        //console.log(gameOver)
        let view = document.getElementById("playerSelection")
        let isHuman = document.getElementById("player").value
        if (isHuman === "human") {
            player2.isHuman = true
            //console.log(player2.isHuman)
            view.setAttribute("hidden", "hidden");
            return player2
        } else if (isHuman === "computer") {
            player2.isHuman = false
            //player2.name = "Computer"
            console.log(player2)
            view.setAttribute("hidden", "hidden");
            return player2
        } 
    })
    
    let currentPlayer = player1;

    function updateGameState(){
        return {currentPlayer, gameOver}
    }

    const winConditions = [
        [0,1,2], //horizontal
        [3,4,5],
        [6,7,8],
        [0,3,6], //vertical
        [1,4,7],
        [2,5,8],
        [0,4,8], //diagonal
        [2,4,6]
    ];

    function checkWinner(player) {
        turnsLeft -= 1;
        winConditions.forEach((item, index) =>{
            if(gameBoard.board[item[0]] === player.mark &&
                gameBoard.board[item[1]] === player.mark &&
                gameBoard.board[item[2]] === player.mark) {
                    console.log("Congratulations! The winner is Player " + player.number);
                    gameBoard.updateInfo("Congratulations! The winner is Player " + player.number)
                gameOver = true;
                } 

        })
        if (turnsLeft <=0 && !gameOver) {
            console.log("It is a draw, try again!");
            gameBoard.updateInfo("It is a draw, try again!")
        }
        else if (turnsLeft > 0) {
            if (currentPlayer == player1) {
                currentPlayer = player2
               //console.log(currentPlayer)
            } else if (currentPlayer == player2) {
                currentPlayer = player1
                console.log(currentPlayer)
            };
            //if (currentPlayer.is)
        }
    }

    function compPlaceMark(array) {
        index = Math.floor(Math.random()*(8-0)+0);
        while (array[index]== "X" || array[index]== "O") {
            index = Math.floor(Math.random()*(8-0)+0);
        }
        array[index] = currentPlayer.mark;
    }

    function placeMark(index, array) {
        if (!gameOver) {
            array[index] = currentPlayer.mark;
            checkWinner(currentPlayer);
            console.log(currentPlayer)
            if (currentPlayer.isHuman === false && !gameOver) {
            compPlaceMark(array);
            checkWinner(currentPlayer);
            }
        }
        
        console.log(array)
    };

    return {placeMark, updateGameState, compPlaceMark}
})();