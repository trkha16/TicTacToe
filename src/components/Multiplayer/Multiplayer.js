import { useState } from "react";
import GamePlay from "../GamePlay/GamePlay";

export default function Multiplayers({ setModeAgain, mode }) {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [winner, setWinner] = useState(null);
    const [isP2Turn, setIsP2Turn] = useState(false);

    const handleTurn = (row, column) => {
        if (winner) return;
        if (!board[row][column]) {
            board[row][column] = isP2Turn ? players.P2.sym : players.P1.sym;
            checkWin();
            setIsP2Turn(!isP2Turn);
        }
    };

    const checkWin = () => {
        // Check row
        for (let index = 0; index < board.length; index++) {
            const row = board[index];
            if (row.every((cell) => cell === players.P1.sym)) {
                setWinner(players.P1.name);
                return;
            } else if (row.every((cell) => cell === players.P2.sym)) {
                setWinner(players.P2.name);
                return;
            }
        }

        // Check Column
        for (let index = 0; index < board.length; index++) {
            const column = board.map((row) => row[index]);
            if (column.every((cell) => cell === players.P1.sym)) {
                setWinner(players.P1.name);
                return;
            } else if (column.every((cell) => cell === players.P2.sym)) {
                setWinner(players.P2.name);
                return;
            }
        }

        // Check diagonal
        const mainDiagonal = [board[0][0], board[1][1], board[2][2]];
        const subDiagonal = [board[2][0], board[1][1], board[0][2]];

        if (mainDiagonal.every((cell) => cell === players.P2.sym)) {
            setWinner(players.P2.name);
            return;
        } else if (mainDiagonal.every((cell) => cell === players.P1.sym)) {
            setWinner(players.P1.name);
            return;
        } else if (subDiagonal.every((cell) => cell === players.P2.sym)) {
            setWinner(players.P2.name);
            return;
        } else if (subDiagonal.every((cell) => cell === players.P1.sym)) {
            setWinner(players.P1.name);
            return;
        } else if (board.flat().every((cell) => cell !== "")) {
            setWinner("DRAW");
            return;
        } else {
            setWinner(null);
            return;
        }
    };

    const playAgain = () => {
        setModeAgain(0);
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
        setWinner(null);
        setIsP2Turn(false);
    };

    const isPlaying = () => {
        if (!isP2Turn) return "P1 Turn";
        else return "P2 Turn";
    };

    return (
        <div>
            <GamePlay
                winner={winner}
                playAgain={playAgain}
                handleTurn={handleTurn}
                board={board}
                mode={mode}
                isPlaying={isPlaying}
            />
        </div>
    );
}

const players = {
    P1: {
        sym: "O",
        name: "P1",
    },
    P2: {
        sym: "X",
        name: "P2",
    },
};
