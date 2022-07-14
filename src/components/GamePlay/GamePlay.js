import { Grid, Button } from "@material-ui/core";
import PlayAgain from "../PlayAgain/PlayAgain";
import styles from "./GamePlay.module.scss";

function GamePlay({ winner, playAgain, handleTurn, board, isPlaying }) {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {isPlaying && !winner && <h3>{isPlaying()}</h3>}
                {winner && <PlayAgain winner={winner} playAgain={playAgain} />}
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

export default GamePlay;
