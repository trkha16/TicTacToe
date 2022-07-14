import { Button } from "@material-ui/core";

function PlayAgain({ winner, playAgain }) {
    return (
        <div>
            <h1>{winner}</h1>
            <div onClick={playAgain}>
                <Button variant="contained" color="secondary">
                    PLay Again
                </Button>
            </div>
        </div>
    );
}

export default PlayAgain;
