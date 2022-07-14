import { Button, Grid } from "@material-ui/core";
import { useState } from "react";
import Multiplayer from "../Multiplayer/Multiplayer";
import SinglePlayer from "../SinglePlayer/SinglePlayer";
import styles from "./Menu.module.scss";

export default function Menu() {
    const [mode, setMode] = useState(0);

    const setModeAgain = (mode) => {
        setMode(mode);
    };

    return (
        <div className={styles.root}>
            {mode === 1 && (
                <SinglePlayer setModeAgain={setModeAgain} mode={mode} />
            )}
            {mode === 2 && (
                <Multiplayer setModeAgain={setModeAgain} mode={mode} />
            )}

            {mode === 0 && (
                <div className={styles.container}>
                    <h1>tic tac toe</h1>
                    <Grid container spacing={1}>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            onClick={() => setMode(1)}
                            className={styles.btnContainer}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                className={styles.btn}
                            >
                                1 Player
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            onClick={() => setMode(2)}
                            className={styles.btnContainer}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                className={styles.btn}
                            >
                                2 Players
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
}
