import CorrectColour from "../shared/CorrectColour";
import Title from "../shared/Title";

type Props = {
    targetColour: { name: string, value: string }
    targetColourRGB: { r: string, g: string, b: string }
    gameMode: string
    setGameMode: () => void
    resetGame: () => void
}

export default function LoseScreen({ targetColour, targetColourRGB, gameMode, setGameMode, resetGame }: Props) {

    return (
        <div className="page-content">
            <Title gameMode={gameMode} setGameMode={setGameMode} />
            <p>You ran out of guesses.</p>
            <p>The correct colour for "{targetColour.name}" was:</p>
            <CorrectColour targetColour={targetColour} targetColourRGB={targetColourRGB} />
            { gameMode === "random" ? (
                <button onClick={resetGame}>Play Again</button>
            ) : (
                <button onClick={() => { setGameMode("random"); resetGame(); }}>
                    Play Random Mode
                </button>
            )}
        </div>
    )
}