function createPlayer(number, mark) {
    return {number, mark}
};

const gameBoard = (() => {
    const gameBoard = document.getElementById("gameBoard");
    const player1 = createPlayer(1, "X");
    const player2 = createPlayer(2, "O");

    let currentPlayer = player1;

    const board = [" ", " ", " ", " ", " ", " ", " ", " ", " ",]

    for (let i =0; i< board.length; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("data-tile", i);
        gameBoard.appendChild(tile);
    };

    window.addEventListener("click", function(e){
        if(e.target.innerHTML) {
            return
        }   else {
            gameController.placeMark(e.target.getAttribute("data-tile"), currentPlayer.mark, board);
            e.target.innerHTML = currentPlayer.mark
            if (currentPlayer == player1) {
                currentPlayer = player2
            } else if (currentPlayer == player2) {
                currentPlayer = player1
            };
        };
        
    });
    return {board, currentPlayer}

})();

const gameController = (() =>{
    let turnsLeft = 9;

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

    function checkWinner() {
        turnsLeft -= 1;
        winConditions.forEach((item, index) =>{
            if(gameBoard.board[item[0]] === gameBoard.currentPlayer.mark &&
                gameBoard.board[item[1]] === gameBoard.currentPlayer.mark &&
                gameBoard.board[item[2]] === gameBoard.currentPlayer.mark) {
                    console.log(" The winner is Player " + gameBoard.currentPlayer.number);
                } else {
                    if (turnsLeft <=0) {
                        console.log("It is a draw, try again!");
                    }
                }
        })
    }

    function placeMark(index, mark, array) {
        array[index] = mark;
        checkWinner();
    };

    return {placeMark, checkWinner}
})();