function createPlayer(number, mark) {
    return {number, mark}
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

    window.addEventListener("click", function(e){
        let mark = gameController.updateCurrentPlayerMark();
        let number = gameController.updateCurrentPlayerNumber();
        if(e.target.innerHTML) {
            return
        }   else {
            gameController.placeMark(e.target.getAttribute("data-tile"), mark, board, mark, number);
            e.target.innerHTML = mark
        };
        
    });

    function updateInfo(info) {
        infoScreen.innerHTML=(info)
    }
    return {board, updateInfo}

})();

const gameController = (() =>{
    let turnsLeft = 9;
    const player1 = createPlayer(1, "X");
    const player2 = createPlayer(2, "O");
    let currentPlayer = player1;

    function updateCurrentPlayerMark() {
        return currentPlayer.mark
    }

    function updateCurrentPlayerNumber() {
        return currentPlayer.number
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

    function checkWinner(currentPlayerMark, currentPlayerNumber) {
        turnsLeft -= 1;
        winConditions.forEach((item, index) =>{
            if(gameBoard.board[item[0]] === currentPlayerMark &&
                gameBoard.board[item[1]] === currentPlayerMark &&
                gameBoard.board[item[2]] === currentPlayerMark) {
                    console.log("Congratulations! The winner is Player " + currentPlayerNumber);
                    gameBoard.updateInfo("Congratulations! The winner is Player " + currentPlayerNumber)
                } 

        })
        if (turnsLeft <=0) {
            console.log("It is a draw, try again!");
            gameBoard.updateInfo("It is a draw, try again!")
        }
        else if (turnsLeft > 0) {
            if (currentPlayer == player1) {
                currentPlayer = player2
               // console.log(currentPlayer)
            } else if (currentPlayer == player2) {
                currentPlayer = player1
                //console.log(currentPlayer)
            };
        }
    }

    function placeMark(index, mark, array, currentPlayerMark, currentPlayerNumber) {
        array[index] = mark;
        checkWinner(currentPlayerMark, currentPlayerNumber);
    };

    return {placeMark, checkWinner, updateCurrentPlayerMark, updateCurrentPlayerNumber}
})();