import Confetti from 'react-confetti';
import CorrectColour from '../shared/CorrectColour';
import Title from '../shared/Title';

type Props = {
    targetColour: Colour
    targetColourRGB: ColourRGB
    gameMode: string
    setGameMode: (gameMode: string) => void
    resetGame: () => void
    guessedCorrect: boolean
}

export default function WinScreen({ targetColour, targetColourRGB, gameMode, setGameMode, resetGame, guessedCorrect }: Readonly<Props>) {

    return (
        <div className="page-content">
            <Title gameMode={gameMode} setGameMode={setGameMode} />
            {
                guessedCorrect ?
                <>
                <Confetti />
                <h2>Correct!</h2>
                <p>The exact colour for "{targetColour.name}" was:</p>
                </>
                :
                <>
                <p>You ran out of guesses.</p>
                <p>The correct colour for "{targetColour.name}" was:</p>
                </>
            }
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