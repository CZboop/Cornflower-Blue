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

 /** Screen for when a correct guess is given - confetti, exact colour shown, and play again button */
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
                <button className="play-again" onClick={resetGame}>Play Again</button>
            ) : (
                <button className="play-again" onClick={() => { setGameMode("random"); resetGame(); }}>
                    Play Random Mode
                </button>
            )}
        </div>
    )
}