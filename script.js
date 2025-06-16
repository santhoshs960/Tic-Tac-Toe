function getInputData() {
    document.querySelector("#player-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const name1 = document.querySelector("#player1").value;
        const marker1 = document.querySelector("#marker1").value;

        const name2 = document.querySelector("#player2").value;
        const marker2 = document.querySelector("#marker2").value;

        if (marker1 === marker2) {
            alert("players must choose different markers");
            return;
        } 
        const { player1, player2 } = createPlayer(name1, marker1, name2, marker2);
        playGame(player1, player2);

    })
}
getInputData()


function createPlayer(name1,marker1,name2,marker2) {
    function player(name, marker) {
        let point = 0;
        const addPoint = () => point++;
        const showResult = () => point;
        return { name, marker, addPoint, showResult };
    }

    const player1 = player(name1,marker1);
    const player2 = player(name2,marker2);
    let player1Name = document.querySelector(".player1_name");
    let player2Name = document.querySelector(".player2_name");
    
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
    
    return { player1, player2 };

}

const gameBoard = (function() {
    const board = [];
    return { board };
})();

function playGame(player1, player2) {
    const { board } = gameBoard;

    const cells = document.querySelectorAll(".cell");
    let currentPlayer = player1.marker;
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (cell.textContent === "") {
                cell.textContent = currentPlayer;
                board[index] = cells[index].textContent;

                winning(board,player1,player2);
                currentPlayer = currentPlayer === player1.marker ? player2.marker : player1.marker;
            }
        })

    })
}

function winning(board, player1, player2) {
    let player1Point = document.querySelector(".player1_point");
    let player2Point = document.querySelector(".player2_point");

    const winpatterns = [
        [board[0], board[1], board[2]],
        [board[3], board[4], board[5]],
        [board[6], board[7], board[8]],
        [board[0], board[3], board[6]],
        [board[1], board[4], board[7]],
        [board[2], board[5], board[8]],
        [board[0], board[4], board[8]],
        [board[2], board[4], board[6]]
    ];

    for (let pattern of winpatterns) {
        if (pattern[0] && pattern[0] === pattern[1] && pattern[1] === pattern[2]) {
            if (pattern[0] === player1.marker) {
                player1.addPoint();
                player1Point.textContent = player1.showResult();
                setTimeout(() => {
                    alert(`Congratulations, you've won! ${player1.name}`);
                    resetBoard();
                }, 200);
                return;
            } else if (pattern[0] === player2.marker) {
                player2.addPoint();
                player2Point.textContent = player2.showResult();
                setTimeout(() => {
                    alert(`Congratulations, you've won! ${player2.name}`);
                    resetBoard();
                }, 200);
                return;
            }
        }
    }

    if (board.filter(cell => cell === player1.marker || cell === player2.marker).length === 9){
        setTimeout(() => {
            alert("It's a tie!");
            resetBoard();
        }, 200);
    }
}

function resetBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = "";
        gameBoard.board[index] = "";
    });
}