import { Grid, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import styles from "./TicTacToe.module.scss";

export default function TicTacToe() {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [winner, setWinner] = useState(null);
    const [isCpuTurn, setIsCpuTurn] = useState(false);

    const handleTurn = (row, column) => {
        if (isCpuTurn) return;
        if (winner) return;
        if (!board[row][column]) {
            board[row][column] = player.HUMAN.sym;
            checkWin();
            setIsCpuTurn(true);
        }
    };

    const CpuPlay = () => {
        if (winner) return;
        const CpuMove = getCPUTurn();
        board[CpuMove.index1][CpuMove.index2] = player.CPU.sym;
        checkWin();
        setIsCpuTurn(false);
    };

    const getCPUTurn = () => {
        const emptyIndexes = [];
        board.forEach((row, index1) => {
            row.forEach((cell, index2) => {
                if (cell === "") {
                    emptyIndexes.push({ index1, index2 });
                }
            });
        });
        const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
        return emptyIndexes[randomIndex];
    };

    const checkWin = () => {
        // Check row
        for (let index = 0; index < board.length; index++) {
            const row = board[index];
            if (row.every((cell) => cell === player.CPU.sym)) {
                setWinner(player.CPU.name);
                return;
            } else if (row.every((cell) => cell === player.HUMAN.sym)) {
                setWinner(player.HUMAN.name);
                return;
            }
        }

        // Check Column
        for (let index = 0; index < board.length; index++) {
            const column = board.map((row) => row[index]);
            if (column.every((cell) => cell === player.CPU.sym)) {
                setWinner(player.CPU.name);
                return;
            } else if (column.every((cell) => cell === player.HUMAN.sym)) {
                setWinner(player.HUMAN.name);
                return;
            }
        }

        // Check diagonal
        const mainDiagonal = [board[0][0], board[1][1], board[2][2]];
        const subDiagonal = [board[2][0], board[1][1], board[0][2]];

        if (mainDiagonal.every((cell) => cell === player.HUMAN.sym)) {
            setWinner(player.HUMAN.name);
            return;
        } else if (mainDiagonal.every((cell) => cell === player.CPU.sym)) {
            setWinner(player.CPU.name);
            return;
        } else if (subDiagonal.every((cell) => cell === player.HUMAN.sym)) {
            setWinner(player.HUMAN.name);
            return;
        } else if (subDiagonal.every((cell) => cell === player.CPU.sym)) {
            setWinner(player.CPU.name);
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
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
        setWinner(null);
        setIsCpuTurn(false);
    };

    useEffect(() => {
        if (winner) return;
        if (isCpuTurn) {
            CpuPlay();
        }
    }, [isCpuTurn]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {winner && (
                    <div>
                        <h1>{winner}</h1>
                        <div onClick={playAgain}>
                            <Button variant="contained" color="secondary">
                                PLay Again
                            </Button>
                        </div>
                    </div>
                )}
                {!winner && (
                    <div>
                        <h1>Hi</h1>
                        <Grid container spacing={1}>
                            {board.map((array, index1) =>
                                array.map((symbol, index2) => (
                                    <Grid
                                        item
                                        key={index1 * array.length + index2}
                                        xs={4}
                                        className={styles.boardItem}
                                        onClick={() =>
                                            handleTurn(index1, index2)
                                        }
                                    >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={styles.symbolContainer}
                                        >
                                            <span className={styles.symbol}>
                                                {symbol}
                                            </span>
                                        </Button>
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </div>
                )}
            </div>
        </div>
    );
}

const player = {
    CPU: {
        sym: "O",
        name: "CPU",
    },
    HUMAN: {
        sym: "X",
        name: "You",
    },
};
