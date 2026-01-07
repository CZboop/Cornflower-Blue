import Title from "../shared/Title";
import { PhotoshopPicker } from 'react-color';

type Colour = {
    r_diff: string
    g_diff: string
    b_diff: string
    r_val: string
    g_val: string
    b_val: string
}

type Props = {
    numGuesses: number
    targetColour: { name: string, value: string }
    formAction: () => void
    colour: string
    setColour: () => void
    pastEvals: Array<Colour>
    getColourDiffClass: (arg0: number) => string
    showInfo: boolean
    setShowInfo: () => void
    gameMode: string
    setGameMode: () => void
}

export default function GameScreen({ numGuesses, targetColour, formAction, colour, setColour, pastEvals, getColourDiffClass, showInfo, setShowInfo, gameMode, setGameMode }: Props) {

    return (
        <div className="page-content">
            <Title gameMode={gameMode} setGameMode={setGameMode} />
            <h3>Select the colour with this name from the picker:</h3>
            {
                targetColour ?
                    <h2 className="target-colour">{targetColour.name}</h2> :
                    <></>
            }

            <form action={formAction}>
                <div className="colour-picker">
                    <PhotoshopPicker key={numGuesses} color={colour} onChange={(c) => setColour(c.hex)} />
                </div>
                <input type="submit"></input>
                <h3>You have <b>{5 - numGuesses}</b> guesses left - {Array(5).fill(null).map((_, i) => (<span key={i}>{i < 5 - numGuesses ? '❤️' : '🩶'}</span>))}</h3>

                {pastEvals.length > 0 ?
                    <>
                        <h3 className="past-guesses">Past Guesses: <span className="info-icon" onClick={() => setShowInfo(!showInfo)}>ℹ️</span>
                        </h3>

                        {showInfo && (
                            <div className="info-box">
                                <p>Each number shows the R, G, or B value of the guess. The colours show roughly how far the guess was from being correct across each colour channel.</p>
                                <ul>
                                    <li>🟢 Green: Correct, or close enough (within 25)</li>
                                    <li>🟠 Orange: Close (within 75)</li>
                                    <li>🔴 Red: Far off (75+)</li>
                                </ul>
                                <p>Click the top ℹ️ icon again to close these details.</p>
                            </div>
                        )}
                        {pastEvals.map((guess, index) => (
                            <div key={`guess-${index}`} className="guess-row">
                                <span className={`colour-label ${getColourDiffClass(parseInt(guess.r_diff))}`}>R: {guess.r_val}</span>
                                <span className={`colour-label ${getColourDiffClass(parseInt(guess.g_diff))}`}>G: {guess.g_val}</span>
                                <span className={`colour-label ${getColourDiffClass(parseInt(guess.b_diff))}`}>B: {guess.b_val}</span>
                            </div>
                        ))}
                    </>
                    :
                    (<></>)
                }
            </form>
        </div>
    )
}